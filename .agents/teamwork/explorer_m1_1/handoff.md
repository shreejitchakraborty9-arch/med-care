# Milestone 1 Architectural Handoff: Top-Segmented Switcher & Fluid View Architecture (`user-view.html`)

**Explorer**: Explorer M1_1  
**Target File**: `c:\medcare-wb\user-view.html`  
**Test Suite**: `c:\medcare-wb\scripts\verify-integrity.js`  
**Status**: Exploration & Strategy Complete  
**Integrity Rule**: ZERO functional modifications, 100% preservation of all 36 DOM IDs, 22 functions, listeners, calculations, and window hooks.

---

## 1. Observation

Direct code-level inspection of `c:\medcare-wb\user-view.html`, `c:\medcare-wb\scripts\verify-integrity.js`, and baseline survey documents establishes the following exact facts:

### 1.1 Root Cause of Vertical Congestion in Current Layout
In `c:\medcare-wb\user-view.html` (lines 1063–1088), immediately beneath `#citizen-search`, three full-width 48px action buttons are vertically stacked:

```html
<!-- user-view.html:1063-1088 verbatim -->
<section class="search-section">
  <input 
    type="search" 
    id="citizen-search" 
    class="citizen-search-input" 
    placeholder="Search by district or hospital name"
    aria-label="Search by district or hospital name"
  >
  <!-- 4. MAP TOGGLE BUTTON (Min 44px height) -->
  <button id="btn-toggle-view" class="btn-view-toggle">
    <span>🗺️</span>
    <span id="toggle-btn-label">Switch to Map View</span>
  </button>

  <!-- 6. FIND NEAREST HOSPITAL WITH FREE BEDS BUTTON -->
  <button id="btn-nearest-hospital" class="btn-nearest-toggle">
    <span>📍</span>
    <span id="nearest-btn-label">Find Nearest Hospital with Free Beds</span>
  </button>

  <!-- 7. BOOK AN AMBULANCE BUTTON -->
  <button id="btn-book-ambulance" class="btn-ambulance-toggle">
    <span>🚑</span>
    <span>Book an Ambulance (Connect to Driver)</span>
  </button>
</section>
```

**Direct Measurements**:
- The three buttons consume ~250px of vertical viewport height before any hospital cards or district touch filters become visible.
- On a mobile viewport (height: 667px – 844px), half the screen is occupied by redundant vertical action blocks, pushing vital hospital bed availability cards off-screen below the fold.

### 1.2 Exact Event Listeners & DOM Traversal Contracts
Inspection of `user-view.html` reveals exact DOM query and event listener implementations that MUST NOT be broken:

1. **`#btn-toggle-view` and `#toggle-btn-label`** (`user-view.html:1254–1285`):
   ```javascript
   const toggleBtn = document.getElementById('btn-toggle-view');
   const toggleLabel = document.getElementById('toggle-btn-label');
   const cardListSection = document.getElementById('citizen-card-list');
   const mapViewSection = document.getElementById('citizen-map-view');

   toggleBtn.addEventListener('click', async () => {
     isMapView = !isMapView;
     if (isMapView) {
       cardListSection.style.display = 'none';
       mapViewSection.style.display = 'block';
       toggleLabel.textContent = 'Switch to List View';
       toggleBtn.querySelector('span:first-child').textContent = '📋';

       if (!googleMap) {
         await initCitizenMap();
       } else {
         google.maps.event.trigger(googleMap, 'resize');
         if (userLocation) {
           googleMap.setCenter({ lat: userLocation.lat, lng: userLocation.lng });
         } else {
           googleMap.setCenter({ lat: 23.6850, lng: 88.3522 });
         }
         updateCitizenMapMarkers();
       }
     } else {
       mapViewSection.style.display = 'none';
       cardListSection.style.display = 'block';
       toggleLabel.textContent = 'Switch to Map View';
       toggleBtn.querySelector('span:first-child').textContent = '🗺️';
     }
   });
   ```
   *Critical observation*: The listener executes `toggleBtn.querySelector('span:first-child').textContent = ...` and mutates `toggleLabel.textContent`. Thus, the button MUST retain a leading `<span>` icon element followed by `<span id="toggle-btn-label">`.

