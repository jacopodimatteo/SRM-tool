# Data Model

Source of truth: `src/app/data/mockData.ts`

## Type unions

- `RiskStatus`: `"green" | "yellow" | "red"`
- `Trend`: `"up" | "down" | "neutral"`
- `DependencyLevel`: `"Low" | "Medium" | "High"`
- `ABCClass`: `"A" | "B" | "C"`

## Interfaces

### Alert

- `id`: unique alert id
- `type`: financial/compliance/esg/structural
- `description`: user-facing message
- `severity`: Low/Medium/High
- `dateDetected`: string date
- `resolved`: boolean in source data (UI also tracks local resolved state)

### Document

- `name`: document label
- `status`: Valid/Expiring/Missing
- `expiryDate`: date string or placeholder
- `lastUploaded`: date string or placeholder
- `daysRemaining?`: optional number for urgency display

### Supplier

- Identity/context:
  - `id`, `name`, `industry`, `contractStart`, `lastReview`
- Aggregated risk:
  - `overallRiskScore`, `riskStatus`, `trend`
- Business exposure:
  - `revenueExposure`, `dependencyLevel`, `abcClass`
- Dimension scores:
  - `financialRiskScore`, `complianceRiskScore`, `esgRiskScore`, `structuralRiskScore`
- Financial detail:
  - `schufaRating`, `schufaHistory[]`, `insolvencyFlags`, `creditTrendVelocity`
- Compliance detail:
  - `documentCompletion`, `expiringDocuments`, `documents[]`
- ESG detail:
  - `esgStatus`, `openEsgIssues`, `lastEsgAssessment`
- Alerts:
  - `openAlerts`, `alerts[]`

## Data update guidance

When adding/changing supplier fields:

1. Update the `Supplier` interface first
2. Update all supplier entries in `suppliers[]`
3. Update affected page renderers and derived metrics
4. Rebuild to catch type or rendering issues

## Date and number formatting

Formatting helpers are currently local to pages (for example `formatEuro`).
If formatting grows, centralize helpers in a shared utility module.
