import Elysia from 'elysia';
import { authenticationPlugin } from './plugins/authentication.plugin.ts';
import { logicPlugin } from './plugins/logic.plugin.ts';
import { modelsPlugin } from './plugins/models.plugin.ts';
import { routesPlugin } from './plugins/routes.plugin.ts';

export const application = new Elysia({ name: 'application' })
  .use(authenticationPlugin)
  .use(modelsPlugin)
  .use(await logicPlugin())
  .use(await routesPlugin())
  .onStart(({ server }) => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log(
      `🦊 Elysia is running at http://${server?.hostname}:${server?.port}`,
    );
  });

export type Application = typeof application;
