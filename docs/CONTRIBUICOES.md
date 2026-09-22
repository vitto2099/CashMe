# 👥 Matriz de Contribuições & Atribuições de Código — Cash Me

Este documento registra a divisão de papéis, responsabilidades e entregas técnicas realizadas pelos desenvolvedores e contribuidores do ecossistema **Cash Me**:

- 👤 **Vitor** ([@vitto2099](https://github.com/vitto2099)) — Mantenedor do repositório integrado [vitto2099/CashMe](https://github.com/vitto2099/CashMe)
- 👤 **Stela Oliveira** ([@stela-oliveira](https://github.com/stela-oliveira)) — Contribuidora inicial da API base [stela-oliveira/cash-me-api](https://github.com/stela-oliveira/cash-me-api)
- 👤 **Hugo Batista** ([@hugobatista27](https://github.com/hugobatista27)) — Arquiteto de Requisitos/Tarefas e criador do [hugobatista27/web-scrap-app](https://github.com/hugobatista27/web-scrap-app) e [hugobatista27/cash-me-api](https://github.com/hugobatista27/cash-me-api)

---

## 📊 Quadro Sinóptico de Entregas

| Área / Módulo | Hugo Batista (@hugobatista27) | Stela Oliveira (@stela-oliveira) | Vitor (@vitto2099) |
|---|---|---|---|
| **Arquitetura & ADRs** | Elaborou ADR-001 (Scraping Event-Driven) e ADR-002 (Multi-Tenant) | — | Implementou a orquestração e integração no monorepo |
| **Backlog & Requisitos** | Criou as 9 Tasks e Critérios de Aceite originais (#1 a #9) | — | Criou planejamento do Consumidor (14 épicos) e alinhamento das RNs |
| **Backend Base (API)** | Repositório original `cash-me-api` | Estrutura base de Auth (Signup, Login, Logout, Tokens OAT) | Consolidação, Swagger UI, SQLite e proxy reverso |
| **Perfis de Usuário** | Especificação teórica | Model `User` e autenticação básica | Migrations e Controllers de `UserCustomer` e `UserEstablishment` |
| **Motor Fiscal NFC-e** | Algoritmo inicial no `web-scrap-app` (`nfce-parser.ts`) | — | Port para API backend (`NfceService`/`NfceController`) e testes |
| **Frontend Web** | — | — | Criação de 21 telas, Tailwind v4, Design System, Contexts e Services |
| **Mobile (Expo / RN)** | Protótipo independente `web-scrap-app` | — | Port para Expo SDK 57, TypeScript estrito, câmera e conexão com a API |
| **Testes Automatizados** | — | 6 testes funcionais iniciais de autenticação | Expansão para 18 testes automatizados no Japa (100% aprovados) |
| **Documentação Técnica** | Issues e ADRs | Documentação da API de autenticação | READMEs unificados, Swagger OpenAPI, relatórios e guias |

---

## 🛠️ Detalhamento por Contribuidor

---

### 1. Hugo Batista ([@hugobatista27](https://github.com/hugobatista27))

Hugo atuou fortemente na **concepção arquitetural, especificação dos requisitos e prova de conceito do scraping fiscal**:

1. **Repositório Base da API (`hugobatista27/cash-me-api`):**
   * Inicializou o repositório base da API em AdonisJS v7.
   * Estruturou as **9 issues e critérios de aceite técnicos** em `docs/tasks/`:
     * Issue #1: Cadastro e Aprovação de Lojistas (Onboarding).
     * Issue #2: Cadastro Global de Consumidor.
     * Issue #3: Submissão de QR Code e Validação de Entrada.
     * Issue #4: Worker Assíncrono de Scraping na SEFAZ.
     * Issue #5: Motor de Cômputo de Pontos e Isolamento Multi-Tenant.
     * Issue #6: Configuração Customizável de Regras de Conversão.
     * Issue #7: Proteção de Inadimplência e Manutenção do Saldo.
     * Issue #8: Dashboard Lojista com Filtro de Privacidade.
     * Issue #9: Notificações Push de Conclusão FCM.
2. **Decisões de Arquitetura (ADRs):**
   * Redigiu o **ADR-001** (Processamento Assíncrono de Notas Fiscais via Event-Driven Design).
   * Redigiu o **ADR-002** (Isolamento Multi-Tenant Lógico).
3. **Prova de Conceito de Scraping (`hugobatista27/web-scrap-app`):**
   * Desenvolveu aplicativo mobile Expo focado em leitura de QR Code e WebView para contornar/resolver Captcha nos portais da SEFAZ.
   * Criou o algoritmo inicial de extração de dados fiscais (`utils/nfce-parser.ts`), validando URLs de Santa Catarina (`sat.sef.sc.gov.br`) e Paraná (`fazenda.pr.gov.br`), e extraindo chave de acesso de 44 dígitos, itens e totais.

---

### 2. Stela Oliveira ([@stela-oliveira](https://github.com/stela-oliveira))

Stela foi responsável pelo **desenvolvimento do núcleo de autenticação e contas da API** no repositório [stela-oliveira/cash-me-api](https://github.com/stela-oliveira/cash-me-api):

1. **Módulo de Autenticação Segura com AdonisJS v7:**
   * Configuração de `@adonisjs/auth` com estratégia OAT (Access Tokens / Bearer Token).
   * Implementação do model `User` e tabela `users` com hash seguro de senhas (Argon2 / Scrypt).
   * Implementação da tabela e ciclo de vida de `access_tokens`.
2. **Endpoints REST de Acesso:**
   * `POST /api/v1/auth/signup` (`NewAccountController`): Cadastro de novos usuários com validação VineJS.
   * `POST /api/v1/auth/login` (`AccessTokensController`): Autenticação de credenciais e emissão de tokens.
   * `GET /api/v1/account/profile` (`ProfileController`): Retorno do perfil autenticado.
   * `POST /api/v1/account/logout`: Revogação e exclusão do token no banco.
3. **Validação & Transformer:**
   * Esquemas de validação de entrada de dados com VineJS (`app/validators/user.ts`).
   * Serializador seguro de resposta (`app/transformers/user_transformer.ts`) mascarando senhas e gerando iniciais de avatar.
4. **Testes Funcionais Iniciais:**
   * Criou a primeira suíte de 6 testes funcionais com o framework Japa (`tests/functional/auth.spec.ts`).

---

### 3. Vitor ([@vitto2099](https://github.com/vitto2099)) — Repositório Integrado [vitto2099/CashMe](https://github.com/vitto2099/CashMe)

Vitor assumiu o papel de **engenheiro full-stack e mantenedor da plataforma consolidada**, unificando todas as frentes (Backend, Frontend Web e Mobile Nativo), expandindo as regras de negócio e estabilizando a suíte de testes:

1. **Consolidação e Arquitetura Monorepo Full-Stack:**
   * Unificou a API AdonisJS v7, o Frontend React 18 e o Mobile Expo em uma raiz única e organizada.
   * Criou o script integrado de desenvolvimento `scripts/dev.mjs` (`npm run dev`) que executa Backend (`:3333`) e Frontend (`:5173`) simultaneamente com cores no terminal e proxy reverso `/api` configurado no Vite.
2. **Desenvolvimento Completo do Frontend Web (`React 18` + `Vite` + `Tailwind v4`):**
   * Criou e organizou **21 telas completas**:
     * **9 telas do Consumidor:** Home com saldo e banners, Lojas, Detalhe da Loja, Ofertas, Detalhe da Oferta, Carteira com extrato, Leitor/Simulador de NFC-e com tabela de itens, QR Code pessoal e Perfil.
     * **11 telas do Comerciante:** Dashboard com gráficos Recharts de faturamento, Gestão de Campanhas, Nova Campanha, Regras de Pontuação (R$ para Pontos), Conversão de Pontos em Desconto, QR da Loja, Clientes fidelizados, Detalhe do Cliente, Vitrine de Ofertas, Nova Oferta e Configurações da Loja.
     * **Landing Page:** Entrada com seleção de perfil e modal de autenticação.
   * Construiu a barra de navegação superior (`WebNavbar`) e rodapé corporativo (`WebFooter`) transformando o protótipo móvel em um web app responsivo para desktop e dispositivos móveis.
   * Implementou `AuthContext` conectando o frontend à API real (cadastro, login, logout e persistência do Bearer token).
   * Estruturou a camada de serviços em `src/services/` (`api.ts`, `authService.ts`, `storesService.ts`, `offersService.ts`, `nfceService.ts`...).
3. **Expansão e Evolução do Backend AdonisJS:**
   * **Segmentação de Perfis (RN04 e RN06):**
     * Criou migrations e models para `user_customers` (Consumidor: CPF, telefone, termos de aceite, device_token) e `user_establishments` (Lojista: cargo, vínculo de estabelecimento).
     * Criou controllers e rotas completas para `/customer/signup`, `/customer/profile`, `/establishment/signup` e `/establishment/profile`.
   * **Integração Fiscal do Motor de NFC-e:**
     * Portou e integrou o motor fiscal em `app/services/nfce_service.ts` e `app/controllers/nfce_controller.ts` com rotas `POST /api/v1/nfce/validate` e `POST /api/v1/nfce/parse`.
   * **Documentação Swagger/OpenAPI:**
     * Configurou o Adonis AutoSwagger gerando especificação OpenAPI em `/swagger` e interface interativa visual em `/docs`.
   * **Garantia de Qualidade e Testes Automatizados:**
     * Expandiu a cobertura de testes funcionais no Japa de 6 para **18 testes funcionais automatizados**, cobrindo autenticação, perfis de consumidor, perfis de lojista e validação fiscal de SC/PR com 100% de sucesso.
4. **Integração do Módulo Mobile Nativo (`mobile/`):**
   * Portou e atualizou a solução do `hugobatista27/web-scrap-app` para o ecossistema moderno do Expo (SDK 57, React Native 0.86, React 19 e TypeScript estrito).
   * Implementou os componentes `QrScannerModal` (com `expo-camera`, lanterna e haptics), `NfceResultView` (resumo de itens, total e pontos da Cash Me com botão de envio para a API), WebView para contornar Captchas da SEFAZ e aba dedicada de scanner com histórico de leituras.
   * Criou o cliente de comunicação mobile em `mobile/src/services/api.ts` com suporte automático ao Android Emulator e iOS.
5. **Documentação e Backlog:**
   * Elaborou os documentos de especificação [README.md](file:///c:/Users/vck98/OneDrive/Área%20de%20Trabalho/Estagio/CASH%20ME/README.md), [README_FRONT.md](file:///c:/Users/vck98/OneDrive/Área%20de%20Trabalho/Estagio/CASH%20ME/README_FRONT.md), [README_BACK.md](file:///c:/Users/vck98/OneDrive/Área%20de%20Trabalho/Estagio/CASH%20ME/README_BACK.md) e [PLANEJAMENTO_CONSUMIDOR.md](file:///c:/Users/vck98/OneDrive/Área%20de%20Trabalho/Estagio/CASH%20ME/PLANEJAMENTO_CONSUMIDOR.md).

---

## 🔗 Referências dos Repositórios Oficiais

- 🌐 **Repositório Unificado:** [vitto2099/CashMe](https://github.com/vitto2099/CashMe)
- 🔧 **API Original:** [hugobatista27/cash-me-api](https://github.com/hugobatista27/cash-me-api)
- 🔑 **API Auth Base:** [stela-oliveira/cash-me-api](https://github.com/stela-oliveira/cash-me-api)
- 📱 **Web Scrap Mobile:** [hugobatista27/web-scrap-app](https://github.com/hugobatista27/web-scrap-app)
