import "dotenv/config";

function parseCorsOrigins(value: string | undefined): string[] {
  if (!value?.trim()) return ["http://localhost:3000"];
  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

const nodeEnv = process.env.NODE_ENV || "development";
const jwtSecret =
  process.env.JWT_SECRET || "elfakal-dev-secret-change-in-production";

if (nodeEnv === "production" && jwtSecret === "elfakal-dev-secret-change-in-production") {
  throw new Error("Set JWT_SECRET in production");
}

export const config = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv,
  databaseUrl: process.env.DATABASE_URL || "",
  corsOrigins: parseCorsOrigins(process.env.CORS_ORIGIN),
  jwtSecret,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  adminEmail: process.env.ADMIN_EMAIL || "admin@elfakal.com",
  adminPassword: process.env.ADMIN_PASSWORD || "Admin@123456",
  adminName: process.env.ADMIN_NAME || "System Admin",
};
