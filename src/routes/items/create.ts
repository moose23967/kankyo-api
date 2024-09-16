import type { Application } from '@/application';
import { items } from '@/services/db/schemas/items.schema';
import { t } from 'elysia';

export default function routeItemCreate(application: Application) {
  return application.post(
    '/items',
    async ({ body, headers, authentication, logic }) => {
      const { userIdentifier } = await authentication.authenticate(
        headers.authorization,
      );

      await logic.database.insert(items).values({ userIdentifier, ...body });
    },
    {
      headers: 'users.authorization',
      body: t.Object({
        key: t.String(),
        value: t.String(),
      }),
      response: {
        400: 'errors.already-exists',
        401: 'errors.unauthorized',
      },
      detail: {
        summary: 'Create',
        tags: ['Items'],
      },
    },
  );
}
