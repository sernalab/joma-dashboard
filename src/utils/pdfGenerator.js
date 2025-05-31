import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export class ModernPDFGenerator {
  constructor() {
    this.pdf = null;
    this.pageWidth = 210; // A4 width in mm
    this.pageHeight = 297; // A4 height in mm
    this.margin = 20;
    this.contentWidth = this.pageWidth - (this.margin * 2);
  }

  /**
   * Generate PDF from HTML element
   * @param {HTMLElement} element - The HTML element to convert
   * @param {Object} options - PDF generation options
   * @returns {Promise<Blob>} - PDF blob
   */
  async generateFromElement(element, options = {}) {
    const defaultOptions = {
      filename: 'report.pdf',
      quality: 1.0,
      useCORS: true,
      allowTaint: true,
      scale: 2,
      backgroundColor: '#ffffff',
      removeExtraWhitespace: true,
      ...options
    };

    try {
      // Create canvas from HTML element
      const canvas = await html2canvas(element, {
        scale: defaultOptions.scale,
        useCORS: defaultOptions.useCORS,
        allowTaint: defaultOptions.allowTaint,
        backgroundColor: defaultOptions.backgroundColor,
        logging: false,
        windowWidth: 1200, // Fixed width for consistency
        windowHeight: element.scrollHeight,
        onclone: (clonedDocument) => {
          // Ensure styles are properly applied in the cloned document
          const clonedElement = clonedDocument.getElementById(element.id);
          if (clonedElement) {
            clonedElement.style.width = '1200px';
            clonedElement.style.padding = '40px';
            clonedElement.style.boxSizing = 'border-box';
          }
        }
      });

      // Calculate dimensions
      const imgWidth = this.contentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Create PDF
      this.pdf = new jsPDF('p', 'mm', 'a4');
      
      // Add the image to PDF
      const imgData = canvas.toDataURL('image/png', defaultOptions.quality);
      
      // Handle multiple pages if content is too tall
      let remainingHeight = imgHeight;
      let position = 0;
      let pageCount = 0;

      while (remainingHeight > 0) {
        const pageHeight = Math.min(remainingHeight, this.pageHeight - (this.margin * 2));
        
        if (pageCount > 0) {
          this.pdf.addPage();
        }
        
        this.pdf.addImage(
          imgData,
          'PNG',
          this.margin,
          this.margin - position,
          imgWidth,
          imgHeight
        );
        
        remainingHeight -= (this.pageHeight - (this.margin * 2));
        position += (this.pageHeight - (this.margin * 2));
        pageCount++;
      }

      // Return PDF blob
      return this.pdf.output('blob');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF: ' + error.message);
    }
  }

  /**
   * Download PDF directly
   * @param {HTMLElement} element - The HTML element to convert
   * @param {string} filename - The filename for download
   * @param {Object} options - PDF generation options
   */
  async downloadPDF(element, filename = 'report.pdf', options = {}) {
    try {
      const blob = await this.generateFromElement(element, options);
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error downloading PDF:', error);
      throw error;
    }
  }

  /**
   * Generate PDF with custom styling optimized for reports
   * @param {Object} reportData - The report data
   * @param {Array} charts - Array of chart images
   * @returns {Promise<Blob>} - PDF blob
   */
  async generateReportPDF(reportData, charts = []) {
    try {
      this.pdf = new jsPDF('p', 'mm', 'a4');
      
      // Add header
      this._addHeader(reportData);
      
      // Add client information
      let yPosition = this._addClientInfo(reportData, 50);
      
      // Add vehicle information
      yPosition = this._addVehicleInfo(reportData, yPosition + 15);
      
      // Add charts
      if (charts.length > 0) {
        yPosition = await this._addCharts(charts, yPosition + 20);
      }
      
      // Add observations
      if (reportData.observaciones) {
        this._addObservations(reportData, yPosition + 15);
      }
      
      // Add footer
      this._addFooter();
      
      return this.pdf.output('blob');
      
    } catch (error) {
      console.error('Error generating report PDF:', error);
      throw error;
    }
  }

  _addHeader(reportData) {
    this.pdf.setFontSize(24);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('INFORME DE MEDICIONES', this.margin, 30);
    
    this.pdf.setFontSize(12);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.text(`Generado: ${new Date().toLocaleDateString()}`, this.margin, 40);
    
    if (reportData.nombreTaller) {
      this.pdf.text(`Taller: ${reportData.nombreTaller}`, this.pageWidth - this.margin - 60, 40);
    }
  }

  _addClientInfo(reportData, yPosition) {
    this.pdf.setFontSize(16);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('DATOS DEL CLIENTE', this.margin, yPosition);
    
    this.pdf.setFontSize(11);
    this.pdf.setFont('helvetica', 'normal');
    
    const clientData = [
      ['Nombre:', reportData.nombre || 'N/A'],
      ['Teléfono:', reportData.telefono || 'N/A'],
      ['Email:', reportData.email || 'N/A']
    ];
    
    clientData.forEach(([label, value], index) => {
      const y = yPosition + 10 + (index * 6);
      this.pdf.text(label, this.margin, y);
      this.pdf.text(value, this.margin + 25, y);
    });
    
    return yPosition + 30;
  }

  _addVehicleInfo(reportData, yPosition) {
    this.pdf.setFontSize(16);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('DATOS DEL VEHÍCULO', this.margin, yPosition);
    
    this.pdf.setFontSize(11);
    this.pdf.setFont('helvetica', 'normal');
    
    const vehicleData = [
      ['Marca:', reportData.marca || 'N/A'],
      ['Modelo:', reportData.modelo || 'N/A'],
      ['Matrícula:', reportData.matricula || 'N/A'],
      ['Año:', reportData.año?.toString() || 'N/A'],
      ['Kilometraje:', reportData.kilometraje ? `${reportData.kilometraje.toLocaleString()} km` : 'N/A']
    ];
    
    vehicleData.forEach(([label, value], index) => {
      const y = yPosition + 10 + (index * 6);
      this.pdf.text(label, this.margin, y);
      this.pdf.text(value, this.margin + 25, y);
    });
    
    return yPosition + 40;
  }

  async _addCharts(charts, yPosition) {
    this.pdf.setFontSize(16);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('MEDICIONES REALIZADAS', this.margin, yPosition);
    
    let currentY = yPosition + 15;
    
    for (const chart of charts) {
      // Check if we need a new page
      if (currentY > this.pageHeight - 80) {
        this.pdf.addPage();
        currentY = this.margin;
      }
      
      // Add chart title
      this.pdf.setFontSize(12);
      this.pdf.setFont('helvetica', 'bold');
      this.pdf.text(chart.title, this.margin, currentY);
      
      // Add chart image
      if (chart.image) {
        const imgWidth = this.contentWidth - 20;
        const imgHeight = 60; // Fixed height for charts
        
        this.pdf.addImage(
          chart.image,
          'PNG',
          this.margin + 10,
          currentY + 5,
          imgWidth,
          imgHeight
        );
        
        currentY += imgHeight + 20;
      }
    }
    
    return currentY;
  }

  _addObservations(reportData, yPosition) {
    if (yPosition > this.pageHeight - 50) {
      this.pdf.addPage();
      yPosition = this.margin;
    }
    
    this.pdf.setFontSize(16);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('OBSERVACIONES', this.margin, yPosition);
    
    this.pdf.setFontSize(11);
    this.pdf.setFont('helvetica', 'normal');
    
    const lines = this.pdf.splitTextToSize(reportData.observaciones, this.contentWidth - 10);
    this.pdf.text(lines, this.margin, yPosition + 10);
  }

  _addFooter() {
    const pageCount = this.pdf.internal.getNumberOfPages();
    
    for (let i = 1; i <= pageCount; i++) {
      this.pdf.setPage(i);
      this.pdf.setFontSize(9);
      this.pdf.setFont('helvetica', 'normal');
      this.pdf.text(
        `Página ${i} de ${pageCount}`,
        this.pageWidth - this.margin - 20,
        this.pageHeight - 10
      );
    }
  }
}

// Export singleton instance
export const pdfGenerator = new ModernPDFGenerator();