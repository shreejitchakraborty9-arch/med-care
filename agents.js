/**
 * agents.js â€” Multi-Agent AI System for MedWatch Dashboard
 * Government of West Bengal â€” Health Supply Chain Dashboard
 *
 * Agents:
 *   1. MedicineAgent   â€” analyzes medicine stock every 5 minutes
 *   2. BedAgent        â€” monitors bed occupancy every 3 minutes
 *   3. EpidemicAgent   â€” detects outbreak patterns every 10 minutes
 *
 * All agents run ONLY in dashboard.html and are NOT imported elsewhere.
 * Firestore writes go to the "agent_alerts" collection.
 * Gemini model and API key are configured via window.ENV
 */

import {
  collection,
  addDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const getEnvKeys = () => {
  if (typeof window !== 'undefined' && window.ENV) {
    return {
      apiKey: window.ENV.GEMINI_API_KEY,
      model: window.ENV.GEMINI_MODEL
    };
  }
  return { apiKey: null, model: null };
};

const GEMINI_API_KEY = window.ENV && window.ENV.GEMINI_API_KEY 
  ? window.ENV.GEMINI_API_KEY 
  : null;

const GEMINI_MODEL = window.ENV && window.ENV.GEMINI_MODEL
  ? window.ENV.GEMINI_MODEL
  : null;

if (!GEMINI_API_KEY || !GEMINI_MODEL) {
  console.error("GEMINI_API_KEY or GEMINI_MODEL not found - agents offline");
} else {
  console.log("All agents online - using model:", GEMINI_MODEL);
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared Gemini caller
// ─────────────────────────────────────────────────────────────────────────────
async function callGemini(prompt, apiKey, model) {
  if (!apiKey || !model) {
    const env = getEnvKeys();
    apiKey = apiKey || env.apiKey;
    model = model || env.model;
  }

  if (!apiKey || !model) {
    throw new Error("GEMINI_API_KEY or GEMINI_MODEL not found — agents offline.");
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const res = await fetch(endpoint, {
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

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  const cleaned = raw.replace(/```json\s*/gi, "").replace(/```\s*$/gi, "").trim();
  const parsed = JSON.parse(cleaned);
  return Array.isArray(parsed) ? parsed : (parsed.alerts ?? []);
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Web Audio â€” subtle beep for CRITICAL alerts
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function playCriticalSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  } catch { /* AudioContext not available */ }
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Firestore helpers
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let _db = null;
export function initAgentsDb(db) { _db = db; }

async function saveAlertToFirestore(alert) {
  if (!_db) return null;
  try {
    const ref = await addDoc(collection(_db, "agent_alerts"), {
      ...alert,
      createdAt: serverTimestamp(),
      resolved: false
    });
    return ref.id;
  } catch (err) {
    console.warn("[Agents] Firestore write failed:", err.message);
    return null;
  }
}

export async function resolveAlertInFirestore(alertId) {
  if (!_db || !alertId) return;
  try {
    await updateDoc(doc(_db, "agent_alerts", alertId), {
      resolved: true,
      resolvedAt: new Date().toISOString(),
      resolvedBy: "Admin"
    });
  } catch (err) {
    console.warn("[Agents] Firestore resolve failed:", err.message);
  }
}

// Listen for real-time alert changes from Firestore (for multi-tab sync)
export function subscribeToAgentAlerts(callback) {
  if (!_db) return () => {};
  const q = query(collection(_db, "agent_alerts"), orderBy("createdAt", "desc"));
  return onSnapshot(q, snapshot => {
    const alerts = [];
    snapshot.forEach(d => alerts.push({ firestoreId: d.id, ...d.data() }));
    callback(alerts);
  }, err => {
    console.warn("[Agents] Firestore onSnapshot error:", err.message);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Hospital Lookup & Fallback Alert Generators
// ─────────────────────────────────────────────────────────────────────────────
function findHospital(hospitalsData, nameOrId) {
  if (!hospitalsData || !Array.isArray(hospitalsData)) return null;
  const lower = String(nameOrId || "").toLowerCase().trim();
  return hospitalsData.find(h => 
    (h.id && h.id.toLowerCase() === lower) ||
    (h.name && h.name.toLowerCase() === lower) ||
    (h.name && h.name.toLowerCase().includes(lower))
  ) || null;
}

function generateMedicineFallbacks(hospitalsData) {
  const alerts = [];
  const now = new Date().toISOString();
  if (!Array.isArray(hospitalsData)) return alerts;

  for (const h of hospitalsData) {
    if (!h.medicines) continue;
    for (const [med, stock] of Object.entries(h.medicines)) {
      const stockNum = Number(stock);
      if (stockNum < 20) {
        alerts.push({
          agentType: 'MEDICINE',
          hospitalName: h.name,
          hospitalId: h.id,
          district: h.district,
          type: h.type || 'District Hospital',
          priority: stockNum < 15 ? 'HIGH' : 'MEDIUM',
          medicineName: med.toUpperCase(),
          currentStock: stockNum,
          alertMessage: `${h.name} in ${h.district} has only ${stockNum} units of ${med.toUpperCase()} left.`,
          recommendedAction: `Emergency restock ${med.toUpperCase()} from central medical depot within 24 hours.`,
          resolved: false,
          timestamp: now
        });
      } else if (stockNum < 50) {
        alerts.push({
          agentType: 'MEDICINE',
          hospitalName: h.name,
          hospitalId: h.id,
          district: h.district,
          type: h.type || 'District Hospital',
          priority: 'LOW',
          medicineName: med.toUpperCase(),
          currentStock: stockNum,
          alertMessage: `${h.name} in ${h.district} has ${stockNum} units of ${med.toUpperCase()} remaining.`,
          recommendedAction: `Schedule replenishment order for ${med.toUpperCase()} within 3 days.`,
          resolved: false,
          timestamp: now
        });
      }
    }
  }
  return alerts;
}

function generateBedFallbacks(hospitalsData) {
  const alerts = [];
  const now = new Date().toISOString();
  if (!Array.isArray(hospitalsData)) return alerts;

  for (const h of hospitalsData) {
    const total = Number(h.totalBeds) || 1;
    const occupied = Number(h.occupiedBeds) || 0;
    const occPercent = Math.round((occupied / total) * 100);
    const free = Math.max(0, total - occupied);

    if (occPercent >= 80) {
      alerts.push({
        agentType: 'BED',
        hospitalName: h.name,
        hospitalId: h.id,
        district: h.district,
        type: h.type || 'District Hospital',
        priority: occPercent >= 90 ? 'HIGH' : 'MEDIUM',
        occupancyPercent: occPercent,
        occupiedBeds: occupied,
        totalBeds: total,
        freeBeds: free,
        alertMessage: `${h.name} (${h.district}) is at ${occPercent}% bed capacity with only ${free} free beds.`,
        recommendedAction: `Prepare standby surge beds and reroute non-critical admissions.`,
        resolved: false,
        timestamp: now
      });
    } else if (occPercent >= 60) {
      alerts.push({
        agentType: 'BED',
        hospitalName: h.name,
        hospitalId: h.id,
        district: h.district,
        type: h.type || 'District Hospital',
        priority: 'LOW',
        occupancyPercent: occPercent,
        occupiedBeds: occupied,
        totalBeds: total,
        freeBeds: free,
        alertMessage: `${h.name} (${h.district}) bed occupancy is currently at ${occPercent}%.`,
        recommendedAction: `Monitor bed admissions closely and review planned patient discharges.`,
        resolved: false,
        timestamp: now
      });
    }
  }
  return alerts;
}

function generateEpidemicFallbacks(hospitalsData) {
  const alerts = [];
  const now = new Date().toISOString();
  if (!Array.isArray(hospitalsData)) return alerts;

  const districtMap = {};
  for (const h of hospitalsData) {
    if (!districtMap[h.district]) districtMap[h.district] = [];
    districtMap[h.district].push(h);
  }

  for (const [dist, hList] of Object.entries(districtMap)) {
    const highOcc = hList.filter(h => (h.occupiedBeds / h.totalBeds) >= 0.75);
    const lowMeds = hList.filter(h => h.medicines && (h.medicines.paracetamol < 20 || h.medicines.ors < 30));

    if (highOcc.length >= 2 || (highOcc.length >= 1 && lowMeds.length >= 1)) {
      const repHosp = highOcc[0] || hList[0];
      alerts.push({
        agentType: 'EPIDEMIC',
        hospitalName: repHosp.name,
        hospitalId: repHosp.id,
        affectedDistrict: dist,
        district: dist,
        type: repHosp.type || 'District Hospital',
        priority: highOcc.length >= 2 ? 'HIGH' : 'MEDIUM',
        outbreakRiskScore: highOcc.length >= 2 ? 84 : 65,
        suspectedCondition: 'Localized Respiratory or Gastroenteritis Surge',
        alertMessage: `Multiple health facilities in ${dist} show simultaneous capacity saturation and rapid medicine depletion.`,
        recommendedAction: `Deploy district epidemiological surveillance team and dispatch 500 units ORS and paracetamol.`,
        resolved: false,
        timestamp: now
      });
    }
  }
  return alerts;
}

// ─────────────────────────────────────────────────────────────────────────────
// AGENT 1 — Medicine Supply Agent
// ─────────────────────────────────────────────────────────────────────────────
export async function MedicineAgent(hospitalsData) {
  const { apiKey, model } = getEnvKeys();
  if (!apiKey || !model) {
    console.error('Agent offline: API keys not loaded yet. Using local data fallback.');
    return generateMedicineFallbacks(hospitalsData);
  }

  const systemPrompt = `You are the Medicine Supply Agent for West Bengal Government Health Department. 
Analyze the medicine stock data from all hospitals and generate alerts.

Generate alerts for these exact situations:
1. HIGH: Any medicine stock is below 20 units — will run out within days  
2. MEDIUM: Any medicine stock is below 50 units — needs restocking soon
3. LOW: Any medicine stock is above 500 units — overstocked, redistribute

For each alert return a JSON array where each object has:
- agentType: 'MEDICINE'
- hospitalName: string (must match an exact hospital from data)
- hospitalId: string (id of hospital, e.g. hosp_001)
- district: string
- type: string (e.g. 'District Hospital' or 'Rural PHC')
- priority: 'HIGH' | 'MEDIUM' | 'LOW'
- medicineName: string
- currentStock: number
- alertMessage: one clear sentence
- recommendedAction: one specific actionable sentence with numbers
- resolved: false
- timestamp: current ISO timestamp

Return only valid JSON array. No explanation text.

Hospital Data:
${JSON.stringify(hospitalsData, null, 2)}`;

  try {
    const rawAlerts = await callGemini(systemPrompt, apiKey, model);
    const now = new Date().toISOString();
    const processed = (rawAlerts || []).map(a => {
      const h = findHospital(hospitalsData, a.hospitalName || a.hospitalId);
      return {
        agentType: 'MEDICINE',
        hospitalName: h ? h.name : (a.hospitalName || 'District Facility'),
        hospitalId: h ? h.id : (a.hospitalId || ''),
        district: h ? h.district : (a.district || 'West Bengal'),
        type: h ? h.type : (a.type || 'District Hospital'),
        priority: a.priority || 'HIGH',
        medicineName: a.medicineName || 'Essential Medicine',
        currentStock: a.currentStock !== undefined ? a.currentStock : 0,
        alertMessage: a.alertMessage || a.message || 'Low medicine stock detected.',
        recommendedAction: a.recommendedAction || 'Restock immediately.',
        resolved: false,
        timestamp: now
      };
    });

    for (const alert of processed) {
      const id = await saveAlertToFirestore(alert);
      if (id) alert.firestoreId = id;
    }

    return processed.length > 0 ? processed : generateMedicineFallbacks(hospitalsData);
  } catch (err) {
    console.error("[MedicineAgent] Error:", err.message);
    return generateMedicineFallbacks(hospitalsData);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// AGENT 2 — Hospital Bed Agent
// ─────────────────────────────────────────────────────────────────────────────
export async function BedAgent(hospitalsData) {
  const { apiKey, model } = getEnvKeys();
  if (!apiKey || !model) {
    console.error('Agent offline: API keys not loaded yet. Using local data fallback.');
    return generateBedFallbacks(hospitalsData);
  }

  const systemPrompt = `You are the Hospital Bed Management Agent for West Bengal Government Health Department.
Analyze bed occupancy across all hospitals and generate alerts.

Generate alerts for these exact situations:
1. HIGH: Beds occupied above 85% — imminent crisis, prepare overflow
2. MEDIUM: Beds occupied between 65% and 85% — monitor closely
3. LOW: Beds occupied below 25% — capacity underutilized

For each alert return a JSON array where each object has:
- agentType: 'BED'
- hospitalName: string (must match an exact hospital from data)
- hospitalId: string (e.g. hosp_001)
- district: string  
- type: string (e.g. 'District Hospital' or 'Rural PHC')
- priority: 'HIGH' | 'MEDIUM' | 'LOW'
- occupancyPercent: number
- occupiedBeds: number
- totalBeds: number
- freeBeds: number
- alertMessage: one clear sentence
- recommendedAction: one specific actionable sentence
- resolved: false
- timestamp: current ISO timestamp

Return only valid JSON array. No explanation text.

Hospital Data:
${JSON.stringify(hospitalsData, null, 2)}`;

  try {
    const rawAlerts = await callGemini(systemPrompt, apiKey, model);
    const now = new Date().toISOString();
    const processed = (rawAlerts || []).map(a => {
      const h = findHospital(hospitalsData, a.hospitalName || a.hospitalId);
      const total = h ? h.totalBeds : (Number(a.totalBeds) || 100);
      const occupied = h ? h.occupiedBeds : (Number(a.occupiedBeds) || 80);
      const free = Math.max(0, total - occupied);
      const occPercent = Math.round((occupied / total) * 100);

      return {
        agentType: 'BED',
        hospitalName: h ? h.name : (a.hospitalName || 'District Facility'),
        hospitalId: h ? h.id : (a.hospitalId || ''),
        district: h ? h.district : (a.district || 'West Bengal'),
        type: h ? h.type : (a.type || 'District Hospital'),
        priority: a.priority || (occPercent >= 85 ? 'HIGH' : 'MEDIUM'),
        occupancyPercent: a.occupancyPercent !== undefined ? a.occupancyPercent : occPercent,
        occupiedBeds: a.occupiedBeds !== undefined ? a.occupiedBeds : occupied,
        totalBeds: a.totalBeds !== undefined ? a.totalBeds : total,
        freeBeds: a.freeBeds !== undefined ? a.freeBeds : free,
        alertMessage: a.alertMessage || a.message || `${h ? h.name : 'Hospital'} is at ${occPercent}% bed capacity.`,
        recommendedAction: a.recommendedAction || 'Reroute non-critical admissions.',
        resolved: false,
        timestamp: now
      };
    });

    for (const alert of processed) {
      const id = await saveAlertToFirestore(alert);
      if (id) alert.firestoreId = id;
    }

    return processed.length > 0 ? processed : generateBedFallbacks(hospitalsData);
  } catch (err) {
    console.error("[BedAgent] Error:", err.message);
    return generateBedFallbacks(hospitalsData);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// AGENT 3 — Epidemic Early Warning Agent
// ─────────────────────────────────────────────────────────────────────────────
export async function EpidemicAgent(hospitalsData) {
  const { apiKey, model } = getEnvKeys();
  if (!apiKey || !model) {
    console.error('Agent offline: API keys not loaded yet. Using local data fallback.');
    return generateEpidemicFallbacks(hospitalsData);
  }

  const systemPrompt = `You are the Epidemic Early Warning Agent for West Bengal Government Health Department.
Your job is to detect patterns that suggest a disease outbreak is beginning — before it becomes a crisis.

Analyze ALL hospital data together and look for these patterns:
1. If 3 or more hospitals in the same district show bed occupancy above 70% simultaneously — possible local outbreak
2. If paracetamol AND ORS stock are both depleting fast across a region — possible gastroenteritis or viral fever outbreak  
3. If chloroquine stock is critically low in multiple hospitals in same area — possible malaria spike

For each pattern found return a JSON array where each object has:
- agentType: 'EPIDEMIC'
- hospitalName: string (primary or representative hospital in affected area)
- hospitalId: string
- affectedDistrict: string
- type: string
- priority: 'HIGH' | 'MEDIUM' | 'LOW'
- outbreakRiskScore: number from 0 to 100
- suspectedCondition: string (example: 'Possible viral gastroenteritis outbreak')
- alertMessage: one clear urgent sentence
- recommendedAction: specific action the health department should take immediately
- resolved: false
- timestamp: current ISO timestamp

Return only valid JSON array. No explanation text.

Hospital Data:
${JSON.stringify(hospitalsData, null, 2)}`;

  try {
    const rawAlerts = await callGemini(systemPrompt, apiKey, model);
    const now = new Date().toISOString();
    const processed = (rawAlerts || []).map(a => {
      const repName = a.hospitalName || (a.affectedHospitals && a.affectedHospitals[0]);
      const h = findHospital(hospitalsData, repName || a.hospitalId);
      const district = a.affectedDistrict || (h ? h.district : 'West Bengal');

      return {
        agentType: 'EPIDEMIC',
        hospitalName: h ? h.name : (repName || `${district} Central Health Facility`),
        hospitalId: h ? h.id : (a.hospitalId || ''),
        affectedDistrict: district,
        district: district,
        type: h ? h.type : (a.type || 'District Surveillance'),
        priority: a.priority || 'HIGH',
        outbreakRiskScore: a.outbreakRiskScore !== undefined ? a.outbreakRiskScore : 75,
        suspectedCondition: a.suspectedCondition || 'Epidemiological Alert',
        alertMessage: a.alertMessage || a.message || `Outbreak risk pattern detected in ${district}.`,
        recommendedAction: Array.isArray(a.recommendedAction) ? a.recommendedAction.join(' ') : (a.recommendedAction || 'Mobilize rapid response teams and emergency drug kits.'),
        resolved: false,
        timestamp: now
      };
    });

    for (const alert of processed) {
      const id = await saveAlertToFirestore(alert);
      if (id) alert.firestoreId = id;
    }

    return processed.length > 0 ? processed : generateEpidemicFallbacks(hospitalsData);
  } catch (err) {
    console.error("[EpidemicAgent] Error:", err.message);
    return generateEpidemicFallbacks(hospitalsData);
  }
}


