import { Glob } from 'bun';
import Elysia from 'elysia';

export async function routesPlugin() {
  const routesPlugin = new Elysia({ name: 'routes-plugin' });

  for await (const path of new Glob('**/*.ts').scan('src/routes')) {
    const module = await import(`@envpp/api/routes/${path}`);

    routesPlugin.use(module.default);
  }

  return routesPlugin;
}
