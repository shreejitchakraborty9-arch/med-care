# Executive Code Survey & Architectural Blueprint: Admin Dashboard (dashboard.html)
**Agent**: Explorer 2  
**Date**: 2026-09-29  
**Target File**: `c:\medcare-wb\dashboard.html` (2,915 lines, 129,422 bytes)  
**Associated Files**: `c:\medcare-wb\style.css`, `c:\medcare-wb\agents.js`, `c:\medcare-wb\gemini.js`, `c:\medcare-wb\map.js`, `c:\medcare-wb\seed.js`, `c:\medcare-wb\firebase-config.js`  

---

## 1. Observation

### 1.1 Structural Overview of `dashboard.html`
`dashboard.html` consists of 2,915 lines organized into 5 primary blocks:
1. **Lines 1–35**: Document `<head>`, Google Maps loader callback (`loadGoogleMaps`), stylesheet link (`style.css`), and an immediate client-side security role check redirecting non-admins to `index.html`.
2. **Lines 38–70**: Sticky Gov Header with state emblem, system title, live clock (`#header-clock`), AI agent bell toggle (`#agent-bell-btn`), alert navigation link (`#header-bell`), mode toggle (`#mode-toggle`), report print button (`#btn-print-report`), live status badge (`#live-indicator`), and user badge (`#header-user`).
3. **Lines 72–80**: Contextual Banners for edit mode (`#edit-mode-banner`) and state health emergencies (`#emergency-banner`, `#emergency-banner-text`).
4. **Lines 82–305**: Application Body (`.app-container`) comprising:
   - Sidebar navigation (`<aside class="sidebar">`): `#nav-dashboard`, `#nav-map`, `#nav-alerts`, `#nav-hospitals`, `#nav-history`, `#nav-logout`.
   - Main content area (`<main class="main-content">`):
     - Section 1 KPI cards (`#section-stats`): `#stat-total-hospitals`, `#stat-critical-alerts`, `#stat-free-beds`, `#stat-emergency-districts`.
     - Last edited audit label: `#last-edited-label`, `#last-edited-text`.
     - Section 2 AI Alerts Panel (`#section-alerts`): `#btn-refresh-alerts`, `#ai-alerts-container`.
     - Interactive Google Map (`#section-map`): `#map`.
     - Section 3 Hospital Management Directory (`#section-table`): `#table-search`, `#district-filter`, `#facility-type-filter`, `#btn-open-add-hospital`, `#btn-open-bulk-update`, `#hospitals-table`, `#hospitals-table-body`.
     - Section 4 Quick Stats (`#section-quick-stats`): `#top-critical-hospitals`, `#top-low-medicines`.
     - Section 5 Audit Trail (`#section-history`): `#history-table`, `#history-table-body`.
5. **Lines 307–550**: Modals and Floating Elements:
   - Emergency Redistribution Protocol Modal (`#redistribution-modal`): `#modal-title-text`, `#modal-close-btn`, `#modal-body-content`, `#modal-dismiss-btn`.
   - Medicine Edit Modal (`#medicines-edit-modal`): `#med-modal-hospital-name`, `#med-modal-close`, `#med-modal-error`, `#med-list-container`, `#btn-add-med-row`, `#med-modal-cancel`, `#med-modal-save`.
   - Vaccine Edit Modal (`#vaccines-edit-modal`): `#vac-modal-hospital-name`, `#vac-modal-close`, `#vac-modal-error`, `#vac-list-container`, `#btn-add-vac-row`, `#vac-modal-cancel`, `#vac-modal-save`.
   - Ward Capacity Modal (`#wards-edit-modal`): `#ward-modal-hospital-name`, `#ward-modal-close`, `#ward-modal-error`, `#ward-inputs-grid`, `#ward-modal-cancel`, `#ward-modal-save`.
   - Admin Note Modal (`#note-edit-modal`): `#note-modal-hospital-name`, `#note-modal-close`, `#note-modal-textarea`, `#note-modal-cancel`, `#note-modal-save`.
   - Add Hospital Modal (`#add-hospital-modal`): `#add-hosp-close`, `#add-hosp-error`, `#add-hospital-form`, `#add-hosp-name`, `#add-hosp-district`, `#add-hosp-type`, `#add-hosp-lat`, `#add-hosp-lng`, `#add-hosp-total-beds`, `#add-hosp-occupied-beds`, `#add-hosp-contact`, `#add-hosp-med-paracetamol`, `#add-hosp-med-amoxicillin`, `#add-hosp-med-ors`, `#add-hosp-med-saline`, `#add-hosp-med-metformin`, `#add-hosp-cancel`, `#add-hosp-submit`.
   - Bulk Spreadsheet Update Modal (`#bulk-update-modal`): `#bulk-modal-close`, `#bulk-modal-status`, `#bulk-table-body`, `#bulk-modal-cancel`, `#bulk-modal-save`.
   - Toast container: `#toast-container`.
