// firebase.service.js
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase.js";

export const firebaseService = {
  async fetchUserData(userId) {
    try {
      const docRef = doc(db, "1464tn", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        console.log("No existe el documento!");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      throw error;
    }
  },
};
