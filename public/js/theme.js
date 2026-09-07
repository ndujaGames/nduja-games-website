const STORAGE = "nduja-theme";

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
});
