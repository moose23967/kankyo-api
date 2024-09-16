import type { Application } from '@/application';
import { NotFound } from '@/errors';
import { items } from '@/services/db/schemas/items.schema';
import { and, eq } from 'drizzle-orm';

export default function routeItemDelete(application: Application) {
  return application.delete(
    '/items/:id',
    async ({ headers, authentication, logic, params }) => {
      const { userIdentifier } = await authentication.authenticate(
        headers.authorization,
      );

      try {
        await logic.database
          .delete(items)
          .where(
            and(
              eq(items.userIdentifier, userIdentifier),
              eq(items.identifier, params.identifier),
            ),
          );
      } catch {
        throw NotFound;
      }
    },
    {
      headers: 'users.authorization',
      params: 'items.identifier',
      response: {
        401: 'errors.unauthorized',
        404: 'errors.not-found',
      },
      detail: {
        summary: 'Delete',
        tags: ['Items'],
      },
    },
  );
}
