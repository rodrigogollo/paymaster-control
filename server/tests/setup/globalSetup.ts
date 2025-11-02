import { sql } from "drizzle-orm";
import logger from "../../src/services/logger.ts";
import db from "../../src/db/connection.ts";
import { users } from "../../src/db/schema/user.schema.ts";
import { execSync } from "node:child_process";

export default async function setup() {
  logger.info('Setting up the test database');

  try {
    await db.execute(sql`DROP TABLE IF EXISTS ${users} CASCADE`)

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

      process.exit(0);
    } catch (e) {
      logger.error('Failed to setup test DB', e);
      throw e;
    }
  }
}
