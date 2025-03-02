// reportStore.js
import { defineStore } from "pinia";
import { firebaseService } from "@/services/firebase.service";
import { authService } from "@/services/auth.service";

export const useReportStore = defineStore("report", {
  state: () => ({
    graphsData: {},
    loading: false,
    error: null,
  }),

  actions: {
    async fetchGraphData(graphType) {
      // Si ya tenemos los datos en caché, los devolvemos directamente
      if (this.graphsData.hasOwnProperty(graphType)) {
        return this.graphsData[graphType];
      }

      this.loading = true;
      this.error = null;

      try {
        // Obtenemos el usuario actual
        const currentUser = authService.getCurrentUser();

        if (!currentUser || !currentUser.id) {
          throw new Error("Usuario no autenticado");
        }

        // Obtenemos los datos reales de Firebase
        const data = await firebaseService.getGraphData(
          currentUser.id,
          graphType
        );

        if (data) {
          // Guardamos en caché
          this.graphsData[graphType] = data;
          return data;
        }
        return null;
      } catch (error) {
        this.error = error.message;
        console.error("Error fetching graph data:", error);
        return null;
      } finally {
        this.loading = false;
      }
    },

    async fetchSelectedGraphsData(selectedGraphs) {
      this.loading = true;
      this.error = null;

      try {
        // Obtenemos el usuario actual
        const currentUser = authService.getCurrentUser();

        if (!currentUser || !currentUser.id) {
          throw new Error("Usuario no autenticado");
        }

        for (const graph of selectedGraphs) {
          const measurementId = graph.value;

          if (!this.graphsData.hasOwnProperty(measurementId)) {
            const data = await firebaseService.getGraphData(
              currentUser.id,
              measurementId
            );
            if (data) {
              this.graphsData[measurementId] = data;
            }
          }
        }
      } catch (error) {
        this.error = error.message;
        console.error("Error fetching multiple graphs:", error);
      } finally {
        this.loading = false;
      }
    },

    clearGraphsData() {
      this.graphsData = {};
    },
  },
});
