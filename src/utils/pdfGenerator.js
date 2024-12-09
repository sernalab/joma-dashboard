import printJS from "print-js";

const printContainer = (elementId) => {
  const styles = `
    /* Centramos el contenido y configuramos el tamaño */
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      padding: 0;
    }

    #charts-container {
      display: block;
      width: 60%; /* Ajusta el ancho de la gráfica */
      margin: 0 auto; /* Centrado horizontal */
    }

    .surface-card {
      border: 1px solid #ddd; /* Borde para el contenedor */
      padding: 20px; /* Espacio interno */
      background: white; /* Fondo blanco */
    }

    h3 {
      font-size: 16px; /* Tamaño del título */
      text-align: center; /* Centrado del título */
    }

    apexchart {
      height: 300px !important; /* Altura de la gráfica */
    }
  `;

  // Clonar solo la primera gráfica
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Elemento con id "${elementId}" no encontrado.`);
    return;
  }
  const firstChart = element.querySelector(".surface-card");
  if (!firstChart) {
    console.error("No se encontró la primera gráfica.");
    return;
  }

  // Crear un contenedor temporal solo con la primera gráfica
  const tempContainer = document.createElement("div");
  tempContainer.id = "temp-charts-container";
  tempContainer.appendChild(firstChart.cloneNode(true)); // Clonar la primera gráfica

  // Usar printJS con el contenedor temporal
  document.body.appendChild(tempContainer);
  printJS({
    printable: "temp-charts-container",
    type: "html",
    style: styles,
    header: "Report", // Título opcional
  });

  // Eliminar el contenedor temporal después de imprimir
  document.body.removeChild(tempContainer);
};

export default printContainer;
