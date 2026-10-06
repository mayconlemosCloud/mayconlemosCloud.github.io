# Portfólio — Maycon Lemos

Site pessoal em **Next.js (App Router) + TypeScript**, exportado como HTML estático e publicado no GitHub Pages via GitHub Actions. Disponível em português, inglês e francês.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em http://localhost:3000.

## Estrutura

| Caminho | O que tem |
|---|---|
| `app/(pt)/` | Rotas em português, na raiz (`/`, `/cases/[slug]/`) |
| `app/(intl)/[lang]/` | Rotas em inglês e francês (`/en/...`, `/fr/...`) |
| `components/Home.tsx` | Home: hero, vídeo, cases, experiência, como eu trabalho, sobre, agora, contato |
| `components/CasePage.tsx` | Página de cada case |
| `components/RootHtml.tsx` | `<html>`, cabeçalho, rodapé e detecção automática de idioma |
| `components/LangSwitch.tsx` | Seletor PT/EN/FR (único componente client-side) |
| `lib/i18n.ts` | Todos os textos da interface nos três idiomas |
| `lib/cases.ts` | Conteúdo dos cases nos três idiomas |
| `lib/site.ts` | Fontes (`next/font`) e metadados (canonical, hreflang, Open Graph) |
| `app/globals.css` | Cores, tipografia e tema claro/escuro |

## Idioma automático

Na primeira visita a uma página em português, o site lê o idioma do navegador (`navigator.languages`) e redireciona para `/en` ou `/fr` quando for o caso. Idiomas sem versão própria vão para inglês. A escolha manual no seletor fica salva e sempre tem prioridade; links diretos para `/en` ou `/fr` são respeitados.

## Deploy

`next build` gera o site estático em `out/`. Todo push na `main` dispara `.github/workflows/deploy.yml`, que faz o build e publica no GitHub Pages.
O repositório precisa se chamar `mayconlemosCloud.github.io` e ter **Settings → Pages → Source: GitHub Actions**.
