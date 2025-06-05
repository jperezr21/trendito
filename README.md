# Trendito - Buscador de Moda

## ✅ Lista de Tareas - COMPLETADAS

### 1. Configuración de Base de Datos
- [x] Instalar y configurar Drizzle ORM
- [x] Configurar conexión a Neon PostgreSQL
- [x] Crear esquemas de base de datos:
  - Tabla `stores` (id, name, url, description, created_at)
  - Tabla `products` (id, store_id, title, description, price, image_url, product_url, shopify_id, created_at)
- [x] Configurar variables de entorno para la base de datos

### 2. Página Principal (Barra de Búsqueda)
- [x] Diseñar interfaz de búsqueda moderna y atractiva
- [x] Implementar componente de barra de búsqueda
- [x] Configurar navegación a página de resultados

### 3. Página de Resultados de Búsqueda
- [x] Crear ruta `/search` con parámetros de consulta
- [x] Implementar búsqueda en base de datos (productos por título/descripción)
- [x] Diseñar grid de productos con información relevante
- [x] Implementar enlaces a tiendas externas

### 4. Página de Administrador
- [x] Crear ruta `/admin`
- [x] Implementar formulario para URL de tienda Shopify
- [x] Validar formato de URL de Shopify

### 5. API para Indexación de Productos
- [x] Crear endpoint `/api/admin/index-store`
- [x] Implementar función para obtener datos de `<url>/meta.json`
- [x] Implementar función para obtener productos de `<url>/collections/all/products.json`
- [x] Implementar lógica de guardado en base de datos
- [x] Manejar errores y respuestas de la API

### 6. Configuración de Metadatos y Estilos
- [x] Actualizar metadatos de la aplicación
- [x] Mejorar estilos globales para tema de moda
- [x] Implementar diseño responsive

### 7. Finalización
- [x] Pruebas de funcionalidad completa
- [x] Commit realizado
- [ ] Push a main (requiere configurar repositorio remoto)

## 📦 Dependencias Instaladas
- `drizzle-orm` - ORM para PostgreSQL
- `@neondatabase/serverless` - Cliente para Neon
- `drizzle-kit` - CLI para migraciones

## 🚀 Stack Tecnológico
- **Frontend**: Next.js 15, React 19, TailwindCSS
- **Backend**: Next.js API Routes
- **Base de Datos**: PostgreSQL (Neon) con Drizzle ORM
- **Integración**: Shopify Public APIs

## 🛠️ Configuración Requerida

Para usar la aplicación, necesitas crear un archivo `.env.local` con:

```env
DATABASE_URL="tu_conexion_de_neon_postgresql"
```

## 📋 Scripts Disponibles

```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Construir para producción
npm run start        # Iniciar servidor de producción
npm run lint         # Ejecutar linter
npm run db:generate  # Generar migraciones
npm run db:migrate   # Ejecutar migraciones
npm run db:push      # Push de esquema a base de datos
```

## 🎯 Funcionalidades Implementadas

1. **Página Principal**: Interfaz moderna con barra de búsqueda, categorías populares y secciones de características
2. **Búsqueda de Productos**: Sistema de búsqueda que consulta la base de datos por título y descripción
3. **Resultados Visuales**: Grid responsive de productos con imágenes, precios e información de tienda
4. **Panel Admin**: Formulario para indexar nuevas tiendas Shopify
5. **Indexación Automática**: API que consume endpoints públicos de Shopify para obtener metadatos y productos
6. **Base de Datos**: Esquema optimizado para tiendas y productos con relaciones apropiadas

¡Trendito está listo para indexar tiendas Shopify y permitir búsquedas de productos de moda!

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
