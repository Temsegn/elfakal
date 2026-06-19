import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config/index.js";
import { publicRouter } from "./routes/public.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { adminRouter } from "./routes/admin.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { setupDatabase } from "./db/setup.js";
import { seedDatabase } from "./services/content.service.js";
import { seedAdminUser } from "./services/auth.service.js";

export async function createApp() {
  await setupDatabase();
  await seedDatabase();
  await seedAdminUser();

  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: config.corsOrigins,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    })
  );
  app.use(express.json());

  app.use("/api/v1", publicRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/admin", adminRouter);
  app.use(errorHandler);

  return app;
}
