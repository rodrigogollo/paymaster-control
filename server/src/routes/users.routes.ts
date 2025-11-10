import { Router } from "express";
import type { AuthenticatedRequest } from "../middlewares/auth.ts";

const router = Router();

router.get("/me", (req: AuthenticatedRequest, res) => {
  res.json(req!.user);
});

router.get("/", (req, res) => {
  res.status(200).json({
    message: "getting users",
  });
});

router.get("/:id", (req, res) => {
  res.status(200).json({
    message: "getting user by id",
  });
});

router.post("/", (req, res) => {
  res.status(200).json({
    message: "new user",
  });
});

router.patch("/:id", (req, res) => {
  res.status(200).json({
    message: "edit user",
  });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({
    message: "delete/deactivate user",
  });
});

export default router;
