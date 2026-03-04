# Proactive Supplier Risk Management Tool

A Vite + React dashboard prototype for supplier risk monitoring. The app includes:

- Supplier overview with filters, pagination, and risk summary
- Supplier detail dashboard with risk dimensions, alerts, and drill-down modals
- Portfolio scatter view (risk vs revenue)
- Settings page for weights, thresholds, and user roles

The project currently uses in-memory mock data (no backend).

## Tech stack

- React 18
- React Router (hash routing)
- Vite 6
- Tailwind CSS 4
- Recharts (charts)
- Lucide React (icons)

## Quick start

```bash
npm install
npm run dev
```

Local dev URL is shown by Vite (usually `http://localhost:5173`).

## Build

```bash
npm run build
```

Output is generated in `dist/`.

## Routes

- `/` -> Supplier overview
- `/supplier/:id` -> Supplier detail
- `/portfolio` -> Portfolio risk map
- `/settings` -> Settings

Routing is hash-based (`createHashRouter`) to support static hosting and GitHub Pages.

## Repository structure

```text
.github/workflows/deploy-pages.yml   GitHub Pages CI/CD workflow
src/main.tsx                         App bootstrap
src/app/App.tsx                      RouterProvider root
src/app/routes.ts                    Route map
src/app/components/Layout.tsx        Sidebar + topbar + outlet shell
src/app/pages/                       Page-level screens
src/app/data/mockData.ts             Central mock data and domain types
src/styles/                          Tailwind/theme/font imports
docs/                                Project documentation
```

## Documentation map

- `docs/ARCHITECTURE.md` -> system architecture and runtime flow
- `docs/PAGES_AND_FEATURES.md` -> page-by-page behavior and UI actions
- `docs/DATA_MODEL.md` -> Supplier/Alert/Document model and field meanings
- `docs/DEVELOPMENT_NOTES.md` -> extension guidelines and common edits

## Deployment (GitHub Pages)

This repo includes `.github/workflows/deploy-pages.yml`.

- Push to `main`
- GitHub Action builds with `npm ci` + `npm run build`
- Workflow deploys `dist/` to GitHub Pages

In GitHub settings:

- `Settings -> Pages -> Source: GitHub Actions`

## Notes and constraints

- Main app data is static and loaded from `src/app/data/mockData.ts`.
- Actions like export/download/upload/resolve/escalate are UI-only in this prototype.
- Many files under `src/app/components/ui/` are generated shadcn-style primitives and are mostly not used by current screens.
