<script setup>
import { inject, ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useReportStore } from '@/store/reportStore';
import { pdfGenerator } from '@/utils/pdfGenerator';

const { t } = useI18n();
const formData = inject('formData');
const reportStore = useReportStore();

const isGenerating = ref(false);
const previewRef = ref(null);
const chartsData = ref({});
const loadingCharts = ref(true);

// Computed properties for display
const clientSummary = computed(() => {
  const items = [];
  if (formData.value.nombreTaller) items.push({ label: t('printView.workshopName'), value: formData.value.nombreTaller });
  if (formData.value.nombre) items.push({ label: t('printView.name'), value: formData.value.nombre });
  if (formData.value.telefono) items.push({ label: t('printView.phone'), value: formData.value.telefono });
  if (formData.value.email) items.push({ label: t('printView.email'), value: formData.value.email });
  return items;
});

const vehicleSummary = computed(() => {
  const items = [];
  if (formData.value.marca) items.push({ label: t('printView.brand'), value: formData.value.marca });
  if (formData.value.modelo) items.push({ label: t('printView.model'), value: formData.value.modelo });
  if (formData.value.matricula) items.push({ label: t('printView.plate'), value: formData.value.matricula });
  if (formData.value.año) items.push({ label: t('printView.year'), value: formData.value.año.toString() });
  if (formData.value.kilometraje) items.push({ label: t('printView.mileage'), value: `${formData.value.kilometraje.toLocaleString()} km` });
  return items;
});

const selectedMeasurements = computed(() => formData.value.graficos || []);

// Load chart data for selected measurements
onMounted(async () => {
  loadingCharts.value = true;
  try {
    // Load data for each selected measurement
    for (const measurement of selectedMeasurements.value) {
      try {
        const data = await reportStore.fetchGraphData(measurement.value);
        if (data && data.data) {
          chartsData.value[measurement.value] = data;
        }
      } catch (err) {
        console.error(`Error loading data for ${measurement.value}:`, err);
      }
    }
  } finally {
    loadingCharts.value = false;
  }
});