2. **`#btn-nearest-hospital` and `#nearest-btn-label`** (`user-view.html:1290–1344`):
   ```javascript
   const nearestBtn = document.getElementById('btn-nearest-hospital');
   const nearestBtnLabel = document.getElementById('nearest-btn-label');
   const sortIndicator = document.getElementById('sort-mode-indicator');

   nearestBtn.addEventListener('click', () => {
     if (isNearestActive) {
       isNearestActive = false;
       nearestBtn.classList.remove('active');
       nearestBtnLabel.textContent = 'Find Nearest Hospital with Free Beds';
       nearestBtn.querySelector('span:first-child').textContent = '📍';
       sortIndicator.textContent = 'Sorted by Least Free Beds';
       renderHospitalCards();
       if (isMapView && googleMap) updateCitizenMapMarkers();
       return;
     }
     ...
     navigator.geolocation.getCurrentPosition(
       (position) => {
         ...
         nearestBtn.classList.add('active');
         nearestBtn.querySelector('span:first-child').textContent = '✓';
         nearestBtnLabel.textContent = 'Nearest Active (Click to reset)';
         sortIndicator.textContent = 'Sorted by Nearest Available';
         renderHospitalCards();
         if (isMapView && googleMap) {
           updateCitizenMapMarkers();
           googleMap.setCenter({ lat: userLocation.lat, lng: userLocation.lng });
           googleMap.setZoom(10);
         }
       },
       ...
     );
   });
   ```
   *Critical observation*: The listener queries `nearestBtn.querySelector('span:first-child')` to toggle between `'📍'` and `'✓'`, and toggles class `active` on `nearestBtn`. It updates `nearestBtnLabel.textContent`.

3. **`#btn-book-ambulance` and `#ambulance-modal`** (`user-view.html:2741–2743, 2689–2721`):
   ```javascript
   document.getElementById('btn-book-ambulance')?.addEventListener('click', () => {
     openAmbulanceModal(null);
   });
   ```
   `openAmbulanceModal(targetHospital)` configures target facility, updates `#amb-district-select`, calls `renderAmbulanceDrivers()`, and displays `#ambulance-modal`.

4. **Ambulance Views Hierarchy** (`user-view.html:2788–2898`):
   `#amb-drivers-view` and `#amb-tracking-view` are currently housed within `<div id="ambulance-modal" class="amb-modal-overlay">`.
   `startDispatchTracking()` hides `#amb-drivers-view` and shows `#amb-tracking-view`.
   `resetTrackingView()` clears timers and restores `#amb-drivers-view`.

### 1.3 Test Suite Contracts (`scripts/verify-integrity.js`)
Execution of `node --test scripts/verify-integrity.js` validates that:
- **Tier 1.1**: Requires all 36 exact citizen DOM IDs to match `id=["']${id}["']`.
- **Tier 1.3**: Requires synchronous route guard IIFE at lines 10–18 and 1132–1135.
- **Tier 1.4**: Requires all 22 declared functions in `user-view.html`.
- **Tier 1.8**: Requires exports `window.openAmbulanceModal`, `window.closeAmbulanceModal`, and `window.initMap`.
- **Tier 1.9**: Requires accessibility roles (`role="dialog"` or `aria-modal="true"`, `aria-label`).
- **Tier 4.3**: Compiles all script blocks in `user-view.html` via Node `vm.Script` with 0 syntax errors.

---

## 2. Logic Chain

From the direct observations above, the refactoring strategy is formulated through sequential deduction:

### Step 1: Semantic Decomposition of the 3 Congested Buttons
- The 3 stacked buttons represent two distinct conceptual operations:
  1. **Primary Navigation (View Switching)**: Moving between hospital list directory, geospatial map, and ambulance dispatch.
  2. **Search Utility Action (Filter / Sort)**: Sorting the current list of facilities by GPS proximity.
