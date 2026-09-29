// map.js - Interactive Google Maps Engine for West Bengal Hospitals

window.initMap = window.initMap || function() {};

// Graceful fallback handler for Google Maps authentication / RefererNotAllowedMapError
window.gm_authFailure = function() {
  console.warn("Google Maps Auth Notice: RefererNotAllowedMapError or key restriction. Rendering West Bengal Spatial Grid fallback.");
  const container = document.getElementById("map");
  if (container && window._latestHospitals && typeof renderMapFallback === "function") {
    renderMapFallback(container, window._latestHospitals);
  }
};

let mapInstance = null;
let markersMap = new Map(); // hospital.id -> google.maps.Marker
let activeInfoWindow = null;
let emergencyCallback = null;

/**
 * Retrieves the MAPS_API_KEY from window.ENV or environment
 */
function getMapsApiKey() {
  if (typeof window !== "undefined" && window.ENV && window.ENV.MAPS_API_KEY) {
    return window.ENV.MAPS_API_KEY.trim();
  }
  if (typeof process !== "undefined" && process.env?.MAPS_API_KEY) {
    return process.env.MAPS_API_KEY.trim();
  }
  return "";
}

/**
 * Dynamically loads the Google Maps JavaScript API script
 */
function loadGoogleMapsApi(apiKey) {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps && window.google.maps.Map) {
      return resolve(window.google.maps);
    }

    const prevInit = window.initMap;
    window.initMap = () => {
      if (typeof prevInit === "function") prevInit();
      resolve(window.google.maps);
    };

    const existing = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.google.maps));
      return;
    }

    const script = document.createElement("script");
    const keyParam = apiKey ? `key=${apiKey}&` : "";
    script.src = `https://maps.googleapis.com/maps/api/js?${keyParam}callback=initMap&loading=async`;
    script.async = true;
    script.defer = true;

    script.onerror = (err) => {
      reject(new Error("Failed to load Google Maps JavaScript API script: " + err));
    };

    document.head.appendChild(script);
  });
}

/**
 * Generates an SVG pin marker with occupancy coloring and pulsating animation for emergencies
 */
