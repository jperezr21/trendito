# Trendito - Buscador de Moda

## Lista de Tareas

### 1. Configuración de Base de Datos
- [ ] Instalar y configurar Drizzle ORM
- [ ] Configurar conexión a Neon PostgreSQL
- [ ] Crear esquemas de base de datos:
  - Tabla `stores` (id, name, url, description, created_at)
  - Tabla `products` (id, store_id, title, description, price, image_url, product_url, shopify_id, created_at)
- [ ] Configurar variables de entorno para la base de datos

### 2. Página Principal (Barra de Búsqueda)
- [ ] Diseñar interfaz de búsqueda moderna y atractiva
- [ ] Implementar componente de barra de búsqueda
- [ ] Configurar navegación a página de resultados

### 3. Página de Resultados de Búsqueda
- [ ] Crear ruta `/search` con parámetros de consulta
- [ ] Implementar búsqueda en base de datos (productos por título/descripción)
- [ ] Diseñar grid de productos con información relevante
- [ ] Implementar enlaces a tiendas externas

### 4. Página de Administrador
- [ ] Crear ruta `/admin`
- [ ] Implementar formulario para URL de tienda Shopify
- [ ] Validar formato de URL de Shopify

### 5. API para Indexación de Productos
- [ ] Crear endpoint `/api/admin/index-store`
- [ ] Implementar función para obtener datos de `<url>/meta.json`
- [ ] Implementar función para obtener productos de `<url>/collections/all/products.json`
- [ ] Implementar lógica de guardado en base de datos
- [ ] Manejar errores y respuestas de la API

### 6. Configuración de Metadatos y Estilos
- [ ] Actualizar metadatos de la aplicación
- [ ] Mejorar estilos globales para tema de moda
- [ ] Implementar diseño responsive

### 7. Finalización
- [ ] Pruebas de funcionalidad completa
- [ ] Commit y push a main

## Dependencias a Instalar
- `drizzle-orm` - ORM para PostgreSQL
- `@neondatabase/serverless` - Cliente para Neon
- `drizzle-kit` - CLI para migraciones

## Stack Tecnológico
- **Frontend**: Next.js 15, React 19, TailwindCSS
- **Backend**: Next.js API Routes
- **Base de Datos**: PostgreSQL (Neon) con Drizzle ORM
- **Integración**: Shopify Public APIs

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
