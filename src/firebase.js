import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA37C4ei0Unk91xKUooUU4fFH71wdZgKFo",
  authDomain: "esp32joma.firebaseapp.com",
  projectId: "esp32joma",
  storageBucket: "esp32joma.firebasestorage.app",
  messagingSenderId: "613083523094",
  appId: "1:613083523094:web:cd6b246a1e0ce19515ed37",
  measurementId: "G-9LP3SB6KYY",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
export const db = getFirestore(firebaseApp);
