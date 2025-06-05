import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

// Configuración de conexión
const connectionString = process.env.DATABASE_URL;
const sql = connectionString ? neon(connectionString) : null;
export const db = sql ? drizzle(sql) : null;

// Esquema de tiendas
export const stores = pgTable('stores', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  url: text('url').notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Esquema de productos
export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  storeId: uuid('store_id').references(() => stores.id).notNull(),
  title: text('title').notNull(),
  description: text('description'),
  price: text('price'),
  imageUrl: text('image_url'),
  productUrl: text('product_url').notNull(),
  shopifyId: text('shopify_id').unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Store = typeof stores.$inferSelect;
export type NewStore = typeof stores.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert; 