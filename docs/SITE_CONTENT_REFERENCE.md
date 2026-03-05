# Supplier Risk Manager - Content Reference

## 1. Purpose of This Document

This document is a content-focused reference for the **Supplier Risk Manager** web app.
It explains what information the site contains, what each section communicates, and how users can interpret the content for decision-making.

This guide is intentionally focused on **business content and meaning**, not technical implementation.

## 2. Product Context and Intended Outcome

The site supports procurement and supplier-risk teams in continuously monitoring vendor health across four dimensions:

- Structural risk
- Financial risk
- Compliance risk
- ESG risk

The core outcome is to help users:

- Identify high-risk suppliers early
- Understand why risk is high
- Prioritize action based on business exposure and urgency
- Track required compliance documentation status

## 3. Primary User Groups

The content is useful for:

- Procurement Managers: supplier prioritization and portfolio exposure control
- Risk Managers: risk scoring, trend analysis, alert triage, escalation
- Compliance Teams: document completeness, expiries, missing documents
- ESG Leads: monitoring ESG issues and reassessment needs
- Leadership/Stakeholders: portfolio overview and high-level risk posture

## 4. Main Navigation and Information Architecture

The site content is organized into these primary sections:

- Dashboard / Suppliers (landing view): full supplier list and summary metrics
- Supplier detail: one-supplier deep dive with risk dimensions, alerts, and drill-downs
- Portfolio view: cross-supplier risk map (risk score vs revenue exposure)
- Settings: business-rule configuration content (weights, thresholds, user roles)

## 5. Core Content Model

The content shown to users is centered around supplier records with these key content groups.

### 5.1 Identity and relationship context

- Supplier name
- Industry
- Contract start date
- Last review date

### 5.2 Risk profile summary

- Overall risk score (0-100)
- Risk status category (Low/Medium/High)
- Trend direction (Increasing/Improving/Stable)

### 5.3 Business impact context

- Revenue exposure
- Dependency level (Low/Medium/High)
- ABC class (A/B/C)

### 5.4 Risk dimensions

- Structural risk score
- Financial risk score
- Compliance risk score
- ESG risk score

### 5.5 Alerts and actions

- Active risk alerts (with type, severity, date, description)
- Resolve and Escalate actions
- Upcoming expirations with urgency markers

### 5.6 Compliance document governance

Each supplier is evaluated against the same required document list:

- Business Registration
- Entry In The Register Of Skilled Trades
- Commercial Register Extract
- Social Security Clearence Certificates
- Certificates Of Compliance From The Employers' Liability Insurance Association
- Certificate In Tax Matters
- Business Liability Insurance
- Business Partner Code Of Conduct
- Payment Terms

If a required document is absent, the content explicitly shows:

- Status: `Missing`
- Expiry: `—`
- Last Uploaded: `—`

## 6. Risk Status Semantics

Risk status is communicated in traffic-light style:

- Low Risk (Green)
- Medium Risk (Yellow)
- High Risk (Red)

Interpreting score ranges used in the detail content:

- 0-34: Low risk
- 35-59: Medium risk
- 60-100: High risk

## 7. Landing Page Content: Supplier Risk Overview

## 7.1 Header content

- Title: `Supplier Risk Overview`
- Subtitle: portfolio-wide monitoring purpose statement
- Actions: `Export Report`, `Add Supplier`

## 7.2 Summary cards

This area gives immediate portfolio posture:

- Total suppliers
- High Risk count
- Medium Risk count
- Low Risk count

## 7.3 Filtering content

Users can narrow view by:

- Risk status
- Revenue exposure bucket (`<100k`, `100k-1M`, `>1M`)
- Dependency level

## 7.4 Supplier table content

Main content fields per supplier:

- Name and industry
- Overall risk score
- Risk status badge
- Revenue exposure
- Dependency level
- Financial, Compliance, ESG component scores
- Trend indicator
- View Details action

## 7.5 Pagination content

Shows current item range and total supplier count; supports page navigation.

## 8. Supplier Detail Page Content

Each supplier detail page contains three major content modules plus four drill-down detail views.

## 8.1 Header and context content

- Breadcrumb: Dashboard > Suppliers > Supplier Name
- Supplier identity card: name, industry, contract start, last review
- Business context: revenue exposure, dependency badge, ABC class badge
- Overall risk card: score, status, trend interpretation, last update indicator

## 8.2 Module 1: Risk Dimension Breakdown

### Structural Risk card

- Structural score and status
- ABC/dependency context line
- Detail view with monthly revenue distribution summary (last 12 months)

### Financial Risk card

- Financial score and status
- Schufa rating and insolvency flag summary
- Detail modal with:
  - 12-month Schufa line chart
  - Current rating
  - Credit trend velocity
  - Insolvency flag status
  - Financial document list

### Compliance Risk card

- Compliance score and status
- Document completion percentage
- Expiring document count
- Detail modal with full document status table for required documents

### ESG Risk card

- ESG score and status
- IntegrityNext traffic-light style signal
- Open issue count
- Detail modal with:
  - ESG state explanation
  - Open findings list
  - Last assessment date

## 8.3 Module 2: Alerts and Early Warnings

### Active Risk Alerts content

Each alert communicates:

- Alert type (financial/compliance/esg/structural)
- Description
- Severity (Low/Medium/High)
- Date detected
- Operator actions: Resolve / Escalate

### Upcoming Expirations content

