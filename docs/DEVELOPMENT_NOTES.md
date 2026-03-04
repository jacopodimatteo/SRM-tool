# Development Notes

## Local development

```bash
npm install
npm run dev
```

## Production build check

```bash
npm run build
```

## Common change paths

### Add a new page

1. Create page component in `src/app/pages/`
2. Add route in `src/app/routes.ts`
3. Add navigation link in `src/app/components/Layout.tsx` if needed

### Add new supplier metric

1. Extend `Supplier` type in `src/app/data/mockData.ts`
2. Add values to every supplier object
3. Render metric in relevant pages (`SupplierOverview`, `SupplierDetail`, `PortfolioView`)

### Add detail modal section

`SupplierDetail.tsx` contains existing modal pattern:

- local modal state union type
- card button sets modal value
- shared overlay with conditional modal body blocks

Use that same pattern for consistency.

## UI consistency guidance

- Keep the card rhythm used across existing pages:
  - white background
  - `rounded-xl`
  - subtle gray border
  - light shadow
- Reuse status semantics:
  - green = low risk
  - yellow = medium risk
  - red = high risk
- Keep button hierarchy consistent (outline for secondary, filled for primary).

## Known prototype behavior

- Buttons such as export, download, upload, remind, escalate are placeholders.
- Settings do not persist after refresh.
- Alert resolve actions are temporary local state.

## Candidate refactors (optional future work)

- Move duplicated helpers (`formatEuro`, risk badge logic) into shared utilities/components
- Introduce a central format/date helper module
- Add API layer and persistence boundaries
- Remove unused generated UI primitives if bundle size optimization is needed
