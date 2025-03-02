export const mockGraphData = {
  "common-rail": {
    type: "line",
    data: [30, 40, 35, 50, 49, 60, 70],
    categories: ["0s", "5s", "10s", "15s", "20s", "25s", "30s"],
    title: "Presión Common Rail",
    yAxisTitle: "Presión (Bar)",
    description: "Medición de presión del sistema Common Rail",
  },
  "adblue-pressure": {
    type: "bar",
    data: [8.5, 11.2, 9.8, 12.3, 10.5, 9.9, 11.8],
    categories: ["T1", "T2", "T3", "T4", "T5", "T6", "T7"],
    title: "Presión AdBlue",
    yAxisTitle: "Presión (Bar)",
    description: "Medición de presión del sistema AdBlue",
  },
  manometer: {
    type: "bar",
    data: [8.5, 11.2, 9.8, 12.3, 10.5, 9.9, 11.8],
    categories: ["T1", "T2", "T3", "T4", "T5", "T6", "T7"],
    title: "Manometer",
    yAxisTitle: "Presión (Bar)",
    description: "Medición de presión del sistema AdBlue",
  },
};

export const mockFirebaseService = {
  async getGraphData(type) {
    return mockGraphData[type] || null;
  },
};