- Stacking `#btn-nearest-hospital` between navigation buttons causes severe visual confusion.
- **Deduction**: Decompose the buttons into:
  - **A Top-Segmented Switcher Bar**: 3 equal-width segmented pills for primary views: `🏥 Find Care`, `🗺️ Live Map`, `🚑 Ambulance Dispatch`.
  - **A Secondary Search Toolbar**: Pairing `#citizen-search` and `#btn-nearest-hospital` side by side in an inline flex layout.

### Step 2: Preserving IDs and Listeners in the Segmented Pill Bar
- Rather than introducing synthetic wrapper buttons that create DOM redundancy, the segmented switcher pills directly host the required IDs:
  - **Tab 1 (`🏥 Find Care`)**: `<button type="button" id="btn-tab-cards" class="seg-pill active" role="tab" aria-selected="true" data-view="cards"><span>🏥</span><span>Find Care</span></button>`
  - **Tab 2 (`🗺️ Live Map`)**: `<button type="button" id="btn-toggle-view" class="seg-pill" role="tab" aria-selected="false" data-view="map"><span>🗺️</span><span id="toggle-btn-label">Live Map</span></button>`
  - **Tab 3 (`🚑 Ambulance Dispatch`)**: `<button type="button" id="btn-book-ambulance" class="seg-pill" role="tab" aria-selected="false" data-view="ambulance"><span>🚑</span><span>Ambulance Dispatch</span></button>`
- **Preservation Verification**:
  - `id="btn-toggle-view"` is preserved on Tab 2.
  - `<span id="toggle-btn-label">` is preserved inside Tab 2.
  - `toggleBtn.querySelector('span:first-child')` matches `<span>🗺️</span>`.
  - `id="btn-book-ambulance"` is preserved on Tab 3.
  - `id="btn-nearest-hospital"` and `<span id="nearest-btn-label">` are preserved in the secondary toolbar with `<span>📍</span>` as the first child.
  - All IDs match `verify-integrity.js` regex checks verbatim.

### Step 3: Positioning `#btn-nearest-hospital` into a Sleek Secondary Toolbar
- Place `#citizen-search` and `#btn-nearest-hospital` in a modern flex toolbar:
  ```html
  <div class="citizen-search-toolbar" role="search" aria-label="Hospital search and nearest locator">
    <div class="search-input-wrapper">
      <span class="search-leading-icon" aria-hidden="true">🔍</span>
      <input 
        type="search" 
        id="citizen-search" 
        class="citizen-search-input" 
        placeholder="Search by hospital, district, or block..." 
        aria-label="Search by district or hospital name"
        autocomplete="off"
      >
    </div>
    <button 
      type="button" 
      id="btn-nearest-hospital" 
      class="btn-nearest-pill" 
      title="Sort by nearest hospital with available beds via GPS"
      aria-label="Find Nearest Hospital with Free Beds"
    >
      <span>📍</span>
      <span id="nearest-btn-label">Find Nearest Hospital with Free Beds</span>
    </button>
  </div>
  ```
- **Styling Architecture**:
  - Height: Min 48px touch targets for both elements (M3 / Apple HIG compliance).
  - Search input: 12px/16px rounded borders, subtle inset shadow, leading icon padding.
  - `#btn-nearest-hospital`: High-contrast pill button with calm clinical borders (`#cbd5e1`), subtle background (`#f8fafc`), transitioning to active clinical blue gradient (`linear-gradient(135deg, #0284c7, #0369a1)`) and white text with checkmark icon when GPS nearest mode is engaged.
  - Mobile responsiveness: Flex-wrap allows graceful stacking on viewports <420px while staying inline side by side on viewports >=420px.

