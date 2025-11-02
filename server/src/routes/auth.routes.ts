import { Router } from "express";
import z from "zod";
import { validateBody } from "../middlewares/validation.ts";
import { insertUserSchema } from "../db/schema/user.schema.ts";
import { register, login } from "../controllers/auth.controller.ts";

// const usernameSchema = z.string()
//   .min(3, "Username must be at least 3 characters long")
//   .max(20, "Username cannot exceed 20 characters")
//   .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores");
//
// const emailSchema = z.email('Invalid email')
// const usernameOrEmailSchema = z.union([usernameSchema, emailSchema])

const loginSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(1, 'Password is required')
})

const router = Router();

router.post('/register', validateBody(insertUserSchema), register)
router.post('/login', validateBody(loginSchema), login)

export default router;