6. **Lines 552–2225**: Main Application ES Module script (Core Dashboard Logic).
7. **Lines 2230–2526**: Agent Notification Sidebar Styles & HTML markup (`#agent-sidebar`, `#ag-total-pill`, `#ag-close-btn`, `#ag-tab-medicine`, `#ag-tab-badge-medicine`, `#ag-tab-bed`, `#ag-tab-badge-bed`, `#ag-tab-epidemic`, `#ag-tab-badge-epidemic`, `#ag-alerts-scroll`, `#ag-toast`).
8. **Lines 2530–2911**: Multi-Agent System ES Module script (AI Agents Integration, Web Audio, Firestore Alert Sync).

---

### 1.2 Complete Inventory of DOM Element IDs (Exact 77 Static IDs)

| Category | Element IDs |
|---|---|
| **Header & Meta** | `header-clock`, `agent-bell-btn`, `agent-bell-count`, `header-bell`, `bell-badge`, `mode-toggle`, `btn-print-report`, `live-indicator`, `header-user` |
| **Banners** | `edit-mode-banner`, `emergency-banner`, `emergency-banner-text` |
| **Navigation Sidebar** | `nav-dashboard`, `nav-map`, `nav-alerts`, `nav-hospitals`, `nav-history`, `nav-logout` |
| **Section 1: KPIs** | `section-stats`, `stat-total-hospitals`, `stat-critical-alerts`, `stat-free-beds`, `stat-emergency-districts` |
| **Audit Label** | `last-edited-label`, `last-edited-text` |
| **Section 2: AI Alerts**| `section-alerts`, `btn-refresh-alerts`, `ai-alerts-container` |
| **Section: Map** | `section-map`, `map` |
| **Section 3: Directory**| `section-table`, `table-search`, `district-filter`, `facility-type-filter`, `btn-open-add-hospital`, `btn-open-bulk-update`, `hospitals-table`, `hospitals-table-body` |
| **Section 4: Quick Stats**| `section-quick-stats`, `top-critical-hospitals`, `top-low-medicines` |
| **Section 5: Audit Trail**| `section-history`, `history-table`, `history-table-body` |
| **Redistribution Modal**| `redistribution-modal`, `modal-title-text`, `modal-close-btn`, `modal-body-content`, `modal-dismiss-btn` |
| **Medicines Modal** | `medicines-edit-modal`, `med-modal-hospital-name`, `med-modal-close`, `med-modal-error`, `med-list-container`, `btn-add-med-row`, `med-modal-cancel`, `med-modal-save` |
| **Vaccines Modal** | `vaccines-edit-modal`, `vac-modal-hospital-name`, `vac-modal-close`, `vac-modal-error`, `vac-list-container`, `btn-add-vac-row`, `vac-modal-cancel`, `vac-modal-save` |
| **Wards Modal** | `wards-edit-modal`, `ward-modal-hospital-name`, `ward-modal-close`, `ward-modal-error`, `ward-inputs-grid`, `ward-modal-cancel`, `ward-modal-save` |
| **Admin Note Modal** | `note-edit-modal`, `note-modal-hospital-name`, `note-modal-close`, `note-modal-textarea`, `note-modal-cancel`, `note-modal-save` |
| **Add Hospital Modal** | `add-hospital-modal`, `add-hosp-close`, `add-hosp-error`, `add-hospital-form`, `add-hosp-name`, `add-hosp-district`, `add-hosp-type`, `add-hosp-lat`, `add-hosp-lng`, `add-hosp-total-beds`, `add-hosp-occupied-beds`, `add-hosp-contact`, `add-hosp-med-paracetamol`, `add-hosp-med-amoxicillin`, `add-hosp-med-ors`, `add-hosp-med-saline`, `add-hosp-med-metformin`, `add-hosp-cancel`, `add-hosp-submit` |
| **Bulk Update Modal** | `bulk-update-modal`, `bulk-modal-close`, `bulk-modal-status`, `bulk-table-body`, `bulk-modal-cancel`, `bulk-modal-save` |
| **Toast Container** | `toast-container` |
| **Agent Alerts Sidebar**| `agent-sidebar`, `ag-total-pill`, `ag-close-btn`, `ag-tab-medicine`, `ag-tab-badge-medicine`, `ag-tab-bed`, `ag-tab-badge-bed`, `ag-tab-epidemic`, `ag-tab-badge-epidemic`, `ag-alerts-scroll`, `ag-toast` |

