import { Router } from "express";
import { getAllProjects } from "../controllers/projects.controller.ts";

const router = Router();

router.get('/', getAllProjects)

export default router;
