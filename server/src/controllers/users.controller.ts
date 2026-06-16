import type { Request, Response } from "express";
import db from "../db/connection.ts";
import { and, eq, type SQL } from "drizzle-orm";
import { users } from "../db/schema/user.schema.ts";
import { hashPassword } from "../services/passwords.ts";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const filters: SQL[] = [];
    const usersResult = await db.query.users.findMany({
      where: and(...filters),
      columns: {
        password: false,
      },
    });

    return res.status(200).json({ users: usersResult || [] });
  } catch (e) {
    console.error("Failed to fetch users", e);
    res.status(500).json({
      error: "Failed to fetch users",
    });
  }
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const filters: SQL[] = [];

    const userResult = await db.query.users.findMany({
      where: and(eq(users.id, id), ...filters),
      columns: {
        password: false,
      },
    });

    return res.status(200).json({
      users: userResult || [],
    });
  } catch (e) {
    console.error(`Failed to fetch user with id ${id}`, e);
    res.status(500).json({
      error: `Failed to fetch user with id ${id}`,
    });
  }
}

// only used for admin user creation
export async function createUser(req: Request, res: Response) {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await hashPassword(password);

    const [user] = await db
      .insert(users)
      .values({
        email: email,
        username: username,
        password: hashedPassword,
        age: 0,
      })
      .returning({
        id: users.id,
        email: users.email,
        username: users.username,
      });

    return res.status(201).json({
      user,
    });
  } catch (e) {
    console.error("Failed to create user", e);
    res.status(500).json({
      error: "Failed to create user",
    });
  }
}