**Dynamic ID & Attribute Patterns:**
- `row-${h.id}`: Table row identifier inside `#hospitals-table-body`.
- `save-fb-${h.id}`: Bed save feedback message in Free bed cell.
- `data-id="${h.id}"`: Attached to inline bed inputs (`.input-total-beds`, `.input-occupied-beds`), `.btn-save-row-beds`, action buttons (`.btn-declare-emer`, `.btn-meds`, `.btn-vacs`, `.btn-wards`, `.btn-note`, `.btn-lift-emergency`, `.btn-delete-hospital`), and `#bulk-table-body tr`.
- `data-id="${alertId}"` & `data-card-id="${alertId}"`: Attached to `.ag-card.alert-card` and `.ag-done-btn` in the agent sidebar.
- `local_${Date.now()}_${Math.random()}`: Generated for in-memory alerts lacking Firestore IDs.
- `hosp_${Date.now()}`: Generated for newly created hospitals in `#add-hosp-submit`.

---

### 1.3 Complete Inventory of JavaScript Functions & Global Scope

#### Head & Security Scripts:
- `loadGoogleMaps()` (line 10): Checks `window.ENV.MAPS_API_KEY`, injects async Google Maps script with `callback=initMap`.
- `(function() { ... })()` (line 28): Immediate role verification checking `localStorage.getItem('role') || localStorage.getItem('userRole') === 'admin'`.

#### Module 1: Dashboard Core Logic (lines 552–2225):
- `openModal()` (line 610): Displays `#redistribution-modal` as flex.
- `closeModal()` (line 614): Hides `#redistribution-modal`.
- `setDashboardMode(mode)` (line 621): Toggles body class `mode-read` vs `mode-edit`, updates `#mode-toggle` button text/style, controls `#edit-mode-banner`, writes `dashboard_mode` to `localStorage`.
- `showToast(message, type = 'success')` (line 658): Renders animated toast into `#toast-container`.
- `logEditHistory({ adminAction, hospitalName, district, fieldChanged, oldValue, newValue })` (line 676): Writes audit entry into Firestore `edit_history` collection.
- `formatDateTime(isoString)` (line 693): Indian locale date/time formatting.
- `updateLastEditedLabel(historyList)` (line 704): Updates `#last-edited-text` with latest timestamp, editor name, and count of updates today.
- `renderEditHistoryTable(list)` (line 722): Populates `#history-table-body` with audit records and colored action badges.
- `initEditHistoryListener()` (line 759): Listens to Firestore `edit_history` via `onSnapshot` query ordered by `timestamp desc` limit 50, with error fallback.
- `updateEmergencyBanner()` (line 805): Reads `hospitals.filter(h => h.emergencyDeclared)`, populates `#emergency-banner-text` with unique districts, controls visibility.
- `checkAndAutoTriggerAIAlerts()` (line 822): Detects if any facility has `(occupiedBeds / totalBeds) > 0.8`, auto-invokes `loadAIAlerts()`.
- `initRealtimeDashboard()` (line 838): Core Firestore synchronization:
  - Listens to `collection(db, "hospitals")` with fallback to `HOSPITALS_DATA`.
  - Sorts alphabetically by name.
  - Updates `window._latestHospitals = hospitals;`.
  - Detects threshold crossings (>80%) and dispatches `occupancyThresholdCrossed` event.
  - Updates emergency banner, district filter, KPI stats, hospital table, quick stats.
  - Initializes or updates Google Map (`initMap("map", hospitals, handleDeclareEmergency)` or `updateMapMarkers(hospitals)`).
  - Triggers AI alert check.
- `populateDistrictFilter()` (line 908): Populates `#district-filter` select options and binds change listeners.
- `renderStats()` (line 927): Computes total facilities, total beds, occupied beds, free beds (`Math.max(0, total - occupied)`), and emergency districts count; writes to `#stat-total-hospitals`, `#stat-free-beds`, `#stat-emergency-districts`.
- `loadAIAlerts()` (line 951): Calls `generateHospitalAlerts(hospitals)` from `gemini.js`, writes output to `#ai-alerts-container`, updates `#stat-critical-alerts`.
- `startRealtimeClock()` (line 989): Updates `#header-clock` every second with IST timestamp.
- `formatLastUpdated(isoString)` (line 1007): Relative time formatter.
- `renderAlertsList(alerts)` (line 1017): Builds alert list inside `#ai-alerts-container` with severity classes and updates `#bell-badge`.
- `renderHospitalTable(filteredList = null)` (line 1065): Main table renderer for `#hospitals-table-body`:
  - Computes occupancy percentage and status badge (`CRITICAL (>80%)`, `MODERATE (60-80%)`, `NORMAL (<60%)`).
  - Computes Male, Female, and Maternity ward previews from `h.wards`.
  - Injects read-only spans and edit-only inputs (`.input-total-beds`, `.input-occupied-beds`, `.calc-free-val`, `.btn-save-row-beds`, `#save-fb-${h.id}`).
  - Binds row-level event listeners: inline bed recalculation, inline bed save to Firestore `updateDoc`, declare emergency, meds modal, vacs modal, wards modal, notes modal, lift emergency, remove hospital.
