import type { Response } from "express";
import type { AuthenticatedRequest } from "../middlewares/auth.ts";

export async function getAllProjects(req: AuthenticatedRequest, res: Response) {
  const user = req.user;

  res.status(200).json({
    message: 'getting projects'
  })
}
