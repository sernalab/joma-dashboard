import { CHART_TYPES } from "./chartTypes";

export const MEASUREMENTS = {
  "common-rail": {
    type: CHART_TYPES.LINE,
    title: "Common Rail",
    yAxisTitle: "Presión (Bar)",
  },
  "adblue-pressure": {
    type: CHART_TYPES.BAR,
    title: "AdBlue",
    yAxisTitle: "Presión (Bar)",
  },
  manometer: {
    type: CHART_TYPES.LINE,
    title: "Manómetro",
    yAxisTitle: "Presión (Bar)",
  },
};
