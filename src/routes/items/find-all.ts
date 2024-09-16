import type { Application } from '@/application';
import { items } from '@/services/db/schemas/items.schema';
import { eq } from 'drizzle-orm';

export default function routeItemFindAll(application: Application) {
  return application.get(
    '/items',
    async ({ headers, authentication, logic }) => {
      const { userIdentifier } = await authentication.authenticate(
        headers.authorization,
      );

      return await logic.database.query.items.findMany({
        where: eq(items.userIdentifier, userIdentifier),
      });
    },
    {
      headers: 'users.authorization',
      response: {
        200: 'items',
        401: 'errors.unauthorized',
      },
      detail: {
        summary: 'Find All',
        tags: ['Items'],
      },
    },
  );
}