// Generate PDF function
const generatePDF = async () => {
  isGenerating.value = true;
  
  try {
    // Create a temporary element for PDF generation
    const tempElement = document.createElement('div');
    tempElement.id = 'pdf-content';
    tempElement.style.cssText = `
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: white;
      padding: 40px;
      width: 800px;
      margin: 0 auto;
      box-sizing: border-box;
    `;
    
    // Generate HTML content
    tempElement.innerHTML = `
      <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #f59e0b; padding-bottom: 20px;">
        <h1 style="color: #1f2937; margin: 0; font-size: 28px; font-weight: bold;">INFORME DE MEDICIONES</h1>
        <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 14px;">Generado el ${new Date().toLocaleDateString()}</p>
        ${formData.value.nombreTaller ? `<p style="color: #f59e0b; margin: 5px 0 0 0; font-size: 16px; font-weight: 600;">${formData.value.nombreTaller}</p>` : ''}
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
        <div>
          <h2 style="color: #1f2937; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;">DATOS DEL CLIENTE</h2>
          ${clientSummary.value.map(item => `
            <div style="margin-bottom: 8px; display: flex;">
              <span style="font-weight: 600; color: #4b5563; min-width: 100px;">${item.label}:</span>
              <span style="color: #1f2937;">${item.value}</span>
            </div>
          `).join('')}
        </div>
        
        <div>
          <h2 style="color: #1f2937; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;">DATOS DEL VEHÍCULO</h2>
          ${vehicleSummary.value.map(item => `
            <div style="margin-bottom: 8px; display: flex;">
              <span style="font-weight: 600; color: #4b5563; min-width: 100px;">${item.label}:</span>
              <span style="color: #1f2937;">${item.value}</span>
            </div>
          `).join('')}
        </div>
      </div>
      
      ${selectedMeasurements.value.length > 0 ? `
        <div style="margin-bottom: 30px;">
          <h2 style="color: #1f2937; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;">MEDICIONES SELECCIONADAS</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
            ${selectedMeasurements.value.map(measurement => {
              const chartData = chartsData.value[measurement.value];
              const hasData = chartData && chartData.data && chartData.data.length > 0;
              const lastValue = hasData ? chartData.data[chartData.data.length - 1] : null;
              const unit = chartData?.unit || '';
              
              return `
                <div style="border: 1px solid #d1d5db; border-radius: 8px; overflow: hidden; background: white;">
                  <div style="background: #f59e0b; color: white; padding: 12px 15px;">
                    <h3 style="margin: 0; font-size: 14px; font-weight: 600;">${measurement.name}</h3>
                  </div>
                  <div style="padding: 15px;">
                    ${hasData ? `
                      <div style="margin-bottom: 10px;">
                        <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Último valor registrado:</div>
                        <div style="font-size: 24px; font-weight: bold; color: #1f2937;">${lastValue.y} ${unit}</div>
                        <div style="font-size: 11px; color: #9ca3af; margin-top: 4px;">${new Date(lastValue.x).toLocaleString()}</div>
                      </div>
                      <div style="border-top: 1px solid #e5e7eb; padding-top: 10px; margin-top: 10px;">
                        <div style="font-size: 12px; color: #6b7280;">
                          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                            <span>Total mediciones:</span>
                            <span style="font-weight: 600; color: #1f2937;">${chartData.data.length}</span>
                          </div>
                          ${chartData.data.length > 1 ? `
                            <div style="display: flex; justify-content: space-between;">
                              <span>Rango:</span>
                              <span style="font-weight: 600; color: #1f2937;">
                                ${Math.min(...chartData.data.map(d => d.y))} - ${Math.max(...chartData.data.map(d => d.y))} ${unit}
                              </span>
                            </div>
                          ` : ''}
                        </div>
                      </div>
                    ` : `
                      <div style="text-align: center; padding: 20px; color: #6b7280;">
                        <div style="font-size: 14px;">Sin datos disponibles</div>
                      </div>
                    `}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}
      
      ${formData.value.observaciones ? `
        <div style="margin-bottom: 30px;">
          <h2 style="color: #1f2937; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;">OBSERVACIONES</h2>
          <div style="background: #f9fafb; border: 1px solid #d1d5db; border-radius: 8px; padding: 20px;">
            <p style="margin: 0; line-height: 1.6; color: #1f2937;">${formData.value.observaciones}</p>
          </div>
        </div>
      ` : ''}
      
      <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px; margin: 0;">Generado con JOMA Dashboard - ${new Date().toLocaleString()}</p>
      </div>
    `;
    
    // Add to DOM temporarily
    document.body.appendChild(tempElement);
    
    // Generate PDF
    const filename = `reporte_${formData.value.marca || 'vehiculo'}_${Date.now()}.pdf`;
    await pdfGenerator.downloadPDF(tempElement, filename);
    
    // Remove temporary element
    document.body.removeChild(tempElement);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    // You might want to show a toast notification here
  } finally {
    isGenerating.value = false;
  }
};

defineExpose({
  generatePDF
});
</script>

<template>
  <div class="preview-step">
    <!-- Summary cards -->
    <div class="summary-grid">
      <!-- Client Info -->
      <Card class="summary-card">
        <template #header>
          <div class="card-header">
            <div class="header-icon client-icon">
              <i class="pi pi-user"></i>
            </div>
            <h3>{{ t('printView.clientData') }}</h3>
          </div>
        </template>
        <template #content>
          <div class="summary-content">
            <div v-for="item in clientSummary" :key="item.label" class="summary-item">
              <span class="item-label">{{ item.label }}</span>
              <span class="item-value">{{ item.value }}</span>
            </div>
            <div v-if="clientSummary.length === 0" class="empty-state">
              <i class="pi pi-info-circle"></i>
              <span>{{ t('reportWizard.noClientData') }}</span>
            </div>
          </div>
        </template>
      </Card>

      <!-- Vehicle Info -->
      <Card class="summary-card">
        <template #header>
          <div class="card-header">
            <div class="header-icon vehicle-icon">
              <i class="pi pi-car"></i>
            </div>
            <h3>{{ t('printView.vehicleDetails') }}</h3>
          </div>
        </template>
        <template #content>
          <div class="summary-content">
            <div v-for="item in vehicleSummary" :key="item.label" class="summary-item">
              <span class="item-label">{{ item.label }}</span>
              <span class="item-value">{{ item.value }}</span>
            </div>
            <div v-if="vehicleSummary.length === 0" class="empty-state">
              <i class="pi pi-info-circle"></i>
              <span>{{ t('reportWizard.noVehicleData') }}</span>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- Measurements -->
    <Card class="measurements-summary">
      <template #header>
        <div class="card-header">
          <div class="header-icon measurements-icon">
            <i class="pi pi-chart-line"></i>
          </div>
          <h3>{{ t('printView.measurements') }}</h3>
          <Badge 
            :value="selectedMeasurements.length" 
            :severity="selectedMeasurements.length > 0 ? 'success' : 'warning'"
          />
        </div>
      </template>
      <template #content>
        <div v-if="loadingCharts" class="text-center p-4">
          <ProgressSpinner />
          <p class="text-600 mt-2">{{ t('common.loading') }}...</p>
        </div>
        <div v-else-if="selectedMeasurements.length > 0" class="measurements-preview-grid">
          <div 
            v-for="measurement in selectedMeasurements" 
            :key="measurement.value"
            class="measurement-preview-card"
          >
            <div class="measurement-preview-header">
              <i class="pi pi-chart-line"></i>
              <span class="font-semibold">{{ measurement.name }}</span>
            </div>
            <div v-if="chartsData[measurement.value]" class="measurement-preview-content">
              <div v-if="chartsData[measurement.value].data && chartsData[measurement.value].data.length > 0">
                <div class="text-2xl font-bold text-primary">
                  {{ chartsData[measurement.value].data[chartsData[measurement.value].data.length - 1].y }}
                  {{ chartsData[measurement.value].unit || '' }}
                </div>
                <div class="text-sm text-600 mt-1">
                  {{ chartsData[measurement.value].data.length }} {{ t('measurements.readings') }}
                </div>
              </div>
              <div v-else class="text-600 text-sm">
                {{ t('measurements.noData') }}
              </div>
            </div>
            <div v-else class="measurement-preview-content">
              <div class="text-600 text-sm">
                {{ t('common.loading') }}...
              </div>
            </div>
          </div>
        </div>
        <div v-else class="empty-state">
          <i class="pi pi-exclamation-triangle text-orange-500"></i>
          <span>{{ t('reportWizard.noMeasurementsSelected') }}</span>
        </div>
      </template>
    </Card>

    <!-- Observations -->
    <Card v-if="formData.observaciones" class="observations-summary">
      <template #header>
        <div class="card-header">
          <div class="header-icon observations-icon">
            <i class="pi pi-file-edit"></i>
          </div>
          <h3>{{ t('printView.observations') }}</h3>
        </div>
      </template>
      <template #content>
        <div class="observations-content">
          <p>{{ formData.observaciones }}</p>
        </div>
      </template>
    </Card>

    <!-- Generate button -->
    <div class="generate-section">
      <div class="generate-info">
        <h4>{{ t('reportWizard.readyToGenerate') }}</h4>
        <p>{{ t('reportWizard.generateInfo') }}</p>
      </div>
      <Button
        :label="t('reportWizard.generateReport')"
        icon="pi pi-file-pdf"
        iconPos="right"
        size="large"
        :loading="isGenerating"
        :disabled="selectedMeasurements.length === 0"
        @click="generatePDF"
        class="generate-btn"
      />
    </div>
  </div>
</template>

<style scoped>
.preview-step {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.summary-card {
  border: 1px solid var(--p-surface-border);
  border-radius: 0.75rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 1.5rem 0 1.5rem;
}

.header-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.client-icon {
  background: var(--p-blue-100);
  color: var(--p-blue-700);
}

.vehicle-icon {
  background: var(--p-green-100);
  color: var(--p-green-700);
}

.measurements-icon {
  background: var(--p-orange-100);
  color: var(--p-orange-700);
}

.observations-icon {
  background: var(--p-purple-100);
  color: var(--p-purple-700);
}

.app-dark .client-icon {
  background: var(--p-blue-900);
  color: var(--p-blue-300);
}

.app-dark .vehicle-icon {
  background: var(--p-green-900);
  color: var(--p-green-300);
}

.app-dark .measurements-icon {
  background: var(--p-orange-900);
  color: var(--p-orange-300);
}

.app-dark .observations-icon {
  background: var(--p-purple-900);
  color: var(--p-purple-300);
}

.card-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--p-text-color);
  flex: 1;
}

.summary-content {
  padding: 1rem 1.5rem 1.5rem 1.5rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--p-surface-border);
}

.summary-item:last-child {
  border-bottom: none;
}

.item-label {
  font-weight: 500;
  color: var(--p-text-muted-color);
}

.item-value {
  font-weight: 600;
  color: var(--p-text-color);
}

.measurements-summary {
  margin-bottom: 2rem;
}

.measurements-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem 1.5rem 1.5rem 1.5rem;
}

