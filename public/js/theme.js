const STORAGE = "nduja-theme";
const COOKIES = "nduja-cookies";

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

function saveCookies(value) {
  try {
    localStorage.setItem(COOKIES, value);
  } catch {
    // ignore
  }
  closeCookies();
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
});
