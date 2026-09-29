// gemini.js - Medical Supply Chain AI Engine for West Bengal Government Health Dashboard

function getGeminiApiKey() {
  if (typeof window !== "undefined" && window.ENV && window.ENV.GEMINI_API_KEY) {
    return window.ENV.GEMINI_API_KEY.trim();
  }
  if (typeof process !== "undefined" && process.env?.GEMINI_API_KEY) {
    return process.env.GEMINI_API_KEY.trim();
  }
  return "";
}

function getGeminiModel() {
  if (typeof window !== "undefined" && window.ENV && window.ENV.GEMINI_MODEL) {
    return window.ENV.GEMINI_MODEL.trim();
  }
  if (typeof process !== "undefined" && process.env?.GEMINI_MODEL) {
    return process.env.GEMINI_MODEL.trim();
  }
  return "";
}

function getGeminiEndpoint() {
  const GEMINI_API_KEY = getGeminiApiKey();
  const GEMINI_MODEL = getGeminiModel();
  return `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
}

/**
 * Fallback generator for hospital alerts when API key is unconfigured or offline
 */
function generateFallbackAlerts(hospitalsArray) {
  const alerts = [];
  for (const h of hospitalsArray) {
    const occupancyRate = (h.occupiedBeds / h.totalBeds) * 100;
    const freeBeds = h.totalBeds - h.occupiedBeds;

    if (occupancyRate >= 80) {
      const priority = occupancyRate >= 92 ? "CRITICAL" : "HIGH";
      const hoursToCrisis = occupancyRate >= 92 ? "6-12 hours" : "24-48 hours";
      alerts.push({
        priorityLevel: priority,
        hospitalName: h.name,
        district: h.district,
        alertType: "BED_CRITICAL",
        severity: priority === "CRITICAL" ? "HIGH" : "MEDIUM",
        issue: `${h.name} in ${h.district} is at ${occupancyRate.toFixed(1)}% bed capacity with only ${freeBeds} available beds remaining.`,
        message: `${h.name} in ${h.district} is at ${occupancyRate.toFixed(1)}% bed capacity with only ${freeBeds} available beds remaining.`,
        recommendedAction: `Immediately reroute non-emergency patient intake to nearest sub-divisional health facilities and request 30 standby beds from adjacent district.`,
        estimatedTimeToCrisis: hoursToCrisis
      });
    }

    if (h.medicines) {
      for (const [med, stock] of Object.entries(h.medicines)) {
        if (stock < 20) {
          const priority = stock < 10 ? "CRITICAL" : "HIGH";
          const hoursToCrisis = stock < 10 ? "12-24 hours" : "2-3 days";
          alerts.push({
            priorityLevel: priority,
            hospitalName: h.name,
            district: h.district,
            alertType: "MEDICINE_LOW",
            severity: priority === "CRITICAL" ? "HIGH" : "MEDIUM",
            issue: `Critically depleted stock of ${med.toUpperCase()} (${stock} units left) at ${h.name}.`,
            message: `Critically depleted stock of ${med.toUpperCase()} (${stock} units left) at ${h.name}.`,
            recommendedAction: `Dispatch emergency consignment of minimum 150 units of ${med.toUpperCase()} from West Bengal Central Medical Stores Depot.`,
            estimatedTimeToCrisis: hoursToCrisis
          });
        }
      }
    }

    if (h.vaccines) {
      for (const [vac, doses] of Object.entries(h.vaccines)) {
        if (doses < 25) {
          alerts.push({
            priorityLevel: "MEDIUM",
            hospitalName: h.name,
            district: h.district,
            alertType: "VACCINE_LOW",
            severity: "MEDIUM",
            issue: `Vaccine buffer for ${vac.toUpperCase()} is running low with only ${doses} doses remaining at ${h.name}.`,
            message: `Vaccine buffer for ${vac.toUpperCase()} is running low with only ${doses} doses remaining at ${h.name}.`,
            recommendedAction: `Order replenishment of ${vac.toUpperCase()} cold-chain vials to maintain routine immunization coverage.`,
            estimatedTimeToCrisis: "3-5 days"
          });
        }
      }
    }

    if (h.childrenNeedingVaccines && h.childrenNeedingVaccines >= 35) {
      alerts.push({
        priorityLevel: "HIGH",
        hospitalName: h.name,
        district: h.district,
        alertType: "CHILD_VACCINE_NEEDED",
        severity: "HIGH",
        issue: `${h.childrenNeedingVaccines} pediatric patients are awaiting mandatory immunization outreach at ${h.name}.`,
        message: `${h.childrenNeedingVaccines} pediatric patients are awaiting mandatory immunization outreach at ${h.name}.`,
        recommendedAction: `Deploy mobile immunization camp with ANM nurses and stock 50 booster doses.`,
        estimatedTimeToCrisis: "48 hours"
      });
    }
  }
  return alerts;
}

/**
 * Fallback generator for redistribution plan when offline
 */
function generateFallbackRedistribution(emergencyDistrict, allHospitals) {
  const donorCandidates = allHospitals
    .filter(h => h.district.toLowerCase() !== emergencyDistrict.toLowerCase())
    .map(h => ({
      ...h,
      freeBeds: Math.max(0, h.totalBeds - h.occupiedBeds),
      totalMeds: Object.values(h.medicines || {}).reduce((a, b) => a + b, 0)
    }))
    .sort((a, b) => (b.freeBeds + b.totalMeds) - (a.freeBeds + a.totalMeds))
    .slice(0, 3);

  return {
    emergencyDistrict,
    status: "EMERGENCY_DECLARED",
    summary: `Emergency medical protocol activated for ${emergencyDistrict}. Mobilizing surplus capacity and emergency pharmaceutical inventory from 3 top donor districts.`,
    donors: donorCandidates.map(d => ({
      district: d.district,
      hospitalName: d.name,
      resourcesToSend: {
        bedsSurplus: Math.max(0, Math.floor(d.freeBeds * 0.4)),
        paracetamol: Math.max(0, Math.floor((d.medicines?.paracetamol || 0) * 0.3)),
        amoxicillin: Math.max(0, Math.floor((d.medicines?.amoxicillin || 0) * 0.3)),
        ors: Math.max(0, Math.floor((d.medicines?.ors || 0) * 0.3)),
        vaccines: Math.max(0, Math.floor(((d.vaccines?.covid || 0) + (d.vaccines?.polio || 0)) * 0.25))
      },
      rationale: `${d.name} currently holds ${d.freeBeds} free beds and adequate pharmaceutical inventory.`
    })),
    actionSteps: [
      `Deploy green corridor for rapid transit of medicine convoys to ${emergencyDistrict}.`,
      "Activate State Health Emergency Cell at Swasthya Bhawan, Salt Lake.",
      "Initiate triage diversion of non-critical cases to adjacent district facilities."
    ]
  };
}

/**
 * 1. Generates hospital alerts using Gemini 2.0 Flash Lite with enhanced specificity
 * Format includes: PRIORITY LEVEL, HOSPITAL, DISTRICT, ISSUE, RECOMMENDED ACTION, ESTIMATED TIME TO CRISIS
 */
export async function generateHospitalAlerts(hospitalsArray) {
  const GEMINI_API_KEY = getGeminiApiKey();
  const GEMINI_MODEL = getGeminiModel();

  if (!GEMINI_API_KEY || !GEMINI_MODEL) {
    console.warn("[Gemini AI] GEMINI_API_KEY or GEMINI_MODEL not found. Using intelligent local rule engine.");
    return generateFallbackAlerts(hospitalsArray);
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const prompt = `You are the Chief Medical Supply Chain AI Specialist for the Government of West Bengal Department of Health & Family Welfare.
Analyze this comprehensive dataset of 25 West Bengal hospitals and Primary Health Centres (PHCs).
Identify all critical supply bottlenecks, severe bed saturation (>80% occupied), drug depletion (<20 units in stock), and pediatric immunization gaps.

Return a JSON array of alert objects where EACH alert has these exact fields:
- "priorityLevel": one of "CRITICAL", "HIGH", "MEDIUM", "LOW"
- "hospitalName": full hospital name
- "district": district name
- "alertType": one of "BED_CRITICAL", "MEDICINE_LOW", "VACCINE_LOW", "CHILD_VACCINE_NEEDED", "PANDEMIC_RISK"
- "severity": "HIGH", "MEDIUM", or "LOW" (for backwards compatibility)
- "issue": one clear sentence describing the specific deficit
- "message": same as issue (for backwards compatibility)
- "recommendedAction": one concrete, actionable recommendation specifying exact numbers or logistics steps
- "estimatedTimeToCrisis": estimated time before operational failure, e.g. "12-24 hours" or "2-3 days"

Hospital Dataset:
${JSON.stringify(hospitalsArray, null, 2)}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.warn(`[Gemini AI] Alert generation API call failed (${response.status}):`, err);
      return generateFallbackAlerts(hospitalsArray);
    }

    const data = await response.json();
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!raw) return generateFallbackAlerts(hospitalsArray);

    const cleaned = raw.replace(/```json\s*/i, "").replace(/```\s*$/i, "").trim();
    const alerts = JSON.parse(cleaned);
    return Array.isArray(alerts) ? alerts : (alerts.alerts || generateFallbackAlerts(hospitalsArray));
  } catch (error) {
    console.error("[Gemini AI] Error in generateHospitalAlerts:", error);
    return generateFallbackAlerts(hospitalsArray);
  }
}

