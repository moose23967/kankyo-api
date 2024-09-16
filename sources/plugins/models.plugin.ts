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
  const item = t.Object({
    identifier: t.Number(),
    userIdentifier: t.Number(),
    key: t.String(),
    value: t.String(),
  });

  return app
    .model(
      'users.credentials',
      t.Object({ email: t.String(), password: t.String() }),
    )
    .model('users.authorization', t.Object({ authorization: t.String() }))
    .model('users.token', t.Object({ token: t.String() }))
    .model('item', item)
    .model('items', t.Array(item))
    .model('items.identifier', t.Object({ identifier: t.Number() }))
    .model('errors.unauthorized', modelError(Unauthorized.message))
    .model('errors.not-found', modelError(NotFound.message))
    .model('errors.already-exists', modelError(AlreadyExists.message));
}