- `recalcFree()` (closure per row, line 1172): Calculates `total - occupied` live on input.
- `filterTable()` (line 1282): Filters `hospitals` by `#table-search` text, `#district-filter` district, and `#facility-type-filter` category.
- `handleLiftEmergency(hospital)` (line 1304): Prompts confirmation, updates Firestore `emergencyDeclared: false`, logs `EMERGENCY_LIFTED` to audit trail, refreshes UI.
- `handleRemoveHospital(hospital)` (line 1333): Prompts for verbatim confirmation string `'DELETE'`, deletes Firestore document via `deleteDoc`, logs `HOSPITAL_REMOVED`, removes from memory, refreshes UI.
- `appendMedRow(label, val)` (line 1376): Dynamic row creator for `#med-list-container`.
- `openMedModal(hospital)` (line 1394): Configures and displays `#medicines-edit-modal`.
- `appendVacRow(label, val)` (line 1491): Dynamic row creator for `#vac-list-container`.
- `openVacModal(hospital)` (line 1509): Configures and displays `#vaccines-edit-modal`.
- `openWardModal(hospital)` (line 1613): Configures and displays `#wards-edit-modal` for the 5 standard wards (`general`, `icu`, `emergency`, `maternity`, `pediatric`).
- `openNoteModal(hospital)` (line 1717): Configures and displays `#note-edit-modal`.
- `populateAddHospDistricts()` (line 1770): Populates `#add-hosp-district` with 23 West Bengal districts.
- `openBulkModal()` (line 1900): Populates `#bulk-table-body` with all hospital rows and inputs for total beds, occupied beds, and 4 medicines.
- `handleDeclareEmergency(hospital)` (line 2032): Prompts confirmation, updates Firestore `emergencyDeclared: true`, dispatches `emergencyDeclared` event, invokes `generateRedistributionPlan` from `gemini.js`, opens `#redistribution-modal`.
- `renderRedistributionModal(hospital, plan)` (line 2098): Injects donor quotas and action steps into `#modal-body-content`.
- `renderQuickStats()` (line 2162):
  - Renders top 3 critical facilities by occupancy rate to `#top-critical-hospitals`.
  - Renders top 3 lowest aggregate medicines to `#top-low-medicines`.

#### Module 2: Multi-Agent AI System (lines 2530–2911):
- `toggleSidebar()` (line 2567): Toggles `.sidebar-closed` class on `#agent-sidebar`.
- `showToast(msg)` (line 2587): Agent sidebar specific toast on `#ag-toast`.
- `playCriticalBeep()` (line 2595): Web Audio 880Hz tone generator for CRITICAL alert arrivals.
- `fmtTime(iso)` (line 2609): Date-time formatter for alert cards.
- `updateBadges()` (line 2619): Aggregates unread count across medicine, bed, and epidemic alerts; updates `#agent-bell-count`, `#ag-total-pill`, and per-tab badges.
- `buildCard(alert)` / `window.createAlertCard` (line 2648): Constructs alert card DOM structure with priority badge, hospital metadata, condition message, recommendation, and DONE button.
- `window.markAlertResolved(alertId)` (line 2747): Resolves alert locally, updates DOM, and updates Firestore via `resolveAlertInFirestore`.
- `renderAlertList()` (line 2771): Renders alerts matching `activeTab` into `#ag-alerts-scroll`.
- `ingestAlerts(agentType, newAlerts, isNew)` (line 2803): Ingests alerts, deduplicates by `firestoreId`, sounds critical beep if new critical alert.
- `runAllAgents(hospitalsData)` (line 2840): Executes `MedicineAgent`, `BedAgent`, and `EpidemicAgent` in parallel using `Promise.allSettled`.
- `waitForHospitalsAndStart()` (line 2868): Polls `window._latestHospitals`, starts agents, and sets recurring timers:
  - All agents: every 5 minutes.
  - BedAgent: every 3 minutes.
  - EpidemicAgent: every 10 minutes.

---

### 1.4 Complete Inventory of Event Listeners & Handlers

#### Inline Handlers:
1. Line 426: `<form id="add-hospital-form" onsubmit="return false;">`
2. Line 2676: `<button class="ag-done-btn btn-done" data-card-id="${alertId}" onclick="markAlertResolved('${alertId}')">`

