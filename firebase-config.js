import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Helper to retrieve FIREBASE_API_KEY from window.ENV or environment
function getFirebaseApiKey() {
  if (typeof window !== "undefined" && window.ENV && window.ENV.FIREBASE_API_KEY) {
    return window.ENV.FIREBASE_API_KEY.trim();
  }
  if (typeof process !== "undefined" && process.env?.FIREBASE_API_KEY) {
    return process.env.FIREBASE_API_KEY.trim();
  }
  return "";
}

const apiKey = getFirebaseApiKey();

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "the-med-care.firebaseapp.com",
  projectId: "the-med-care",
  storageBucket: "the-med-care.firebasestorage.app",
  messagingSenderId: "1033841734591",
  appId: "1:1033841734591:web:9d6a6a59590363648ea70a"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

let authInstance = null;
try {
  authInstance = getAuth(app);
} catch (err) {
  console.warn("Firebase Auth initialization deferred:", err.message);
}
export const auth = authInstance;
export default { app, db, auth };
