import pg from "pg";
import { config } from "./config.js";

let pool = null;

export function getPool() {
  return pool;
}

export async function initDatabase() {
  if (!config.postgres.enabled) {
    return { ok: true, mode: "disabled" };
  }

  pool = new pg.Pool({
    host: config.postgres.host,
    port: config.postgres.port,
    user: config.postgres.user,
    password: config.postgres.password,
    database: config.postgres.database,
    ssl: config.postgres.ssl ? { rejectUnauthorized: false } : undefined,
    max: 10,
  });

  const client = await pool.connect();
  try {
    await client.query("SELECT 1");
    return { ok: true, mode: "connected" };
  } finally {
    client.release();
  }
}

export async function closeDatabase() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
