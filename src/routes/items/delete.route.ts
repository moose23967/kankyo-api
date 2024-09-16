import type { App } from '@/app';
import { NotFound } from '@/errors';
import { items } from '@/services/db/schemas/items.schema';
import { and, eq } from 'drizzle-orm';

export default function deleteRoute(app: App) {
  return app.delete(
    '/items/:id',
    async ({ headers, authentication, logic, params }) => {
      const { userId } = await authentication.authenticate(
        headers.authorization,
      );

      try {
        await logic.database
          .delete(items)
          .where(and(eq(items.userId, userId), eq(items.id, params.id)));
      } catch {
        throw NotFound;
      }
    },
    {
      headers: 'users.authorization',
      params: 'items.id',
      response: {
        401: 'errors.unauthorized',
        404: 'errors.notFound',
      },
      detail: {
        summary: 'Delete',
        tags: ['Items'],
      },
    },
  );
}
