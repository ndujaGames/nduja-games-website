import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envPath = path.join(rootDir, ".env");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath, quiet: true });
}

const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, "package.json"), "utf8"));

const nodeEnv = process.env.NODE_ENV || "development";
const isProduction = nodeEnv === "production";
const siteHost = process.env.SITE_HOST || "nduja.games";

/** Typographic apostrophe (U+2019), not ASCII straight quote. */
export const siteMark = "\u2019";

export const config = {
  rootDir,
  nodeEnv,
  isProduction,
  port: Number(process.env.PORT || 9080),
  siteHost,
  siteName: "ndujaGames",
  siteMark,
  siteUrl: process.env.SITE_URL || `https://${siteHost}`,
  isBeta: process.env.SITE_BETA !== "false",
  trustProxy: process.env.TRUST_PROXY !== "false",
  /** Bumped via package.json version to bust CDN cache for static CSS. */
  assetVersion: process.env.ASSET_VERSION || pkg.version,
  /** Public contact until @nduja.games mail is live. Legal entity: ndujaLabs (info@ndujalabs.com). */
  contactEmail: process.env.CONTACT_EMAIL || "ndujagames@sullo.co",
  postgres: {
    enabled: process.env.POSTGRES_ENABLED === "true",
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT || 5432),
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "",
    database: process.env.POSTGRES_DB || "nduja",
    ssl: process.env.POSTGRES_SSL === "true",
  },
};

export function brandName() {
  return `${siteMark}${config.siteName}`;
}

export const projects = [
  {
    id: "abdoku",
    name: "ABdoku",
    tags: ["Game", "Puzzle", "Mobile"],
    description: {
      en: "Place one A and one B in each color. Follow the row, column, diagonal, and touch rules to solve the grid.",
      it: "Piazza una A e una B per colore. Segui le regole su righe, colonne, diagonali e contatti per risolvere lo schema.",
    },
    href: process.env.ABDOKU_URL || "https://abdoku.nduja.games",
    image: "/img/abdoku.png",
    imageAlt: {
      en: "ABdoku puzzle board on a phone screen",
      it: "Schema ABdoku su schermo mobile",
    },
    status: "beta",
  },
  {
    id: "chromawell",
    name: "Chromawell",
    tags: ["Game", "Puzzle", "Mobile"],
    description: {
      en: "Survive as long as you can — keep any single color stack from reaching the top, and don't run out of moves.",
      it: "Sopravvivi il più a lungo possibile — evita che una singola pila raggiunga la cima, e non restare senza mosse.",
    },
    href: process.env.CHROMAWELL_URL || "https://chromawell.nduja.games",
    image: "/img/chromawell.png",
    imageAlt: {
      en: "Chromawell game board on a phone screen",
      it: "Tabellone Chromawell su schermo mobile",
    },
    status: "beta",
  },
];
