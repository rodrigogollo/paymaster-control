import { Pool } from 'pg';
import { env, isProd } from '../../env.ts';
import * as userSchema from './schema/user.schema.ts';
import { remember } from '@epic-web/remember';
import { drizzle } from 'drizzle-orm/node-postgres';

const combinedSchema = {
  ...userSchema,
  // ...projectSchema
}

const createPool = () => {
  return new Pool({
    connectionString: env.DATABASE_URL,
  })
}

let client;

if (isProd) {
  client = createPool()
} else {
  client = remember('dbPool', () => createPool())
}

export const db = drizzle(client, { schema: combinedSchema })
export default db;