.measurement-preview-card {
  border: 1px solid var(--p-surface-border);
  border-radius: 0.5rem;
  padding: 1rem;
  background: var(--p-surface-50);
}

.app-dark .measurement-preview-card {
  background: var(--p-surface-800);
}

.measurement-preview-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: var(--p-text-color);
}

.measurement-preview-content {
  padding-left: 1.75rem;
}

.observations-summary {
  margin-bottom: 2rem;
}

.observations-content {
  padding: 1rem 1.5rem 1.5rem 1.5rem;
}

.observations-content p {
  margin: 0;
  line-height: 1.6;
  color: var(--p-text-color);
  background: var(--p-surface-50);
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 4px solid var(--p-purple-500);
}

.app-dark .observations-content p {
  background: var(--p-surface-800);
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem;
  color: var(--p-text-muted-color);
  font-style: italic;
}

.generate-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--p-surface-0);
  border: 1px solid var(--p-surface-border);
  border-radius: 0.75rem;
  padding: 2rem;
  gap: 2rem;
}

.app-dark .generate-section {
  background: var(--p-surface-900);
}

.generate-info h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--p-text-color);
}

.generate-info p {
  margin: 0;
  color: var(--p-text-muted-color);
  line-height: 1.4;
}

.generate-btn {
  flex-shrink: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
  
  .measurements-list {
    grid-template-columns: 1fr;
  }
  
  .generate-section {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
}
</style>