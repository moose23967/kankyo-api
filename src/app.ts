import Elysia from 'elysia';
import { authenticationPlugin } from './plugins/authentication.plugin.ts';
import { logicPlugin } from './plugins/logic.plugin.ts';
import { modelsPlugin } from './plugins/models.plugin.ts';
import { routesPlugin } from './plugins/routes.plugin.ts';

export const app = new Elysia({ name: 'app' })
  .use(authenticationPlugin)
  .use(modelsPlugin)
  .use(await logicPlugin())
  .use(await routesPlugin());

export type App = typeof app;
