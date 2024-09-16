import { defineConfig } from 'drizzle-kit';

const configuration = defineConfig({
  dialect: 'postgresql',
  schema: 'src/services/db/schemas/*',
  out: 'drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});

export default configuration;