function getMarkerIcon(colorHex, isEmergency) {
  if (isEmergency) {
    // Blinking animated SVG pin for active emergency
    const svgBlinking = `
      <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38">
        <circle cx="19" cy="19" r="17" fill="%23d32f2f" opacity="0.3">
          <animate attributeName="r" values="8;18;8" dur="1s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.9;0.1;0.9" dur="1s" repeatCount="indefinite"/>
        </circle>
        <circle cx="19" cy="19" r="10" fill="%23d32f2f" stroke="%23ffffff" stroke-width="2"/>
        <path d="M17 12h4v14h-4zM12 17h14v4h-14z" fill="%23ffffff"/>
      </svg>
    `.trim();

    return {
      url: `data:image/svg+xml;utf-8,${encodeURIComponent(svgBlinking)}`,
      scaledSize: new google.maps.Size(38, 38),
      anchor: new google.maps.Point(19, 19)
    };
  }

  // Standard high-contrast SVG map pin
  const cleanColor = colorHex.replace("#", "%23");
  const svgPin = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42">
      <path d="M16 0C7.2 0 0 7.2 0 16c0 11.2 16 26 16 26s16-14.8 16-26c0-8.8-7.2-16-16-16z" fill="${cleanColor}" stroke="%23ffffff" stroke-width="1.8"/>
      <circle cx="16" cy="15" r="7.5" fill="%23ffffff"/>
      <path d="M14.5 10h3v10h-3zM10.5 13.5h11v3h-11z" fill="${cleanColor}"/>
    </svg>
  `.trim();

  return {
    url: `data:image/svg+xml;utf-8,${encodeURIComponent(svgPin)}`,
    scaledSize: new google.maps.Size(32, 42),
    anchor: new google.maps.Point(16, 42)
  };
}

/**
 * Determines marker status and color from hospital data
 */
function getHospitalStatusColor(hospital) {
  if (hospital.emergencyDeclared) {
    return { color: "#d32f2f", isEmergency: true };
  }
  const total = Number(hospital.totalBeds) || 1;
  const occupied = Number(hospital.occupiedBeds) || 0;
  const ratio = occupied / total;

  if (ratio > 0.8) {
    return { color: "#d32f2f", isEmergency: false }; // Red: > 80%
  } else if (ratio >= 0.6) {
    return { color: "#f57c00", isEmergency: false }; // Orange: 60% - 80%
  } else {
    return { color: "#388e3c", isEmergency: false }; // Green: < 60%
  }
}

/**
 * Builds HTML content for the InfoWindow popup
 */
function createInfoWindowContent(hospital) {
  const total = Number(hospital.totalBeds) || 0;
  const occupied = Number(hospital.occupiedBeds) || 0;
  const free = Math.max(0, total - occupied);
  const occupancyRate = total > 0 ? ((occupied / total) * 100).toFixed(1) : 0;

  const meds = hospital.medicines || {};
  const vacs = hospital.vaccines || {};

  return `
    <div style="font-family: 'Inter', sans-serif; min-width: 260px; max-width: 320px; padding: 4px 2px; color: #1f2937;">
      <div style="border-bottom: 2px solid #1a2744; padding-bottom: 6px; margin-bottom: 8px;">
        <div style="font-size: 14px; font-weight: 700; color: #1a2744; line-height: 1.2;">
          ${hospital.name}
        </div>
        <div style="font-size: 11.5px; color: #6b7280; margin-top: 2px;">
          ${hospital.type} &bull; <strong>${hospital.district}</strong>
        </div>
      </div>

      <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 6px 10px; margin-bottom: 8px; font-size: 12px;">
        <div><strong>Beds:</strong> ${occupied} occupied out of ${total} total (${occupancyRate}%)</div>
        <div><strong>Available Free Beds:</strong> <span style="font-weight: 700; color: ${free < 25 ? '#d32f2f' : '#388e3c'}">${free}</span></div>
      </div>

      <div style="margin-bottom: 8px; font-size: 12px; line-height: 1.4;">
        <div style="font-weight: 600; color: #374151; margin-bottom: 2px;">Medicine Stock Summary:</div>
        <div style="color: #4b5563; font-size: 11.5px;">
          Paracetamol: <strong>${meds.paracetamol ?? 'N/A'}</strong> &bull;
          Amoxicillin: <strong>${meds.amoxicillin ?? 'N/A'}</strong> &bull;
          Metformin: <strong>${meds.metformin ?? 'N/A'}</strong> &bull;
          ORS: <strong>${meds.ors ?? 'N/A'}</strong> &bull;
          Chloroquine: <strong>${meds.chloroquine ?? 'N/A'}</strong>
        </div>
      </div>

      <div style="margin-bottom: 8px; font-size: 12px; line-height: 1.4;">
        <div style="font-weight: 600; color: #374151; margin-bottom: 2px;">Vaccine Stock Summary:</div>
        <div style="color: #4b5563; font-size: 11.5px;">
          COVID: <strong>${vacs.covid ?? 'N/A'}</strong> &bull;
          Polio: <strong>${vacs.polio ?? 'N/A'}</strong> &bull;
          Hepatitis B: <strong>${vacs.hepatitisB ?? 'N/A'}</strong>
        </div>
      </div>

      <div style="font-size: 12px; margin-bottom: 12px; color: ${hospital.childrenNeedingVaccines > 30 ? '#d32f2f' : '#4b5563'};">
        <strong>Children Needing Vaccines:</strong> ${hospital.childrenNeedingVaccines ?? 0}
      </div>

      ${hospital.notes ? `
        <div style="margin-bottom: 10px; padding: 6px 10px; background: #f3f4f6; border-left: 3px solid #6b7280; font-size: 11.5px; font-style: italic; color: #4b5563; border-radius: 2px;">
          <strong>Admin Note:</strong> ${hospital.notes}
        </div>
      ` : ''}

      ${hospital.emergencyDeclared 
        ? `<div style="padding: 6px 10px; background-color: #fee2e2; color: #991b1b; font-weight: 700; font-size: 11.5px; text-align: center; border: 1px solid #f87171;">
             🚨 STATE EMERGENCY PROTOCOL ACTIVE
           </div>`
        : `<button 
             id="popup-btn-emergency-${hospital.id}" 
             style="width: 100%; padding: 8px 12px; background-color: #d32f2f; color: #ffffff; border: 1px solid #b71c1c; font-weight: 700; font-size: 12px; cursor: pointer; text-transform: uppercase; letter-spacing: 0.3px;"
             onclick="window.declareEmergencyFromMap('${hospital.id}')"
           >
             Declare Emergency
           </button>`
      }
    </div>
  `;
}

/**
 * Creates the bottom-right Legend Control
 */
function createLegendControl() {
  const legendDiv = document.createElement("div");
  legendDiv.style.backgroundColor = "#ffffff";
  legendDiv.style.border = "1px solid #d1d5db";
  legendDiv.style.borderRadius = "4px";
  legendDiv.style.padding = "10px 14px";
  legendDiv.style.margin = "12px";
  legendDiv.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)";
  legendDiv.style.fontFamily = "'Inter', sans-serif";
  legendDiv.style.fontSize = "12px";
  legendDiv.style.lineHeight = "1.5";

  legendDiv.innerHTML = `
    <div style="font-weight: 700; color: #1a2744; margin-bottom: 6px; text-transform: uppercase; font-size: 11px; letter-spacing: 0.4px;">
      Hospital Bed Status Legend
    </div>
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
      <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #388e3c; border: 1px solid #2e7d32;"></span>
      <span>Normal (&lt; 60% Beds Occupied)</span>
    </div>
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
      <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #f57c00; border: 1px solid #e65100;"></span>
      <span>Moderate (60% – 80% Beds Occupied)</span>
    </div>
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
      <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #d32f2f; border: 1px solid #b71c1c;"></span>
      <span>Critical (&gt; 80% Beds Occupied)</span>
    </div>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #d32f2f; border: 2px solid #ffffff; box-shadow: 0 0 0 2px #d32f2f;"></span>
      <span style="font-weight: 600; color: #d32f2f;">Blinking Red: Emergency Active</span>
    </div>
  `;

  return legendDiv;
}

/**
 * Initializes the Google Map centered on West Bengal
 * @param {string} containerId - Element ID for map container
 * @param {Array} hospitals - Array of hospital data objects
 * @param {Function} onEmergencyClick - Callback when admin clicks Declare Emergency in popup
 */
export async function initMap(containerId, hospitals, onEmergencyClick) {
  emergencyCallback = onEmergencyClick;
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Map container #${containerId} not found.`);
    return;
  }

  // Global handler for emergency button clicks inside InfoWindow
  window.declareEmergencyFromMap = (hospitalId) => {
    const targetHosp = hospitals.find(h => h.id === hospitalId);
    if (targetHosp && typeof emergencyCallback === "function") {
      emergencyCallback(targetHosp);
    }
  };

  try {
    const apiKey = await getMapsApiKey();
    await loadGoogleMapsApi(apiKey);

    // Center on West Bengal: lat 23.6850, lng 88.3522, zoom level 7
    mapInstance = new google.maps.Map(container, {
      center: { lat: 23.6850, lng: 88.3522 },
      zoom: 7,
      mapTypeId: "roadmap",
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
      styles: [
        { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ color: "#1a2744" }] },
        { featureType: "administrative.province", elementType: "geometry.stroke", stylers: [{ color: "#9ca3af" }] }
      ]
    });

    activeInfoWindow = new google.maps.InfoWindow();

    // Attach Legend at bottom right
    const legend = createLegendControl();
    const positionRightBottom = (google.maps.ControlPosition && google.maps.ControlPosition.RIGHT_BOTTOM) || 9;
    mapInstance.controls[positionRightBottom].push(legend);

    // Place Markers for all hospitals
    updateMapMarkers(hospitals);
    console.log(`Google Maps initialized with all ${hospitals.length} West Bengal hospitals.`);
  } catch (error) {
    console.warn("Could not load Google Maps JavaScript API:", error.message);
    renderMapFallback(container, hospitals);
  }
}

