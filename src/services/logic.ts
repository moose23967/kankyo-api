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
          eq(items.userIdentifier, sql.placeholder('userIdentifier')),
          eq(items.identifier, sql.placeholder('identifier')),
        ),
      })
      .prepare('findOne');
  }

  async findOne(options: { userIdentifier: number; identifier: number }) {
    const item = await this.#findOne.execute({
      userIdentifier: options.userIdentifier,
      identifier: options.identifier,
    });

    if (!item) {
      throw NotFound;
    }

    return item;
  }
}
