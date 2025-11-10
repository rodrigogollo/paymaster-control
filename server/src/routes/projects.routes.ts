import { Router } from "express";
import { getAllProjects } from "../controllers/projects.controller.ts";
import { initializeRedistClient } from "../services/redis.ts";
import { randomUUID } from "node:crypto";
import { projectKeyById } from "../services/keys.ts";

const router = Router();

// router.get('/', async (req, res, next) => {
//   try {
//     const data = await getAllProjects(req, res);
//     const client = await initializeRedistClient();
//     const id = randomUUID();
//     const projectKey = projectKeyById(id);
//     const addResult = await client.hSet(projectKey, data);
//     console.log(`added ${addResult} fields`)
//   } catch (e) {
//     next(e)
//   }
// })

router.get('/', getAllProjects)

export default router;
