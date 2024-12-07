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
  async fetchBetaUser(userId) {
    try {
      const querySnapshot = await getDocs(collection(db, "beta"));
      const user = querySnapshot.docs
        .map((doc) => doc.data())
        .find((user) => user.id === userId);
      return user || null;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};