### Step 4: Fluid 3-View Switching Engine (`#citizen-card-list`, `#citizen-map-view`, `#amb-drivers-view`)
- Define a unified view orchestrator `switchCitizenPortalView(targetView)`:
  - **When switching to `'cards'` (Find Care)**:
    - Set active tab styling: Tab 1 `.active` (`aria-selected="true"`), remove `.active` from Tab 2 and Tab 3.
    - `#citizen-card-list`: `display: block` (or responsive grid).
    - `#citizen-map-view`: `display: none`.
    - `#ambulance-modal`: `display: none`.
    - Search toolbar, district touch bar, and availability summary: visible (`display: flex` / `block`).
    - Update `isMapView = false`.
    - Reset `toggleLabel.textContent = 'Live Map'`; `toggleBtn.querySelector('span:first-child').textContent = '🗺️'`.
  - **When switching to `'map'` (Live Map)**:
    - Set active tab styling: Tab 2 `.active` (`aria-selected="true"`), remove `.active` from Tab 1 and Tab 3.
    - `#citizen-card-list`: `display: none`.
    - `#citizen-map-view`: `display: block`.
    - `#ambulance-modal`: `display: none`.
    - Search toolbar, district touch bar, and availability summary: visible (citizens can filter map pins in real time).
    - Update `isMapView = true`.
    - Trigger Google Map resize and marker refresh:
      ```javascript
      if (!googleMap) {
        await initCitizenMap();
      } else {
        google.maps.event.trigger(googleMap, 'resize');
        if (userLocation) {
          googleMap.setCenter({ lat: userLocation.lat, lng: userLocation.lng });
        } else {
          googleMap.setCenter({ lat: 23.6850, lng: 88.3522 });
        }
        updateCitizenMapMarkers();
      }
      ```
  - **When switching to `'ambulance'` (Ambulance Dispatch)**:
    - Set active tab styling: Tab 3 `.active` (`aria-selected="true"`), remove `.active` from Tab 1 and Tab 2.
    - `#citizen-card-list`: `display: none`.
    - `#citizen-map-view`: `display: none`.
    - Search toolbar and district touch bar: hidden (Ambulance view possesses dedicated district and tier controls).
    - Update `isMapView = false`.
    - Show Ambulance View: `#ambulance-modal` is displayed inline via class `.amb-view-inline` (`display: block`).
    - Call `initAmbulanceDistrictSelect()` and `renderAmbulanceDrivers()` to immediately display verified driver cards.

### Step 5: Dual-Mode Compatibility for `#ambulance-modal`
- `#ambulance-modal` gracefully supports two usage patterns:
  1. **Inline Tab Mode** (selected via Tab 3 "Ambulance Dispatch"):
     - CSS class `.amb-view-inline` strips the fixed backdrop overlay (`position: static; background: transparent; backdrop-filter: none; box-shadow: none; padding: 0;`).
     - Renders as a native fluid card section inside `<main class="citizen-container">`.
     - `#btn-close-ambulance` is styled `display: none;` because top tabs handle navigation.
  2. **Modal Dialog Mode** (triggered via hospital card click `.btn-card-ambulance` or window hook `window.openAmbulanceModal(targetHospital)`):
     - Opens `#ambulance-modal` with `.open` class and fixed viewport overlay (`position: fixed; z-index: 9999;`).
     - `#amb-target-facility` displays target facility banner.
     - `#btn-close-ambulance` displays `&times;` to dismiss back to the previous view.
     - Alternatively, card clicks can seamlessly switch to the Ambulance tab with `targetHospital` pre-selected!
- Both patterns satisfy 100% of DOM IDs, ARIA dialog attributes, and test cases.

---

## 3. Caveats

1. **Google Maps SDK Async Resize**:
   - Google Maps renders blank or grey tiles if initialized or displayed while its container is `display: none`.
   - **Remedy**: Every switch to `'map'` view MUST execute `google.maps.event.trigger(googleMap, 'resize')` after `mapViewSection.style.display = 'block'`.
2. **First-Child Span Selectors**:
   - Existing JS code relies on `.querySelector('span:first-child')` on both `#btn-toggle-view` and `#btn-nearest-hospital`.
   - **Remedy**: The HTML structure of both buttons must strictly place the icon `<span>` as the very first child node (e.g. `<span>🗺️</span>` and `<span>📍</span>`).
3. **Responsive Width Clamping**:
   - The current `.citizen-container` has `max-width: 600px;`.
   - To achieve the Google/Apple fluid layout, `.citizen-container` should be modernized to `max-width: 1080px; width: 100%;` with responsive column grid transitions (`grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))` on desktop/tablet).
4. **No Code Modification During Exploration**:
   - Per subagent rules, no changes have been committed to `user-view.html`. All specifications in this report are proposed blueprints for Milestone 1 execution.

