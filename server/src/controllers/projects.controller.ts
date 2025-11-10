import type { Response } from "express";
import type { AuthenticatedRequest } from "../middlewares/auth.ts";
import db from "../db/connection.ts";

export async function getAllProjects(req: AuthenticatedRequest, res: Response) {
  const projectsResult = await db.query.projects.findMany({})

  res.status(200).json({
    projects: projectsResult,
  })
}
