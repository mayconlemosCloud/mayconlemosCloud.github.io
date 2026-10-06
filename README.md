# Portfólio — Maycon Lemos

Site pessoal feito com [Astro](https://astro.build), publicado no GitHub Pages via GitHub Actions.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em http://localhost:4321.

## Estrutura

| Caminho | O que tem |
|---|---|
| `src/pages/index.astro` | Home: hero, cases, como eu trabalho, sobre, agora, contato |
| `src/pages/cases/[slug].astro` | Página de cada case |
| `src/data/cases.ts` | Conteúdo dos cases (editar aqui) |
| `src/styles/global.css` | Cores, fontes e tema claro/escuro |
| `public/fotos/` | Fotos (WebP com fundo transparente) |

## Deploy

Todo push na `main` dispara `.github/workflows/deploy.yml`, que faz o build e publica no GitHub Pages.
O repositório precisa se chamar `mayconlemosCloud.github.io` e ter **Settings → Pages → Source: GitHub Actions**.
