// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
export const stays = sqliteTable('stays', { id: text('id').primaryKey(), title: text('title').notNull(), url: text('url').notNull(), location: text('location').notNull(), image: text('image').notNull(), price: real('price'), dates: text('dates').notNull(), note: text('note').notNull() });
export const votes = sqliteTable('votes', { id: text('id').primaryKey(), stayId: text('stay_id').notNull(), person: integer('person').notNull(), rating: integer('rating').notNull() });
