import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { users } from './users.schema.ts';

export const items = pgTable('items', {
  identifier: serial('identifier').primaryKey(),
  userIdentifier: integer('user_identifier')
    .notNull()
    .references(() => users.identifier),
  key: text('key').notNull(),
  value: text('value').notNull(),
});
