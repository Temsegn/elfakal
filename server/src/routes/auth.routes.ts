import { Router } from "express";
import { z } from "zod";
import { login } from "../services/auth.service.js";

export const authRouter = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const result = await login(email, password);

    if (!result) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({
      data: {
        user: result.user,
        token: result.token,
      },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation failed", details: err.errors });
    }
    next(err);
  }
});
