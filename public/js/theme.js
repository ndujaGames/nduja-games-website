const STORAGE = "nduja-theme";
const COOKIES = "nduja-cookies";
const GA_ID = "G-8EBCHLNHFM";
const GA_DOMAINS = [
  "nduja.games",
  "chromawell.nduja.games",
  "abdoku.nduja.games",
  "chessrelay.nduja.games",
  "midcoil.nduja.games",
  "hexact.nduja.games",
];

function isLiveSite() {
  const host = location.hostname;
  if (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "[::1]" ||
    host.endsWith(".local") ||
    host.endsWith(".localhost")
  ) {
    return false;
  }
  if (/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(host)) return false;
  return host === "nduja.games" || host === "www.nduja.games";
}

function storedTheme() {
  try {
    const value = localStorage.getItem(STORAGE);
    if (value === "night" || value === "day") return value;
  } catch {
    // ignore
  }
  return "day";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = theme === "night" ? "#2a2a2e" : "#f4ae07";
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  const it = document.documentElement.lang === "it";
  const night = theme === "night";
  btn.setAttribute("aria-pressed", night ? "true" : "false");
  btn.setAttribute("aria-label", night ? (it ? "Tema giorno" : "Day theme") : (it ? "Tema notte" : "Night theme"));
}

function cookieModal() {
  return document.getElementById("cookie-modal");
}

function openCookies() {
  cookieModal()?.classList.add("is-open");
}

function closeCookies() {
  cookieModal()?.classList.remove("is-open");
}

function savedCookies() {
  try {
    const value = localStorage.getItem(COOKIES);
    if (value === "yes" || value === "no") return value;
  } catch {
    // ignore
  }
  return null;
}

let gaLoaded = false;

function loadGa() {
  if (!isLiveSite() || gaLoaded || savedCookies() !== "yes") return;
  gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { linker: { domains: GA_DOMAINS } });
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(script);
}

function saveCookies(value) {
  const prev = savedCookies();
  try {
    localStorage.setItem(COOKIES, value);
  } catch {
    // ignore
  }
  closeCookies();
  if (value === "yes") loadGa();
  else if (prev === "yes") location.reload();
}

applyTheme(storedTheme());

document.addEventListener("DOMContentLoaded", () => {
  applyTheme(storedTheme());
  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    const next = storedTheme() === "night" ? "day" : "night";
    try {
      localStorage.setItem(STORAGE, next);
    } catch {
      // ignore
    }
    applyTheme(next);
  });

  document.getElementById("cookie-open")?.addEventListener("click", openCookies);
  document.getElementById("cookie-no")?.addEventListener("click", () => saveCookies("no"));
  document.getElementById("cookie-yes")?.addEventListener("click", () => saveCookies("yes"));
  if (!savedCookies()) openCookies();
  else loadGa();
});
