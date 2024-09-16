import type { Application } from '@/application';

export default function routeItemFindOne(application: Application) {
  return application.get(
    '/items/:id',
    async ({ headers, authentication, logic, params }) => {
      const { userIdentifier } = await authentication.authenticate(
        headers.authorization,
      );

      return await logic.findOne({
        userIdentifier,
        identifier: params.identifier,
      });
    },
    {
      headers: 'users.authorization',
      params: 'items.identifier',
      response: {
        200: 'item',
        401: 'errors.unauthorized',
        404: 'errors.not-found',
      },
      detail: {
        summary: 'Find One',
        tags: ['Items'],
      },
    },
  );
}
