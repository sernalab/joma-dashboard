import { defineStore } from "pinia";
import { mockFirebaseService } from "@/services/mockFirebase";

export const useReportStore = defineStore("report", {
  state: () => ({
    graphsData: {},
    loading: false,
  }),

  actions: {
    async fetchGraphData(graphType) {
      if (this.graphsData.hasOwnProperty(graphType)) {
        return this.graphsData[graphType];
      }

      this.loading = true;
      try {
        const data = await mockFirebaseService.getGraphData(graphType);
        if (data) {
          this.graphsData[graphType] = data;
          return data;
        }
        return null;
      } catch (error) {
        console.error("Error fetching graph data:", error);
        return null;
      } finally {
        this.loading = false;
      }
    },

    async fetchSelectedGraphsData(selectedGraphs) {
      this.loading = true;
      try {
        for (const graph of selectedGraphs) {
          const measurementId = graph.value;

          if (!this.graphsData.hasOwnProperty(measurementId)) {
            const data = await mockFirebaseService.getGraphData(measurementId);
            if (data) {
              this.graphsData[measurementId] = data;
            }
          }
        }
      } catch (error) {
        console.error("Error fetching multiple graphs:", error);
      } finally {
        this.loading = false;
      }
    },

    // Método para limpiar los datos de gráficos si es necesario
    clearGraphsData() {
      this.graphsData = {};
    },
  },
});
