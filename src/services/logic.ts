import { NotFound } from '@/errors.ts';
import { and, eq, sql } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { items } from './db/schemas/items.schema.ts';
import type { users } from './db/schemas/users.schema.ts';

export class Logic {
  database;
  #findOne;

  constructor(
    database: NodePgDatabase<{ users: typeof users; items: typeof items }>,
  ) {
    this.database = database;

    this.#findOne = database.query.items
      .findFirst({
        where: and(
          eq(items.userId, sql.placeholder('userId')),
          eq(items.id, sql.placeholder('id')),
        ),
      })
      .prepare('findOne');
  }

  async findOne(options: { userId: number; id: number }) {
    const item = await this.#findOne.execute({
      userId: options.userId,
      id: options.id,
    });

    if (!item) {
      throw NotFound;
    }

    return item;
  }
}