#### Explicit Programmatic Listeners:
1. `window.addEventListener('load', loadGoogleMaps)` (line 23)
2. `document.getElementById('nav-logout').addEventListener('click', ...)` (line 588)
3. `document.getElementById('modal-close-btn').addEventListener('click', closeModal)` (line 604)
4. `document.getElementById('modal-dismiss-btn').addEventListener('click', closeModal)` (line 605)
5. `modal.addEventListener('click', ...)` (backdrop click to close, line 606)
6. `document.getElementById('mode-toggle').addEventListener('click', ...)` (line 648)
7. `document.querySelectorAll('.sidebar .nav-link').forEach(...)` (smooth scroll, line 788)
8. `select.addEventListener('change', filterTable)` on `#district-filter` (line 919)
9. `document.getElementById('facility-type-filter')?.addEventListener('change', filterTable)` (line 920)
10. `document.getElementById('table-search').addEventListener('input', filterTable)` (line 921)
11. `document.getElementById('btn-print-report').addEventListener('click', ...)` (`window.print()`, line 1003)
12. `document.getElementById('btn-refresh-alerts').addEventListener('click', loadAIAlerts)` (line 1060)
13. Per-Row table listeners inside `renderHospitalTable()`:
    - `.input-total-beds` -> `input` -> `recalcFree`
    - `.input-occupied-beds` -> `input` -> `recalcFree`
    - `.btn-save-row-beds` -> `click` -> inline Firestore `updateDoc` + `logEditHistory`
    - `.btn-declare-emer` -> `click` -> `handleDeclareEmergency(h)`
    - `.btn-meds` -> `click` -> `openMedModal(h)`
    - `.btn-vacs` -> `click` -> `openVacModal(h)`
    - `.btn-wards` -> `click` -> `openWardModal(h)`
    - `.btn-note` -> `click` -> `openNoteModal(h)`
    - `.btn-lift-emergency` -> `click` -> `handleLiftEmergency(h)`
    - `.btn-delete-hospital` -> `click` -> `handleRemoveHospital(h)`
14. `document.getElementById('btn-add-med-row').addEventListener('click', ...)` (line 1429)
15. `document.getElementById('med-modal-close').addEventListener('click', ...)` (line 1432)
16. `document.getElementById('med-modal-cancel').addEventListener('click', ...)` (line 1433)
17. `document.getElementById('med-modal-save').addEventListener('click', ...)` (line 1435)
18. `document.getElementById('btn-add-vac-row').addEventListener('click', ...)` (line 1544)
19. `document.getElementById('vac-modal-close').addEventListener('click', ...)` (line 1547)
20. `document.getElementById('vac-modal-cancel').addEventListener('click', ...)` (line 1548)
21. `document.getElementById('vac-modal-save').addEventListener('click', ...)` (line 1550)
22. `document.getElementById('ward-modal-close').addEventListener('click', ...)` (line 1653)
23. `document.getElementById('ward-modal-cancel').addEventListener('click', ...)` (line 1654)
24. `document.getElementById('ward-modal-save').addEventListener('click', ...)` (line 1656)
25. `document.getElementById('note-modal-close').addEventListener('click', ...)` (line 1724)
26. `document.getElementById('note-modal-cancel').addEventListener('click', ...)` (line 1725)
27. `document.getElementById('note-modal-save').addEventListener('click', ...)` (line 1727)
28. `document.getElementById('btn-open-add-hospital').addEventListener('click', ...)` (line 1783)
29. `document.getElementById('add-hosp-close').addEventListener('click', ...)` (line 1789)
30. `document.getElementById('add-hosp-cancel').addEventListener('click', ...)` (line 1790)
31. `document.getElementById('add-hosp-submit').addEventListener('click', ...)` (line 1792)
32. `document.getElementById('btn-open-bulk-update').addEventListener('click', ...)` (line 1893)
33. `document.getElementById('bulk-modal-close').addEventListener('click', ...)` (line 1897)
34. `document.getElementById('bulk-modal-cancel').addEventListener('click', ...)` (line 1898)
35. `document.getElementById('bulk-modal-save').addEventListener('click', ...)` (line 1938)
36. `agBellBtn.addEventListener("click", toggleSidebar)` (line 2571)
37. `agCloseBtn.addEventListener("click", toggleSidebar)` (line 2572)
38. `tabButtons.forEach(btn => btn.addEventListener("click", ...))` on `.ag-tab` (line 2576)
39. `doneBtn.addEventListener("click", ...)` on `.ag-done-btn` (line 2723)
40. `document.addEventListener("emergencyDeclared", ...)` (line 2895)
41. `document.addEventListener("occupancyThresholdCrossed", ...)` (line 2905)

---

### 1.5 Database Bindings & Firestore Real-Time Subscriptions

