## Pipeline de Integração Contínua (CI)

Workflow automatizado configurado via GitHub Actions (`.github/workflows/ci.yml`), disparado em Pull Requests para a branch `main` e contemplando:

- Análise estática de código (ESLint)
- Análise de formatação (Prettier)
- Análise estática de segurança (`npm audit`)
- Build da aplicação (Prisma + TypeScript)
- Testes unitários e de integração (Vitest + PostgreSQL)
- Criação de imagem Docker
