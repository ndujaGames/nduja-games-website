(() => {
  const POLL_MS = 10 * 60 * 1000;
  const localVersion = document.documentElement.dataset.appVersion || "";
  const localReload = Number(document.documentElement.dataset.appReload || "0");
  const lang = document.documentElement.lang === "it" ? "it" : "en";
  const availableCopy =
    lang === "it"
      ? (version) => `È disponibile la versione ${version}. Tocca per aggiornare.`
      : (version) => `Version ${version} is available. Click to refresh.`;

  function parseVersion(version) {
    const trimmed = String(version).trim().replace(/^v/i, "");
    const dash = trimmed.indexOf("-");
    const core = dash === -1 ? trimmed : trimmed.slice(0, dash);
    const pre = dash === -1 ? "" : trimmed.slice(dash + 1);
    const parts = core.split(".").map((p) => {
      const n = Number.parseInt(p, 10);
      return Number.isFinite(n) ? n : 0;
    });
    while (parts.length < 3) parts.push(0);
    return { parts: parts.slice(0, 3), pre };
  }

  function comparePre(a, b) {
    const left = a.split(".");
    const right = b.split(".");
    const n = Math.max(left.length, right.length);
    for (let i = 0; i < n; i++) {
      const x = left[i] ?? "";
      const y = right[i] ?? "";
      const nx = Number.parseInt(x, 10);
      const ny = Number.parseInt(y, 10);
      const xNum = x !== "" && Number.isFinite(nx) && String(nx) === x;
      const yNum = y !== "" && Number.isFinite(ny) && String(ny) === y;
      if (xNum && yNum && nx !== ny) return nx - ny;
      if (xNum && !yNum) return -1;
      if (!xNum && yNum) return 1;
      if (x !== y) return x < y ? -1 : 1;
    }
    return 0;
  }

  function compareVersions(a, b) {
    const left = parseVersion(a);
    const right = parseVersion(b);
    for (let i = 0; i < 3; i++) {
      const lp = left.parts[i] ?? 0;
      const rp = right.parts[i] ?? 0;
      if (lp !== rp) return lp - rp;
    }
    if (!left.pre && !right.pre) return 0;
    if (!left.pre) return 1;
    if (!right.pre) return -1;
    return comparePre(left.pre, right.pre);
  }

  async function fetchRemote() {
    try {
      const res = await fetch(`/version.json?t=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) return null;
      const data = await res.json();
      if (typeof data.version !== "string" || typeof data.reload !== "number") return null;
      if (!Number.isFinite(data.reload)) return null;
      return data;
    } catch {
      return null;
    }
  }

  const prompt = document.getElementById("app-update");
  const reloadBtn = document.getElementById("app-update-reload");
  const availableBtn = document.getElementById("site-version-update");

  reloadBtn?.addEventListener("click", () => location.reload());
  availableBtn?.addEventListener("click", () => location.reload());

  let reloadShown = false;
  let lastAvailable = null;

  const check = async () => {
    const remote = await fetchRemote();
    if (!remote) return;
    if (remote.reload > localReload) {
      if (!reloadShown) {
        reloadShown = true;
        location.reload();
      }
      return;
    }
    if (compareVersions(remote.version, localVersion) > 0 && lastAvailable !== remote.version) {
      lastAvailable = remote.version;
      if (availableBtn) {
        availableBtn.hidden = false;
        availableBtn.textContent = availableCopy(remote.version);
      }
    }
  };

  void check();
  window.setInterval(() => {
    void check();
  }, POLL_MS);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") void check();
  });
})();
