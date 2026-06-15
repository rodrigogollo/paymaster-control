import { env as loadEnv } from "custom-env";
// import { loadEnvFile } from "node:process";
import { z } from "zod";
import logger from "./src/services/logger.ts";

const nodeEnv = process.env.NODE_ENV || "dev";

export const isProd = nodeEnv === "prod";
export const isDev = nodeEnv === "dev";
export const isTest = nodeEnv === "test";

if (isDev) {
  loadEnv();
} else if (isTest) {
  loadEnv("test");
}

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "prod"]).default("dev"),
  APP_STAGE: z.enum(["dev", "test", "prod"]).default("dev"),
  PORT: z.coerce.number().positive().default(3000),
  DATABASE_URL: z.string().startsWith("postgresql://"),
  JWT_SECRET: z.string().min(32, "Must be 32 chars long"),
  JWT_EXPIRES_IN: z.coerce.number().default(1 * 60 * 60 * 1000),
  BCRYPT_ROUNDS: z.coerce.number().min(10).max(20).default(12),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  COOKIE_KEY_1: z.string(),
  COOKIE_KEY_2: z.string(),
});

export type Env = z.infer<typeof envSchema>;
let env: Env;

try {
  env = envSchema.parse(process.env);
} catch (e) {
  if (e instanceof z.ZodError) {
    logger.info("Invalid env var");
    logger.error(JSON.stringify(z.treeifyError(e), null, 2));

    e.issues.forEach((err) => {
      const path = err.path.join(".");
      console.log(`${path}: ${err.message}`);
    });

    process.exit(1);
  }

  throw e;
}

export { env };
export default env;