Shows documents with status `Expiring` or `Missing` and:

- Document name
- Expiry date
- Remaining days when available
- Missing indicator when absent
- Action: Request Update

## 8.4 Module 3: Risk Portfolio Position

Mini chart contextualizes one supplier against all others:

- X-axis: revenue exposure
- Y-axis: risk score
- Current supplier highlighted with larger, emphasized marker

## 9. Drill-Down Detail Content

## 9.1 Structural Risk Details

Content title pattern:

- `Structural Risk Details <Supplier Name>`

Content includes:

- 12-month revenue distribution histogram
- 12-month average revenue
- Highest month revenue
- Lowest month revenue
- Context note linking revenue pattern to structural context

## 9.2 Financial Risk Details

- Schufa score trend over last 12 months
- Current Schufa rating
- Credit trend velocity
- Insolvency status
- Financial supporting documents list
- Download credit report action

## 9.3 Compliance Details

- Completion and expiring summary cards
- Document status table with columns:
  - Document
  - Status
  - Expiry
  - Uploaded
  - Actions

## 9.4 ESG Details

- IntegrityNext-style traffic light status explanation
- Open ESG findings list
- Last assessment date
- Request reassessment action

## 10. Portfolio View Content

Title and intent:

- `Supplier Risk Portfolio`
- compares risk score against revenue exposure across suppliers

Key content blocks:

- Portfolio summary cards (total suppliers, high/medium risk, total exposure)
- Filter toggles:
  - high risk only
  - critical revenue only
  - dependency-driven point size
- Interactive scatter map with supplier tooltip content
- Supplier risk summary table sorted by risk score

This page supports prioritization decisions by combining **risk** and **business impact**.

## 11. Settings Content (Business Rule Communication)

Although represented as configurable controls, this page communicates three important policy layers:

## 11.1 Risk Dimension Weights

Default distribution shown in content:

- Financial: 35%
- Compliance: 25%
- ESG: 20%
- Structural: 20%

It also communicates total weight integrity (target 100%).

## 11.2 Alert Thresholds

Default threshold content:

- High risk threshold: 60
- Medium risk threshold: 35
- Alert on score change: 5
- Expiry warning days: 30

## 11.3 User Roles

Displayed roles include:

- Admin
- Risk Manager
- Viewer

This section communicates governance ownership and access responsibility.

## 12. Current Supplier Portfolio Content Snapshot

Supplier count currently represented: **8**.

## 12.1 Supplier roster

- TechCorp Industries
- Meridian Logistics
- GreenPath Materials
- Nexus Software AG
- Baltic Steel Works
- Alpine Packaging GmbH
- Vantage Chemicals Ltd
- Nordic Precision Tools

## 12.2 Current risk posture by supplier

- TechCorp Industries: High risk, high exposure, high dependency, strong alert load
- Meridian Logistics: Medium risk, moderate exposure, stable trend
- GreenPath Materials: Low risk, low exposure, improving profile
- Nexus Software AG: Medium risk, high dependency, notable compliance pressure
- Baltic Steel Works: High risk, very high exposure, elevated ESG and compliance pressure
- Alpine Packaging GmbH: Low risk, low exposure, clean compliance posture
- Vantage Chemicals Ltd: Medium risk, moderate exposure, compliance and ESG pressure
- Nordic Precision Tools: Low risk, low exposure, strong documentation posture

## 13. Alert Content Taxonomy

The alert feed content is grouped into:

- Financial alerts: credit deterioration, payment behavior, revenue decline
- Compliance alerts: overdue/expiring/missing required documentation
- ESG alerts: emissions, labor rights, reporting/audit issues
- Structural alerts: dependency concentration, geopolitical exposure, key-person risk

Severity levels communicate urgency:

- Low: monitor and schedule follow-up
- Medium: plan corrective action soon
- High: immediate management attention and potential escalation

## 14. Compliance Content Interpretation Guide

When reviewing compliance content, recommended interpretation:

- `Valid`: document exists and is currently acceptable
- `Expiring`: renewal window is active; action should be scheduled
- `Missing`: mandatory content gap requiring immediate supplier follow-up

High-value operational checks:

- Suppliers with many missing documents
- Suppliers with multiple expiries in <= 30 days
- High-risk suppliers with compliance gaps
- High-exposure suppliers lacking core legal/tax/insurance evidence

## 15. Decision-Making Use Cases Supported by the Content

The current content supports practical questions such as:

- Which suppliers combine high risk and high revenue exposure?
- Which suppliers should be escalated now based on alert severity?
- Which suppliers have compliance documentation gaps requiring action?
- Is portfolio risk concentrated by dependency level?
- Are risk trends worsening or improving over recent review windows?

## 16. Content Quality Notes and Known Content Constraints

This is a structured mockup dataset and should be interpreted accordingly.

- Supplier records are representative scenarios
- Alert/action controls currently represent workflow intent
- Some terms and labels may be organization-specific and should be localized to internal policy wording

## 17. Recommended Content Review Checklist

Use this checklist during stakeholder review sessions:

- Are risk labels and score semantics understood consistently?
- Are alert descriptions actionable and specific enough?
- Are document names aligned with legal/compliance language in your organization?
- Is the balance between detail and readability appropriate for daily use?
- Does the portfolio view support prioritization in real operational workflows?

## 18. Version Note

This content reference reflects the current project state as of **2026-03-05** (Europe/Berlin timezone context).