/**
 * 2. Generates a Daily Executive Summary Report for the Health Department Admin
 */
export async function generateDailySummaryReport(allHospitals) {
  const GEMINI_API_KEY = getGeminiApiKey();
  const GEMINI_MODEL = getGeminiModel();

  // Local fallback summary calculation
  const criticalCount = allHospitals.filter(h => (h.occupiedBeds / h.totalBeds) >= 0.8).length;
  const medTotals = {};
  allHospitals.forEach(h => {
    for (const [m, count] of Object.entries(h.medicines || {})) {
      medTotals[m] = (medTotals[m] || 0) + Number(count);
    }
  });
  const lowestMeds = Object.entries(medTotals).sort((a, b) => a[1] - b[1]).slice(0, 3).map(([m, c]) => `${m.toUpperCase()} (${c} units state buffer)`);

  if (!GEMINI_API_KEY || !GEMINI_MODEL) {
    return {
      totalHospitalsAtCriticalLevel: criticalCount,
      topUrgentResourceNeeds: lowestMeds,
      interDistrictTransfers: [
        { donorDistrict: "Kolkata", recipientDistrict: "Howrah", resource: "Amoxicillin", quantity: 120, rationale: "Howrah District Hospital has severe antibiotic depletion." },
        { donorDistrict: "Purba Bardhaman", recipientDistrict: "Birbhum", resource: "ICU / Standby Beds", quantity: 25, rationale: "Suri Sadar Hospital is nearing 85% bed saturation." },
        { donorDistrict: "Darjeeling", recipientDistrict: "Kalimpong", resource: "Chloroquine & ORS", quantity: 80, rationale: "Kalimpong hilly sector replenishment." }
      ],
      executiveSummary: `Daily West Bengal Health Supply Report: ${criticalCount} of 25 state facilities operate above critical 80% bed occupancy. Key focus is required on replenishing ${lowestMeds.join(', ')}.`
    };
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const prompt = `You are the State Medical Director for West Bengal. Formulate a comprehensive Daily Executive Summary Report based on current hospital statistics.
Return a structured JSON object with keys:
- "totalHospitalsAtCriticalLevel": number (count of hospitals with occupiedBeds / totalBeds >= 0.8)
- "topUrgentResourceNeeds": array of 3 strings listing top 3 statewide shortages with quantities
- "interDistrictTransfers": array of objects: [ { "donorDistrict": string, "recipientDistrict": string, "resource": string, "quantity": number, "rationale": string } ]
- "executiveSummary": 2-3 sentence high-level overview for the Health Minister

Hospital Statistics:
${JSON.stringify(allHospitals, null, 2)}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) throw new Error(`API status ${response.status}`);
    const data = await response.json();
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const cleaned = raw.replace(/```json\s*/i, "").replace(/```\s*$/i, "").trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.warn("[Gemini AI] Daily summary API fallback triggered:", err.message);
    return {
      totalHospitalsAtCriticalLevel: criticalCount,
      topUrgentResourceNeeds: lowestMeds,
      interDistrictTransfers: [
        { donorDistrict: "Kolkata", recipientDistrict: "Howrah", resource: "Amoxicillin", quantity: 120, rationale: "Howrah District Hospital has severe antibiotic depletion." },
        { donorDistrict: "Purba Bardhaman", recipientDistrict: "Birbhum", resource: "ICU / Standby Beds", quantity: 25, rationale: "Suri Sadar Hospital is nearing 85% bed saturation." }
      ],
      executiveSummary: `Daily West Bengal Health Supply Report: ${criticalCount} facilities are in high-stress occupancy.`
    };
  }
}

/**
 * 3. Calculates Pandemic Risk Score (0 to 100) for each West Bengal district
 */
export async function generatePandemicRiskScores(allHospitals) {
  const apiKey = await getGeminiApiKey();

  // Local fallback calculation based on bed saturation and supply deficit
  const districts = [...new Set(allHospitals.map(h => h.district))];
  const fallbackScores = districts.map(district => {
    const distHospitals = allHospitals.filter(h => h.district === district);
    let totalBeds = 0;
    let occupied = 0;
    let lowStockCount = 0;

    distHospitals.forEach(h => {
      totalBeds += h.totalBeds;
      occupied += h.occupiedBeds;
      if (h.medicines) {
        Object.values(h.medicines).forEach(val => { if (val < 20) lowStockCount++; });
      }
    });

    const occRatio = totalBeds > 0 ? (occupied / totalBeds) : 0.5;
    let score = Math.round((occRatio * 65) + Math.min(35, lowStockCount * 8));
    score = Math.max(10, Math.min(98, score));

    return {
      district,
      riskScore: score,
      riskLevel: score >= 75 ? "CRITICAL" : (score >= 50 ? "ELEVATED" : "MODERATE"),
      primaryDrivers: [
        `${(occRatio * 100).toFixed(0)}% bed occupancy`,
        `${lowStockCount} medicines below safety buffer`
      ]
    };
  }).sort((a, b) => b.riskScore - a.riskScore);

  const GEMINI_API_KEY = getGeminiApiKey();
  const GEMINI_MODEL = getGeminiModel();

  if (!GEMINI_API_KEY || !GEMINI_MODEL) {
    return fallbackScores;
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const prompt = `You are a Computational Epidemiologist for West Bengal Public Health.
Calculate a Pandemic Vulnerability & Preparedness Risk Score from 0 to 100 for each West Bengal district based on bed occupancy rates, critical drug inventories, and pediatric vaccine requirements. Higher score means higher vulnerability.

Return a JSON array of objects:
[
  {
    "district": string,
    "riskScore": number (between 0 and 100),
    "riskLevel": "CRITICAL" | "ELEVATED" | "MODERATE" | "LOW",
    "primaryDrivers": [string, string]
  }
]

Hospital Statistics:
${JSON.stringify(allHospitals, null, 2)}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) throw new Error(`API status ${response.status}`);
    const data = await response.json();
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const cleaned = raw.replace(/```json\s*/i, "").replace(/```\s*$/i, "").trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.warn("[Gemini AI] Pandemic risk scores fallback triggered:", err.message);
    return fallbackScores;
  }
}

