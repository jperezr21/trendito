import { db, products, stores } from '@/lib/db';
import { eq, ilike, or } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ products: [] });
    }

    if (!db) {
      return NextResponse.json({ 
        error: 'Base de datos no configurada' 
      }, { status: 503 });
    }

    // Buscar productos por título o descripción
    const searchResults = await db
      .select({
        id: products.id,
        title: products.title,
        description: products.description,
        price: products.price,
        imageUrl: products.imageUrl,
        productUrl: products.productUrl,
        storeName: stores.name,
      })
      .from(products)
      .innerJoin(stores, eq(products.storeId, stores.id))
      .where(
        or(
          ilike(products.title, `%${query}%`),
          ilike(products.description, `%${query}%`)
        )
      )
      .limit(50);

    return NextResponse.json({ 
      products: searchResults,
      total: searchResults.length 
    });
  } catch (error) {
    console.error('Error en búsqueda:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 