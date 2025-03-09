// src/utils/dataTransformers.js

import { i18n } from "@/main";
import { chartConfigs } from "./chartConfig";

/**
 * Función de traducción simple para acceder a i18n
 */
const t = (key) => {
  return i18n.global.t(key);
};

/**
 * Transforma datos crudos al formato requerido para los gráficos
 * @param {string} type - Tipo de datos (p.ej. 'datacompression')
 * @param {Array|Object} rawData - Datos crudos desde Firestore
 * @param {Object} config - Configuración opcional para el transformador
 * @returns {Object} Datos formateados para el gráfico
 */
function createTransformedData(type, rawData, config) {
  const data = [];
  const categories = [];

  // Determinar la configuración a usar
  const chartConfig = config || chartConfigs[type] || {};
  const chartType = chartConfig.type || "line";
  const labelKey = chartConfig.labelKey || "chartsData.generic.pointLabel";

  // Procesar los datos (funciona con arrays u objetos)
  if (Array.isArray(rawData)) {
    rawData.forEach((value, index) => {
      data.push(parseFloat(value));
      categories.push(`${t(labelKey)} ${index + 1}`);
    });
  } else if (typeof rawData === "object" && rawData !== null) {
    Object.keys(rawData)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .forEach((key) => {
        data.push(parseFloat(rawData[key]));
        categories.push(`${t(labelKey)} ${parseInt(key) + 1}`);
      });
  }

  // Construir el resultado
  return {
    type: chartType,
    data,
    categories,
    title: chartConfig.titleKey
      ? t(chartConfig.titleKey)
      : getGenericTitle(type),
    yAxisTitle: chartConfig.yAxisTitleKey
      ? t(chartConfig.yAxisTitleKey)
      : t("chartsData.generic.valueLabel"),
    description: chartConfig.descriptionKey
      ? t(chartConfig.descriptionKey)
      : `${t("chartsData.generic.dataLabel")} ${getGenericTitle(type)}`,
  };
}

/**
 * Genera un título genérico a partir del nombre del tipo
 */
function getGenericTitle(type) {
  return type
    .replace(/^data/, "")
    .split(/(?=[A-Z])|[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Objeto principal de transformadores
 */
export const dataTransformers = {
  /**
   * Método principal que determina qué transformador usar
   */
  transform(type, rawData) {
    // Si el tipo tiene un transformador específico, usarlo
    if (this[type]) {
      return this[type](rawData);
    }

    // Si hay una configuración para este tipo, usar el transformador universal
    if (chartConfigs[type]) {
      return createTransformedData(type, rawData, chartConfigs[type]);
    }

    // Si no hay configuración, usar transformador genérico
    return createGenericGraphData(type, rawData);
  },

  // Los alias específicos que mantienen compatibilidad
  "common-rail"(rawData) {
    return createTransformedData(
      "common-rail",
      rawData,
      chartConfigs["common-rail"]
    );
  },
};

/**
 * Registra un nuevo transformador o actualiza uno existente
 * @param {string} type - Tipo de datos a transformar
 * @param {Object} config - Configuración del transformador
 */
export function registerTransformer(type, config) {
  chartConfigs[type] = config;
}

/**
 * Crea un formato de datos de gráfico genérico para tipos desconocidos
 */
export const createGenericGraphData = (type, rawData) => {
  return createTransformedData(type, rawData, {
    type: "line",
    labelKey: "chartsData.generic.pointLabel",
  });
};
