/* ═══════════════════════════════════════════════════════
   APP.JS — Inicialização e orquestração geral
   ─────────────────────────────────────────────────────
   Conecta todos os módulos: navegação por abas,
   busca, adicionar tópico, export/import e boot.
   ═══════════════════════════════════════════════════════ */

/* Estado global compartilhado entre os módulos */
const AppState = {
  data: null
};

/* ── Navegação por abas ─────────────────────────────── */
document.querySelectorAll("nav.tabs button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("nav.tabs button").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("panel-" + btn.dataset.area).classList.add("active");
  });
});

/* Clicar no card do overview navega para a área */
document.querySelectorAll(".area-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelector(`nav.tabs button[data-area="${card.dataset.area}"]`).click();
  });
});

/* ── Busca e filtros ────────────────────────────────── */
document.querySelectorAll("[data-search]").forEach(input => {
  input.addEventListener("input", () => renderList(input.dataset.search));
});
document.querySelectorAll("[data-filter]").forEach(select => {
  select.addEventListener("change", () => renderList(select.dataset.filter));
});

/* ── Adicionar novo tópico ──────────────────────────── */
document.querySelectorAll("[data-add]").forEach(btn => {
  btn.addEventListener("click", () => {
    const area = btn.dataset.add;
    const title = prompt("Título do novo tópico:");
    if (!title) return;
    const tagsRaw = prompt("Tags (separadas por vírgula, opcional):", "");
    const tags    = tagsRaw ? tagsRaw.split(",").map(t => t.trim()).filter(Boolean) : [];
    const id      = area + "-" + Date.now();

    AppState.data[area].unshift({ id, title, status: "todo", tags, content: "" });
    saveData();
    renderList(area);

    // Abre o card recém-criado automaticamente
    const card = document.querySelector(`#list-${area} .topic-card[data-id="${id}"]`);
    if (card) card.classList.add("open");
  });
});

/* ── Exportar dados (JSON) ──────────────────────────── */
document.getElementById("export-btn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(AppState.data, null, 2)], { type: "application/json" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = "dashboard-sap-backup-" + new Date().toISOString().slice(0, 10) + ".json";
  a.click();
  URL.revokeObjectURL(url);
});

/* ── Importar dados (JSON) ──────────────────────────── */
document.getElementById("import-btn").addEventListener("click", () => {
  document.getElementById("import-file").click();
});

document.getElementById("import-file").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const imported = JSON.parse(ev.target.result);
      if (!imported.fico || !imported.trm || !imported.integration || !imported.activate) {
        alert("Arquivo inválido: estrutura de dados não reconhecida.");
        return;
      }
      if (confirm("Importar este arquivo irá substituir todos os dados atuais. Continuar?")) {
        AppState.data = imported;
        saveData();
        renderAllLists();
      }
    } catch (err) {
      alert("Erro ao ler o arquivo: " + err.message);
    }
  };
  reader.readAsText(file);
});

/* ── Inicialização ──────────────────────────────────── */
loadFromSheets();
