# MedWatch West Bengal — Intelligent Healthcare Supply Chain & Crisis Response System

> **Department of Health & Family Welfare — Government of West Bengal**  
> *Submission for HackToSkill Hackathon — Track 03: Smart Health & Supply Chain Resilience*

[![Live Demo](https://img.shields.io/badge/Demo-the--med--care.web.app-008080?style=for-the-badge&logo=googlecloud&logoColor=white)](https://the-med-care.web.app)
[![Integrity Tests](https://img.shields.io/badge/Tests-27%2F27%20Passing%20(100%25)-10b981?style=for-the-badge&logo=node.js&logoColor=white)](#automated-quality-assurance--testing)
[![Facilities Covered](https://img.shields.io/badge/Facilities-74%20Hospitals%20(23%20Districts)-3b82f6?style=for-the-badge)](#verified-healthcare-facility-coverage)
[![AI Architecture](https://img.shields.io/badge/AI%20Agents-4%20Gemini%20Watchdogs-8b5cf6?style=for-the-badge&logo=googlegemini&logoColor=white)](#autonomous-multi-agent-ai-architecture)

---

## ⚠️ Hackathon Demonstration Prototype Disclaimer

> **⚠️ HACKATHON PROTOTYPE — EVALUATION NOTICE:**  
> **Illustrative demonstration data only — Not an official Government of West Bengal service.**  
> *(Real hospital names & emergency helplines referenced for simulation; bed capacity & medicine stock metrics are mock data.)*  
>  
> This platform is an illustrative demonstration prototype created for the **HackToSkill** competition evaluation. Hospital bed availability, ward allocations, medicine reserves, epidemic alerts, and ambulance driver dispatching are simulated test data. This is not an official Government of West Bengal healthcare dispatch system. In genuine medical emergencies, citizens should dial **108** (Emergency Medical Services) or **102** (Janani Shishu Suraksha Karyakram) directly.

---

## 🚀 Live Demo & Access Credentials

The production build is hosted live on Firebase Hosting:  
**Live URL:** [https://the-med-care.web.app](https://the-med-care.web.app)

The application provides dual-role access control with demo credentials pre-configured:

| Portal | Target URL / Button | Demo Credentials | Primary Responsibilities |
|---|---|---|---|
| **Admin Dashboard** | Click **"Admin Login"** on portal (`/dashboard.html`) | Any email & password (e.g. `admin@health.wb.gov.in` / `admin123`) | Real-time state-wide health command center, critical bed & medicine telemetry, inline bed capacity adjustments, AI watchdog alert feed, emergency protocol declaration, automated supply redistribution engine, audit history logging, and exportable print/CSV briefs. |
| **Citizen Emergency Portal** | Click **"Citizen Login"** on portal (`/user-view.html`) | Any email & password (e.g. `citizen@wb.gov.in` / `citizen123`) | Mobile-responsive emergency triage, GPS nearest-hospital discovery (Haversine formula), progressive ward breakdown (Male, Female, Maternity beds), multi-facet district filtering, and instant emergency ambulance booking with 4-step dispatch tracking. |

---

<a id="verified-healthcare-facility-coverage"></a>
## 🏥 Verified Healthcare Facility Coverage

MedWatch West Bengal monitors **exactly 74 healthcare facilities** (44 Rural BPHCs, 10 District Hospitals, 20 State Medical Colleges) with verified GPS coordinates and ward distributions spanning all **23 Districts of West Bengal**:

```
┌────────────────────────────────────────────────────────────────────────┐
│           WEST BENGAL HEALTHCARE NETWORK COVERAGE (74 TOTAL)           │
├────────────────────────┬──────────────────────┬────────────────────────┤
│  20 State Medical      │  10 District         │  44 Rural Block        │
│  Colleges & Hospitals  │  Hospitals           │  Primary Health        │
│  (Tertiary Care)       │  (Secondary Care)    │  Centres (BPHCs)       │
└────────────────────────┴──────────────────────┴────────────────────────┘
```

### Full Regional & District Coverage (All 23 Districts)
- **North Bengal:** Alipurduar, Cooch Behar, Darjeeling, Jalpaiguri, Kalimpong, Malda, Uttar Dinajpur, Dakshin Dinajpur.
- **Central & Western (Rarh / Junglemahal):** Bankura, Birbhum, Jhargram, Paschim Bardhaman, Purba Bardhaman, Paschim Medinipur, Purba Medinipur, Purulia.
- **Southern & Gangetic Plain:** Howrah, Hooghly, Kolkata, Murshidabad, Nadia, North 24 Parganas, South 24 Parganas.

Each facility record models:
- **Total vs. Occupied Beds:** Granular capacity metrics.
- **Progressive Ward Breakdown:** Dedicated real-time counters for Male, Female, and Maternity wards.
- **Essential Medicines Stockpile:** Paracetamol, Amoxicillin, Metformin, ORS, and Chloroquine reserves.
- **Immunization Cold-Chain:** COVID-19, Polio, and Hepatitis B vaccine reserves and pediatric demand tracking.

---

<a id="autonomous-multi-agent-ai-architecture"></a>
## 🤖 Autonomous Multi-Agent AI Architecture

MedWatch West Bengal embeds **4 autonomous watchdog AI agents** powered by **Google Gemini** (`gemini-3.5-flash-lite`). The agents perform continuous background surveillance, correlate multi-facility telemetry, and push actionable alerts directly into the Firestore real-time pipeline:

```
                      ┌───────────────────────────────────────┐
                      │    MedWatch Real-Time Telemetry       │
                      │  (74 Hospitals across 23 Districts)   │
                      └──────────────────┬────────────────────┘
                                         │
        ┌───────────────────┬────────────┴───────┬───────────────────┐
        ▼                   ▼                    ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌─────────────────┐  ┌─────────────────────┐
│ MedicineAgent │   │   BedAgent    │   │  EpidemicAgent  │  │MedicinesDemandAgent │
│ Stock Audits  │   │ Occupancy &   │   │ Outbreak Cluster│  │ Rural BPHC Buffer & │
│ (Every 5 min) │   │ Surge Buffer  │   │  Pattern Radar  │  │ Anti-Venom Demands  │
│               │   │ (Every 3 min) │   │ (Every 10 min)  │  │   (Agricultural)    │
└───────┬───────┘   └───────┬───────┘   └────────┬────────┘  └──────────┬──────────┘
        │                   │                    │                      │
        └───────────────────┼────────────────────┴──────────────────────┘
                            ▼
              ┌───────────────────────────┐
              │   Google Gemini Engine    │
              │  (Structured JSON Output) │
              └─────────────┬─────────────┘
                            ▼
              ┌───────────────────────────┐
              │ Firestore `agent_alerts`  │
              │  Real-Time Triage Banner  │
              └───────────────────────────┘
```

### 1. MedicineAgent (Medicine Supply Agent)
- **Surveillance Cadence:** Runs every 5 minutes.
- **Operational Scope:** Inspects pharmacy stock levels across all facilities for essential medications.
- **Triage Matrix:**
  - **HIGH Priority (< 20 units):** Imminent stockout risk; issues emergency 24-hour replenishment requisition from the central regional depot.
  - **MEDIUM Priority (< 50 units):** Low reserve warning; schedules stock fulfillment within 3 business days.
  - **LOW Priority (> 500 units):** Surplus detection; flags surplus supplies for inter-district reallocation to prevent drug expiration.

### 2. BedAgent (Hospital Bed Management Agent)
- **Surveillance Cadence:** Runs every 3 minutes.
- **Operational Scope:** Continuously computes bed saturation percentages across tertiary, secondary, and rural wards.
- **Triage Matrix:**
  - **HIGH Priority (≥ 85% occupancy):** Critical saturation; triggers emergency overflow protocols and alerts dispatchers to reroute incoming non-trauma cases.
  - **MEDIUM Priority (65% – 84% occupancy):** Moderate load; monitors admission velocity and readies standby surge beds.
  - **LOW Priority (< 25% occupancy):** Underutilized capacity; flags facility as an ideal receiving hub for patient transfer during district surges.

### 3. EpidemicAgent (Epidemic Early Warning Agent)
- **Surveillance Cadence:** Runs every 10 minutes.
- **Operational Scope:** Regional anomaly correlation engine detecting outbreak patterns before hospital triage becomes overwhelmed.
- **Detection Heuristics:**
  - **Cluster Bed Strain:** Detects if 3 or more facilities within the same district concurrently exceed 70% bed occupancy.
  - **Waterborne / Diarrheal Indicator:** Monitors concurrent rapid depletion of both Paracetamol and Oral Rehydration Salts (ORS) across contiguous blocks.
  - **Vector-Borne Indicator:** Detects localized depletion of Chloroquine in high-risk zones, signalling potential malaria or vector spikes.
- **Output:** Assigns an **Outbreak Risk Score (0–100)**, identifies the primary epicenter hospital, and issues immediate sanitary and medical containment guidance.

### 4. MedicinesDemandAgent (Rural Medicine Demand & Anti-Venom Watchdog)
- **Operational Scope:** Dedicated surveillance tailored to the **44 Rural Block Primary Health Centres (BPHCs)** serving agricultural communities.
- **Key Responsibilities:**
  - Computes district-level supply deficit indices and models seasonal agricultural risk factors (such as monsoon-induced snakebite surges).
  - Enforces mandatory minimum buffers for life-saving **Anti-Venom Serum (ASV)**, broad-spectrum pediatric antibiotics, and intravenous fluids.
  - Delivers dataset-grounded replenishment plans prioritized by rural accessibility.

---

## ⚡ Core Features & Platform Capabilities

### 🛡️ Administrative Command Center (`dashboard.html`)
- **Real-Time Synchronous Telemetry:** Live stats counters (Total Facilities, Active Critical Alerts, Available Beds, Districts under Emergency Declaration).
- **Interactive Geospatial Map:** Custom SVG map markers color-coded by capacity status (Green = Normal, Amber = Strained, Red = Critical/Emergency) with instant modal drilldown.
- **Inline Bed & Medicine Management:** In Edit Mode, administrators can modify bed occupancy, adjust pharmacy stock levels, update vaccine inventories, and log clinical notes directly into Firestore with optimistic local updates.
- **Emergency Declaration & AI Redistribution:** One-click emergency declaration triggers Gemini-powered algorithms that pair strained hospitals with neighboring facilities having surplus beds and supplies using Haversine distance calculations.
- **Audit History Logging:** Transparent, tamper-evident audit logging recording every bed update, alert resolution, and emergency status change with timestamps and administrative identities.
- **Operational Reporting:** One-click printable briefing generation and dynamic CSV export for inter-departmental situation reports.

### 📱 Citizen Emergency Portal (`user-view.html`)
- **Mobile-First Responsive Interface:** High-contrast, clean layout designed for field emergency accessibility.
- **Geolocation "Find Nearest Care":** Calculates exact distance to all 74 facilities using the Haversine formula and sorts facilities by proximity.
- **Progressive Ward Visibility:** Citizens can see live availability for Male, Female, and Maternity wards before travelling.
- **Multi-Facet Search & Filtering:** Filter by facility type (State Medical College, District Hospital, Rural BPHC), search by hospital or district name, and quick-filter by district chips.
- **Emergency Ambulance Booking Simulator:**
  - Dynamic ambulance fleet directory with driver details, ambulance tiers (Basic Life Support, Advanced Life Support, Patient Transport), and contact channels.
  - 4-step live dispatch state machine: *Request Received* ➔ *Driver Assigned* ➔ *En Route to Patient* ➔ *Arrived on Scene*.
  - Live simulated ETA countdown and direct phone dispatch trigger (`tel:`).

---

<a id="automated-quality-assurance--testing"></a>
## 🧪 Automated Quality Assurance & Testing

MedWatch West Bengal features an automated **27-suite zero-regression test harness** (`scripts/verify-integrity.js`) that validates architectural consistency, DOM bindings, mathematical formulas, and end-to-end workflows.

### Running Integrity Tests
Execute the automated test runner using npm or Node.js:

```bash
# Run via standard npm test
npm test

# Or directly via Node.js
node scripts/verify-integrity.js
```

### Test Suite Architecture (27 Tests Across 4 Tiers)

```
▶ Tier 1: Feature Coverage & Architectural Integrity
  ✔ Tier 1.1: Citizen Portal Static DOM IDs Integrity (All 36 IDs)
  ✔ Tier 1.2: Admin Dashboard Static DOM IDs Integrity (All 70+ IDs)
  ✔ Tier 1.3: Route Security Guards Execution & Redirection Logic
  ✔ Tier 1.4: Citizen Portal Function Declarations & Signatures (All 22 Functions)
  ✔ Tier 1.5: Admin Dashboard Function Declarations & Signatures (All 34 Core Functions)
  ✔ Tier 1.6: Firestore Collections & Real-time onSnapshot Bindings
  ✔ Tier 1.7: Cross-System Custom Event Wiring
  ✔ Tier 1.8: Global Window Hooks Export Integrity
  ✔ Tier 1.9: Interactive Element Accessibility & ARIA Attributes

▶ Tier 2: Boundary & Corner Cases
  ✔ Tier 2.1: Bed Calculation Boundaries (0 beds, 100% occupancy, over-capacity overflow)
  ✔ Tier 2.2: Ward Allocation Math & Capacity Distribution
  ✔ Tier 2.3: Haversine Geolocation Distance Formula & Extreme Geographical Boundaries
  ✔ Tier 2.4: Real-time Search Edge Cases (Special characters, whitespace, case insensitivity)
  ✔ Tier 2.5: Geolocation Denied / Unavailable Fallback
  ✔ Tier 2.6: Ambulance Dispatch State Machine Boundaries
  ✔ Tier 2.7: Input Validation Boundaries on Inline Bed Updates

▶ Tier 3: Cross-Feature Combinations
  ✔ Tier 3.1: Multi-Facet Filter Combinations (District + Category + Search)
  ✔ Tier 3.2: Geolocation Sorting Combined with Search & Free Bed Availability
  ✔ Tier 3.3: Emergency Declaration + AI Redistribution Pipeline Event Trigger
  ✔ Tier 3.4: Emergency Lift Protocol + State Reversion
  ✔ Tier 3.5: Read/Edit Mode Switching + LocalStorage Persistence
  ✔ Tier 3.6: Targeted Ambulance Booking from Specific Hospital Card
  ✔ Tier 3.7: Audit Trail Integration with Bed Updates & History Logging

▶ Tier 4: Real-World Scenarios & End-to-End Workflows
  ✔ Tier 4.1: Citizen Emergency Triage Workflow (Role Check -> Find Care -> Progressive Ward -> Ambulance Booking -> Dispatch -> Call)
  ✔ Tier 4.2: Admin Crisis Response & Resource Management Workflow
  ✔ Tier 4.3: Clean Script Syntax & Compilation Verification across HTML Files
  ✔ Tier 4.4: Design System Tokens & Responsive Clinical Layout Verification in style.css

ℹ tests 27 | suites 4 | pass 27 | fail 0 | 100% pass rate
```

---

## 🛠️ Technology Stack

| Layer | Technologies Used | Description |
|---|---|---|
| **Frontend** | HTML5, CSS3, Vanilla ES6+ JavaScript | Zero external JavaScript frameworks. Ultra-fast, lightweight clinical dashboard. |
| **Design System** | CSS Custom Properties, Inter Font System | Medical UI color tokens, responsive CSS Grid / Flexbox layouts, accessible ARIA roles. |
| **Database & Realtime** | Google Firebase Firestore | Cloud NoSQL collections for hospitals, AI alerts, audit logs, and ambulance dispatch states. |
| **Artificial Intelligence** | Google Gemini API (`gemini-3.5-flash-lite`) | Multi-agent reasoning, epidemic pattern detection, and supply chain redistribution planning. |
| **Geospatial & Mapping** | Google Maps JavaScript API | Interactive hospital markers, district-level views, and Haversine distance computations. |
| **Hosting & CI/CD** | Firebase Hosting & GitHub Actions | Global CDN distribution with SSL encryption and automated deployment pipelines. |

---

## 💻 Local Development Setup

### Prerequisites
- Node.js 18.0.0 or higher
- Git

### Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone https://github.com/shreejitchakraborty9-arch/med-care.git
   cd med-care
   ```

2. **Configure Environment Keys:**
   Create an `env-config.js` file in the root directory (or run `node create-env.js` with your environment variables configured):
   ```javascript
   window.ENV = {
     FIREBASE_API_KEY: "your_firebase_api_key",
     GEMINI_API_KEY: "your_gemini_api_key",
     MAPS_API_KEY: "your_google_maps_api_key",
     GEMINI_MODEL: "gemini-3.5-flash-lite"
   };
   ```

3. **Run the Integrity Test Suite:**
   ```bash
   npm test
   # or
   node scripts/verify-integrity.js
   ```

4. **Launch Local Server:**
   ```bash
   npx serve . -p 3000
   ```
   Open `http://localhost:3000` in your web browser.

---

## 🏆 Hackathon Submission Metadata

- **Competition:** HackToSkill Hackathon
- **Track:** Track 03 — Smart Health & Supply Chain Resilience
- **Target Organization:** Department of Health & Family Welfare, Government of West Bengal
- **Live Deployment:** [https://the-med-care.web.app](https://the-med-care.web.app)
- **Repository:** Clean, audited, 100% test-verified open-source implementation.
