import { Router } from "express";
import { config, projects, brandName } from "../config.js";
import { getGuide } from "../content/guides.js";
import { getLegalDoc, legalCatalog, legalKinds } from "../content/legal.js";
import { preferredLang, resolveLang, pathWithLang } from "../lang.js";

const router = Router();

function pageLocals(req, extra = {}) {
  const lang = resolveLang(extra.lang);
  return {
    lang,
    siteUrl: config.siteUrl,
    siteName: config.siteName,
    siteMark: config.siteMark,
    brandName: brandName(),
    isBeta: config.isBeta,
    year: new Date().getFullYear(),
    langPath: (targetLang) => pathWithLang(req.path, targetLang),
    ...extra,
    lang,
  };
}

function notFound(req, res, lang) {
  return res.status(404).render("404", pageLocals(req, { title: "Not found", path: req.path, lang }));
}

function docsProjects() {
  const byId = new Map(projects.map((p) => [p.id, p]));
  return legalCatalog().map((legal) => ({
    id: legal.id,
    name: legal.name,
    href: byId.get(legal.id)?.href ?? null,
  }));
}

function renderGuide(req, res, { projectId, lang }) {
  const doc = getGuide(projectId, lang);
  if (!doc) return notFound(req, res, lang);
  const project = projects.find((p) => p.id === projectId);
  const catalog = legalCatalog().find((p) => p.id === projectId);
  return res.render("guide", pageLocals(req, {
    doc,
    projectId,
    projectName: catalog?.name ?? project?.name ?? projectId,
    playHref: project?.href ?? null,
    title: doc.title,
    lang,
  }));
}

function renderLegal(req, res, { projectId, kind, lang }) {
  const doc = getLegalDoc(projectId, kind, lang);
  if (!doc) return notFound(req, res, lang);
  const project = legalCatalog().find((p) => p.id === projectId);
  return res.render("legal", pageLocals(req, {
    doc,
    projectId,
    projectName: project?.name ?? projectId,
    kind,
    title: doc.title,
    lang,
  }));
}

function renderDocsIndex(req, res, lang) {
  return res.render("docs", pageLocals(req, {
    title: lang === "it" ? "Documentazione" : "Documentation",
    legalProjects: docsProjects(),
    lang,
  }));
}

function renderHome(req, res, lang) {
  return res.render("home", pageLocals(req, { projects, title: config.siteName, lang }));
}

router.get("/", (req, res) => {
  res.redirect(302, `/${preferredLang(req.get("accept-language"))}/`);
});

for (const lang of ["en", "it"]) {
  const home = (req, res) => renderHome(req, res, lang);
  router.get(`/${lang}`, home);
  router.get(`/${lang}/`, home);
  router.get(`/${lang}/docs`, (req, res) => renderDocsIndex(req, res, lang));
  router.get(`/${lang}/docs/:project`, (req, res) => {
    return renderGuide(req, res, { projectId: req.params.project, lang });
  });
  router.get(`/${lang}/docs/:project/:kind`, (req, res) => {
    const { project, kind } = req.params;
    if (!legalKinds.includes(kind)) return notFound(req, res, lang);
    return renderLegal(req, res, { projectId: project, kind, lang });
  });
}

export default router;
