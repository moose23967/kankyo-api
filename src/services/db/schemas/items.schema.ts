import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { users } from './users.schema.ts';

export const items = pgTable('items', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  key: text('key').notNull(),
  value: text('value').notNull(),
});
