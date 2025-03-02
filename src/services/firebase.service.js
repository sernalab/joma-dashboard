// firebase.service.js
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase.js";
import {
  dataTransformers,
  createGenericGraphData,
} from "@/utils/dataTransformers";

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

  async getGraphData(userId, type) {
    try {
      const userData = await this.fetchUserData(userId);

      if (!userData) {
        throw new Error(`No se encontraron datos para el usuario ${userId}`);
      }

      if (userData[type]) {
        console.log(`Datos de ${type} encontrados:`, userData[type]);

        // Usamos el transformador correspondiente si existe
        if (dataTransformers[type]) {
          return dataTransformers[type](userData[type]);
        } else {
          console.warn(`No hay transformador definido para el tipo ${type}`);
          // Usamos el transformador genérico
          return createGenericGraphData(type, userData[type]);
        }
      }

      console.log(`No se encontraron datos para el tipo ${type}`);
      return null;
    } catch (error) {
      console.error(`Error al obtener datos de gráfico para ${type}:`, error);
      throw error;
    }
  },
};
