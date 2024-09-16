import type { App } from '@/app';
import { InvalidEmailOrPassword } from '@/errors';
import { modelError } from '@/plugins/models.plugin';
import { users } from '@/services/db/schemas/users.schema';
import { eq } from 'drizzle-orm';

export default function signInRoute(app: App) {
  return app.post(
    '/users/sign-in',
    async ({ body, logic, jwt }) => {
      const user = await logic.database.query.users.findFirst({
        where: eq(users.email, body.email),
      });

      if (!user) {
        throw InvalidEmailOrPassword;
      }

      // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
      const isPasswordValid = await Bun.password.verify(
        body.password,
        user.passwordHash,
      );

      if (!isPasswordValid) {
        throw InvalidEmailOrPassword;
      }

      return {
        token: await jwt.sign({
          userId: user.id,
        }),
      };
    },
    {
      body: 'users.credentials',
      response: {
        200: 'users.token',
        400: modelError(InvalidEmailOrPassword.message),
      },
      detail: {
        summary: 'Sign in',
        tags: ['Users'],
      },
    },
  );
}
