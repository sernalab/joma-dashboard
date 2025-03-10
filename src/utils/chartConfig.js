// src/utils/chartConfigs.js

/**
 * Configuración para cada tipo de gráfico
 * Cada configuración define:
 * - type: tipo de gráfico (line, bar, area, etc.)
 * - titleKey: clave de traducción para el título
 * - yAxisTitleKey: clave de traducción para el título del eje Y
 * - descriptionKey: clave de traducción para la descripción
 * - labelKey: clave de traducción para las etiquetas de los puntos de datos
 */
export const chartConfigs = {
  datacompression: {
    type: "bar",
    titleKey: "chartsData.datacompression.title",
    yAxisTitleKey: "chartsData.datacompression.yAxisTitle",
    descriptionKey: "chartsData.datacompression.description",
  },

  datacommonrail: {
    type: "line",
    titleKey: "chartsData.commonRail.title",
    yAxisTitleKey: "chartsData.commonRail.yAxisTitle",
    descriptionKey: "chartsData.commonRail.description",
  },

  dataadblue: {
    type: "bar",
    titleKey: "chartsData.adblue.title",
    yAxisTitleKey: "chartsData.adblue.yAxisTitle",
    descriptionKey: "chartsData.adblue.description",
  },

  datafuel: {
    type: "line",
    titleKey: "chartsData.fuel.title",
    yAxisTitleKey: "chartsData.fuel.yAxisTitle",
    descriptionKey: "chartsData.fuel.description",
  },

  datamanometer80: {
    type: "line",
    titleKey: "chartsData.manometer.title",
    yAxisTitleKey: "chartsData.manometer.yAxisTitle",
    descriptionKey: "chartsData.manometer.description",
  },

  dataoil: {
    type: "line",
    titleKey: "chartsData.oil.title",
    yAxisTitleKey: "chartsData.oil.yAxisTitle",
    descriptionKey: "chartsData.oil.description",
  },

  dataturbo: {
    type: "line",
    titleKey: "chartsData.turbo.title",
    yAxisTitleKey: "chartsData.turbo.yAxisTitle",
    descriptionKey: "chartsData.turbo.description",
  },

  datavacuum: {
    type: "bar",
    titleKey: "chartsData.vacuum.title",
    yAxisTitleKey: "chartsData.vacuum.yAxisTitle",
    descriptionKey: "chartsData.vacuum.description",
  },

  "common-rail": {
    type: "line",
    titleKey: "chartsData.commonRail.title",
    yAxisTitleKey: "chartsData.commonRail.yAxisTitle",
    descriptionKey: "chartsData.commonRail.description",
  },
};
