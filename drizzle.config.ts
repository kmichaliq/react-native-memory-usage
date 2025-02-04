import type { Config } from 'drizzle-kit';
export default {
  schema: './src/shared/lib/drizzle/schema.ts',
  out: './src/shared/lib/drizzle/migrations',
  dialect: 'sqlite',
  driver: 'expo',
} satisfies Config;
