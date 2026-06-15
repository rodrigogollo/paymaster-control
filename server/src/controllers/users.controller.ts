import type { Response } from "express";
import db from "../db/connection.ts";
import { and, type SQL } from "drizzle-orm";

export async function getAllUsers(req, res: Response) {
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
