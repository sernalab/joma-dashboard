<script setup>
import { ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";

import { useReportStore } from "@/store/reportStore";
import BarChart from "@/components/charts/BarChart.vue";
import LineChart from "@/components/charts/LineChart.vue";
import AreaChart from "@/components/charts/AreaChart.vue";
import PieChart from "@/components/charts/PieChart.vue";

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

  graficos: [],

  observaciones: "",
  fechaMedicion: new Date(),
  tecnico: "",
});

const chartComponents = {
  manometer: LineChart,
  vacuum: BarChart,
  "oil-pressure": AreaChart,
  "fuel-pressure": LineChart,
  "common-rail": BarChart,
  datacompression: BarChart,
  "turbo-pressure": BarChart,
  "brake-pressure": AreaChart,
  "dpf-pressure": PieChart,
  "adblue-pressure": BarChart,
};

const availableCharts = [
  { name: t("selectionView.manometer.title"), value: "manometer" },
  { name: t("selectionView.vacuum.title"), value: "vacuum" },
  { name: t("selectionView.oilPressure.title"), value: "oil-pressure" },
  { name: t("selectionView.fuelPressure.title"), value: "fuel-pressure" },
  { name: t("selectionView.commonRail.title"), value: "common-rail" },
  { name: t("selectionView.compression.title"), value: "datacompression" },
  { name: t("selectionView.turboPressure.title"), value: "turbo-pressure" },
  { name: t("selectionView.brakePressure.title"), value: "brake-pressure" },
  { name: t("selectionView.dpfPressure.title"), value: "dpf-pressure" },
  { name: t("selectionView.adbluePressure.title"), value: "adblue-pressure" },
];

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
    <div class="flex flex-column gap-3 no-print">
      <div class="mb-4">
        <h2 class="text-xl mb-3">{{ t("printView.clientData") }}</h2>
        <div class="grid">
          <div class="col-12 md:col-4">
            <label class="block mb-2">{{ t("printView.name") }}</label>
            <InputText v-model="formData.nombre" class="w-full" />
          </div>
          <div class="col-12 md:col-4">
            <label class="block mb-2">{{ t("printView.phone") }}</label>
            <InputText v-model="formData.telefono" class="w-full" />
          </div>
          <div class="col-12 md:col-4">
            <label class="block mb-2">{{ t("printView.email") }}</label>
            <InputText v-model="formData.email" class="w-full" />
          </div>
        </div>
      </div>

      <div class="mb-4">
        <h2 class="text-xl mb-3">{{ t("printView.vehicleDetails") }}</h2>
        <div class="grid">
          <div class="col-12 md:col-4">
            <label class="block mb-2">{{ t("printView.brand") }}</label>
            <InputText v-model="formData.marca" class="w-full" />
          </div>
          <div class="col-12 md:col-4">
            <label class="block mb-2">{{ t("printView.model") }}</label>
            <InputText v-model="formData.modelo" class="w-full" />
          </div>
          <div class="col-12 md:col-4">
            <label class="block mb-2">{{ t("printView.plate") }}</label>
            <InputText v-model="formData.matricula" class="w-full" />
          </div>
          <div class="col-12 md:col-4">
            <label class="block mb-2">{{ t("printView.year") }}</label>
            <InputNumber v-model="formData.año" class="w-full" />
          </div>
          <div class="col-12 md:col-4">
            <label class="block mb-2">{{ t("printView.mileage") }}</label>
            <InputNumber
              v-model="formData.kilometraje"
              suffix=" km"
              class="w-full"
            />
          </div>
        </div>
      </div>

      <div class="mb-4">
        <h2 class="text-xl mb-3">{{ t("printView.measurements") }}</h2>
        <MultiSelect
          v-model="formData.graficos"
          :options="availableCharts"
          optionLabel="name"
          :placeholder="t('printView.selectMeasurements')"
          class="w-full"
        />
      </div>

      <div class="mb-4">
        <h2 class="text-xl mb-3">{{ t("printView.observations") }}</h2>
        <Textarea
          v-model="formData.observaciones"
          rows="3"
          class="w-full"
          :placeholder="t('printView.addNotes')"
        />
      </div>

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

    <div id="printable-content" :class="{ hidden: !showPreview }" class="mt-4">
      <div class="print-header">
        <h1 class="font-bold">{{ t("printView.technicalReport") }}</h1>
      </div>

      <div
        v-if="formData.nombre || formData.telefono || formData.email"
        class="client-info"
      >
        <h2 class="font-bold">{{ t("printView.clientData") }}</h2>
        <div class="grid">
          <div v-if="formData.nombre" class="col-12 md:col-4">
            <p>
              <strong>{{ t("printView.name") }}:</strong> {{ formData.nombre }}
            </p>
          </div>
          <div v-if="formData.telefono" class="col-12 md:col-4">
            <p>
              <strong>{{ t("printView.phone") }}:</strong>
              {{ formData.telefono }}
            </p>
          </div>
          <div v-if="formData.email" class="col-12 md:col-4">
            <p>
              <strong>{{ t("printView.email") }}:</strong> {{ formData.email }}
            </p>
          </div>
        </div>

        <div
          v-if="
            formData.marca ||
            formData.modelo ||
            formData.matricula ||
            formData.año ||
            formData.kilometraje
          "
          class="vehicle-info"
        >
          <h2 class="font-bold mt-3">{{ t("printView.vehicleDetails") }}</h2>
          <div class="grid">
            <div v-if="formData.marca" class="col-12 md:col-4">
              <p>
                <strong>{{ t("printView.brand") }}:</strong>
                {{ formData.marca }}
              </p>
            </div>
            <div v-if="formData.modelo" class="col-12 md:col-4">
              <p>
                <strong>{{ t("printView.model") }}:</strong>
                {{ formData.modelo }}
              </p>
            </div>
            <div v-if="formData.matricula" class="col-12 md:col-4">
              <p>
                <strong>{{ t("printView.plate") }}:</strong>
                {{ formData.matricula }}
              </p>
            </div>
            <div v-if="formData.año" class="col-12 md:col-4">
              <p>
                <strong>{{ t("printView.year") }}:</strong> {{ formData.año }}
              </p>
            </div>
            <div v-if="formData.kilometraje" class="col-12 md:col-4">
              <p>
                <strong>{{ t("printView.mileage") }}:</strong>
                {{ formData.kilometraje }} km
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="formData.observaciones" class="mt-3">
        <h2 class="font-bold">{{ t("printView.observations") }}</h2>
        <p>{{ formData.observaciones }}</p>
      </div>

      <div v-if="formData.graficos.length">
        <h2 class="font-bold mt-5">{{ t("printView.selectedCharts") }}</h2>
        <div class="grid">
          <div
            v-for="grafico in formData.graficos"
            :key="grafico.value"
            :class="{
              'col-12 md:col-6 lg:col-4 p-3': formData.graficos.length > 1,
              'col-12 p-3 flex justify-content-center':
                formData.graficos.length === 1,
            }"
          >
            <div
              class="surface-card p-3 border-round mt-5"
              :style="
                formData.graficos.length === 1
                  ? 'width: 600px; max-width: 100%;'
                  : ''
              "
            >
              <h3>{{ grafico.name }}</h3>
              <template
                v-if="
                  reportStore.graphsData[grafico.value] &&
                  reportStore.graphsData[grafico.value].data?.length
                "
              >
                <component
                  :is="chartComponents[grafico.value]"
                  :data="reportStore.graphsData[grafico.value]"
                />
              </template>
              <p v-else class="text-center p-3 text-red-600">
                {{
                  t("printView.noDataAvailable", { chartName: grafico.name })
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
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