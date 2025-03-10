<script setup>
import { ref, watchEffect, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useReportStore } from "@/store/reportStore";

// Importar componentes modulares
import ClientForm from "@/components/forms/ClientForm.vue";
import VehicleForm from "@/components/forms/VehicleForm.vue";
import ChartSelector from "@/components/forms/ChartSelector.vue";
import ObservationsForm from "@/components/forms/ObservationsForm.vue";
import ReportPreview from "@/components/forms/ReportPreview.vue";

// Importar componentes de gráficos
import BarChart from "@/components/charts/BarChart.vue";
import LineChart from "@/components/charts/LineChart.vue";
import AreaChart from "@/components/charts/AreaChart.vue";
import PieChart from "@/components/charts/PieChart.vue";
import NegativeColumnChart from "@/components/charts/NegativeColumnChart.vue";

const { t } = useI18n();
const reportStore = useReportStore();
const loading = ref(false);
const showPreview = ref(false);

const formData = ref({
  nombre: "",
  telefono: "",
  email: "",

  vehiculo: "",
  marca: "",
  modelo: "",
  año: null,
  matricula: "",
  kilometraje: null,

  observaciones: "",
  graficos: [],
});

// Mapeo de componentes de gráficos a tipos de datos
const chartComponents = {
  datamanometer80: BarChart,
  datavacuum: NegativeColumnChart,
  dataoil: BarChart,
  datafuel: LineChart,
  datacommonrail: BarChart,
  datacompression: BarChart,
  dataturbo: BarChart,
  "brake-pressure": AreaChart,
  "dpf-pressure": PieChart,
  "adblue-pressure": BarChart,
  dataadblue: BarChart,
};

// Lista de gráficos disponibles
const availableCharts = [
  { name: t("selectionView.manometer.title"), value: "datamanometer80" },
  { name: t("selectionView.vacuum.title"), value: "datavacuum" },
  { name: t("selectionView.oilPressure.title"), value: "dataoil" },
  { name: t("selectionView.fuelPressure.title"), value: "datafuel" },
  { name: t("selectionView.commonRail.title"), value: "datacommonrail" },
  { name: t("selectionView.compression.title"), value: "datacompression" },
  { name: t("selectionView.turboPressure.title"), value: "dataturbo" },
  { name: t("selectionView.brakePressure.title"), value: "brake-pressure" },
  { name: t("selectionView.dpfPressure.title"), value: "dpf-pressure" },
  { name: t("selectionView.adbluePressure.title"), value: "dataadblue" },
];

watch(
  () => formData.value,
  () => {
    showPreview.value = true;
  },
  { deep: true, immediate: true }
);

// Observar cambios en los gráficos seleccionados
watchEffect(async () => {
  if (formData.value.graficos.length) {
    loading.value = true;
    await reportStore.fetchSelectedGraphsData(formData.value.graficos);
    loading.value = false;
    showPreview.value = true;
  }
});

const onPrint = () => {
  window.print();
};
</script>

<template>
  <div class="surface-card p-4">
    <!-- Formulario (no imprimible) -->
    <div class="flex flex-column gap-3 no-print">
      <ClientForm v-model="formData" />
      <VehicleForm v-model="formData" />
      <ChartSelector
        v-model="formData.graficos"
        :availableCharts="availableCharts"
      />
      <ObservationsForm v-model="formData" />

      <!-- Botón de impresión -->
      <div class="flex justify-content-center">
        <Button
          @click="onPrint"
          :label="t('printView.generateReport')"
          icon="pi pi-print"
          :loading="loading"
          :disabled="!formData.graficos.length"
          class="w-auto"
        />
      </div>
    </div>

    <ReportPreview
      :formData="formData"
      :reportStore="reportStore"
      :chartComponents="chartComponents"
      :showPreview="showPreview"
    />
  </div>
</template>

<style>
.hidden {
  display: none;
}

#printable-content {
  margin-top: 2rem;
  padding: 20px;
}

@media print {
  /* Estilos generales de impresión */
  .no-print {
    display: none !important;
  }

  #printable-content {
    display: block !important;
    padding: 0;
    border: none;
    width: 100%;
  }

  /* Ajustes para títulos */
  h1,
  h2,
  h3 {
    color: #333 !important;
    margin-bottom: 10px !important;
  }

  /* Ajustes para la información del cliente y vehículo */
  .client-info,
  .vehicle-info {
    margin-bottom: 20px !important;
  }

  /* IMPORTANTE: Forzar que el grid se muestre correctamente */
  .grid {
    display: flex !important;
    flex-wrap: wrap !important;
    width: 100% !important;
  }

  /* Ajustar columnas para que se vean como en la vista previa */
  .col-12.md\:col-4 {
    width: 33.3333% !important;
    padding-right: 15px !important;
    box-sizing: border-box !important;
  }

  /* Ajustes para los gráficos */
  .apexcharts-canvas {
    width: 100% !important;
    height: auto !important;
  }

  .apexcharts-svg {
    width: 100% !important;
    height: auto !important;
  }

  /* Prevenir cortes entre páginas */
  .surface-card {
    break-inside: avoid !important;
    page-break-inside: avoid !important;
    margin-bottom: 15px !important;
  }

  /* Eliminar elementos de UI de Apex Charts en impresión */
  .apexcharts-toolbar,
  .apexcharts-menu-icon {
    display: none !important;
  }

  /* Ajustar márgenes de página */
  @page {
    margin: 1cm;
  }
}

.surface-card {
  height: 100%;
}
</style>