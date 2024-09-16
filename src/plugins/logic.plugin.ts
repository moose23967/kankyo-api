import { items } from '@/services/db/schemas/items.schema';
import { users } from '@/services/db/schemas/users.schema';
import { Logic } from '@/services/logic';
import { drizzle } from 'drizzle-orm/node-postgres';
import Elysia from 'elysia';
import { Client } from 'pg';

export async function logicPlugin() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();

  return new Elysia({ name: 'logic-plugin' }).decorate(
    'logic',
    new Logic(drizzle(client, { schema: { users, items } })),
  );
}
