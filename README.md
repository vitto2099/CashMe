# 🛍️ Cash Me — Plataforma Full-Stack Integrada

> Sistema completo de fidelidade e cashback baseado em escaneamento de NFC-e (Notas Fiscais de Consumidor Eletrônica), conectando **consumidores** e **comerciantes locais**.

---

## 📚 Documentação Dedicada por Módulo

Para detalhes aprofundados sobre cada camada do projeto, consulte os guias dedicados:

- ⚛️ **[README do Frontend (React + Vite + Tailwind v4)](./README_FRONT.md)** — Detalhamento de todas as telas (9 do Consumidor e 11 do Comerciante), componentes do Design System, `AuthContext` e camada de serviços.
- 🔧 **[README do Backend (AdonisJS v7 + Lucid + SQLite)](./README_BACK.md)** — Detalhamento das rotas REST, payloads de request/response, regras de negócio (RN01 a RN08), modelo de dados e suíte de testes com Japa.
- 👥 **[Matriz de Contribuições & Atribuições (Vitor, Stela, Hugo)](./docs/CONTRIBUICOES.md)** — Detalhamento técnico de responsabilidades e histórico de commits entre os contribuidores.

---

## 🏗️ Visão Geral da Arquitetura

O projeto foi consolidado em um **repositório full-stack unificado** ([vitto2099/CashMe](https://github.com/vitto2099/CashMe)), integrando a base da API de autenticação ([stela-oliveira/cash-me-api](https://github.com/stela-oliveira/cash-me-api)), a prova de conceito de scraping e motor fiscal ([hugobatista27/web-scrap-app](https://github.com/hugobatista27/web-scrap-app)), e o frontend web e aplicativo mobile em uma única raiz:

```
TESTE CASH ME/
│
├── package.json               # Gerenciador unificado de dependências e scripts
├── tsconfig.json              # Tipagem TypeScript integrada (React JSX + Adonis Subpaths)
├── vite.config.ts             # Bundler Vite com proxy reverso (/api -> :3333)
├── index.html                 # Ponto de entrada SPA do frontend
├── ace.js / adonisrc.ts       # Configurações do framework AdonisJS v7
├── .env                       # Variáveis de ambiente pré-configuradas
│
├── README.md                  # 📄 Hub central de documentação
├── README_FRONT.md            # 📄 Documentação exclusiva do Frontend
├── README_BACK.md             # 📄 Documentação exclusiva do Backend
│
├── app/                       # 🔧 BACKEND — Controllers, Models, Validators
├── config/                    # 🔧 BACKEND — Configurações (auth, cors, db, etc.)
├── database/                  # 🔧 BACKEND — Migrations e Schemas SQLite
├── start/                     # 🔧 BACKEND — Rotas HTTP (/api/v1/auth, /api/v1/account)
├── tests/                     # 🔧 BACKEND — Testes automatizados funcionais (Japa)
│
├── src/                       # ⚛️ FRONTEND — Código-Fonte React
│   ├── app/App.tsx            # Orquestrador mobile de telas (Landing, Consumer, Merchant)
│   ├── context/               # AuthContext (conectado à API) + AppContext
│   ├── services/              # api.ts + authService.ts + storesService.ts ...
│   ├── features/              # Telas do Consumidor, Comerciante e Landing
│   └── components/            # Design System UI (BottomNav, StatusBar, QR Code, etc.)
│
├── docs/                      # 📚 Especificações Oficiais, ADRs e Tasks #1 a #9
└── scripts/dev.mjs            # Executa Backend + Frontend simultaneamente
```

---

## 🚀 Como Executar o Projeto Completo

### Pré-requisitos
- **Node.js:** v18+ (recomendado v20 ou v24)
- **npm:** v9+

---

### 1. Instalação Completa
```bash
npm install
```

---

### 2. Executar Migrations do Banco
```bash
npm run db:migrate
```

---

### 3. Iniciar Backend e Frontend Juntos
```bash
npm run dev
```

- **Frontend:** `http://localhost:5173`
- **Backend API:** `http://localhost:3333`

Logs integrados de ambos os serviços serão exibidos no terminal (`[API]` em ciano e `[FRONT]` em verde).

---

## 🛠️ Scripts Principais

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o Backend e o Frontend simultaneamente |
| `npm run dev:server` | Inicia apenas o backend AdonisJS (`node ace serve --hmr`) |
| `npm run dev:client` | Inicia apenas o frontend Vite (`vite`) |
| `npm run build` | Compila o backend e o frontend para produção |
| `npm run test` | Executa a suíte de testes funcionais do backend com Japa |
| `npm run db:migrate` | Executa migrations pendentes no SQLite |
| `npm run typecheck` | Validação de tipos TypeScript em todo o projeto |

---

## 🧪 Status dos Testes Exploratórios e de Integração

- ✅ **Backend:** 6 de 6 testes funcionais automatizados passando com 100% de sucesso (`npm test`).
- ✅ **Frontend:** Build de produção gerado com sucesso sem erros (`npx vite build`).
- ✅ **Integração End-to-End:** Proxy do Vite encaminha requisições `/api/v1/*` para o AdonisJS, com fluxo completo de cadastro, login, perfil autenticado e revogação de token no logout validado.