/**
 * 4. Generates an emergency resource redistribution plan for an emergency district.
 */
export async function generateRedistributionPlan(emergencyDistrict, allHospitals) {
  const GEMINI_API_KEY = getGeminiApiKey();
  const GEMINI_MODEL = getGeminiModel();

  if (!GEMINI_API_KEY || !GEMINI_MODEL) {
    console.warn("[Gemini AI] GEMINI_API_KEY or GEMINI_MODEL not found. Using local redistribution algorithm.");
    return generateFallbackRedistribution(emergencyDistrict, allHospitals);
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const prompt = `District ${emergencyDistrict} has declared a state health emergency.
Based on current bed availability, medicine stock, and geographic proximity across all West Bengal hospitals, determine which 3 nearest districts should mobilize resources to assist.
Return specific numbers for surplus beds, paracetamol, amoxicillin, ORS, and vaccines to be dispatched immediately.

Return structured JSON with keys:
{
  "emergencyDistrict": string,
  "summary": string,
  "donors": [
    {
      "district": string,
      "hospitalName": string,
      "resourcesToSend": {
        "bedsSurplus": number,
        "paracetamol": number,
        "amoxicillin": number,
        "ors": number,
        "vaccines": number
      },
      "rationale": string
    }
  ],
  "actionSteps": [string]
}

Hospital Statistics:
${JSON.stringify(allHospitals, null, 2)}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`[Gemini AI] Plan request failed with status ${response.status}:`, errorText);
      return generateFallbackRedistribution(emergencyDistrict, allHospitals);
    }

    const data = await response.json();
    const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawContent) return generateFallbackRedistribution(emergencyDistrict, allHospitals);

    const cleanedJson = rawContent.replace(/```json\s*/i, "").replace(/```\s*$/i, "").trim();
    return JSON.parse(cleanedJson);
  } catch (error) {
    console.error("[Gemini AI] Error generating redistribution plan:", error);
    return generateFallbackRedistribution(emergencyDistrict, allHospitals);
  }
}

export default {
  generateHospitalAlerts,
  generateDailySummaryReport,
  generatePandemicRiskScores,
  generateRedistributionPlan
};