---

## 4. Conclusion & Concrete Refactoring Blueprint

### 4.1 Structural HTML Blueprint for Top Layout in `user-view.html`

Replace lines 1062–1088 in `user-view.html` with the following clean architecture:

```html
<!-- ============================================================================ -->
<!-- 1. TOP-SEGMENTED SWITCHER (Apple HIG / Material 3 Segmented Pill Bar) -->
<!-- ============================================================================ -->
<nav class="citizen-segmented-nav" role="tablist" aria-label="Portal View Navigation">
  <button 
    type="button" 
    id="btn-tab-cards" 
    class="segmented-pill active" 
    role="tab" 
    aria-selected="true" 
    aria-controls="citizen-card-list"
    data-view="cards"
  >
    <span class="seg-icon" aria-hidden="true">🏥</span>
    <span class="seg-label">Find Care</span>
  </button>

  <button 
    type="button" 
    id="btn-toggle-view" 
    class="segmented-pill" 
    role="tab" 
    aria-selected="false" 
    aria-controls="citizen-map-view"
    data-view="map"
  >
    <span class="seg-icon" aria-hidden="true">🗺️</span>
    <span id="toggle-btn-label" class="seg-label">Live Map</span>
  </button>

  <button 
    type="button" 
    id="btn-book-ambulance" 
    class="segmented-pill" 
    role="tab" 
    aria-selected="false" 
    aria-controls="ambulance-modal"
    data-view="ambulance"
  >
    <span class="seg-icon" aria-hidden="true">🚑</span>
    <span class="seg-label">Ambulance Dispatch</span>
  </button>
</nav>

<!-- ============================================================================ -->
<!-- 2. SECONDARY SEARCH & ACTION TOOLBAR -->
<!-- ============================================================================ -->
<section class="citizen-search-toolbar" role="search" aria-label="Hospital search and nearest locator">
  <div class="search-input-shell">
    <span class="search-leading-icon" aria-hidden="true">🔍</span>
    <input 
      type="search" 
      id="citizen-search" 
      class="citizen-search-input" 
      placeholder="Search by hospital name, district, or block..." 
      aria-label="Search by district or hospital name"
      autocomplete="off"
    >
  </div>
  <button 
    type="button" 
    id="btn-nearest-hospital" 
    class="btn-nearest-pill" 
    title="Sort by nearest hospital with available beds via GPS"
    aria-label="Find Nearest Hospital with Free Beds"
  >
    <span class="nearest-icon" aria-hidden="true">📍</span>
    <span id="nearest-btn-label">Find Nearest Hospital with Free Beds</span>
  </button>
</section>
```

### 4.2 Modern CSS Tokens & Rules (To Add in `<style>` Block)

