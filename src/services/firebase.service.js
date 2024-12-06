import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase.js";

export const firebaseService = {
  async fetchBetaData() {
    try {
      const querySnapshot = await getDocs(collection(db, "beta"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};
