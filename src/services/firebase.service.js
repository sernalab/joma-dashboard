// firebase.service.js
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase.js";
import { dataTransformers } from "@/utils/dataTransformers";

export const firebaseService = {
  async fetchUserData(userId) {
    try {
      const docRef = doc(db, "1464tn", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
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

      if (userData[type] !== undefined && userData[type] !== null) {
        // Usar el método transform del nuevo sistema
        return dataTransformers.transform(type, userData[type]);
      }

      return null;
    } catch (error) {
      console.error(`Error al obtener datos de gráfico para ${type}:`, error);
      throw error;
    }
  },

  async getAvailableMeasurements(userId) {
    try {
      const userData = await this.fetchUserData(userId);
      
      if (!userData) {
        return {};
      }

      // Lista de todos los tipos de medición posibles
      const measurementTypes = {
        datamanometer80: 'manometer',
        datavacuum: 'vacuum',
        dataoil: 'oil-pressure',
        datafuel: 'fuel-pressure',
        datacommonrail: 'common-rail',
        datacompression: 'compression',
        dataturbo: 'turbo-pressure',
        dataadblue: 'adblue-pressure'
      };

      const availableData = {};

      // Verificar qué datos existen y obtener el último valor
      for (const [firebaseField, measurementId] of Object.entries(measurementTypes)) {
        if (userData[firebaseField] && userData[firebaseField].length > 0) {
          const data = userData[firebaseField];
          const lastValue = data[data.length - 1];
          
          // Intentar obtener el valor del último dato
          let formattedValue = null;
          
          if (lastValue !== undefined && lastValue !== null) {
            // Verificar si tiene la estructura esperada {y: valor, unit: unidad}
            if (typeof lastValue === 'object' && lastValue.y !== undefined && lastValue.y !== null) {
              formattedValue = `${lastValue.y} ${lastValue.unit || 'bar'}`;
            } 
            // Si es un número directo (incluyendo 0)
            else if (typeof lastValue === 'number') {
              formattedValue = `${lastValue} bar`;
            }
            // Si tiene otra estructura, intentar extraer el valor
            else if (typeof lastValue === 'object' && lastValue.value !== undefined) {
              formattedValue = `${lastValue.value} ${lastValue.unit || 'bar'}`;
            }
          }
          
          
          availableData[measurementId] = {
            hasData: true,
            lastValue: formattedValue,
            dataCount: data.length
          };
        } else {
          availableData[measurementId] = {
            hasData: false,
            lastValue: null,
            dataCount: 0
          };
        }
      }

      return availableData;
    } catch (error) {
      console.error("Error al obtener mediciones disponibles:", error);
      return {};
    }
  },
};
