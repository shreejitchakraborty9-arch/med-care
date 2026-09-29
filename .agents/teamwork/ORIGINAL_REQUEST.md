# Original User Request

## 2026-09-29T08:42:08Z

Comprehensive frontend UI/UX overhaul of MedWatch West Bengal (citizen portal & admin dashboard) to replace cluttered, compacted layouts with a fluid, Google/Apple and world-class hospital (Mayo Clinic, NHS) design system.

CRITICAL USER MANDATE: Do not change or remove a single function of the app. Every single function, data listener, and feature must remain 100% identical and operational: Firebase Firestore real-time onSnapshot listeners, Gemini AI agents, bed calculations, Haversine distance, Google Maps markers and infowindows, nearest hospital geolocation sorting, district touch bar filtering, facility tier filtering, ambulance booking and dispatch simulation, driver calling, admin read/edit mode, alert notifications sidebar, print, search, filter, seeder, etc. Improve the visual style, layout breathing room, and frontend responsiveness without excluding anything.

Working directory: c:\medcare-wb
Integrity mode: development

## Requirements

### R1. Citizen Portal Fluid Architecture (user-view.html)
Implement a clean, top-segmented switcher (🏥 Find Care, 🗺️ Live Map, 🚑 Ambulance Dispatch) eliminating the stacked button congestion. Build spacious hospital cards with progressive disclosure: total free bed metrics and hospital metadata at a glance, plus an expandable accordion drawer (🛏️ Live Ward Breakdown) revealing Male, Female, and Maternity ward allocations on demand.

### R2. Admin Dashboard Executive Architecture (dashboard.html)
Modernize the admin experience with an executive Bento-grid overview (statewide capacity, critical bed shortage alerts, medicine alerts), segmented workspace tabs, and a slide-out inspector drawer for editing hospital records without cell overcrowding in the data table.

### R3. Google & Apple Design System Integration
Adopt calm, clinical typography, soft tonal elevation, 16px rounded surfaces, high-contrast accessible color tokens, and fluid micro-interactions inspired by Google Material 3 and Apple Human Interface Guidelines.

## Acceptance Criteria

### UX & Layout
- [ ] No single-page vertical overcrowding: clear separation between Hospital Search, Map View, and Ambulance Dispatch via the Top Segmented Switcher.
- [ ] Progressive disclosure on hospital cards: core bed metrics visible at a glance, ward breakdowns cleanly expandable without taking up 50% of the screen.
- [ ] Conforms to Apple Human Interface Guidelines and Google Material 3 standards (touch targets >= 48px, high contrast ratios, calm clinical colors).

### Technical & System Integrity
- [ ] ZERO functional changes or exclusions: Every single function, listener, calculation, and feature remains completely intact.
- [ ] Validated clean HTML/JS syntax with 0 errors across user-view.html and dashboard.html.
