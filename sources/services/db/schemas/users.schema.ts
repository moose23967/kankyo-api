import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  identifier: serial('identifier').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
});
