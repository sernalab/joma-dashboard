// services/pdfGenerator.js
import printJS from "print-js";

export const generatePDF = (contentId) => {
  printJS({
    printable: contentId,
    type: "html",
    targetStyles: ["*"],
    style: `
      @page { size: A4; margin: 20mm; }
      .grid { 
        display: grid !important;
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 20px !important;
      }
      .surface-card {
        break-inside: avoid !important;
      }
      .apexcharts-canvas {
        width: 100% !important;
        height: auto !important;
      },
      #printable-content {
        border: 0px;
      }
    `,
  });
};
