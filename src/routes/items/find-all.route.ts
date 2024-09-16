import type { App } from '@/app';
import { items } from '@/services/db/schemas/items.schema';
import { eq } from 'drizzle-orm';
import { t } from 'elysia';

export default function findAllRoute(app: App) {
  return app.get(
    '/items',
    async ({ headers, authentication, logic }) => {
      const { userId } = await authentication.authenticate(
        headers.authorization,
      );

      return await logic.database.query.items.findMany({
        where: eq(items.userId, userId),
      });
    },
    {
      headers: 'users.authorization',
      response: {
        200: t.Array(
          t.Object({
            id: t.Number({ description: 'Item ID' }),
            userId: t.Number({ description: 'Item user ID' }),
            key: t.String({ description: 'Item key' }),
            value: t.String({ description: 'Item value' }),
          }),
        ),
        401: 'errors.unauthorized',
      },
      detail: {
        summary: 'Find All',
        tags: ['Items'],
      },
    },
  );
}
