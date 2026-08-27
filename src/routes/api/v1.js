import { Router } from "express";
import { config } from "../../config.js";
import { getPool } from "../../db.js";

const router = Router();

router.get("/health", async (_req, res) => {
  let database = { ok: false, mode: "disabled" };

  if (config.postgres.enabled) {
    const pool = getPool();
    if (!pool) {
      database = { ok: false, mode: "not-initialized" };
    } else {
      try {
        await pool.query("SELECT 1");
        database = { ok: true, mode: "connected" };
      } catch (err) {
        database = { ok: false, mode: "error", message: err.message };
      }
    }
  } else {
    database = { ok: true, mode: "disabled" };
  }

  res.json({
    ok: true,
    service: "nduja-games-website",
    version: "0.1.0",
    site: config.siteUrl,
    beta: config.isBeta,
    database,
  });
});

export default router;
