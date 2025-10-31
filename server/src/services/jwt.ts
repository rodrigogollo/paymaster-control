import { createSecretKey } from "crypto";
import jwt from 'jsonwebtoken';
import env from "../../env.ts";

export interface JwtPayload {
  id: string;
  email: string;
  username: string;
}

export function generateToken(payload: JwtPayload) {
  const secret = env.JWT_SECRET;
  const secretKey = createSecretKey(secret, 'utf-8')

  const token = jwt.sign(payload, secretKey, {
    expiresIn: "1h"
  });

  return token;
}

export async function verifyToken(token: string): Promise<JwtPayload> {
  const secretKey = createSecretKey(env.JWT_SECRET, 'utf-8')

  const payload = jwt.verify(token, secretKey);
  return payload as JwtPayload;
}