/**
 * Updates markers in real time based on hospital array
 */
export function updateMapMarkers(hospitals) {
  if (!mapInstance || !window.google || !window.google.maps) {
    const container = document.getElementById("map");
    if (container && !mapInstance) {
      renderMapFallback(container, hospitals);
    }
    return;
  }

  // Prune markers for deleted hospitals
  const activeIds = new Set(hospitals.map(h => h.id));
  for (const [id, marker] of markersMap.entries()) {
    if (!activeIds.has(id)) {
      marker.setMap(null);
      markersMap.delete(id);
    }
  }

  hospitals.forEach(hospital => {
    const { color, isEmergency } = getHospitalStatusColor(hospital);
    const icon = getMarkerIcon(color, isEmergency);
    const position = { lat: Number(hospital.lat), lng: Number(hospital.lng) };

    let marker = markersMap.get(hospital.id);
    if (marker) {
      marker.setIcon(icon);
      marker.setPosition(position);
    } else {
      marker = new google.maps.Marker({
        position,
        map: mapInstance,
        title: hospital.name,
        icon: icon
      });

      marker.addListener("click", () => {
        activeInfoWindow.setContent(createInfoWindowContent(hospital));
        activeInfoWindow.open(mapInstance, marker);
      });

      markersMap.set(hospital.id, marker);
    }

    // If InfoWindow is currently open for this hospital, refresh its content live
    if (activeInfoWindow && activeInfoWindow.anchor === marker) {
      activeInfoWindow.setContent(createInfoWindowContent(hospital));
    }
  });
}

