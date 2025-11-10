import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.ts";
import userRoutes from "./users.routes.ts";
import projectRoutes from "./projects.routes.ts";

const router = Router();

router.use(authenticateToken);
router.use("/users", userRoutes);
router.use("/projects", projectRoutes);

export default router;