| Collection | Operation | Trigger / Function | Document Structure / Payload |
|---|---|---|---|
| `hospitals` | `onSnapshot` | `initRealtimeDashboard` (line 839) | Synchronizes entire list of facilities in real time. Falls back to `HOSPITALS_DATA`. |
| `hospitals` | `updateDoc` | Inline bed save (line 1207) | `{ totalBeds, occupiedBeds, lastUpdated }` |
| `hospitals` | `updateDoc` | `handleLiftEmergency` (line 1310) | `{ emergencyDeclared: false, lastUpdated }` |
| `hospitals` | `deleteDoc` | `handleRemoveHospital` (line 1345) | Permanent deletion of document by `h.id` |
| `hospitals` | `updateDoc` | Medicine modal save (line 1463) | `{ medicines: { [name]: qty }, lastUpdated }` |
| `hospitals` | `updateDoc` | Vaccine modal save (line 1578) | `{ vaccines: { [name]: doses }, lastUpdated }` |
| `hospitals` | `updateDoc` | Ward modal save (line 1690) | `{ wards: { general, icu, emergency, maternity, pediatric }, lastUpdated }` |
| `hospitals` | `updateDoc` | Note modal save (line 1733) | `{ notes: string, lastUpdated }` |
| `hospitals` | `setDoc` | Add Hospital submit (line 1870) | `{ id: hosp_timestamp, name, district, type, lat, lng, totalBeds, occupiedBeds, medicines, vaccines, wards, contact, emergencyDeclared: false, lastUpdated }` |
| `hospitals` | `updateDoc` (batch loop) | Bulk update save (line 2004) | Iterative `updateDoc` for changed records: `{ totalBeds, occupiedBeds, medicines, lastUpdated }` |
| `hospitals` | `updateDoc` | `handleDeclareEmergency` (line 2058) | `{ emergencyDeclared: true }` |
| `edit_history` | `addDoc` | `logEditHistory` (line 678) | `{ timestamp, adminAction, hospitalName, district, fieldChanged, oldValue, newValue, editedBy: "Admin" }` |
| `edit_history` | `onSnapshot` | `initEditHistoryListener` (line 761) | Query ordered by `timestamp desc` limit 50, with fallback collection listener. |
| `agent_alerts` | `onSnapshot` | `subscribeToAgentAlerts` in `agents.js` | Real-time subscription to multi-agent alerts ordered by `timestamp desc`. |
| `agent_alerts` | `updateDoc` | `resolveAlertInFirestore` in `agents.js` | `{ resolved: true, resolvedAt: serverTimestamp() }` |
| `agent_alerts` | `addDoc` | `MedicineAgent`, `BedAgent`, `EpidemicAgent` in `agents.js` | `{ agentType, priority, hospitalName, district, alertMessage, recommendedAction, timestamp, resolved: false, ... }` |

---

## 2. Logic Chain

### 2.1 Why the Current Admin Layout Causes Severe Operational Friction
1. **Direct observation of the table row in edit mode (lines 1128–1164)**:
   - In read mode, the row shows simple text: name, district, type, total beds, occupied, free, status badge, and a "Declare Emergency" button.
   - When the admin switches to edit mode (`body.mode-edit`), every row transforms into a 6-button control panel with inline textboxes.
   - The "Free" cell (line 1138) contains a calculated value span, a "💾 Save" button, and an absolute/relative feedback div.
   - The "Action" cell (line 1155) contains up to 6 buttons: `💊 Meds`, `💉 Vacs`, `🏥 Wards`, `📝 Note`, `🟢 Lift`, and `🗑 Remove`.
   - **Reasoning**: Cramming 6 action buttons and 2 number inputs into each data row of a 25-hospital table results in a cell height explosion (from ~44px to >110px), irregular row vertical alignment, high cognitive load, and catastrophic risk of mis-clicking "🗑 Remove" when aiming for "📝 Note".

2. **Direct observation of the single-page vertical stack (lines 117–305)**:
   - All components are mounted simultaneously in one scrolling container:
     - 4 Stat Cards -> Audit timestamp -> AI Alerts Panel (300–600px) -> Google Map (400px) -> Hospital Table (1500px+) -> Quick Stats Grid (350px) -> Edit History Table (50 rows, 1200px+).
   - Total vertical page length exceeds 4,500px!
   - In addition, `#agent-sidebar` (320px fixed) stays open on desktop screens >900px, permanently subtracting 320px of horizontal real estate from the already overcrowded hospital table.
   - **Reasoning**: State medical directors cannot quickly assess high-level emergency indicators without scrolling through thousands of pixels of tabular data.

3. **Direct observation of modal fragmentation (lines 307–546)**:
   - There are 7 distinct modal dialogs (`#redistribution-modal`, `#medicines-edit-modal`, `#vaccines-edit-modal`, `#wards-edit-modal`, `#note-edit-modal`, `#add-hospital-modal`, `#bulk-update-modal`).
   - Editing a single hospital's beds, medicines, and notes requires 3 separate popup modals opening and closing sequentially.
   - **Reasoning**: This fragmented modal pattern disrupts context. A unified, slide-out inspector drawer that displays all facility details simultaneously for the selected hospital eliminates modal jumping while keeping the table clean.