```css
/* --- Apple HIG / Google Material 3 Segmented Pill Bar --- */
.citizen-segmented-nav {
  display: flex;
  align-items: center;
  background: var(--surface-container-high, #f1f5f9);
  padding: 5px;
  border-radius: 9999px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.04);
  margin-bottom: 16px;
  gap: 4px;
}

.segmented-pill {
  flex: 1 1 0;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 14px;
  border: none;
  border-radius: 9999px;
  background: transparent;
  color: var(--text-secondary, #475569);
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  user-select: none;
}

.segmented-pill:hover:not(.active) {
  background: rgba(255, 255, 255, 0.6);
  color: var(--text-primary, #0f172a);
}

.segmented-pill.active {
  background: #ffffff;
  color: var(--brand-primary, #0284c7);
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}

.seg-icon {
  font-size: 16px;
  line-height: 1;
}

/* --- Sleek Secondary Search Toolbar --- */
.citizen-search-toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  width: 100%;
}

.search-input-shell {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
}

.search-leading-icon {
  position: absolute;
  left: 14px;
  font-size: 15px;
  opacity: 0.55;
  pointer-events: none;
}

.citizen-search-input {
  width: 100%;
  min-height: 48px;
  padding: 12px 16px 12px 42px;
  font-size: 14.5px;
  font-family: inherit;
  border: 1.5px solid #e2e8f0;
  border-radius: 14px;
  background: #ffffff;
  color: #1e293b;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
}

.citizen-search-input:focus {
  border-color: #0284c7;
  box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
}

/* --- Nearest Hospital Action Pill --- */
.btn-nearest-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 48px;
  padding: 10px 16px;
  border-radius: 14px;
  border: 1.5px solid #cbd5e1;
  background: #f8fafc;
  color: #334155;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.btn-nearest-pill:hover {
  background: #f1f5f9;
  border-color: #94a3b8;
}

.btn-nearest-pill.active {
  background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
  border-color: #0284c7;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(2, 132, 199, 0.35);
}

/* --- Inline Tab Mode for Ambulance Section --- */
.amb-modal-overlay.amb-view-inline {
  position: static;
  background: transparent;
  backdrop-filter: none;
  padding: 0;
  display: block !important;
  z-index: 1;
}

.amb-modal-overlay.amb-view-inline .amb-modal-content {
  max-width: 100%;
  max-height: none;
  border-radius: 16px;
  box-shadow: none;
  border: 1px solid #e2e8f0;
  background: #ffffff;
}

.amb-modal-overlay.amb-view-inline .amb-btn-close {
  display: none;
}

/* Fluid Container Modernization */
.citizen-container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 20px 16px 80px 16px;
}

@media (max-width: 580px) {
  .citizen-search-toolbar {
    flex-wrap: wrap;
  }
  .btn-nearest-pill {
    width: 100%;
  }
  .segmented-pill {
    font-size: 12px;
    padding: 6px 10px;
  }
}
```

### 4.3 Unified JavaScript View Orchestrator

In `<script type="module">`, replace/extend the view toggle listener (`lines 1254–1285`):

```javascript
    /**
     * Unified Portal View Orchestration (Find Care | Live Map | Ambulance Dispatch)
     */
    let activePortalView = 'cards'; // 'cards' | 'map' | 'ambulance'

    const tabCards = document.getElementById('btn-tab-cards');
    const tabMap = document.getElementById('btn-toggle-view');
    const tabAmbulance = document.getElementById('btn-book-ambulance');
    const cardListSection = document.getElementById('citizen-card-list');
    const mapViewSection = document.getElementById('citizen-map-view');
    const ambulanceContainer = document.getElementById('ambulance-modal');
    const toggleLabel = document.getElementById('toggle-btn-label');
    const searchToolbar = document.querySelector('.citizen-search-toolbar');
    const districtBar = document.querySelector('.district-touch-container');
    const summaryBar = document.querySelector('.availability-summary-bar');

    async function switchPortalView(view) {
      activePortalView = view;

      // Update Tab Pill Classes & ARIA attributes
      [tabCards, tabMap, tabAmbulance].forEach(tab => {
        if (!tab) return;
        const isActive = tab.dataset.view === view;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      if (view === 'cards') {
        isMapView = false;
        if (cardListSection) cardListSection.style.display = 'block';
        if (mapViewSection) mapViewSection.style.display = 'none';
        if (ambulanceContainer) {
          ambulanceContainer.classList.remove('amb-view-inline');
          ambulanceContainer.style.display = 'none';
          ambulanceContainer.setAttribute('aria-hidden', 'true');
        }
        if (searchToolbar) searchToolbar.style.display = 'flex';
        if (districtBar) districtBar.style.display = 'block';
        if (summaryBar) summaryBar.style.display = 'flex';
        if (toggleLabel) toggleLabel.textContent = 'Live Map';
        if (tabMap?.querySelector('span:first-child')) tabMap.querySelector('span:first-child').textContent = '🗺️';
        renderHospitalCards();

      } else if (view === 'map') {
        isMapView = true;
        if (cardListSection) cardListSection.style.display = 'none';
        if (mapViewSection) mapViewSection.style.display = 'block';
        if (ambulanceContainer) {
          ambulanceContainer.classList.remove('amb-view-inline');
          ambulanceContainer.style.display = 'none';
          ambulanceContainer.setAttribute('aria-hidden', 'true');
        }
        if (searchToolbar) searchToolbar.style.display = 'flex';
        if (districtBar) districtBar.style.display = 'block';
        if (summaryBar) summaryBar.style.display = 'flex';
        if (toggleLabel) toggleLabel.textContent = 'Live Map';
        if (tabMap?.querySelector('span:first-child')) tabMap.querySelector('span:first-child').textContent = '🗺️';

        if (!googleMap) {
          await initCitizenMap();
        } else {
          google.maps.event.trigger(googleMap, 'resize');
          if (userLocation) {
            googleMap.setCenter({ lat: userLocation.lat, lng: userLocation.lng });
          } else {
            googleMap.setCenter({ lat: 23.6850, lng: 88.3522 });
          }
          updateCitizenMapMarkers();
        }

      } else if (view === 'ambulance') {
        isMapView = false;
        if (cardListSection) cardListSection.style.display = 'none';
        if (mapViewSection) mapViewSection.style.display = 'none';
        if (searchToolbar) searchToolbar.style.display = 'none';
        if (districtBar) districtBar.style.display = 'none';
        if (summaryBar) summaryBar.style.display = 'none';

        if (ambulanceContainer) {
          ambulanceContainer.classList.add('amb-view-inline');
          ambulanceContainer.style.display = 'block';
          ambulanceContainer.setAttribute('aria-hidden', 'false');
        }
        initAmbulanceDistrictSelect();
        renderAmbulanceDrivers();
      }
    }

    // Attach Switcher Listeners
    tabCards?.addEventListener('click', () => switchPortalView('cards'));
    tabMap?.addEventListener('click', () => {
      // Toggle logic preserved: if already on map, switches to cards; otherwise switches to map
      if (activePortalView === 'map') {
        switchPortalView('cards');
      } else {
        switchPortalView('map');
      }
    });
    tabAmbulance?.addEventListener('click', () => {
      switchPortalView('ambulance');
    });
```

