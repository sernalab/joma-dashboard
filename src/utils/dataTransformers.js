// src/utils/dataTransformers.js

/**
 * Colección de funciones para transformar datos crudos a formato de gráficos
 */
export const dataTransformers = {
  // Transformador para datos de compresión
  datacompression: (rawData) => {
    const data = [];
    const categories = [];

    Object.keys(rawData)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .forEach((key) => {
        data.push(parseFloat(rawData[key]));
        categories.push(`Cilindro ${parseInt(key) + 1}`);
      });

    return {
      type: "bar",
      data,
      categories,
      title: "Compresión de Cilindros",
      yAxisTitle: "Presión (Bar)",
      description: "Mediciones de compresión de los cilindros del motor",
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
        categories.push(`Lectura ${parseInt(key) + 1}`);
      });

    return {
      type: "line",
      data,
      categories,
      title: "Presión Common Rail",
      yAxisTitle: "Presión (Bar)",
      description: "Medición de presión del sistema Common Rail",
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
      categories.push(`Punto ${index + 1}`);
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
    yAxisTitle: "Valor",
    description: `Datos de ${title}`,
  };
};
