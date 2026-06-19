import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getPool } from "./pool.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function setupDatabase(): Promise<void> {
  const pool = getPool();
  if (!pool) {
    console.warn("DATABASE_URL not set — using in-memory fallback data");
    return;
  }

  const schema = fs.readFileSync(
    path.join(__dirname, "schema.sql"),
    "utf-8"
  );
  await pool.query(schema);
  console.log("Database schema ready");
}
