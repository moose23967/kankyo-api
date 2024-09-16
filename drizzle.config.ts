import { defineConfig } from 'drizzle-kit';

const config = defineConfig({
  dialect: 'postgresql',
  schema: 'src/services/db/schemas/*',
  out: 'drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});

export default config;
