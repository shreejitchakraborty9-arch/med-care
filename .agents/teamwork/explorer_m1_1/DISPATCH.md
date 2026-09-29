## 2026-09-29T09:00:23Z

You are Explorer M1_1 for Milestone 1: Citizen Portal Fluid Architecture (`user-view.html`).

Your working directory is:
c:\medcare-wb\.agents\teamwork\explorer_m1_1

Authoritative Original Request:
c:\medcare-wb\.agents\teamwork\ORIGINAL_REQUEST.md
(MANDATORY: You MUST read ORIGINAL_REQUEST.md first).

Project Specifications:
- c:\medcare-wb\.agents\teamwork\orchestrator\PROJECT.md
- c:\medcare-wb\TEST_READY.md
- Baseline survey: c:\medcare-wb\.agents\teamwork\explorer_survey_1\handoff.md

Scope: Read-only exploration for `c:\medcare-wb\user-view.html`. DO NOT modify any code.

Focus:
Formulate the exact HTML/CSS/JS refactoring strategy for the Top-Segmented Switcher (🏥 Find Care, 🗺️ Live Map, 🚑 Ambulance Dispatch).
Specifically:
1. How to replace the 3 vertically stacked buttons (`#btn-toggle-view`, `#btn-nearest-hospital`, `#btn-book-ambulance`) with a clean, modern Apple/M3 segmented pill bar while keeping ALL 3 IDs and their exact listeners intact.
2. How the segmented switcher should seamlessly switch between the card directory (`#citizen-card-list`), the map (`#citizen-map-view`), and the ambulance view (`#amb-drivers-view`), triggering existing map resize and ambulance view logic.
3. How to position `#btn-nearest-hospital` into a sleek secondary toolbar alongside `#citizen-search`.
4. Ensure all 36 required DOM IDs and 21 functions remain 100% intact.

Write your report to `c:\medcare-wb\.agents\teamwork\explorer_m1_1\handoff.md` and call `send_message` to report back.