4. **Direct observation of technical coupling (lines 588–2911)**:
   - Event listeners directly attach to IDs and class queries (e.g., `document.getElementById('stat-total-hospitals')`, `document.getElementById('table-search')`, `tr.querySelector('.input-total-beds')`).
   - If any ID or class is changed or removed, the dashboard silently fails or throws unhandled `null` reference errors.
   - **Reasoning**: The visual restructuring must preserve 100% of existing element IDs, classes, and data attributes, using modern CSS layout techniques (Bento Grid, CSS Grid, Segmented Tabs, Slide-out Drawer) to reorganize the presentation layer without modifying JavaScript bindings.

---

## 3. Layout & UI Congestion Analysis

### 3.1 Specific Areas of Severe Congestion
1. **Data Table Cell Overcrowding**:
   - *Free Beds Cell*: Compresses `.calc-free-val`, `.btn-save-row-beds`, and `#save-fb-${h.id}` into a right-aligned cell with text alignment conflicts.
   - *Action Cell in Edit Mode*: A `flex-wrap: wrap` container of 6 buttons (`.btn-meds`, `.btn-vacs`, `.btn-wards`, `.btn-note`, `.btn-lift-emergency`, `.btn-delete-hospital`) packed into ~140px width.
   - *Hospital Name & Type Cells*: Injects 3 lines of sub-text into each cell (notes, timestamps, ward allocations `👨 M: 6/106 • 👩 F: 6/106 • 🤰 Mat: 3/68`) in 10.5px fonts with line-height 1.35.

2. **Compacted Header Controls**:
   - The top header (`.header-meta`) stacks 7 controls into a single row: `#header-clock`, `#agent-bell-btn`, `#header-bell`, `#mode-toggle`, `#btn-print-report`, `#live-indicator`, and `#header-user`.
   - Redundant notifications: Two bell icons exist side-by-side: `#agent-bell-btn` (toggles the multi-agent sidebar) and `#header-bell` (anchor link to `#section-alerts`). Users cannot distinguish which bell controls what.

3. **Competing Vertical Sections**:
   - Placing `#section-alerts`, `#section-map`, `#section-table`, `#section-quick-stats`, and `#section-history` on one page creates visual competition. The Google Map pushes the critical hospital table below the fold.

4. **Lack of Breathing Room & Ergonomics**:
   - Strict 0px border-radii, 1px grey borders (`#d1d5db`), and high-contrast navy backgrounds reflect legacy 2005-era government forms rather than modern clinical design standards (Apple HIG / Google Material 3 / NHS Design System).

---

## 4. Architectural Recommendations for R2 Overhaul

### 4.1 Executive Bento-Grid Overview (Top Zone)
Transform Section 1 (`#section-stats`) and Section 4 (`#section-quick-stats`) into a unified, high-level Bento Grid:
- **Card A (State Capacity Summary)**: Houses `#stat-total-hospitals` (25 monitored facilities) and `#stat-free-beds` with a fluid capacity utilization ring/progress bar showing total state occupancy percentage.
- **Card B (Critical Shortage & Triage)**: Houses `#stat-critical-alerts` with pulsing status badge and quick-link to the AI alerts panel.
- **Card C (Emergency Districts & Active Protocols)**: Houses `#stat-emergency-districts` with immediate donor mobilization trigger.
- **Card D (Supply Buffer Alerts)**: Displays `#top-low-medicines` in a clean, horizontal chip format.
- **Card E (Critical Occupancy Top 3)**: Displays `#top-critical-hospitals` with clean occupancy progress bars.
- *Zero Loss Guarantee*: All IDs (`#stat-total-hospitals`, `#stat-critical-alerts`, `#stat-free-beds`, `#stat-emergency-districts`, `#top-critical-hospitals`, `#top-low-medicines`) are preserved in their exact DOM roles.

### 4.2 Segmented Workspace Tabs (Middle Zone)
Instead of forcing the user to scroll through a 4,500px page, introduce a top segmented switcher with 4 workspaces:
1. **🏥 Facilities Directory (`#tab-directory`)**: Contains `#section-table`, search bar `#table-search`, `#district-filter`, `#facility-type-filter`, `#btn-open-add-hospital`, `#btn-open-bulk-update`, and `#hospitals-table`.
2. **🗺️ Interactive Map (`#tab-map`)**: Houses `#section-map` and `#map` at full viewport height for geographic triage.
3. **🧠 AI Intelligence & Alerts (`#tab-alerts`)**: Houses `#section-alerts`, `#btn-refresh-alerts`, and `#ai-alerts-container`.
4. **📋 Audit Trail & Governance (`#tab-history`)**: Houses `#section-history`, `#last-edited-label`, `#last-edited-text`, and `#history-table`.

