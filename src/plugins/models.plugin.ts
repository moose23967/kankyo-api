import { AlreadyExists, NotFound, Unauthorized } from '@/errors';
import type Elysia from 'elysia';
import { t } from 'elysia';

export function modelError(value: string) {
  return t.Object({
    name: t.Literal('Error'),
    message: t.Literal(value),
  });
}

export function modelsPlugin(app: Elysia) {
  return app
    .model(
      'users.credentials',
      t.Object({
        email: t.String({ description: 'User email' }),
        password: t.String({ description: 'User password' }),
      }),
    )
    .model(
      'users.authorization',
      t.Object({
        authorization: t.String({
          description: 'User authorization',
        }),
      }),
    )
    .model(
      'users.token',
      t.Object({
        token: t.String({ description: 'User token' }),
      }),
    )
    .model(
      'items.id',
      t.Object({
        id: t.Number({ description: 'Item ID' }),
      }),
    )
    .model('errors.unauthorized', modelError(Unauthorized.message))
    .model('errors.notFound', modelError(NotFound.message))
    .model('errors.alreadyExists', modelError(AlreadyExists.message));
}
