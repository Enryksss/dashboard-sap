# Dashboard SAP FICO & TRM

Base de conhecimento pessoal para consultoria SAP FI/CO/TRM,
publicada via GitHub Pages com dados sincronizados no Google Sheets.

---

## Estrutura do projeto

```
dashboard-sap/
├── index.html          ← estrutura da página (HTML puro)
├── css/
│   ├── variables.css   ← cores, fontes e tamanhos globais
│   ├── layout.css      ← header, abas, painéis, overview
│   ├── components.css  ← cards de tópico, badges, botões
│   └── markdown.css    ← estilos do modo visualização
├── js/
│   ├── data.js         ← tópicos padrão por área
│   ├── sheets.js       ← integração com Google Sheets
│   ├── render.js       ← renderização dos cards na tela
│   └── app.js          ← navegação, busca, export/import
└── README.md           ← este arquivo
```

---

## O que editar e onde

| Quero fazer isso...                    | Edito este arquivo       |
|----------------------------------------|--------------------------|
| Adicionar novos tópicos iniciais       | `js/data.js`             |
| Mudar cores ou fontes                  | `css/variables.css`      |
| Alterar layout do header ou abas       | `css/layout.css`         |
| Mudar aparência dos cards              | `css/components.css`     |
| Ajustar estilos do preview Markdown    | `css/markdown.css`       |
| Trocar o banco de dados (Google Sheets)| `js/sheets.js`           |
| Mudar como os cards são desenhados     | `js/render.js`           |
| Alterar navegação ou atalhos           | `js/app.js`              |

---

## Como rodar localmente (VS Code)

1. Abra a pasta `dashboard-sap` no VS Code
2. Instale a extensão **Live Server** (Ritwick Dey)
3. Clique com botão direito em `index.html` → **Open with Live Server**
4. O dashboard abre em `http://127.0.0.1:5500`

> **Atenção:** Abra a **pasta** `dashboard-sap` no VS Code (não um arquivo individual).
> Se abrir só o `index.html`, os arquivos CSS e JS não serão encontrados.

---

## Como publicar no GitHub Pages

1. Suba todos os arquivos mantendo a estrutura de pastas
2. Ative GitHub Pages em **Settings → Pages → Deploy from branch → main**
3. Acesse: `https://SEU-USUARIO.github.io/dashboard-sap`

---

## Integração Google Sheets

A URL do Apps Script está em `js/sheets.js` na variável `SHEETS_URL`.
Se precisar trocar (nova implantação), edite apenas essa linha.

---

## Como adicionar uma nova área temática

1. Em `js/data.js`: adicione a nova chave no objeto `DEFAULT_DATA`
2. Em `index.html`: adicione o botão na `<nav>`, o card no overview e o painel `<section>`
3. Em `js/render.js`: adicione a área no array `AREAS`
4. Em `css/variables.css`: adicione as variáveis `--accent-nova` e `--accent-nova-soft`
5. Em `css/layout.css`: adicione as regras de cor para tab, card e progress-fill
