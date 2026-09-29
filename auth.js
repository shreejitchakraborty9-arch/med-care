// auth.js - Firebase Authentication Helper Functions
import { auth } from "./firebase-config.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/**
 * Signs out current user from Firebase Auth and clears local session
 */
export async function logoutUser() {
  try {
    if (auth) {
      await signOut(auth);
    }
  } catch (error) {
    console.warn("Firebase Auth signOut notice:", error.message);
  } finally {
    if (typeof localStorage !== "undefined") {
      localStorage.clear();
    }
    window.location.href = "index.html";
  }
}

export default {
  logoutUser
};
