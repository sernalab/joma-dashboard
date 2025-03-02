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
        categories.push(`Cylindre ${parseInt(key) + 1}`);
      });

    return {
      type: "bar",
      data,
      categories,
      title: "Compression des Cylindres",
      yAxisTitle: "Pression (Bar)",
      description: "Mesures de compression des cylindres du moteur",
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
        categories.push(`Lecture ${parseInt(key) + 1}`);
      });

    return {
      type: "line",
      data,
      categories,
      title: "Pression Common Rail",
      yAxisTitle: "Pression (Bar)",
      description: "Mesure de la pression du système Common Rail",
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
    yAxisTitle: "Valeur",
    description: `Données de ${title}`,
  };
};
