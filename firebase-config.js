import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: window.ENV ? window.ENV.FIREBASE_API_KEY : '',
  authDomain: "the-med-care.firebaseapp.com",
  projectId: "the-med-care",
  storageBucket: "the-med-care.firebasestorage.app",
  messagingSenderId: "1033841734591",
  appId: "1:1033841734591:web:9d6a6a59590363648ea70a",
  measurementId: "G-84LK19QTMD"
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
