const GA_ID = "G-8EBCHLNHFM";
const STORAGE = "nduja-analytics-consent";
const COOKIE = "nduja_analytics_consent";

function isNdujaHost() {
  const host = location.hostname;
  return host === "nduja.games" || host.endsWith(".nduja.games");
}

function needsConsent() {
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
    if (match) return decodeURIComponent(match[1]);
  }
  try {
    return localStorage.getItem(STORAGE);
  } catch {
    return null;
  }
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
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  gtag("js", new Date());
  gtag("config", "G-8EBCHLNHFM", {
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

function hideBanner() {
  const root = document.getElementById("cookie-consent");
  if (root) root.hidden = true;
}

function showBanner() {
  const root = document.getElementById("cookie-consent");
  if (root) root.hidden = false;
}

function applyConsent(value) {
  const prev = readConsent();
  writeConsent(value);
  hideBanner();
  if (value === "granted") loadGa();
  else if (prev === "granted") location.reload();
}

function init() {
  const choice = readConsent();
  if (choice === "granted" || (!choice && !needsConsent())) loadGa();
  if (!choice && needsConsent()) showBanner();
  else hideBanner();

  document.querySelectorAll("[data-cookie]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.getAttribute("data-cookie");
      if (value === "granted" || value === "denied") applyConsent(value);
    });
  });
  document.getElementById("cookie-settings")?.addEventListener("click", (event) => {
    event.preventDefault();
    showBanner();
  });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
