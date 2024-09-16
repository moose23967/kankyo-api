import type { App } from '@/app';
import { t } from 'elysia';

export default function findOneRoute(app: App) {
  return app.get(
    '/items/:id',
    async ({ headers, authentication, logic, params }) => {
      const { userId } = await authentication.authenticate(
        headers.authorization,
      );

      return await logic.findOne({ userId, id: params.id });
    },
    {
      headers: 'users.authorization',
      params: 'items.id',
      response: {
        200: t.Object({
          id: t.Number({ description: 'Item ID' }),
          userId: t.Number({ description: 'Item user ID' }),
          key: t.String({ description: 'Item key' }),
          value: t.String({ description: 'Item value' }),
        }),
        401: 'errors.unauthorized',
        404: 'errors.notFound',
      },
      detail: {
        summary: 'Find One',
        tags: ['Items'],
      },
    },
  );
}
