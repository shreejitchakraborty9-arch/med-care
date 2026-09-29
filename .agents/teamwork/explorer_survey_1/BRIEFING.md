# BRIEFING — 2026-09-29T14:17:15+05:30

## Mission
Exhaustive, deep code-level survey and architectural blueprint of Citizen Portal (user-view.html) for zero-regression UI/UX overhaul.

## 🔒 My Identity
- Archetype: explorer
- Roles: survey, code analysis, synthesis, architectural recommendation
- Working directory: c:\medcare-wb\.agents\teamwork\explorer_survey_1
- Original parent: 6f091042-57d1-47ad-b002-21f5d31c14b1
- Milestone: Explorer 1 Citizen Portal Survey

## 🔒 Key Constraints
- Read-only investigation — do NOT implement or modify source files
- Zero functional change or exclusion: every listener, DOM element ID, variable, calculation, and feature must be preserved
- Follow Handoff Protocol and deliver comprehensive handoff.md

## Current Parent
- Conversation ID: 6f091042-57d1-47ad-b002-21f5d31c14b1
- Updated: not yet

## Investigation State
- **Explored paths**:
  - `c:\medcare-wb\user-view.html` (Lines 1 to 2904)
  - `c:\medcare-wb\hospitals-data.js`
  - `c:\medcare-wb\firebase-config.js`
  - `c:\medcare-wb\gemini.js`
  - `c:\medcare-wb\agents.js`
  - `c:\medcare-wb\style.css`
  - `c:\medcare-wb\dashboard.html`
- **Key findings**:
  - `user-view.html` is 2,904 lines: Styles (19-1040), Base HTML (1041-1128), ES Module Script (1130-2785), Ambulance Modal (2786-2901).
  - 33 DOM element IDs, 21 functions, 14 module variables, 20+ event listeners catalogued.
  - Real-time Firestore sync via `onSnapshot(collection(db, "hospitals"))` with seamless fallback to `HOSPITALS_DATA`.
  - Bed calculation rules: `totalBeds`, `occupiedBeds`, `free`, `freePercentage`, color thresholds (<20% Red, 20-40% Orange, >40% Green). Ward breakdown for Male (38%), Female (38%), Maternity (remainder); critical alert when Maternity free == 0.
  - Geolocation uses Haversine formula (Earth radius 6371km), `navigator.geolocation.getCurrentPosition()`, sort by distance with free beds > 0.
  - Google Maps lazy loads using `window.ENV.MAPS_API_KEY`, center [23.6850, 88.3522], zoom 7, custom SVG pins (blinking for emergency, circle for user), rich InfoWindow with live ward breakdown. Map fallback for missing API key.
  - Filtering combines real-time search, 23-district horizontal chip bar with progressive disclosure (rural hidden when ALL is selected), and facility type sub-filter tabs (All, Apex/District, Rural).
  - Ambulance dispatch system features 23 authentic WB RTO drivers + dynamic synthesizer for unlisted districts/hospitals, BLS/ALS/Matriyaan vehicle types, simulation state machine (Request Accepted -> Dispatched -> En Route with live ETA countdown -> Arrived) and phone dialing integration (`tel:`).
  - Gemini AI: Currently NOT present in `user-view.html`; `agents.js` specifically states agents are dashboard-only. `gemini.js` endpoint is available if citizen AI chat is to be added.
  - Congestion: Stacked 3 full-width action buttons (Map toggle, Nearest, Ambulance) above the fold, fixed 600px width container on large screens, card vertical bloat due to permanently unrolled 3-column ward grids.
  - Architectural Blueprint for R1: Clean Top-Segmented Switcher (Find Care, Live Map, Ambulance Dispatch) without removing existing buttons or breaking listeners; progressive disclosure accordion for Live Ward Breakdown.
- **Unexplored areas**: None. Citizen Portal analysis is 100% complete.

## Key Decisions Made
- Fully documented all 33 element IDs and 21 functions to guarantee zero regression during implementation.
- Outlined a non-breaking DOM adaptation strategy where segmented switcher integrates existing toggle buttons and opens tabs smoothly.

## Artifact Index
- c:\medcare-wb\.agents\teamwork\explorer_survey_1\DISPATCH.md — Recorded dispatch request
- c:\medcare-wb\.agents\teamwork\explorer_survey_1\BRIEFING.md — Working memory and status
- c:\medcare-wb\.agents\teamwork\explorer_survey_1\progress.md — Progress log
- c:\medcare-wb\.agents\teamwork\explorer_survey_1\handoff.md — Final survey and recommendations report
