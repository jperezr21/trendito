import { db, products, stores } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

interface ShopifyMeta {
  shop: {
    name: string;
    description?: string;
  };
}

interface ShopifyProduct {
  id: number;
  title: string;
  body_html?: string;
  vendor?: string;
  product_type?: string;
  handle: string;
  images?: {
    src: string;
  }[];
  variants?: {
    price: string;
  }[];
}

interface ShopifyProductsResponse {
  products: ShopifyProduct[];
}

async function fetchStoreMetadata(storeUrl: string): Promise<ShopifyMeta> {
  const metaUrl = `${storeUrl.replace(/\/$/, '')}/meta.json`;
  const response = await fetch(metaUrl);
  
  if (!response.ok) {
    throw new Error(`Error al obtener metadatos: ${response.status}`);
  }
  
  return response.json();
}

async function fetchStoreProducts(storeUrl: string): Promise<ShopifyProduct[]> {
  const productsUrl = `${storeUrl.replace(/\/$/, '')}/collections/all/products.json`;
  const response = await fetch(productsUrl);
  
  if (!response.ok) {
    throw new Error(`Error al obtener productos: ${response.status}`);
  }
  
  const data: ShopifyProductsResponse = await response.json();
  return data.products || [];
}

function extractTextFromHtml(html: string | undefined): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL es requerida' },
        { status: 400 }
      );
    }

    if (!db) {
      return NextResponse.json(
        { error: 'Base de datos no configurada' },
        { status: 503 }
      );
    }

    // Normalizar URL
    let storeUrl = url.trim();
    if (!storeUrl.startsWith('http://') && !storeUrl.startsWith('https://')) {
      storeUrl = `https://${storeUrl}`;
    }

    console.log(`Iniciando indexación de: ${storeUrl}`);

    // 1. Obtener metadatos de la tienda
    let storeMetadata: ShopifyMeta;
    try {
      storeMetadata = await fetchStoreMetadata(storeUrl);
    } catch (error) {
      console.error('Error obteniendo metadatos:', error);
      return NextResponse.json(
        { error: 'No se pudieron obtener los metadatos de la tienda. Verifica que sea una tienda Shopify válida.' },
        { status: 400 }
      );
    }

    // 2. Obtener productos de la tienda
    let storeProducts: ShopifyProduct[];
    try {
      storeProducts = await fetchStoreProducts(storeUrl);
    } catch (error) {
      console.error('Error obteniendo productos:', error);
      return NextResponse.json(
        { error: 'No se pudieron obtener los productos de la tienda.' },
        { status: 400 }
      );
    }

    // 3. Verificar si la tienda ya existe
    const existingStore = await db
      .select()
      .from(stores)
      .where(eq(stores.url, storeUrl))
      .limit(1);

    let storeRecord;
    
    if (existingStore.length > 0) {
      // Actualizar tienda existente
      storeRecord = await db
        .update(stores)
        .set({
          name: storeMetadata.shop.name,
          description: storeMetadata.shop.description || null,
        })
        .where(eq(stores.url, storeUrl))
        .returning();
      
      // Eliminar productos existentes de esta tienda
      await db
        .delete(products)
        .where(eq(products.storeId, existingStore[0].id));
        
      storeRecord = existingStore;
    } else {
      // Crear nueva tienda
      storeRecord = await db
        .insert(stores)
        .values({
          name: storeMetadata.shop.name,
          url: storeUrl,
          description: storeMetadata.shop.description || null,
        })
        .returning();
    }

    const storeId = storeRecord[0].id;

    // 4. Insertar productos
    let insertedCount = 0;
    const batchSize = 50;

    for (let i = 0; i < storeProducts.length; i += batchSize) {
      const batch = storeProducts.slice(i, i + batchSize);
      
      const productsToInsert = batch.map((product) => ({
        storeId,
        title: product.title,
        description: extractTextFromHtml(product.body_html),
        price: product.variants?.[0]?.price ? `$${product.variants[0].price}` : null,
        imageUrl: product.images?.[0]?.src || null,
        productUrl: `${storeUrl}/products/${product.handle}`,
        shopifyId: product.id.toString(),
      }));

      try {
        await db.insert(products).values(productsToInsert);
        insertedCount += productsToInsert.length;
        console.log(`Insertados ${insertedCount}/${storeProducts.length} productos`);
      } catch (error) {
        console.error('Error insertando batch de productos:', error);
        // Continuar con el siguiente batch
      }
    }

    console.log(`Indexación completada: ${insertedCount} productos indexados`);

    return NextResponse.json({
      success: true,
      store: {
        name: storeMetadata.shop.name,
        url: storeUrl,
      },
      productsCount: insertedCount,
      totalProducts: storeProducts.length,
    });

  } catch (error) {
    console.error('Error en indexación:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor durante la indexación' },
      { status: 500 }
    );
  }
} 