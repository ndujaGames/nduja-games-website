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

/** ASCII apostrophe, matching the mark used in the games. */
export const siteMark = "'";

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
      en: "Chromawell well and fusion board",
      it: "Pozzo e tabellone Chromawell",
    },
    status: "beta",
  },
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
      en: "ABdoku puzzle grid with A and B letters",
      it: "Schema ABdoku con lettere A e B",
    },
    status: "beta",
  },
  {
    id: "chessrelay",
    name: "ChessRelay",
    tags: ["Game", "Puzzle", "Mobile"],
    description: {
      en: "Pass the baton from piece to piece. Capture with chess moves until the board is clear — or close enough.",
      it: "Passa il testimone da pezzo a pezzo. Cattura con le mosse degli scacchi fino a ripulire la scacchiera — o quasi.",
    },
    href: process.env.CHESSRELAY_URL || "https://chessrelay.nduja.games",
    image: "/img/chessrelay.png",
    imageAlt: {
      en: "ChessRelay board with chess pieces",
      it: "Scacchiera ChessRelay con i pezzi",
    },
    status: "beta",
  },
  {
    id: "midcoil",
    name: "Midcoil",
    tags: ["Game", "Puzzle", "Mobile"],
    description: {
      en: "A rope pulled taut. Find the exact middle, then snap it. Miss, and the two ends tell you how far off you were.",
      it: "Una fune tesa. Trova il mezzo esatto, poi spezzala. Se sbagli, le due estremità ti dicono quanto eri lontano.",
    },
    href: process.env.MIDCOIL_URL || "https://midcoil.nduja.games",
    image: "/img/midcoil.png",
    imageAlt: {
      en: "Midcoil rope coiled on a dotted grid",
      it: "Fune Midcoil avvolta su una griglia di punti",
    },
    status: "beta",
  },
  {
    id: "hexact",
    name: "Hexact",
    tags: ["Game", "Puzzle", "Mobile"],
    description: {
      en: "Cover the board. Exactly n steps — walk through open sides, jump same color from a star, land on a different color.",
      it: "Copri il tabellone. Esattamente n passi — cammina dai lati aperti, salta dallo stesso colore da una stella, atterra su un colore diverso.",
    },
    href: process.env.HEXACT_URL || "https://hexact.nduja.games",
    image: "/img/hexact.png",
    imageAlt: {
      en: "Hexact hexagonal board with numbered tiles",
      it: "Tabellone esagonale Hexact con tessere numerate",
    },
    status: "beta",
  },
];
