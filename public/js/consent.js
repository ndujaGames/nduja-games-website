const GA_ID = "G-8EBCHLNHFM";
const STORAGE = "nduja-analytics-consent";
const COOKIE = "nduja_analytics_consent";

function hostname() {
  return location.hostname;
}

function isNdujaHost() {
  const host = hostname();
  return host === "nduja.games" || host.endsWith(".nduja.games");
}

function isLocalHost() {
  const host = hostname();
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "[::1]" ||
    host.endsWith(".local") ||
    host.endsWith(".localhost")
  );
}

function needsConsent() {
  if (isLocalHost()) return true;
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.startsWith("Europe/")) return true;
    if (/^Atlantic\/(Reykjavik|Azores|Canary|Madeira|Faroe|Jan_Mayen)$/.test(tz)) return true;
  } catch {
    // ignore
  }
  return false;
}

function readConsent() {
  if (isNdujaHost()) {
    const match = document.cookie.match(/(?:^|; )nduja_analytics_consent=([^;]*)/);
    if (match) {
      const value = decodeURIComponent(match[1] ?? "");
      if (value === "granted" || value === "denied") return value;
    }
  }
  try {
    const value = localStorage.getItem(STORAGE);
    if (value === "granted" || value === "denied") return value;
  } catch {
    // ignore
  }
  return null;
}

function writeConsent(value) {
  if (isNdujaHost()) {
    const secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${COOKIE}=${encodeURIComponent(value)}; Domain=.nduja.games; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
  }
  try {
    localStorage.setItem(STORAGE, value);
  } catch {
    // ignore
  }
}

let gaLoaded = false;

function loadGa() {
  if (gaLoaded) return;
  gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, {
    linker: {
      domains: [
        "nduja.games",
        "chromawell.nduja.games",
        "abdoku.nduja.games",
        "chessrelay.nduja.games",
        "midcoil.nduja.games",
        "hexact.nduja.games",
      ],
    },
  });
  const gtm = document.createElement("script");
  gtm.async = true;
  gtm.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(gtm);
}

function banner() {
  return document.getElementById("cookie-consent");
}

function hideBanner() {
  const root = banner();
  if (!root) return;
  if (typeof root.close === "function" && root.open) root.close();
  root.classList.remove("is-open");
}

function showBanner() {
  const root = banner();
  if (!root) return;
  root.classList.add("is-open");
  if (typeof root.showModal === "function") {
    if (!root.open) root.showModal();
    return;
  }
  root.removeAttribute("hidden");
}

function applyConsent(value) {
  const prev = readConsent();
  writeConsent(value);
  hideBanner();
  if (value === "granted") loadGa();
  else if (prev === "granted") location.reload();
}

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;
  if (target.closest("#cookie-settings")) {
    event.preventDefault();
    showBanner();
    return;
  }
  const choice = target.closest("[data-cookie]");
  if (!choice) return;
  const value = choice.getAttribute("data-cookie");
  if (value === "granted" || value === "denied") applyConsent(value);
});

function init() {
  const root = banner();
  if (root) {
    root.addEventListener("cancel", (event) => {
      if (!readConsent()) event.preventDefault();
    });
  }
  const choice = readConsent();
  if (choice === "granted" || (!choice && !needsConsent())) loadGa();
  if (!choice && needsConsent()) showBanner();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
