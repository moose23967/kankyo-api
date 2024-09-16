import type { App } from '@/app';
import { items } from '@/services/db/schemas/items.schema';
import { t } from 'elysia';

export default function createRoute(app: App) {
  return app.post(
    '/items',
    async ({ body, headers, authentication, logic }) => {
      const { userId } = await authentication.authenticate(
        headers.authorization,
      );

      await logic.database.insert(items).values({ userId, ...body });
    },
    {
      headers: 'users.authorization',
      body: t.Object({
        key: t.String({ description: 'Item key' }),
        value: t.String({ description: 'Item value' }),
      }),
      response: {
        400: 'errors.alreadyExists',
        401: 'errors.unauthorized',
      },
      detail: {
        summary: 'Create',
        tags: ['Items'],
      },
    },
  );
}
