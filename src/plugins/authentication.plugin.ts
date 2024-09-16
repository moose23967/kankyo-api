import { Unauthorized } from '@/errors';
import jwt from '@elysiajs/jwt';
import type Elysia from 'elysia';
import { t } from 'elysia';
import { getToken } from './utils/get-token.ts';

export function authenticationPlugin(app: Elysia) {
  const authenticationPlugin = app.use(
    jwt({
      secret: process.env.JWT_SECRET,
      schema: t.Object({
        userId: t.Number(),
      }),
    }),
  );

  return authenticationPlugin.decorate('authentication', {
    async authenticate(authorization: string) {
      const token = getToken(authorization);

      const payload = await authenticationPlugin.decorator.jwt.verify(token);

      if (!payload) {
        throw Unauthorized;
      }

      return { userId: payload.userId };
    },
  });
}
