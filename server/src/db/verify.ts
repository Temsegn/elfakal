import "dotenv/config";
import { query, getPool } from "./pool.js";

async function main() {
  const pool = getPool();
  if (!pool) {
    console.error("No database pool");
    process.exit(1);
  }

  const tables = ["products", "services", "projects", "news", "certifications"];
  for (const table of tables) {
    const rows = await query<{ c: number }>(
      `SELECT COUNT(*)::int AS c FROM ${table}`
    );
    console.log(`${table}: ${rows[0].c}`);
  }
}

main().catch(console.error);
