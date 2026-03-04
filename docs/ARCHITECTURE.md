# Architecture

## High-level view

The application is a client-side SPA:

1. `src/main.tsx` mounts React into `#root`
2. `src/app/App.tsx` provides the router
3. `src/app/routes.ts` defines page routes
4. `src/app/components/Layout.tsx` wraps all pages with shell UI
5. Page components render data from `src/app/data/mockData.ts`

There is no API layer, persistent storage, or server-side rendering.

## Routing model

Routing uses `createHashRouter` (React Router), which makes static hosting reliable:

- URLs include `#` internally
- deep links do not require server rewrite rules
- works for GitHub Pages and local static preview

## State model

State is local and page-scoped (`useState`). Examples:

- table filters/pagination in `SupplierOverview`
- modal open/close + resolved alerts in `SupplierDetail`
- toggle filters in `PortfolioView`
- tabs and sliders in `Settings`

There is no global store (Redux/Zustand/Context) today.

## Data flow

`mockData.ts` exports both types and values.

- Types: `Supplier`, `Alert`, `Document`, enums/unions
- Data: `suppliers: Supplier[]`

Pages derive view data directly from `suppliers` with array operations (`map`, `filter`, `reduce`, `sort`).

## Charting

Charts are built with Recharts:

- `LineChart` for Schufa trend (financial modal)
- `ScatterChart` for supplier portfolio positioning

Chart data is generated in each page from the supplier list.

## Styling

- Tailwind utilities are used directly in JSX
- Global style entry: `src/styles/index.css`
- Theme tokens and base element styles: `src/styles/theme.css`
- Font import: `src/styles/fonts.css` (`Inter` via Google Fonts)

## Deployment pipeline

`/.github/workflows/deploy-pages.yml`:

- Trigger: push to `main` or manual dispatch
- Build job: checkout -> setup node 20 -> `npm ci` -> `npm run build`
- Deploy job: publish `dist/` using GitHub Pages actions

Vite uses `base: './'` for static compatibility.

## Current architectural limitations

- No backend integration
- No authentication/authorization enforcement (UI placeholders only)
- No persistence for user actions (refresh resets all local state)
- No runtime validation on mock data shape
