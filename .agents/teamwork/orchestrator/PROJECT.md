# Project: MedWatch West Bengal Frontend UI/UX Overhaul

## Architecture
MedWatch West Bengal is a state-wide mission-critical hospital bed and emergency resource management portal.
- **Frontend Stack**: Native HTML5, ES Modules (ESM), pure CSS Custom Properties (Google Material 3 & Apple HIG clinical design system), Inter typography. Zero build step, browser-native.
- **Data & Real-Time Sync**: Firebase Firestore v10.7.1 (`hospitals`, `edit_history`, `agent_alerts`) via real-time `onSnapshot` listeners and optimistic updates.
- **Geospatial & Mapping**: Google Maps JavaScript API (with custom SVG pins, animated emergency radar rings, rich InfoWindows, and accessible fallback card grid) + Haversine spherical distance calculation.
- **Intelligence**: Google Generative AI (Gemini REST API) for hospital triage alerts and emergency redistribution plans + background multi-agent system (`MedicineAgent`, `BedAgent`, `EpidemicAgent`).
- **Telemetry & Emergency Services**: Interactive ambulance dispatch simulator with 4-stage state machine (Accepted -> Dispatched -> En Route -> Arrived) and driver calling integration (`tel:...`).

## Feature Inventory
Every single feature, calculation, and listener from the codebase survey is cataloged and assigned to a milestone:

| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Route Security Guard | Immediate IIFE redirecting non-'user' from user-view.html and non-'admin' from dashboard.html | M1, M2 | survey |
| 2 | Top-Segmented Switcher (Citizen) | 3-tab segmented control (🏥 Find Care, 🗺️ Live Map, 🚑 Ambulance Dispatch) replacing stacked action buttons | M1 | survey, R1 |
| 3 | Hospital Card Progressive Disclosure | Core bed metrics & distance visible at a glance; expandable accordion drawer (🛏️ Live Ward Breakdown) | M1 | survey, R1 |
| 4 | District Touch Bar Filtering | 23 West Bengal districts + 'All Districts' chips with progressive disclosure of rural facilities | M1 | survey |
| 5 | Facility Tier Filtering (Citizen) | Tabs for All, Apex & District Hospitals, and Rural Facilities | M1 | survey |
| 6 | Real-time Search (Citizen) | Search by hospital name, district, block, or facility type with auto-district matching | M1 | survey |
| 7 | Haversine Geolocation Sorting | Spherical distance calculation (Earth radius 6371km), GPS geolocation, nearest facility priority | M1 | survey |
| 8 | Google Maps Interactive GIS | Map centered at WB centroid, custom SVG teardrop pins, animated emergency pulsing rings, rich InfoWindows, fallback | M1 | survey |
| 9 | Ambulance Driver Directory | 23+ pre-seeded drivers with authentic WB RTO plates, dynamic district/hospital driver generator, vehicle pills | M1 | survey |
| 10 | Ambulance Dispatch Simulation | 4-stage tracking state machine (Accepted, Dispatched, En Route with siren, Arrived) + ETA countdown | M1 | survey |
| 11 | Simulated Driver Calling | Confirmation modal and direct phone protocol dispatch (`tel:...`) | M1 | survey |
| 12 | Executive Bento-Grid Overview (Admin) | Modern KPI grid: statewide capacity utilization ring, critical bed shortage alerts, emergency districts, supply buffer chips | M2 | survey, R2 |
| 13 | Segmented Workspace Tabs (Admin) | 4 tabs (🏥 Directory, 🗺️ Live Map, 🧠 AI Intelligence, 📋 Audit Trail) replacing 4,500px vertical page stack | M2 | survey, R2 |
| 14 | Slide-Out Inspector Drawer (Admin) | Side drawer for editing hospital records (beds, meds, vacs, wards, notes) eliminating table cell overcrowding | M2 | survey, R2 |
| 15 | Hospital Directory Data Table (Admin) | High-density clean table with read mode and edit mode triggers, sorting, and search | M2 | survey |
| 16 | Inline Bed Calculations & Updates | Live `recalcFree()` on input and atomic Firestore `updateDoc` with edit history logging | M2 | survey |
| 17 | Multi-Modal Resource Editors (Admin) | Modals for Medicines, Vaccines, Wards (5 wards), Administrative Notes, Add Hospital, and Bulk Spreadsheet Update | M2 | survey |
| 18 | Emergency Declaration & Lift | State health emergency protocol with Gemini AI redistribution plan generation and lift mechanism | M2 | survey |
| 19 | Admin Audit Trail Logging | Real-time logging to Firestore `edit_history` collection and live table display | M2 | survey |
| 20 | Multi-Agent AI Notification Sidebar | `MedicineAgent`, `BedAgent`, `EpidemicAgent` background alerts, Web Audio 880Hz alert beeper, and resolution updates | M2 | survey |
| 21 | Administrative Utilities | Supply chain report print (`window.print()`), CSV data export, live IST clock | M2 | survey |
| 22 | Clinical Design System Tokens | Google M3 & Apple HIG tokens: calm blues (#0284c7, #0369a1), healing teal (#0d9488), 16px radius, 48px touch targets, Inter | M3 | survey, R3 |
| 23 | Mobile Responsive & Accessibility | Fluid layouts across mobile, tablet, and desktop without rigid 600px caps; WCAG AAA/AA contrast | M3 | survey, R3 |
| 24 | E2E Automated Verification & Audit | Multi-tier test suite (106+ DOM IDs, functions, algorithms, workflows) and forensic integrity audit | M-Final | survey, AC |

## Milestones

| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M-E2E | E2E Testing Suite Track | Design and construct comprehensive 4-Tier test suite in `scripts/verify-integrity.js` | none | IN_PROGRESS |
| M1 | Citizen Portal Fluid Architecture | Overhaul `user-view.html`: Top-Segmented Switcher, progressive disclosure cards, ward accordion, preserving all 36 DOM IDs & 21 functions | none | PLANNED |
| M2 | Admin Dashboard Executive Architecture | Overhaul `dashboard.html`: Bento-grid overview, segmented workspace tabs, slide-out inspector drawer, preserving all 70 DOM IDs & 34 functions | none | PLANNED |
| M3 | Cross-Page Design Tokens & Polish | Refine `style.css` and shared components: Google M3 / Apple HIG clinical design tokens, 16px radius, >=48px touch targets, fluid responsiveness | M1, M2 | PLANNED |
| M-Final | Final Milestone: E2E Verification & Hardening | Run 100% of E2E tests (Tiers 1-4), adversarial challenger verification (Tier 5), and Forensic Audit | M-E2E, M1, M2, M3 | PLANNED |

## Interface Contracts

### Citizen Portal (`user-view.html`) ↔ Firestore & Shared Data
- Collection: `"hospitals"`
- Subscribed fields: `id`, `name`, `district`, `block`, `type`, `category`, `lat`, `lng`, `totalBeds`, `occupiedBeds`, `emergencyDeclared`, `wards` (`male`, `female`, `maternity`)
- Exported Window Hooks: `window.openAmbulanceModal`, `window.closeAmbulanceModal`, `window.initMap`

### Admin Dashboard (`dashboard.html`) ↔ Multi-Agent System (`agents.js`)
- Shared global: `window._latestHospitals`
- Custom events dispatched:
  - `document.dispatchEvent(new CustomEvent("emergencyDeclared", { detail: { hospital } }))`
  - `document.dispatchEvent(new CustomEvent("occupancyThresholdCrossed"))`
- Subscribed Firestore collections: `hospitals`, `edit_history`, `agent_alerts`
- Exported Window Hooks: `window.markAlertResolved`, `window.createAlertCard`

## Code Layout
- `user-view.html`: Citizen portal HTML, layout structure, top-segmented switcher, cards, accordion markup, and scoped styling.
- `dashboard.html`: Admin dashboard HTML, Bento-grid overview, workspace tabs, slide-out inspector drawer, modal markup.
- `style.css`: Global design system tokens, clinical color palette, typography, elevation, shared components, responsive breakpoints.
- `scripts/verify-integrity.js`: E2E test runner and automated zero-regression verification harness.
- `.agents/teamwork/`: Orchestrator and agent metadata, reports, and coordination records.