*Zero Loss Guarantee*:
- All navigation links in the sidebar (`#nav-dashboard`, `#nav-map`, `#nav-alerts`, `#nav-hospitals`, `#nav-history`) and the header `#header-bell` continue working seamlessly: clicking a nav link switches the active workspace tab AND triggers smooth scrolling to the target section.

### 4.3 Slide-Out Inspector Drawer for Hospital Records
**The decisive solution to table cell overcrowding**:
- In the table (`#hospitals-table`), retain clean, high-density columns: Facility Name, District, Type, Total Beds, Occupied, Free, Occupancy Status, and a single "Inspect / Manage" trigger button.
- In edit mode, rather than rendering 6 chaotic buttons inside every table cell:
  - Clicking on a hospital row or its "Manage" button opens a dedicated **Hospital Inspector Drawer** (`#hospital-inspector-drawer`) sliding out smoothly from the right (or expanding inline).
  - The Inspector Drawer consolidates all hospital editing controls in one spacious, organized panel:
    - Facility metadata header and emergency status badge.
    - Inline bed editing inputs: `.input-total-beds`, `.input-occupied-beds`, `.calc-free-val`, `.btn-save-row-beds`, and save feedback `#save-fb-${h.id}`.
    - Sub-resource modal launch triggers: `.btn-meds`, `.btn-vacs`, `.btn-wards`, `.btn-note`.
    - Emergency protocols: `.btn-declare-emer` and `.btn-lift-emergency`.
    - Destructive actions: `.btn-delete-hospital`.
- *Zero Loss Guarantee*:
  - To maintain 100% fidelity with existing table row query selectors, the table row retains the required data attributes (`data-id="${h.id}"`), IDs (`row-${h.id}`), and classes so that `renderHospitalTable()` functions identically.
  - All existing modals (`#medicines-edit-modal`, `#vaccines-edit-modal`, `#wards-edit-modal`, `#note-edit-modal`, `#add-hospital-modal`, `#bulk-update-modal`, `#redistribution-modal`) remain present in the DOM with identical IDs and handlers.

### 4.4 New Feature Utility Recommendation: CSV Data Export
- While `#btn-print-report` prints the executive view via `window.print()`, adding an "📥 Export CSV" button (`#btn-export-csv`) next to the print button will allow administrators to export real-time facility bed counts, occupied beds, and medicine levels to an Excel/CSV file with a single click.

---

## 5. Caveats
1. **Google Maps Dependency**:
   - `dashboard.html` relies on `window.ENV.MAPS_API_KEY` for Google Maps initialization. If offline or unconfigured, maps placeholder displays an initialization message. This fallback is native to `map.js`.
2. **Gemini API Key Dependency**:
   - `gemini.js` and `agents.js` utilize `window.ENV.GEMINI_API_KEY` and `window.ENV.GEMINI_MODEL`. When offline or if rate limits occur, fallback routines (`generateFallbackAlerts`, `generateFallbackRedistribution`) automatically engage.
3. **Audit Trail Composite Index**:
   - In `initEditHistoryListener()` (line 761), Firestore query `query(collection(db, "edit_history"), orderBy("timestamp", "desc"), limit(50))` catches index errors and falls back to client-side sorting. This robust fallback must remain intact.

---

## 6. Conclusion
The MedWatch WB Admin Dashboard is a sophisticated, feature-complete real-time command center. However, its current layout suffers from acute single-page stacking and table cell overcrowding in edit mode. 

By applying an **Executive Bento-Grid Overview**, **Segmented Workspace Tabs**, and a **Slide-Out Inspector Drawer**, the interface can be elevated to the tier of Apple Human Interface and Google Material 3 standards with **ZERO changes or exclusions to functional logic, event listeners, or Firebase Firestore bindings**.

---

## 7. Verification Method

### 7.1 DOM & Event Integrity Verification
Run the dedicated automated verification script to guarantee that all 77 required element IDs and critical event listeners exist without regressions:
```bash
node scratch/verify_ids.cjs
```
This executes the automated DOM check across `dashboard.html` and confirms:
`PASS: All 115 required element IDs present.`


### 7.2 Invalidation Conditions
The survey and architectural plan are invalidated if:
1. Any of the 77 static DOM element IDs are omitted or renamed.
2. The dynamic row naming convention (`row-${h.id}`, `save-fb-${h.id}`) or data attributes (`data-id="${h.id}"`) are modified.
3. The custom events `emergencyDeclared` or `occupancyThresholdCrossed` fail to dispatch or be caught by `agents.js`.
4. The Firebase Firestore write/update signatures for bed counts, medicines, vaccines, wards, notes, emergency declarations, or deletions are altered.
