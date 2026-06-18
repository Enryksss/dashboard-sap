/* ═══════════════════════════════════════════════════════
   RENDER.JS — Desenha os cards de tópico na tela
   ─────────────────────────────────────────────────────
   Responsável por: criar cards, toggle open/close,
   preview Markdown, edição inline e exclusão.
   ═══════════════════════════════════════════════════════ */

const STATUS_LABELS = { todo: "A fazer", andamento: "Em andamento", concluido: "Concluído" };
const STATUS_CYCLE  = { todo: "andamento", andamento: "concluido", concluido: "todo" };
const AREAS         = ["fico", "trm", "integration", "activate"];

/* ── Renderiza a lista de uma área ──────────────────── */
function renderList(area) {
  const container  = document.getElementById("list-" + area);
  const searchVal  = (document.querySelector(`[data-search="${area}"]`).value || "").toLowerCase();
  const filterVal  = document.querySelector(`[data-filter="${area}"]`).value;

  let items = AppState.data[area].filter(item => {
    const matchesSearch = !searchVal ||
      item.title.toLowerCase().includes(searchVal) ||
      (item.content || "").toLowerCase().includes(searchVal) ||
      (item.tags || []).some(t => t.toLowerCase().includes(searchVal));
    const matchesFilter = filterVal === "all" || item.status === filterVal;
    return matchesSearch && matchesFilter;
  });

  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = '<div class="empty-state"><i class="ti ti-file-off" aria-hidden="true"></i>Nenhum tópico encontrado.</div>';
    return;
  }

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "topic-card";
    card.dataset.id = item.id;

    card.innerHTML = `
      <div class="topic-head">
        <i class="ti ti-chevron-right chev" aria-hidden="true"></i>
        <div class="title-wrap">
          <p class="title">${escapeHtml(item.title)}</p>
          <p class="sub">${(item.tags || []).join(" · ") || "Sem tags"}</p>
        </div>
        <span class="status-badge" data-status="${item.status}">${STATUS_LABELS[item.status]}</span>
      </div>
      <div class="topic-body">
        <div class="mode-toggle">
          <button class="btn-mode active" data-mode="edit">
            <i class="ti ti-pencil" style="font-size:11px;vertical-align:-1px;margin-right:3px;"></i>Editar
          </button>
          <button class="btn-mode" data-mode="preview">
            <i class="ti ti-eye" style="font-size:11px;vertical-align:-1px;margin-right:3px;"></i>Visualizar
          </button>
        </div>
        <textarea spellcheck="false" placeholder="Escreva o conteúdo em Markdown...">${escapeHtml(item.content || "")}</textarea>
        <div class="md-preview"></div>
        <div class="row-actions">
          <span class="save-hint">Salvo automaticamente ao editar</span>
          <button class="btn-del"><i class="ti ti-trash" style="font-size:13px;vertical-align:-2px;margin-right:4px;"></i>Excluir tópico</button>
        </div>
      </div>
    `;

    /* Toggle abrir/fechar card */
    card.querySelector(".topic-head").addEventListener("click", e => {
      if (e.target.closest(".status-badge")) return;
      card.classList.toggle("open");
    });

    /* Ciclo de status ao clicar no badge */
    card.querySelector(".status-badge").addEventListener("click", e => {
      e.stopPropagation();
      item.status = STATUS_CYCLE[item.status];
      e.target.dataset.status = item.status;
      e.target.textContent    = STATUS_LABELS[item.status];
      saveData();
      renderOverview();
    });

    /* Alternância editar / visualizar (Markdown preview) */
    const textarea = card.querySelector("textarea");
    const preview  = card.querySelector(".md-preview");

    card.querySelectorAll(".btn-mode").forEach(btn => {
      btn.addEventListener("click", e => {
        e.stopPropagation();
        card.querySelectorAll(".btn-mode").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        if (btn.dataset.mode === "preview") {
          preview.innerHTML    = marked.parse(item.content || "*Sem conteúdo ainda.*");
          preview.style.display = "block";
          textarea.style.display = "none";
        } else {
          preview.style.display  = "none";
          textarea.style.display = "block";
          textarea.focus();
        }
      });
    });

    /* Edição de conteúdo com auto-save */
    let debounce;
    textarea.addEventListener("input", () => {
      item.content = textarea.value;
      clearTimeout(debounce);
      debounce = setTimeout(() => saveData(), 600);
    });

    /* Edição do título com duplo clique */
    card.querySelector(".title").addEventListener("dblclick", e => {
      e.stopPropagation();
      const novoTitulo = prompt("Novo título:", item.title);
      if (novoTitulo && novoTitulo.trim()) {
        item.title = novoTitulo.trim();
        saveData();
        renderList(area);
      }
    });

    /* Excluir tópico */
    card.querySelector(".btn-del").addEventListener("click", () => {
      if (!confirm(`Excluir "${item.title}"?`)) return;
      AppState.data[area] = AppState.data[area].filter(i => i.id !== item.id);
      saveData();
      renderList(area);
    });

    container.appendChild(card);
  });
}

/* ── Renderiza todas as listas de uma vez ───────────── */
function renderAllLists() {
  AREAS.forEach(renderList);
}

/* ── Overview: calcula progresso e estatísticas ─────── */
function renderOverview() {
  let total = 0, done = 0, progress = 0, todo = 0;

  AREAS.forEach(area => {
    const items = AppState.data[area];
    const t     = items.length;
    const d     = items.filter(i => i.status === "concluido").length;
    const pct   = t === 0 ? 0 : Math.round((d / t) * 100);

    document.getElementById("fill-"  + area).style.width  = pct + "%";
    document.getElementById("label-" + area).textContent  = pct + "%";

    total    += t;
    done     += d;
    progress += items.filter(i => i.status === "andamento").length;
    todo     += items.filter(i => i.status === "todo").length;
  });

  document.getElementById("stat-total").textContent    = total;
  document.getElementById("stat-done").textContent     = done;
  document.getElementById("stat-progress").textContent = progress;
  document.getElementById("stat-todo").textContent     = todo;
}

/* ── Utilitário: escapa HTML para evitar injeção ────── */
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[m]));
}

/* ── Utilitário: atualiza o timestamp do header ─────── */
function updateTimestamp() {
  const now = new Date();
  document.getElementById("last-updated").textContent =
    "Última atualização: " + now.toLocaleDateString("pt-BR") + " " + now.toLocaleTimeString("pt-BR");
}
