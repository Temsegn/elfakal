import pg from "pg";
import { config } from "../config/index.js";

const { Pool } = pg;

let pool: pg.Pool | null = null;

function useDatabaseSsl(connectionString: string): boolean {
  return (
    config.nodeEnv === "production" ||
    connectionString.includes("neon.tech") ||
    connectionString.includes("render.com") ||
    connectionString.includes("sslmode=require")
  );
}

export function getPool(): pg.Pool | null {
  if (!config.databaseUrl) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: config.databaseUrl,
      ssl: useDatabaseSsl(config.databaseUrl)
        ? { rejectUnauthorized: false }
        : undefined,
    });
  }
  return pool;
}

export async function query<T extends pg.QueryResultRow>(
  text: string,
  params?: unknown[]
): Promise<T[]> {
  const db = getPool();
  if (!db) throw new Error("Database not configured");
  const result = await db.query<T>(text, params);
  return result.rows;
}

export async function isDatabaseReady(): Promise<boolean> {
  const db = getPool();
  if (!db) return false;
  try {
    await db.query("SELECT 1");
    return true;
  } catch {
    return false;
  }
}
