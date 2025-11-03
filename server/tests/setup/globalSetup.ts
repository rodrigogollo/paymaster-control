import { sql } from "drizzle-orm";
import logger from "../../src/services/logger.ts";
import db from "../../src/db/connection.ts";
import { users } from "../../src/db/schema/user.schema.ts";
import { execSync } from "node:child_process";
import { clients } from "../../src/db/schema/client.schema.ts";
import { projects } from "../../src/db/schema/project.schema.ts";
import { timeEntities } from "../../src/db/schema/timeEntity.schema.ts";

export default async function setup() {
  logger.info('Setting up the test database');

  try {
    await db.execute(sql`DROP TABLE IF EXISTS ${users} CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS ${clients} CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS ${projects} CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS ${timeEntities} CASCADE`)

    logger.info('Pushing schema using drizzle-kit');
    execSync(`drizzle-kit push --url="${process.env.DATABASE_URL}" --schema="./src/db/schema/*.ts" --dialect="postgresql"`, { stdio: 'inherit', cwd: process.cwd() })
  } catch (e) {
    logger.error('Failed to setup test DB', e);
    throw e;
  }

  // clean up
  return async () => {
    try {
      await db.execute(sql`DROP TABLE IF EXISTS ${users} CASCADE`)
      await db.execute(sql`DROP TABLE IF EXISTS ${clients} CASCADE`)
      await db.execute(sql`DROP TABLE IF EXISTS ${projects} CASCADE`)
      await db.execute(sql`DROP TABLE IF EXISTS ${timeEntities} CASCADE`)

      process.exit(0);
    } catch (e) {
      logger.error('Failed to setup test DB', e);
      throw e;
    }
  }
}
