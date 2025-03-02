// src/utils/dataTransformers.js

/**
 * Colección de funciones para transformar datos crudos a formato de gráficos
 */
import { i18n } from "@/main";
const t = (key) => {
  return i18n.global.t(key);
};
export const dataTransformers = {
  // Transformador para datos de compresión
  datacompression: (rawData) => {
    const data = [];
    const categories = [];

    Object.keys(rawData)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .forEach((key) => {
        data.push(parseFloat(rawData[key]));
        categories.push(
          `${t("chartsData.datacompression.cylinderLabel")} ${
            parseInt(key) + 1
          }`
        );
      });

    return {
      type: "bar",
      data,
      categories,
      title: t("chartsData.datacompression.title"),
      yAxisTitle: t("chartsData.datacompression.yAxisTitle"),
      description: t("chartsData.datacompression.description"),
    };
  },

  // Transformador para common-rail
  "common-rail": (rawData) => {
    const data = [];
    const categories = [];

    Object.keys(rawData)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .forEach((key) => {
        data.push(parseFloat(rawData[key]));
        categories.push(
          `${t("chartsData.common-rail.readingLabel")} ${parseInt(key) + 1}`
        );
      });

    return {
      type: "line",
      data,
      categories,
      title: t("chartsData.common-rail.title"),
      yAxisTitle: t("chartsData.common-rail.yAxisTitle"),
      description: t("chartsData.common-rail.description"),
    };
  },

  // Puedes añadir más transformadores aquí según necesites
};

/**
 * Crea un formato de datos de gráfico genérico para tipos desconocidos
 */
export const createGenericGraphData = (type, rawData) => {
  const data = [];
  const categories = [];

  if (typeof rawData === "object" && rawData !== null) {
    Object.keys(rawData)
      .sort((a, b) => {
        const numA = parseInt(a);
        const numB = parseInt(b);
        return isNaN(numA) || isNaN(numB) ? a.localeCompare(b) : numA - numB;
      })
      .forEach((key) => {
        const value = rawData[key];
        data.push(
          typeof value === "string" ? parseFloat(value) || value : value
        );
        categories.push(`${key}`);
      });
  } else if (Array.isArray(rawData)) {
    rawData.forEach((value, index) => {
      data.push(value);
      categories.push(`${t("chartsData.generic.pointLabel")} ${index + 1}`);
    });
  }

  const title = type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    type: "line",
    data,
    categories,
    title,
    yAxisTitle: t("chartsData.generic.valueLabel"),
    description: `${t("chartsData.generic.dataLabel")} ${title}`,
  };
};
