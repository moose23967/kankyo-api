import type { App } from '@/app';
import { AlreadyExists } from '@/errors';
import { users } from '@/services/db/schemas/users.schema';

export default function signUpRoute(app: App) {
  return app.post(
    '/users/sign-up',
    async ({ body, logic, jwt }) => {
      // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
      const passwordHash = await Bun.password.hash(body.password);

      let user: { id: number };

      try {
        [user] = await logic.database
          .insert(users)
          .values({
            passwordHash,
            email: body.email,
          })
          .returning();
      } catch {
        throw AlreadyExists;
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
        400: 'errors.alreadyExists',
      },
      detail: {
        summary: 'Sign up',
        tags: ['Users'],
      },
    },
  );
}
