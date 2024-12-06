import { firebaseService } from "./firebase.service";

export const dashboardService = {
  async fetchGeneralData() {
    try {
      return await firebaseService.fetchBetaData();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  async fetchCompressionData() {
    try {
      const data = await firebaseService.fetchBetaData();
      return data[1]?.datacompression || [];
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};
