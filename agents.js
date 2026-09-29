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

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Environment Helpers
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Shared Gemini caller
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
async function callGemini(prompt) {
  const GEMINI_API_KEY = getGeminiApiKey();
  const GEMINI_MODEL = getGeminiModel();

  if (!GEMINI_API_KEY || !GEMINI_MODEL) {
    throw new Error("GEMINI_API_KEY or GEMINI_MODEL not found â€” agents offline.");
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

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

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// AGENT 1 â€” Medicine Supply Agent
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export async function MedicineAgent(hospitalsData) {
  const systemPrompt = `You are the Medicine Supply Agent for West Bengal Government Health Department. 
Analyze the medicine stock data from all hospitals and generate alerts.

Generate alerts for these exact situations:
1. CRITICAL: Any medicine stock is 0 units â€” hospital has completely run out
2. HIGH: Any medicine stock is below 20 units â€” will run out within days  
3. MEDIUM: Any medicine stock is below 50 units â€” needs restocking soon
4. LOW_ALERT: Any medicine stock is above 500 units â€” overstocked, redistribute
5. TRANSFER: Hospital A has excess of medicine X, Hospital B is critically low on X â€” recommend transfer with exact quantities

For each alert return a JSON array where each object has:
- agentType: 'MEDICINE'
- hospitalName: string
- district: string
- priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
- medicineName: string
- currentStock: number
- alertMessage: one clear sentence
- recommendedAction: one specific actionable sentence with numbers
- estimatedDaysRemaining: number or null
- resolved: false
- timestamp: current ISO timestamp

Return only valid JSON array. No explanation text.

Hospital Data:
${JSON.stringify(hospitalsData, null, 2)}`;

  try {
    const alerts = await callGemini(systemPrompt);
    const now = new Date().toISOString();
    const processed = alerts.map(a => ({
      agentType: "MEDICINE",
      resolved: false,
      timestamp: now,
      ...a
    }));

    // Save each to Firestore and attach the ID
    for (const alert of processed) {
      const id = await saveAlertToFirestore(alert);
      if (id) alert.firestoreId = id;
    }

    return processed;
  } catch (err) {
    console.error("[MedicineAgent] Error:", err.message);
    return [{ _error: true, agentType: "MEDICINE", message: "Agent temporarily unavailable. " + err.message }];
  }
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// AGENT 2 â€” Hospital Bed Agent
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export async function BedAgent(hospitalsData) {
  const systemPrompt = `You are the Hospital Bed Management Agent for West Bengal Government Health Department.
Analyze bed occupancy across all hospitals and generate alerts.

Generate alerts for these exact situations:
1. CRITICAL: Beds occupied above 90% â€” immediate crisis, hospital overwhelmed
2. HIGH: Beds occupied between 80% and 90% â€” pandemic threshold crossed, prepare overflow
3. MEDIUM: Beds occupied between 60% and 80% â€” monitor closely
4. TOO_VACANT: Beds occupied below 20% â€” too many empty beds, possible resource waste or reporting issue
5. TRANSFER: Hospital A is above 80% occupied and Hospital B nearby has less than 40% occupied â€” recommend patient transfer with exact numbers

For each alert return a JSON array where each object has:
- agentType: 'BED'
- hospitalName: string
- district: string  
- priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
- totalBeds: number
- occupiedBeds: number
- occupancyPercent: number
- alertMessage: one clear sentence
- recommendedAction: one specific actionable sentence
- nearestAvailableHospital: string or null
- resolved: false
- timestamp: current ISO timestamp

Return only valid JSON array. No explanation text.

Hospital Data:
${JSON.stringify(hospitalsData, null, 2)}`;

  try {
    const alerts = await callGemini(systemPrompt);
    const now = new Date().toISOString();
    const processed = alerts.map(a => ({
      agentType: "BED",
      resolved: false,
      timestamp: now,
      ...a
    }));

    for (const alert of processed) {
      const id = await saveAlertToFirestore(alert);
      if (id) alert.firestoreId = id;
    }

    return processed;
  } catch (err) {
    console.error("[BedAgent] Error:", err.message);
    return [{ _error: true, agentType: "BED", message: "Agent temporarily unavailable. " + err.message }];
  }
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// AGENT 3 â€” Epidemic Early Warning Agent
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export async function EpidemicAgent(hospitalsData) {
  const systemPrompt = `You are the Epidemic Early Warning Agent for West Bengal Government Health Department.
Your job is to detect patterns that suggest a disease outbreak is beginning â€” before it becomes a crisis.

Analyze ALL hospital data together and look for these patterns:
1. If 3 or more hospitals in the same district show bed occupancy above 70% simultaneously â€” possible local outbreak
2. If paracetamol AND ORS stock are both depleting fast across a region â€” possible gastroenteritis or viral fever outbreak  
3. If chloroquine stock is critically low in multiple hospitals in same area â€” possible malaria spike
4. If childrenNeedingVaccines is high across multiple hospitals in same district â€” vaccination gap risk
5. If any single district has more than 2 hospitals with CRITICAL alerts â€” district-level emergency

For each pattern found return a JSON array where each object has:
- agentType: 'EPIDEMIC'
- affectedDistrict: string
- affectedHospitals: array of hospital names
- priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
- outbreakRiskScore: number from 0 to 100
- suspectedCondition: string (example: 'Possible viral gastroenteritis outbreak' or 'Malaria risk spike')
- patternDetected: one sentence explaining what pattern triggered this alert
- alertMessage: one clear urgent sentence
- recommendedAction: two specific actions the health department should take immediately
- resolved: false
- timestamp: current ISO timestamp

Return only valid JSON array. No explanation text.

Hospital Data:
${JSON.stringify(hospitalsData, null, 2)}`;

  try {
    const alerts = await callGemini(systemPrompt);
    const now = new Date().toISOString();
    const processed = alerts.map(a => ({
      agentType: "EPIDEMIC",
      resolved: false,
      timestamp: now,
      ...a
    }));

    for (const alert of processed) {
      const id = await saveAlertToFirestore(alert);
      if (id) alert.firestoreId = id;
    }

    return processed;
  } catch (err) {
    console.error("[EpidemicAgent] Error:", err.message);
    return [{ _error: true, agentType: "EPIDEMIC", message: "Agent temporarily unavailable. " + err.message }];
  }
}

