# BRIEFING — 2026-09-29T14:35:00+05:30

## Mission
Formulate exact HTML/CSS/JS refactoring strategy for the Top-Segmented Switcher and fluid view switching in user-view.html while preserving 100% of DOM IDs, listeners, and functions.

## 🔒 My Identity
- Archetype: explorer
- Roles: explorer, investigator, synthesizer
- Working directory: c:\medcare-wb\.agents\teamwork\explorer_m1_1
- Original parent: 6f091042-57d1-47ad-b002-21f5d31c14b1
- Milestone: Milestone 1: Citizen Portal Fluid Architecture (user-view.html)

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- Scope: Read-only exploration for `c:\medcare-wb\user-view.html`
- Do NOT modify any project source code
- Ensure all 36 required DOM IDs and 21 functions remain 100% intact
- Keep all existing IDs, listeners, and functionality preserved

## Current Parent
- Conversation ID: 6f091042-57d1-47ad-b002-21f5d31c14b1
- Updated: not yet

## Investigation State
- **Explored paths**:
  - `c:\medcare-wb\.agents\teamwork\ORIGINAL_REQUEST.md` (authoritative request)
  - `c:\medcare-wb\.agents\teamwork\orchestrator\PROJECT.md` (architecture, milestones, contracts)
  - `c:\medcare-wb\TEST_READY.md` (E2E test suite specs)
  - `c:\medcare-wb\.agents\teamwork\explorer_survey_1\handoff.md` (baseline code survey)
  - `c:\medcare-wb\user-view.html` (lines 1040-1128, 1250-1360, 2600-2904)
  - `c:\medcare-wb\scripts\verify-integrity.js` (DOM IDs, function signatures, syntax VM tests)
- **Key findings**:
  - Congestion root cause: `#btn-toggle-view`, `#btn-nearest-hospital`, `#btn-book-ambulance` vertically stacked below `#citizen-search`, consuming ~250px vertical screen space.
  - `#btn-toggle-view` contains `<span>🗺️</span><span id="toggle-btn-label">Switch to Map View</span>`. Listener queries `span:first-child` and updates text.
  - `#btn-nearest-hospital` contains `<span>📍</span><span id="nearest-btn-label">Find Nearest Hospital with Free Beds</span>`. Listener queries `span:first-child` for `📍` / `✓` and toggles `.active`.
  - `#btn-book-ambulance` triggers `openAmbulanceModal(null)`.
  - `#amb-drivers-view` and `#amb-tracking-view` currently reside in `#ambulance-modal`.
  - Clean refactoring strategy decomposes the 3 stacked buttons into:
    1) Apple/M3 Top-Segmented Pill Bar (`#btn-tab-cards`, `#btn-toggle-view`, `#btn-book-ambulance`) for fluid 3-view navigation (`#citizen-card-list`, `#citizen-map-view`, `#amb-drivers-view`).
    2) Sleek Secondary Toolbar pairing `#citizen-search` with `#btn-nearest-hospital` as an inline high-affinity action pill.
- **Unexplored areas**: None for M1 switcher scope.

## Key Decisions Made
- Top-Segmented Switcher pills will use `#btn-toggle-view` (Tab 2) and `#btn-book-ambulance` (Tab 3), with `#btn-tab-cards` as Tab 1.
- All first-child `<span>` icon elements and dynamic label spans (`#toggle-btn-label`, `#nearest-btn-label`) are preserved exactly to maintain 100% compatibility with existing listeners.
- `#btn-nearest-hospital` positioned in an inline flex search toolbar directly alongside `#citizen-search`.
- Segmented switching orchestrates active tab classes, toggles section visibilities, and triggers map resize or driver rendering.
- `#ambulance-modal` supports both inline fluid view rendering for Tab 3 and accessible modal dialog for targeted hospital requests.

## Artifact Index
- c:\medcare-wb\.agents\teamwork\explorer_m1_1\handoff.md — Final investigation and strategy report
- c:\medcare-wb\.agents\teamwork\explorer_m1_1\progress.md — Liveness and progress heartbeat
- c:\medcare-wb\.agents\teamwork\explorer_m1_1\DISPATCH.md — Dispatch log