/**
 * Elegant interactive SVG / Canvas fallback if Google Maps API key is not active
 */
export function renderMapFallback(container, hospitals) {
  container.innerHTML = `
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #eef2f6; display: flex; flex-direction: column; overflow: hidden;">
      <div style="padding: 10px 16px; background-color: #1a2744; color: #ffffff; display: flex; justify-content: space-between; align-items: center; font-size: 13px;">
        <span><strong>West Bengal Spatial Geographic Grid</strong> (${hospitals.length} Facilities Monitored)</span>
        <span style="font-size: 11px; background: rgba(255,255,255,0.15); padding: 2px 8px;">Interactive Spatial Grid</span>
      </div>
      <div id="fallback-svg-wrapper" style="flex: 1; position: relative; width: 100%; height: 100%;">
        <svg viewBox="85.5 21.3 4.5 6.0" style="width: 100%; height: 100%; transform: scaleY(-1);">
          <!-- Approximate WB Boundary Grid -->
          <rect x="85.5" y="21.3" width="4.5" height="6.0" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.02"/>
          ${hospitals.map(h => {
            const { color, isEmergency } = getHospitalStatusColor(h);
            return `
              <circle cx="${h.lng}" cy="${h.lat}" r="0.08" fill="${color}" stroke="#ffffff" stroke-width="0.02" style="cursor: pointer;">
                <title>${h.name} - ${h.district} (${h.occupiedBeds || 0}/${h.totalBeds || 0} Beds)</title>
                ${isEmergency ? '<animate attributeName="r" values="0.06;0.12;0.06" dur="1s" repeatCount="indefinite"/>' : ''}
              </circle>
            `;
          }).join('')}
        </svg>
      </div>
    </div>
  `;

  // Attach legend at bottom right
  const legend = createLegendControl();
  legend.style.position = "absolute";
  legend.style.bottom = "10px";
  legend.style.right = "10px";
  container.appendChild(legend);
}

window.renderMapFallback = renderMapFallback;

export default {
  initMap,
  updateMapMarkers,
  renderMapFallback
};
