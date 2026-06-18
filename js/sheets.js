/* ═══════════════════════════════════════════════════════
   SHEETS.JS — Integração com Google Sheets
   ─────────────────────────────────────────────────────
   Se quiser trocar de banco de dados no futuro,
   edite apenas este arquivo.
   ═══════════════════════════════════════════════════════ */

const SHEETS_URL = "https://script.google.com/macros/s/AKfycbzVd9LOkKGYB5gBVSJAk3QIVOrapobEkk7w4PJCkiFWTQda1iFFfvfPTk3n7zvi94LL/exec";
const STORAGE_KEY = "sap_fico_trm_dashboard_v1";

let saveTimeout = null;

/* ── Indicador de status na interface ───────────────── */
function setSyncIndicator(status, msg) {
  const el = document.getElementById("sync-status");
  if (!el) return;
  const icons  = { idle: "ti-cloud-check", saving: "ti-cloud-upload", error: "ti-cloud-x" };
  const colors = { idle: "var(--ok)",      saving: "var(--warn)",     error: "var(--notdone)" };
  el.innerHTML = `<i class="ti ${icons[status]}" style="font-size:13px;vertical-align:-2px;margin-right:4px;"></i>${msg}`;
  el.style.color = colors[status];
}

/* ── Carregar dados do Google Sheets ────────────────── */
async function loadFromSheets() {
  setSyncIndicator("saving", "Carregando dados...");
  try {
    const res    = await fetch(SHEETS_URL, { method: "GET", cache: "no-cache" });
    const text   = await res.text();
    const remote = JSON.parse(text);

    if (remote && remote.fico && remote.trm && remote.integration && remote.activate) {
      AppState.data = remote;
      setSyncIndicator("idle", "Sincronizado com Google Sheets");
    } else {
      // Planilha vazia — usar dados padrão e salvar
      AppState.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
      await pushToSheets();
    }
  } catch (e) {
    console.error("Erro ao carregar do Sheets:", e);
    // Fallback para localStorage se disponível
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) AppState.data = JSON.parse(raw);
      else      AppState.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
    } catch (_) {
      AppState.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
    setSyncIndicator("error", "Offline — dados locais");
  }

  renderAllLists();
  renderOverview();
  updateTimestamp();
}

/* ── Enviar dados para o Google Sheets ──────────────── */
async function pushToSheets() {
  setSyncIndicator("saving", "Salvando...");
  // Backup local sempre
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(AppState.data)); } catch (_) {}

  try {
    const res = await fetch(SHEETS_URL, {
      method:  "POST",
      headers: { "Content-Type": "text/plain" },
      body:    JSON.stringify(AppState.data)
    });
    const txt = await res.text();
    if (txt.trim() === "OK") {
      setSyncIndicator("idle", "Sincronizado com Google Sheets");
    } else {
      setSyncIndicator("error", "Erro ao salvar");
    }
  } catch (e) {
    console.error("Erro ao salvar no Sheets:", e);
    setSyncIndicator("error", "Offline — salvo localmente");
  }
}

/* ── Salvar com debounce (espera 800ms de inatividade) ─ */
function saveData() {
  updateTimestamp();
  renderOverview();
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => { pushToSheets(); }, 800);
}
