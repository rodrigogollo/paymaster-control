import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.ts";
import userRoutes from './users.routes.ts';

const router = Router();

router.use(authenticateToken);
router.use('/users', userRoutes);

export default router;
