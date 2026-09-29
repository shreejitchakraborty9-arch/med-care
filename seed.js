// seed.js - Universal Database Seeder for MedWatch (Supports Node.js & Browser)
import { HOSPITALS_DATA } from "./hospitals-data.js";

/**
 * Transforms standard JavaScript values to Firestore REST API value objects
 */
function toFirestoreValue(val) {
  if (typeof val === "string") return { stringValue: val };
  if (typeof val === "boolean") return { booleanValue: val };
  if (typeof val === "number") {
    return Number.isInteger(val) ? { integerValue: val.toString() } : { doubleValue: val };
  }
  if (val && typeof val === "object" && !Array.isArray(val)) {
    const fields = {};
    for (const [k, v] of Object.entries(val)) {
      fields[k] = toFirestoreValue(v);
    }
    return { mapValue: { fields } };
  }
  return { nullValue: null };
}

/**
 * Seeds all 25 hospitals into Firebase Firestore
 */
export async function seedHospitals() {
  console.log(`Seeding ${HOSPITALS_DATA.length} hospitals into Firestore collection 'hospitals'...`);

  // If in browser with CDN Firestore
  if (typeof window !== "undefined" && window.db) {
    try {
      const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
      const { db } = await import("./firebase-config.js");
      const seedPromises = HOSPITALS_DATA.map(async (hospital) => {
        await setDoc(doc(db, "hospitals", hospital.id), hospital);
      });
      await Promise.all(seedPromises);
      console.log(`All ${HOSPITALS_DATA.length} hospitals seeded successfully`);
      return;
    } catch (e) {
      console.warn("Browser SDK seeding encountered error, switching to direct REST API:", e.message);
    }
  }

  // Node.js or REST execution
  try {
    const restPromises = HOSPITALS_DATA.map(async (hospital) => {
      const fields = {};
      for (const [key, value] of Object.entries(hospital)) {
        fields[key] = toFirestoreValue(value);
      }

      const url = `https://firestore.googleapis.com/v1/projects/the-med-care/databases/(default)/documents/hospitals/${hospital.id}`;
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields })
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Failed to write ${hospital.id}: ${res.status} ${txt}`);
      }
      return hospital.id;
    });

    await Promise.all(restPromises);
    console.log(`All ${HOSPITALS_DATA.length} hospitals seeded successfully`);
  } catch (error) {
    console.error("Error seeding hospitals to Firestore:", error);
  }
}

// Auto-run if executed directly in Node
if (typeof process !== "undefined" && process.argv && process.argv[1]?.includes("seed.js")) {
  seedHospitals();
}

if (typeof window !== "undefined") {
  window.seedHospitals = seedHospitals;
}

export default seedHospitals;

