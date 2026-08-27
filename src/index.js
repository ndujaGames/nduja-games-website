import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import helmet from "helmet";
import { closeDatabase, initDatabase } from "./db.js";
import { config, brandName } from "./config.js";
import pageRoutes from "./routes/pages.js";
import apiV1 from "./routes/api/v1.js";
import { langFromRequest, pathWithLang } from "./lang.js";

const srcDir = path.dirname(fileURLToPath(import.meta.url));
const viewsDir = path.join(srcDir, "views");
const publicDir = path.join(srcDir, "../public");

const app = express();
app.disable("x-powered-by");
if (config.trustProxy) {
  app.set("trust proxy", 1);
}

const helmetOptions = { crossOriginResourcePolicy: { policy: "cross-origin" } };
if (!config.isProduction) {
  helmetOptions.contentSecurityPolicy = {
    useDefaults: true,
    directives: { "upgrade-insecure-requests": null },
  };
  helmetOptions.strictTransportSecurity = false;
}
app.use(helmet(helmetOptions));

app.set("view engine", "ejs");
app.set("views", viewsDir);

app.use(express.static(publicDir, { maxAge: config.isProduction ? "1d" : 0 }));

app.use((req, res, next) => {
  res.locals.siteUrl = config.siteUrl;
  res.locals.siteName = config.siteName;
  res.locals.siteMark = config.siteMark;
  res.locals.brandName = brandName();
  res.locals.isBeta = config.isBeta;
  res.locals.year = new Date().getFullYear();
  next();
});

app.use("/api/v1", apiV1);
app.use(pageRoutes);

app.use((req, res) => {
  const lang = langFromRequest(req);
  res.status(404).render("404", {
    lang,
    langPath: (targetLang) => pathWithLang(req.path, targetLang),
    title: "Not found",
    siteUrl: config.siteUrl,
    siteName: config.siteName,
    siteMark: config.siteMark,
    brandName: brandName(),
    isBeta: config.isBeta,
    year: new Date().getFullYear(),
    path: req.path,
  });
});

async function main() {
  const db = await initDatabase();
  app.listen(config.port, () => {
    console.log(`${config.siteName} on http://localhost:${config.port}`);
    console.log(`Site URL: ${config.siteUrl}${config.isBeta ? " (beta)" : ""}`);
    console.log(`PostgreSQL: ${db.mode}`);
  });
}

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, async () => {
    await closeDatabase();
    process.exit(0);
  });
}

main().catch((err) => {
  console.error("Startup failed:", err.message);
  process.exit(1);
});
