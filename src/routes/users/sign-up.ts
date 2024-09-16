import type { Application } from '@/application';
import { AlreadyExists } from '@/errors';
import { users } from '@/services/db/schemas/users.schema';

export default function routeUserSignUp(application: Application) {
  return application.post(
    '/users/sign-up',
    async ({ body, logic, jwt }) => {
      // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
      const passwordHash = await Bun.password.hash(body.password);

      let user: { identifier: number };

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
          userIdentifier: user.identifier,
        }),
      };
    },
    {
      body: 'users.credentials',
      response: {
        200: 'users.token',
        400: 'errors.already-exists',
      },
      detail: {
        summary: 'Sign up',
        tags: ['Users'],
      },
    },
  );
}
