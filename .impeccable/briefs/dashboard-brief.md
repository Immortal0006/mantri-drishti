# Surface Brief: Mantri Drishti Dashboard

## 1. Job and Audience
- **Audience:** District Administration (District Magistrates/Collectors), Vigilance & Field Audit Officers, and MoSPI Central Monitors.
- **Visitor Mode:** `Operate` — Focused, analytical workspace designed for triage, rapid pattern recognition, and investigative drilldown.

## 2. Outcome and Proof
- **Primary Task:** Rapidly identify anomalous MPLADS expenditures, inspect contributing risk signals across 4 analytical engines, and issue actionable physical/financial verification steps.
- **Proof & Evidence:** Direct ingestion of active FastAPI endpoints (`/overview`, `/projects`, `/projects/{id}/fingerprint`, `/projects/{id}/risk`, `/projects/{id}/dossier`) backed by 80 synthetic projects with planted anomalies across 6 states.
- **Core Stance:** "AI Flags. AI Explains. Humans Verify." Non-accusatory, evidence-based civic intelligence.

## 3. Selected Direction
- **Topology:** Unified Master-Detail Command Center with instant slide-over Investigation Drawer and printable deep-dive Dossier modal.
- **Visual Character:** Authoritative, high-density civic tech aesthetic — deep navy slate ground, crisp telemetry borders, calibrated risk spectrum (Emerald/Amber/Orange/Crimson), and clean institutional typography.
- **Hierarchy:**
  1. *Executive Telemetry Bar:* Macro KPIs (Total Projects, Attention Required, High-Risk Signals, Delayed Works, Potential Overlaps, Risk Distribution).
  2. *Filter & Triage Toolbar:* Live search, State selector, Work Type selector, Risk Band filter, and Sorting.
  3. *Ranked Project Explorer Table:* Dense interactive table displaying Project ID, Location, Work Type, Financials, Progress vs Expected Gap, Delay Days, Risk Score & Confidence, and Dominant Flag.
  4. *Slide-Over Investigation Drawer:* 5-Dimensional Fingerprint cards, Engine contribution breakdown (Rules 35%, IF 30%, Similarity 15%, Peer 20%), Why Flagged narrative, and Recommended Verification Checklist.
  5. *Deep Dive Dossier Modal:* Complete formal audit dossier view with statutory disclaimer.

## 4. Scope and Boundaries
- **In Scope:** Full client-side dashboard consuming the local FastAPI backend with complete error handling, filter logic, and interactive drawers.
- **Out of Scope:** Direct database mutations from the frontend (V1 is read/audit intelligence).
- **Boundaries:** All views strictly enforce the statutory disclaimer: "This dossier identifies risk signals for authorised human verification. It does not establish fraud or misconduct."

## 5. States and Ranges
- **Data Ranges:** Risk 0–100, Confidence 0–100%, Expenditure 0–100+%, Delay 0–1000+ days.
- **States Handled:** Loading skeletons, zero-result filter states, backend connection failure state (with live retry button), drawer open/close animations.

## 6. Interaction and Layout
- Fluid desktop grid (1280px–1600px+) scaling gracefully to mobile.
- Drawer triggered by table row click; ESC key or backdrop click closes drawer.
- Risk pill tags with dual visual cues (badge color + text label) for WCAG 2.1 AA accessibility.

## 7. Constraints and Tech Delivery
- Framework: Vite + React 19 + TypeScript.
- Styling: Vanilla CSS / CSS Modules with design tokens.
- Iconography: `lucide-react`.
- API Proxy / Target: `http://127.0.0.1:8000`.
