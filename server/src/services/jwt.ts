import { createSecretKey } from "crypto";
import jwt from "jsonwebtoken";
import env from "../../env.ts";

const { JWT_SECRET, JWT_EXPIRES_IN } = env;

export interface JwtPayload {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

export function generateToken(payload: JwtPayload) {
  const secretKey = createSecretKey(JWT_SECRET, "utf-8");

  const token = jwt.sign(payload, secretKey, {
    expiresIn: Number(JWT_EXPIRES_IN) || "1h",
  });

  return token;
}

export async function verifyToken(token: string): Promise<JwtPayload> {
  const secretKey = createSecretKey(JWT_SECRET, "utf-8");

  const payload = jwt.verify(token, secretKey);
  return payload as JwtPayload;
}
