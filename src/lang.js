export const SUPPORTED_LANGS = ["en", "it"];

/** @param {string | undefined} acceptLanguage */
export function preferredLang(acceptLanguage) {
  if (!acceptLanguage) return "en";

  const tags = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, qPart] = part.trim().split(";q=");
      const q = qPart ? Number.parseFloat(qPart) : 1;
      return { tag: tag.toLowerCase(), q: Number.isFinite(q) ? q : 0 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of tags) {
    if (tag === "it" || tag.startsWith("it-")) return "it";
    if (tag === "en" || tag.startsWith("en-")) return "en";
  }

  return "en";
}

/** @param {string | undefined} value */
export function resolveLang(value) {
  return value === "it" ? "it" : "en";
}

/** @param {import("express").Request} req */
export function langFromRequest(req) {
  if (req.path === "/it" || req.path.startsWith("/it/")) return "it";
  if (req.path === "/en" || req.path.startsWith("/en/")) return "en";
  return preferredLang(req.get("accept-language"));
}

/** @param {string} path @param {"en"|"it"} targetLang */
export function pathWithLang(path, targetLang) {
  const lang = targetLang === "it" ? "it" : "en";
  const match = path.match(/^\/(en|it)(\/.*)?$/);
  if (match) {
    const rest = match[2] ?? "";
    return rest ? `/${lang}${rest}` : `/${lang}/`;
  }
  return `/${lang}/`;
}
