import type { Request, Response } from "express";
import { db } from "../db/connection.ts";
import { users, type NewUser } from "../db/schema/user.schema.ts";
import { comparePasswords, hashPassword } from "../services/passwords.ts";
import { generateToken } from "../services/jwt.ts";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import env from "../../env.ts";

export async function register(req: Request<any, any, NewUser>, res: Response) {
  try {
    const hashedPassword = await hashPassword(req.body.password);

    const [user] = await db
      .insert(users)
      .values({
        ...req.body,
        password: hashedPassword,
      })
      .returning({
        id: users.id,
        email: users.email,
        username: users.username,
        firstName: users.firstName,
        lastName: users.lastName,
        createdAt: users.createdAt,
      });

    const token = generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });

    return res.status(201).json({
      message: "User successfully created",
      user,
      token,
    });
  } catch (e) {
    console.error("Registration error", e);
    res.status(500).json({ error: "Failed to create user" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValidatedPassword = await comparePasswords(password, user.password);

    if (!isValidatedPassword) {
      // Logic to lock the user out if 5 tries (possible hacker)
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.firstName + " " + user.lastName,
    });

    return res.status(201).json({
      message: "User logged in",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (e) {
    console.error("Login Error", e);
    res.status(500).json({ error: "Failed to login" });
  }
}

export function checkLoggedInGoogle(req, res, next) {
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res.status(401).json({
      error: "You must log in",
    });
  }
  next();
}

export function verifyCallback(accessToken, refreshToken, profile, done) {
  const token = generateToken({
    id: profile.id,
    email: profile.emails?.[0]?.value,
    name: profile.displayName,
  });

  profile.jwt = token;
  console.log(profile);

  done(null, profile);
}
