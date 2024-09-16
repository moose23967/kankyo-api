import { Unauthorized } from '@/errors';
import jwt from '@elysiajs/jwt';
import type Elysia from 'elysia';
import { t } from 'elysia';
import { extractToken } from './utils/extract-token.ts';

export function authenticationPlugin(application: Elysia) {
  const authenticationPlugin = application.use(
    jwt({
      secret: process.env.JWT_SECRET,
      schema: t.Object({ userIdentifier: t.Number() }),
    }),
  );

  return authenticationPlugin.decorate('authentication', {
    async authenticate(authorization: string) {
      const token = extractToken(authorization);

      const payload = await authenticationPlugin.decorator.jwt.verify(token);

      if (!payload) {
        throw Unauthorized;
      }

      return { userIdentifier: payload.userIdentifier };
    },
  });
}
