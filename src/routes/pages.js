import { Router } from "express";
import { config, projects, brandName } from "../config.js";
import { getGuide } from "../content/guides.js";
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
  return projects
    .filter((project) => getGuide(project.id, "en"))
    .map((project) => ({
      id: project.id,
      name: project.name,
      href: project.href ?? null,
    }));
}

function renderGuide(req, res, { projectId, lang }) {
  const project = projects.find((p) => p.id === projectId);
  const doc = getGuide(projectId, lang);
  if (!project || !doc) return notFound(req, res, lang);
  return res.render("guide", pageLocals(req, {
    doc,
    projectId,
    projectName: project?.name ?? projectId,
    playHref: project?.href ?? null,
    title: doc.title,
    lang,
  }));
}

function renderDocsIndex(req, res, lang) {
  return res.render("docs", pageLocals(req, {
    title: lang === "it" ? "Documentazione" : "Documentation",
    docProjects: docsProjects(),
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
}

export default router;
