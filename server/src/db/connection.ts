import { Pool } from 'pg';
import { env, isProd } from '../../env.ts';
import * as userSchema from './schema/user.schema.ts';
import * as projectSchema from './schema/project.schema.ts';
import * as clientSchema from './schema/client.schema.ts';
import * as timeEntitySchema from './schema/timeEntity.schema.ts';
import { remember } from '@epic-web/remember';
import { drizzle } from 'drizzle-orm/node-postgres';

const combinedSchema = {
  ...userSchema,
  ...projectSchema,
  ...clientSchema,
  ...timeEntitySchema
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