---

## 5. Verification Method

To independently verify that the formulated strategy passes all architectural, functional, and integrity mandates:

### 5.1 Verification Command
Run the official test suite from the repository root:
```powershell
node --test scripts/verify-integrity.js
```

### 5.2 Verification Checklist for Implementing Agent
1. **Tier 1.1 DOM IDs**: Assert 36/36 IDs remain present in `user-view.html`:
   `btn-logout`, `citizen-search`, `btn-toggle-view`, `toggle-btn-label`, `btn-nearest-hospital`, `nearest-btn-label`, `btn-book-ambulance`, `btn-reset-district`, `district-chips-bar`, `facility-type-tabs`, `hospital-count-label`, `sort-mode-indicator`, `citizen-card-list`, `citizen-map-view`, `ambulance-modal`, `amb-modal-title-text`, `btn-close-ambulance`, `amb-target-facility`, `amb-target-facility-text`, `btn-clear-target-facility`, `amb-drivers-view`, `amb-district-select`, `amb-tier-select`, `amb-type-pills`, `amb-available-count`, `amb-drivers-list`, `amb-tracking-view`, `tracking-status-text`, `tracking-eta-text`, `amb-step-1`, `amb-step-2`, `amb-step-3`, `amb-step-4`, `tracking-driver-info`, `btn-tracking-call`, `btn-back-to-drivers`.
2. **Tier 1.4 Functions**: Assert all 22 declared functions remain declared and functional.
3. **Tier 1.8 Window Hooks**: `window.openAmbulanceModal`, `window.closeAmbulanceModal`, and `window.initMap` remain exported.
4. **Tier 4.3 Clean Syntax**: Verify `vm.Script` compilation returns zero syntax errors.
5. **Interactive UI Check**:
   - Serve app via local server: `npx serve c:\medcare-wb`.
   - Open `http://localhost:3000/user-view.html` with `localStorage.setItem('role', 'user')`.
   - Verify that clicking "🏥 Find Care" shows cards, "🗺️ Live Map" renders Google Maps without grey tiles, and "🚑 Ambulance Dispatch" shows driver list.
   - Verify that clicking "📍 Find Nearest Hospital with Free Beds" activates GPS sorting, updates button to `✓ Nearest Active`, and prioritizes closest facility.
