// stores/reportStore.js
import { defineStore } from "pinia";
import { mockFirebaseService } from "@/services/mockFirebase";
import { MEASUREMENTS } from "@/constants/measurementTypes";

export const useReportStore = defineStore("report", {
  state: () => ({
    graphsData: {},
    loading: false,
  }),

  actions: {
    async fetchGraphData(graphType) {
      this.loading = true;
      try {
        const data = await mockFirebaseService.getGraphData(graphType);
        if (data) {
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
          const data = await mockFirebaseService.getGraphData(measurementId);

          if (data) {
            this.graphsData[measurementId] = data;
          }
        }
      } catch (error) {
        console.error("Error fetching multiple graphs:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
