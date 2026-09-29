# E2E Test Infra: MedWatch West Bengal

## Test Philosophy
- Opaque-box and requirement-driven: derived from `ORIGINAL_REQUEST.md` and user specifications, not internal implementation details.
- 100% Zero-Regression Verification: Verifies that every single function, listener, calculation, DOM ID, and Firestore binding remains completely intact.
- Methodology: Category-Partition + Boundary Value Analysis (BVA) + Pairwise Combinatorial Testing + Real-World Workload Testing.

## Feature Inventory & Test Matrix

| # | Feature | Source | Tier 1 (Coverage) | Tier 2 (Boundary) | Tier 3 (Cross-Feature) | Tier 4 (Workflows) |
|---|---------|--------|:-----------------:|:-----------------:|:---------------------:|:------------------:|
| 1 | Route Security Guard | Security Requirement | 5 | 3 | ✓ | ✓ |
| 2 | Top-Segmented Switcher | ORIGINAL_REQUEST § R1 | 5 | 4 | ✓ | ✓ |
| 3 | Hospital Card Progressive Disclosure | ORIGINAL_REQUEST § R1 | 6 | 5 | ✓ | ✓ |
| 4 | District Touch Bar Filtering | Codebase Survey | 5 | 5 | ✓ | ✓ |
| 5 | Facility Tier Filtering | Codebase Survey | 5 | 3 | ✓ | ✓ |
| 6 | Real-time Search | Codebase Survey | 5 | 5 | ✓ | ✓ |
| 7 | Haversine Geolocation Sorting | Codebase Survey | 5 | 5 | ✓ | ✓ |
| 8 | Google Maps Interactive GIS | Codebase Survey | 5 | 4 | ✓ | ✓ |
| 9 | Ambulance Driver Directory | Codebase Survey | 5 | 4 | ✓ | ✓ |
| 10 | Ambulance Dispatch Simulation | Codebase Survey | 5 | 4 | ✓ | ✓ |
| 11 | Simulated Driver Calling | Codebase Survey | 5 | 3 | ✓ | ✓ |
| 12 | Executive Bento-Grid Overview | ORIGINAL_REQUEST § R2 | 5 | 4 | ✓ | ✓ |
| 13 | Segmented Workspace Tabs | ORIGINAL_REQUEST § R2 | 5 | 4 | ✓ | ✓ |
| 14 | Slide-Out Inspector Drawer | ORIGINAL_REQUEST § R2 | 6 | 5 | ✓ | ✓ |
| 15 | Hospital Directory Table | Codebase Survey | 5 | 4 | ✓ | ✓ |
| 16 | Inline Bed Calculations & Updates | Codebase Survey | 5 | 5 | ✓ | ✓ |
| 17 | Multi-Modal Resource Editors | Codebase Survey | 7 | 5 | ✓ | ✓ |
| 18 | Emergency Declaration & Lift | Codebase Survey | 5 | 4 | ✓ | ✓ |
| 19 | Admin Audit Trail Logging | Codebase Survey | 5 | 4 | ✓ | ✓ |
| 20 | Multi-Agent AI Notification Sidebar | Codebase Survey | 5 | 4 | ✓ | ✓ |
| 21 | Administrative Utilities | Codebase Survey | 5 | 3 | ✓ | ✓ |
| 22 | Clinical Design System Tokens | ORIGINAL_REQUEST § R3 | 5 | 4 | ✓ | ✓ |
| 23 | Mobile Responsive & Accessibility | ORIGINAL_REQUEST § R3 | 5 | 5 | ✓ | ✓ |

## Test Architecture
- **Test Runner**: Native Node.js test runner (`node --test scripts/verify-integrity.js`)
- **Execution Mode**: Zero external npm dependencies, sub-second execution, exit code 0 on pass.
- **Coverage Tiers**:
  - **Tier 1 (Feature Coverage)**: Validates presence of all 106+ static DOM IDs, function signatures, and Firestore collections.
  - **Tier 2 (Boundary & Corner Cases)**: 0 total beds, 100% occupancy, invalid geolocation coordinates, empty search strings, rapid tab switches.
  - **Tier 3 (Cross-Feature Combinations)**: District filter + facility type filter + text search; Emergency declaration + multi-agent alert trigger; Read/edit mode toggle + inspector drawer sync.
  - **Tier 4 (Real-World Workflows)**: Citizen emergency triage journey (Find hospital -> Check ward -> Book ambulance -> Track arrival); Admin crisis workflow (Inspect hospital -> Declare emergency -> Trigger redistribution -> Verify audit trail).

## Acceptance Criteria
- 100% of test cases pass with exit code 0.
- Zero syntax or runtime errors across `user-view.html`, `dashboard.html`, and `style.css`.
- Forensic integrity audit returns CLEAN (zero mocks, zero bypassed logic).
