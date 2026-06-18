/* ═══════════════════════════════════════════════════════
   DATA.JS — Tópicos padrão por área
   ─────────────────────────────────────────────────────
   Este é o único arquivo que você precisa editar para
   adicionar, remover ou reorganizar tópicos iniciais.

   ESTRUTURA DE CADA TÓPICO:
   {
     id:      "area-N"       — identificador único
     title:   "Título"       — nome exibido no card
     status:  "todo"         — "todo" | "andamento" | "concluido"
     tags:    ["Tag1","Tag2"] — tags para filtro e busca
     content: "## Markdown"  — conteúdo em Markdown
   }
   ═══════════════════════════════════════════════════════ */

const DEFAULT_DATA = {

  /* ─────────────────────────────────────────────────────
     ÁREA: SAP FICO
     ───────────────────────────────────────────────────── */
  fico: [
    {
      id: "fico-1",
      title: "Estrutura organizacional (FI/CO)",
      status: "todo",
      tags: ["Organização"],
      content: `## Estrutura organizacional

- Mandante (Client)
- Empresa (Company Code)
- Área de controladoria (Controlling Area)
- Centro de custo / centro de lucro
- Plano de contas (Chart of Accounts): operacional, de grupo, de país

### Pontos de atenção
- Relação 1:N entre área de controladoria e empresas
- Definir moeda da área de controladoria (moeda da empresa vs moeda de grupo)`
    },
    {
      id: "fico-2",
      title: "Plano de contas e contas razão (GL)",
      status: "todo",
      tags: ["FI", "Master Data"],
      content: `## Plano de contas

- Tipos de plano de contas: operacional, de grupo, de país
- Grupos de contas e faixas de numeração
- Campos obrigatórios/opcionais por grupo de conta
- Contas de reconciliação (para AR/AP/Ativos)

### Boas práticas
- Padronizar nomenclatura entre empresas
- Mapear plano de contas local x plano de contas de grupo (para reporting)`
    },
    {
      id: "fico-3",
      title: "Contas a pagar (AP) — processo padrão",
      status: "todo",
      tags: ["FI", "AP"],
      content: `## Fluxo padrão de AP

1. Cadastro de fornecedor (vendor master)
2. Lançamento de fatura (FB60/MIRO)
3. Bloqueios e liberação de pagamento
4. Programa de pagamento (F110)
5. Compensação e extrato bancário

### Integrações
- MM (recebimento de mercadoria/fatura)
- Bancos (formatos de pagamento, EBS)`
    },
    {
      id: "fico-4",
      title: "Contas a receber (AR) — processo padrão",
      status: "todo",
      tags: ["FI", "AR"],
      content: `## Fluxo padrão de AR

1. Cadastro de cliente (customer master)
2. Emissão de fatura (faturamento SD ou lançamento direto FI)
3. Gestão de recebíveis e dunning
4. Compensação de pagamentos recebidos
5. Provisão para devedores duvidosos

### Integrações
- SD (faturamento)
- Tesouraria (entrada de caixa, conciliação bancária)`
    },
    {
      id: "fico-5",
      title: "Ativos fixos (Asset Accounting)",
      status: "todo",
      tags: ["FI", "AA"],
      content: `## Asset Accounting (FI-AA)

- Classes de ativos e determinação de contas
- Chaves de depreciação e áreas de avaliação (livro, fiscal, gerencial, IFRS)
- Processos: aquisição, transferência, baixa, depreciação

### Pontos de atenção
- Áreas de avaliação paralelas para múltiplos GAAPs
- Integração com CO (centro de custo de origem da depreciação)`
    },
    {
      id: "fico-6",
      title: "Controladoria — Centro de custo e lucro",
      status: "todo",
      tags: ["CO"],
      content: `## CO — Estruturas

- Centros de custo, grupos de centros de custo
- Centros de lucro e segmentos
- Ordens internas
- Métodos de rateio: distribuição, repartição

### Relatórios típicos
- Análise de variação (planejado vs real)
- Custos por centro/elemento`
    },
    {
      id: "fico-7",
      title: "Fechamento contábil mensal (FI/CO)",
      status: "todo",
      tags: ["Fechamento"],
      content: `## Checklist de fechamento

1. Lançamentos de período recorrentes
2. Provisões e accruals
3. Apropriação de custos (CO)
4. Avaliação de moeda estrangeira
5. Reconciliação FI x CO
6. Geração de relatórios financeiros

### Cronograma sugerido
- D-2: pré-fechamento de subledgers
- D-1: avaliação cambial e provisões
- D0: fechamento de período e relatórios`
    },
    {
      id: "fico-8",
      title: "Glossário de termos FICO",
      status: "todo",
      tags: ["Referência"],
      content: `## Glossário rápido

- **Company Code**: unidade legal para a qual se elabora balanço
- **GL Account**: conta do livro razão
- **Cost Center**: unidade de responsabilidade de custo
- **Profit Center**: unidade de responsabilidade de resultado
- **Document Type**: classifica o tipo de lançamento contábil
- **Posting Key**: define débito/crédito e tipo de conta afetada`
    }
  ],

  /* ─────────────────────────────────────────────────────
     ÁREA: SAP TRM
     ───────────────────────────────────────────────────── */
  trm: [
    {
      id: "trm-1",
      title: "Visão geral do módulo TRM",
      status: "todo",
      tags: ["Fundamentos"],
      content: `## Componentes do TRM

- **TM (Transaction Manager)**: gestão de operações financeiras (aplicações, captações, derivativos)
- **MRM (Market Risk Management)**: análise de risco de mercado (VaR, sensibilidade)
- **CRM (Credit Risk Management)**: gestão de limites e exposição de crédito
- **CFM (Cash and Liquidity Management)**: posição de caixa e projeção de liquidez

### Observação
Em S/4HANA, parte dessas funcionalidades está em transição para o Treasury and Risk Management embarcado / Cash Management embarcado.`
    },
    {
      id: "trm-2",
      title: "Instrumentos financeiros — classes de produto",
      status: "todo",
      tags: ["Instrumentos"],
      content: `## Classes de produto comuns

- Aplicações de renda fixa (CDB, depósitos, títulos)
- Operações de captação (empréstimos, financiamentos)
- Derivativos: swaps, futuros, opções, NDF/forwards de câmbio
- Garantias e cartas de crédito

### Estrutura de cadastro
- Classe de produto > Tipo de transação > Condições financeiras
- Parceiros de negócio (contrapartes)`
    },
    {
      id: "trm-3",
      title: "Posições, valuation e mark-to-market",
      status: "todo",
      tags: ["Valuation"],
      content: `## Valuation

- Avaliação a valor justo (mark-to-market) x custo amortizado
- Curvas de juros e taxas de câmbio para precificação
- Cálculo de juros pro-rata (accruals)
- Resultado realizado x não realizado

### Pontos de integração com FI
- Lançamentos contábeis automáticos via Posting Specifications
- Contas de resultado financeiro e ajuste a valor de mercado`
    },
    {
      id: "trm-4",
      title: "Hedge accounting (IFRS 9 / CPC 48)",
      status: "todo",
      tags: ["Hedge", "IFRS"],
      content: `## Hedge accounting

- Tipos de hedge: fair value hedge, cash flow hedge, hedge de investimento líquido
- Documentação formal da relação de hedge
- Teste de efetividade (prospectivo e retrospectivo)
- Reclassificação de OCI para resultado

### Configuração no SAP
- Hedge Management / Hedge Accounting cockpit
- Relacionamento entre item objeto de hedge e instrumento de hedge`
    },
    {
      id: "trm-5",
      title: "Gestão de risco de mercado e crédito",
      status: "todo",
      tags: ["Risco"],
      content: `## Risco de mercado (MRM)

- Sensibilidade a taxa de juros e câmbio
- Value at Risk (VaR): paramétrico, histórico, simulação Monte Carlo

## Risco de crédito (CRM)

- Limites por contraparte/grupo econômico
- Verificação de limite em tempo de criação da operação
- Exposição (mark-to-market + potential future exposure)`
    },
    {
      id: "trm-6",
      title: "Gestão de caixa e liquidez (CFM)",
      status: "todo",
      tags: ["Liquidez"],
      content: `## Cash Management

- Posição de caixa em tempo real
- Previsão de liquidez (memo records, planejamento)
- Integração com bancos (conciliação, EBS)
- Cash pooling / concentração de caixa

### Relatórios
- Posição diária consolidada por moeda/banco
- Projeção de fluxo de caixa de médio prazo`
    },
    {
      id: "trm-7",
      title: "Integração contábil TRM → FI",
      status: "todo",
      tags: ["Integração", "Contabilização"],
      content: `## Posting specifications

- Mapeamento de fluxos financeiros para contas contábeis
- Update types e activity categories
- Determinação de contas via account assignment reference

### Cenários típicos
- Captura inicial da operação
- Apropriação de juros (accrual/deferral)
- Liquidação (pagamento de principal e juros)
- Avaliação de fim de período (cambial/mark-to-market)`
    },
    {
      id: "trm-8",
      title: "Glossário de termos TRM",
      status: "todo",
      tags: ["Referência"],
      content: `## Glossário rápido

- **Financial Transaction**: registro de uma operação financeira individual
- **Position Management**: gestão das posições abertas
- **Flow Type**: tipo de fluxo financeiro (principal, juros, taxa)
- **Valuation Area**: área de avaliação para fins contábeis específicos
- **Hedge Relationship**: vínculo formal entre item protegido e instrumento de hedge`
    }
  ],

  /* ─────────────────────────────────────────────────────
     ÁREA: INTEGRAÇÃO & PROCESSOS
     ───────────────────────────────────────────────────── */
  integration: [
    {
      id: "int-1",
      title: "Mapa de integração FICO ↔ TRM",
      status: "todo",
      tags: ["Mapa"],
      content: `## Pontos de contato principais

- TRM gera lançamentos contábeis automáticos em FI (via posting specifications)
- CO recebe rateios de resultado financeiro por centro de custo/lucro quando aplicável
- Fechamento de TRM deve ocorrer antes do fechamento contábil de FI
- Avaliação cambial de posições TRM impacta resultado financeiro em FI

### Sequenciamento de fechamento sugerido
1. Fechamento de posições TRM (valuation, accruals)
2. Geração de lançamentos contábeis TRM → FI
3. Conciliação FI x sublivro TRM
4. Fechamento FI/CO`
    },
    {
      id: "int-2",
      title: "Glossário comum (FICO + TRM)",
      status: "todo",
      tags: ["Referência"],
      content: `## Termos compartilhados

- **Company Code / Empresa**: usado tanto em FI quanto como referência para operações TRM
- **Account Assignment Reference**: chave que conecta operação TRM à determinação de conta FI
- **Valuation**: processo presente tanto em ativos fixos (FI-AA) quanto em posições financeiras (TRM)
- **Accrual/Deferral**: apropriação de receitas/despesas, conceito comum a CO e TRM`
    },
    {
      id: "int-3",
      title: "Fluxo ponta a ponta — exemplo de captação",
      status: "todo",
      tags: ["Processo", "E2E"],
      content: `## Exemplo: contratação de um empréstimo

1. **TRM**: cadastro da operação de captação (Financial Transaction)
2. **TRM**: liquidação inicial → lançamento contábil automático em FI (entrada de caixa, passivo)
3. **TRM**: apropriação mensal de juros (accrual) → lançamento em FI (despesa financeira, passivo)
4. **FI**: conciliação do saldo do passivo entre sublivro TRM e contas contábeis
5. **TRM**: pagamento de juros/principal → lançamento em FI (saída de caixa, baixa do passivo)
6. **CO**: se aplicável, rateio da despesa financeira para centros de custo`
    },
    {
      id: "int-4",
      title: "Governança do projeto e templates",
      status: "todo",
      tags: ["Projeto"],
      content: `## Templates úteis

- Modelo de blueprint (AS-IS / TO-BE) por processo
- Matriz RACI por workstream (FI, CO, TRM)
- Checklist de testes integrados (SIT) cobrindo cenários TRM → FI
- Plano de corte (cutover) com sequenciamento de fechamento

### Recomendação
Manter um tópico por template e versionar mudanças relevantes no campo de conteúdo.`
    },
    {
      id: "int-5",
      title: "Riscos e pontos de atenção recorrentes",
      status: "todo",
      tags: ["Riscos"],
      content: `## Riscos comuns em projetos FICO + TRM

- Diferenças de moeda funcional entre área de controladoria e operações TRM
- Posting specifications mal configuradas gerando lançamentos em contas incorretas
- Falta de sincronismo entre calendário de fechamento de TRM e FI
- Ausência de reconciliação periódica entre sublivro TRM e contas de FI`
    }
  ],

  /* ─────────────────────────────────────────────────────
     ÁREA: SAP ACTIVATE
     ───────────────────────────────────────────────────── */
  activate: [
    {
      id: "act-1",
      title: "Visão geral das fases do SAP Activate",
      status: "todo",
      tags: ["Fundamentos"],
      content: `## As 6 fases do SAP Activate

1. **Discover** — avaliação inicial, business case, definição de escopo macro
2. **Prepare** — kickoff, planejamento, governança, ambiente inicial (sandbox)
3. **Explore** — workshops de fit-to-standard, identificação de gaps, validação de processos
4. **Realize** — build, configuração, desenvolvimento de gaps, testes (unitário, integrado)
5. **Deploy** — preparação final, treinamento, cutover, go-live
6. **Run** — operação assistida (hypercare), otimização contínua

### Observação
O Activate é baseado em releases ágeis (sprints) dentro de Explore e Realize, com backlog de itens de configuração (Solution Process / Configuration Items).`
    },
    {
      id: "act-2",
      title: "Fase Discover — papel do consultor FICO/TRM",
      status: "todo",
      tags: ["Discover"],
      content: `## Discover

- Apoio na avaliação do escopo financeiro (FI, CO, TRM) frente ao Best Practices padrão
- Uso do Process Navigator / Best Practice Explorer para identificar Solution Processes aplicáveis
- Levantamento preliminar de gaps relevantes (ex: hedge accounting, particularidades fiscais locais)
- Estimativa inicial de esforço (sizing) para a frente financeira

### Entregáveis típicos
- Business case / value case
- Escopo macro (linha de produto, países, processos)`
    },
    {
      id: "act-3",
      title: "Fase Prepare — kickoff e governança",
      status: "todo",
      tags: ["Prepare"],
      content: `## Prepare

- Kickoff do projeto e apresentação da metodologia ao time
- Definição de governança: comitê de projeto, papéis, RACI
- Provisionamento do ambiente inicial (sandbox/starter system)
- Plano de projeto e cronograma (releases/sprints)
- Definição do plano de gestão de dados mestres (master data) para FI/CO/TRM

### Entregáveis típicos
- Project Charter
- Plano de projeto detalhado
- Ambiente de sandbox disponível para Explore`
    },
    {
      id: "act-4",
      title: "Fase Explore — fit-to-standard workshops",
      status: "todo",
      tags: ["Explore", "Fit-to-Standard"],
      content: `## Explore

- Workshops de fit-to-standard por Solution Process
- Demonstração dos processos padrão no sandbox e validação com o cliente
- Identificação e registro de gaps no backlog (Configuration/Development Items)
- Confirmação de escopo final (delta scope)

### Foco FICO/TRM
- Validar estrutura organizacional (Company Code, Controlling Area, Chart of Accounts)
- Validar cenários de instrumentos financeiros e posting specifications no TRM

### Entregáveis típicos
- Solution Process List confirmada
- Backlog de gaps priorizado
- Documento de design de processos (delta design)`
    },
    {
      id: "act-5",
      title: "Fase Realize — build, configuração e testes",
      status: "todo",
      tags: ["Realize", "Testes"],
      content: `## Realize

- Execução em ciclos iterativos (sprints/releases): build incremental da solução
- Configuração de Customizing (SPRO) para FI, CO e TRM conforme delta design
- Desenvolvimento de gaps (RICEFW: Reports, Interfaces, Conversions, Enhancements, Forms, Workflows)
- Testes unitários por processo, seguidos de testes integrados (SIT) e UAT
- Carga de dados mestres e saldos iniciais (data migration)

### Foco FICO/TRM
- Testes integrados cobrindo TRM → FI (posting specifications) e CO (rateios)
- Validação de cenários de fechamento ponta a ponta antes do go-live`
    },
    {
      id: "act-6",
      title: "Fase Deploy — cutover e go-live",
      status: "todo",
      tags: ["Deploy", "Cutover"],
      content: `## Deploy

- Treinamento de usuários finais (end-user training)
- Plano de cutover detalhado, com sequenciamento de atividades e responsáveis
- Migração final de dados (saldos de abertura, posições TRM em aberto, ativos fixos)
- Corte de sistema legado e ativação do novo ambiente produtivo
- Go-live e suporte imediato pós-virada

### Entregáveis típicos
- Plano de cutover executado (cutover log)
- Ambiente produtivo ativo
- Material de treinamento entregue`
    },
    {
      id: "act-7",
      title: "Fase Run — hypercare e otimização contínua",
      status: "todo",
      tags: ["Run", "Hypercare"],
      content: `## Run

- Período de hypercare: suporte intensivo pós go-live para estabilização
- Monitoramento de incidentes e ajustes finos de configuração
- Transição para suporte contínuo (AMS — Application Management Services)
- Identificação de oportunidades de melhoria contínua

### Foco FICO/TRM
- Acompanhamento dos primeiros fechamentos contábeis completos
- Ajuste de posting specifications e configurações de valuation conforme achados em produção`
    },
    {
      id: "act-8",
      title: "Papéis e ferramentas do SAP Activate",
      status: "todo",
      tags: ["Papéis", "Ferramentas"],
      content: `## Papéis típicos

- **Process Owner**: dono do processo de negócio (ex: Tesouraria, Controladoria)
- **Solution Architect**: visão técnica/funcional integrada da solução
- **Functional Consultant (FICO/TRM)**: configuração, fit-to-standard, testes
- **Project Manager**: cronograma, governança, riscos
- **Change Management Lead**: gestão da mudança organizacional

## Ferramentas de apoio

- **SAP Cloud ALM** ou **SAP Solution Manager**: gestão de projeto, backlog, testes
- **Best Practice Explorer / Process Navigator**: catálogo de Solution Processes e Scope Items`
    },
    {
      id: "act-9",
      title: "Glossário de termos SAP Activate",
      status: "todo",
      tags: ["Referência"],
      content: `## Glossário rápido

- **Solution Process / Scope Item**: pacote de processo de negócio pré-configurado e documentado
- **Fit-to-Standard**: workshop de validação do processo padrão frente à necessidade do cliente
- **Delta Design**: documentação dos ajustes necessários além do padrão (gaps)
- **RICEFW**: Reports, Interfaces, Conversions, Enhancements, Forms, Workflows
- **Cutover**: conjunto de atividades de transição do ambiente legado para o novo sistema
- **Hypercare**: período de suporte reforçado imediatamente após o go-live`
    }
  ]

};
