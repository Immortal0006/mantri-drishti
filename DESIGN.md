---
name: Mantri Drishti
description: AI-Powered MPLADS Risk Intelligence Platform
colors:
  bg-primary: "#070B14"
  bg-secondary: "#0D1527"
  bg-surface: "#121E36"
  bg-surface-elevated: "#182847"
  bg-surface-hover: "#1E335A"
  text-primary: "#F8FAFC"
  text-secondary: "#94A3B8"
  text-muted: "#64748B"
  risk-critical: "#F43F5E"
  risk-high: "#FB923C"
  risk-medium: "#FBBF24"
  risk-low: "#34D399"
  accent-cyan: "#38BDF8"
  accent-indigo: "#818CF8"
  accent-saffron: "#F59E0B"
typography:
  display:
    fontFamily: "Inter, sans-serif"
    fontWeight: 800
  body:
    fontFamily: "Inter, sans-serif"
    fontWeight: 400
  mono:
    fontFamily: "JetBrains Mono, SF Mono, monospace"
    fontWeight: 500
rounded:
  sm: "6px"
  md: "10px"
  lg: "14px"
  xl: "18px"
---

# Design System: Mantri Drishti

## Overview

Mantri Drishti is a high-density, authoritative civic intelligence command center designed for vigilance and oversight officials monitoring India's Member of Parliament Local Area Development Scheme (MPLADS). The visual identity reflects rigor, precision, and institutional credibility under the core operational principle: *"AI Flags. AI Explains. Humans Verify."*

## Colors

The palette uses a deep civic navy-slate foundation paired with calibrated semantic risk spectrums:

- **Foundation Grounds:**
  - `bg-primary` (`#070B14`): Main application backdrop with subtle radial glow accents.
  - `bg-secondary` (`#0D1527`): Drawer and modal elevated panels.
  - `bg-surface` (`#121E36`): Cards, tables, and toolbars.
  - `bg-surface-elevated` (`#182847`): Embedded inputs and pills.
- **Calibrated Semantic Signals:**
  - `risk-critical` (`#F43F5E`): Score 80–100 (Immediate Field Verification).
  - `risk-high` (`#FB923C`): Score 60–79 (High Attention Required).
  - `risk-medium` (`#FBBF24`): Score 40–59 (Moderate Variance).
  - `risk-low` (`#34D399`): Score 0–39 (Nominal Execution).
- **Accents:**
  - `accent-cyan` (`#38BDF8`): Data telemetry, coordinates, and confidence indices.
  - `accent-indigo` (`#818CF8`): Machine learning model tags and primary interactive elements.
  - `accent-saffron` (`#F59E0B`): Emblem branding and statutory notices.

## Typography

Dual typeface system optimized for analytical clarity:
- **Primary Interface:** `Inter` (weights: 400, 500, 600, 700, 800) for UI navigation, labels, and narrative explainability.
- **Telemetry & Numbers:** `JetBrains Mono` with tabular numerals (`tabular-nums`) for currency amounts, risk ratings, dates, and GPS coordinates.

## Layout

- **Unified Master-Detail Command Center:**
  - Top Navigation Header (`68px` fixed height) with live backend health indicator.
  - Executive Telemetry Bar: 5 metric KPI cards + interactive Portfolio Risk Distribution meter.
  - Filter & Triage Toolbar: Real-time search, State dropdown, Sector dropdown, Sort selector, and active chips.
  - Ranked Project Explorer: Dense, sortable table featuring dual-progress bars and calibrated risk pills.
  - Slide-Over Investigation Drawer (`580px` width) for instant drilldowns without page navigations.
  - Deep-Dive Dossier Modal: Formal printable audit view with print media styles.

## Elevation & Depth

- Subtle luminous border system (`rgba(148, 163, 184, 0.1)` to `0.2`) separating dense analytical widgets.
- Glassmorphic top navigation bar with `backdrop-filter: blur(16px)`.
- Deep box shadows (`var(--shadow-drawer)`) for smooth slide-over panels.

## Shapes

- Rounded radii hierarchy: `6px` for badges and buttons, `10px` for cards and inputs, `14px` for major modules, `18px` for modal windows.
- No heavy artificial border lines or side tabs; focus is on clean data hierarchy.

## Components

- **TelemetryBar:** Macro executive metrics with dynamic stacked risk distribution meter.
- **FilterToolbar:** Multi-faceted filtering with instant reset capabilities.
- **ProjectTable:** High-legibility data grid with color-coded risk pills and quick inspect CTAs.
- **InvestigationDrawer:** 5-Dimensional Behavioral Fingerprint (Financial, Progress, Temporal, Geographic, Entity) + 4-engine synthesis breakdown.
- **DossierModal:** Statutory audit report with peer IQR statistics, duplicate work cross-matching, and verification signature blocks.

## Do's and Don'ts

### Do's:
- Maintain clear visual distinction between Risk Score (anomalous severity) and Confidence Index (data completeness and signal agreement).
- Always include the statutory disclaimer on all audit dossiers.
- Use tabular numerals (`.telemetry-num`) for all numerical metrics.
- Keep table rows clickable for immediate triage.

### Don'ts:
- Never label statistical anomalies as confirmed "fraud" (the stance is strictly *"AI Flags. AI Explains. Humans Verify."*).
- Avoid low-contrast text on dark backgrounds; strictly adhere to WCAG 2.1 AA.
- Do not introduce layout thrashing animations on width/height.
