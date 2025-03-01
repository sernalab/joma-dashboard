import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWInXUKq4qrByzmYtZPF3_b8QiYt9bKaE",
  authDomain: "beta-1464tn.firebaseapp.com",
  projectId: "beta-1464tn",
  storageBucket: "beta-1464tn.firebasestorage.app",
  messagingSenderId: "268030272393",
  appId: "1:268030272393:web:b603d82c87d61c763b3758",
  measurementId: "G-NN88FSJ5KM",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
export const db = getFirestore(firebaseApp);
