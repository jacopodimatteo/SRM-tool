# Pages and Features

## Layout shell (`src/app/components/Layout.tsx`)

Shared frame used by all pages:

- Left sidebar navigation
- Top search bar
- Notifications dropdown (mock items)
- User profile dropdown
- Collapsible sidebar state
- `<Outlet />` for route content

## Supplier Overview (`src/app/pages/SupplierOverview.tsx`)

Primary landing screen.

Features:

- Summary cards (total suppliers + risk buckets)
- Filter bar:
  - risk status
  - revenue exposure range
  - dependency level
- Apply/reset filter behavior
- Paginated table (`PAGE_SIZE = 6`)
- Row click navigation to supplier detail
- Explicit "View Details" action button per row

Computed behavior:

- Filtering is applied from local `appliedFilters` state
- Risk/trend visuals are derived from supplier fields

## Supplier Detail (`src/app/pages/SupplierDetail.tsx`)

Detail dashboard for a single supplier.

Sections:

1. Breadcrumb + global actions
2. Supplier header + overall score panel
3. Risk dimension cards:
   - Structural
   - Financial
   - Compliance
   - ESG
4. Alerts and expirations panels
5. Mini portfolio scatter chart

Drill-down modals:

- Financial details modal
- Compliance details modal
- ESG details modal

Interactive behavior:

- Alerts can be resolved locally (per-session state)
- Modal visibility controlled by local `modal` state

## Portfolio View (`src/app/pages/PortfolioView.tsx`)

Cross-supplier portfolio analysis.

Features:

- Summary cards (risk distributions and total exposure)
- Toggle filters:
  - high risk only
  - critical revenue only
  - dependency affects dot size
- Scatter chart (Revenue vs Risk)
- Clickable dots routing to supplier detail
- Summary table sorted by descending risk score

## Settings (`src/app/pages/Settings.tsx`)

Config prototype UI with tabs:

- Risk Dimension Weights
- Alert Thresholds
- User Roles

Behavior:

- Sliders update local state only
- Save/reset are UI-level, no persistence
- Tab content changes with `activeTab`

## Route definitions (`src/app/routes.ts`)

Routes currently available:

- `/` -> `SupplierOverview`
- `/supplier/:id` -> `SupplierDetail`
- `/portfolio` -> `PortfolioView`
- `/settings` -> `Settings`
