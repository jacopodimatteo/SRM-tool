Create a modern, professional web-based dashboard UI for a “Proactive Supplier Risk Management Tool” designed for enterprise procurement teams.

The interface should look clean, corporate, and data-driven (similar to SaaS analytics platforms). Use a light background with subtle grey tones, structured cards, rounded corners, and minimalistic icons. Use green, yellow, and red as risk colors.

The tool consists of two main screens:

Landing Page (Supplier Overview)

Supplier Detail Page (Risk Dashboard)

The design must be fully responsive (desktop primary focus).

SCREEN 1 – LANDING PAGE (SUPPLIER OVERVIEW)

Purpose: Allow users to select and analyze suppliers.

Layout:

Top Navigation Bar:

Logo (left): “Proactive SRM”

Search bar (center): “Search supplier by name”

Notification bell icon

User profile icon with dropdown (Settings, Logout)

Left Sidebar Navigation:

Dashboard

Suppliers

Portfolio View

Alerts

Reports

Settings

Main Content Area:

Page Title: “Supplier Risk Overview”

Below the title, include:

Filter Section (horizontal filter bar):

Dropdown: Risk Status (All / Green / Yellow / Red)

Dropdown: Revenue Exposure (All / <100k / 100k–1M / >1M)

Dropdown: Dependency Level (Low / Medium / High)

Button: “Apply Filters”

Button: “Reset”

Supplier Table:

Columns:

Supplier Name

Overall Risk Score (0–100)

Risk Status (Color Badge: Green/Yellow/Red)

Revenue Exposure (€)

Dependency Level

Financial Risk Score

Compliance Risk Score

ESG Risk Score

Trend Indicator (Arrow up/down/neutral)

Button: “View Details”

Each supplier row must be clickable.

Add pagination at bottom:

Previous / Next

Page numbers

Top-right corner:

Button: “Add Supplier”

Button: “Export Report”

SCREEN 2 – SUPPLIER DETAIL PAGE (RISK DASHBOARD)

This opens when clicking “View Details.”

Top Section:

Breadcrumb navigation:
Dashboard > Suppliers > Supplier Name

Supplier Header Card:

Left side:

Supplier Name (large)

Industry

Contract Start Date

Last Review Date

Right side:

Revenue Exposure

Dependency Level (Badge)

ABC Classification (A/B/C Badge)

Center Highlight Card:

Overall Risk Score (large number 0–100)
Risk Status (Green/Yellow/Red)
Trend Indicator (↑ ↓ →)
“Last updated: [date]”

Below this section, create three major modules:

MODULE 1 – RISK DIMENSION BREAKDOWN

Four horizontal cards:

Structural Risk (ABC Logic)

Score

Status Badge

Info button

“View Details” button

Financial Risk

Score

Current Schufa Rating

Trend arrow

“View Financial Details” button

Compliance Risk

Documentation Completion %

Expiring Documents Count

“View Compliance Details” button

ESG Risk

IntegrityNext Status (Traffic Light)

Open ESG Issues

“View ESG Details” button

Each card should have a progress bar reflecting risk intensity.

MODULE 2 – ALERTS & EARLY WARNINGS

Card titled: “Active Risk Alerts”

Display alerts as structured list with:

Alert Type Icon

Short Description

Severity Badge (Low/Medium/High)

Date Detected

Button: “Resolve”

Button: “Escalate”

Add section: “Upcoming Expirations”

Document name

Expiry date

Days remaining

Button: “Request Update”

MODULE 3 – RISK PORTFOLIO POSITION

Mini 2D scatter chart:

X-axis: Revenue Exposure
Y-axis: Risk Score

Highlight current supplier with larger colored dot.

Add button:

“Open Full Portfolio View”

DRILL-DOWN PAGES (MODAL OR SUBPAGE)

When clicking “View Financial Details”:

Display:

Line graph: Schufa Score (last 12 months)

Insolvency Flags Section

Credit Trend Velocity indicator

Uploaded Financial Documents section

Button: “Download Credit Report”

When clicking “View Compliance Details”:

Display:

Document Status Table
Columns:

Document Name

Status (Valid / Expiring / Missing)

Expiry Date

Last Uploaded

Button: “Upload New”

Button: “Send Reminder”

When clicking “View ESG Details”:

Display:

IntegrityNext Traffic Light

Open ESG Findings

Last ESG Assessment Date

Button: “Request Reassessment”

FULL PORTFOLIO VIEW PAGE

Title: “Supplier Risk Portfolio”

Large scatter plot:

X-axis: Revenue Exposure

Y-axis: Risk Score

Add filters:

Show only High Risk

Show only Critical Revenue

Toggle: Show Dependency Level

Add legend:

Green = Low Risk

Yellow = Medium Risk

Red = High Risk

Clicking a dot opens supplier detail.

ADDITIONAL FUNCTIONALITY

Top-right global buttons:

“Generate Risk Report (PDF)”

“Download Supplier Summary”

“Export Portfolio Data”

Notifications Panel:

New Alerts

Risk Score Changes

Escalation Approvals Required

Settings Page:

Adjust Weighting of Risk Dimensions

Configure Alert Thresholds

Manage User Roles

DESIGN STYLE REQUIREMENTS

Corporate SaaS dashboard style

Soft shadows

Card-based layout

Clean typography (Inter or similar)

Color coding for risk (Green/Yellow/Red)

Clear hierarchy

Minimal clutter

Data-first interface

IMPORTANT

The tool must visually communicate:

Integrated Risk Scoring

Dynamic Monitoring

Transparency of Risk Composition

Proactive Alerts

Portfolio Prioritization

It must NOT look like:

A compliance-only tool

A static matrix

An ERP system

It should feel modern, analytical, and proactive.