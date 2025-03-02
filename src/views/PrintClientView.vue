<script setup>
import { ref, watchEffect } from "vue";
import { useReportStore } from "@/store/reportStore";
import BarChart from "@/components/charts/BarChart.vue";
import LineChart from "@/components/charts/LineChart.vue";
import AreaChart from "@/components/charts/AreaChart.vue";
import PieChart from "@/components/charts/PieChart.vue";

import { generatePDF } from "@/utils/pdfGenerator";

const reportStore = useReportStore();
const loading = ref(false);
const showPreview = ref(false);

const formData = ref({
  nombre: "",
  telefono: "",
  email: "",

  // Datos del Vehículo
  vehiculo: "",
  marca: "",
  modelo: "",
  año: null,
  matricula: "",
  kilometraje: null,

  // Mediciones
  graficos: [],

  // Información Adicional
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
  { name: "Manómetro", value: "manometer" },
  { name: "Vacío", value: "vacuum" },
  { name: "Presión de aceite", value: "oil-pressure" },
  { name: "Presión de combustible", value: "fuel-pressure" },
  { name: "Common rail", value: "common-rail" },
  { name: "Compresión", value: "datacompression" },
  { name: "Presión turbo", value: "turbo-pressure" },
  { name: "Presión de frenos", value: "brake-pressure" },
  { name: "Presión filtro de partículas", value: "dpf-pressure" },
  { name: "Presión AdBlue", value: "adblue-pressure" },
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
  generatePDF("printable-content");
};
</script>

<template>
  <div class="surface-card p-4">
    <div class="flex flex-column gap-3 no-print">
      <div class="mb-4">
        <h2 class="text-xl mb-3">Datos del Cliente</h2>
        <div class="grid">
          <div class="col-12 md:col-4">
            <label class="block mb-2">Nombre del Cliente</label>
            <InputText v-model="formData.nombre" class="w-full" />
          </div>
          <div class="col-12 md:col-4">
            <label class="block mb-2">telefono</label>
            <InputText v-model="formData.telefono" class="w-full" />
          </div>
          <div class="col-12 md:col-4">
            <label class="block mb-2">email</label>
            <InputText v-model="formData.email" class="w-full" />
          </div>
        </div>
      </div>

      <div class="mb-4">
        <h2 class="text-xl mb-3">Detalles del Vehículo</h2>
        <div class="grid">
          <div class="col-12 md:col-4">
            <label class="block mb-2">Marca</label>
            <InputText v-model="formData.marca" class="w-full" />
          </div>
          <div class="col-12 md:col-4">
            <label class="block mb-2">Modelo</label>
            <InputText v-model="formData.modelo" class="w-full" />
          </div>
          <div class="col-12 md:col-4">
            <label class="block mb-2">Matrícula</label>
            <InputText v-model="formData.matricula" class="w-full" />
          </div>
          <div class="col-12 md:col-4">
            <label class="block mb-2">Año</label>
            <InputNumber v-model="formData.año" class="w-full" />
          </div>
          <div class="col-12 md:col-4">
            <label class="block mb-2">Kilometraje</label>
            <InputNumber
              v-model="formData.kilometraje"
              suffix=" km"
              class="w-full"
            />
          </div>
        </div>
      </div>

      <div class="mb-4">
        <h2 class="text-xl mb-3">Mediciones a Realizar</h2>
        <MultiSelect
          v-model="formData.graficos"
          :options="availableCharts"
          optionLabel="name"
          placeholder="Seleccionar mediciones"
          class="w-full"
        />
      </div>

      <div class="mb-4">
        <h2 class="text-xl mb-3">Observaciones</h2>
        <Textarea
          v-model="formData.observaciones"
          rows="3"
          class="w-full"
          placeholder="Añadir notas o comentarios sobre las mediciones"
        />
      </div>

      <div class="flex justify-content-center">
        <Button
          @click="onPrint"
          label="Generar Informe"
          icon="pi pi-print"
          :loading="loading"
          :disabled="!formData.graficos.length"
          class="w-auto"
        />
      </div>
    </div>

    <div id="printable-content" :class="{ hidden: !showPreview }" class="mt-4">
      <div class="print-header">
        <h1>Informe Técnico</h1>
      </div>

      <div class="client-info">
        <h2>Información del Cliente</h2>
        <div class="grid">
          <div v-if="formData.nombre" class="col-12 md:col-4">
            <p><strong>Cliente:</strong> {{ formData.nombre }}</p>
          </div>
          <div v-if="formData.telefono" class="col-12 md:col-4">
            <p><strong>Teléfono:</strong> {{ formData.telefono }}</p>
          </div>
          <div v-if="formData.email" class="col-12 md:col-4">
            <p><strong>Email:</strong> {{ formData.email }}</p>
          </div>
        </div>

        <h2 class="mt-3">Información del Vehículo</h2>
        <div class="grid">
          <div v-if="formData.marca" class="col-12 md:col-4">
            <p><strong>Marca:</strong> {{ formData.marca }}</p>
          </div>
          <div v-if="formData.modelo" class="col-12 md:col-4">
            <p><strong>Modelo:</strong> {{ formData.modelo }}</p>
          </div>
          <div v-if="formData.matricula" class="col-12 md:col-4">
            <p><strong>Matrícula:</strong> {{ formData.matricula }}</p>
          </div>
          <div v-if="formData.año" class="col-12 md:col-4">
            <p><strong>Año:</strong> {{ formData.año }}</p>
          </div>
          <div v-if="formData.kilometraje" class="col-12 md:col-4">
            <p><strong>Kilometraje:</strong> {{ formData.kilometraje }} km</p>
          </div>
        </div>

        <div v-if="formData.observaciones" class="mt-3">
          <h2>Observaciones</h2>
          <p>{{ formData.observaciones }}</p>
        </div>
      </div>

      <div v-if="formData.graficos.length">
        <h2>Gráficos Seleccionados</h2>
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
                No hay datos disponibles para {{ grafico.name }}.
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
  .no-print {
    display: none !important;
  }

  #printable-content {
    display: block !important;
    padding: 0;
    border: none;
  }

  .print-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .client-info {
    margin-bottom: 30px;
  }

  .client-info p {
    margin: 10px 0;
  }

  .apexcharts-canvas {
    width: 100% !important;
    height: auto !important;
  }

  .apexcharts-svg {
    width: 100% !important;
    height: auto !important;
  }

  .grid {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 20px !important;
  }

  .col-12 {
    width: 100% !important;
    padding: 0 !important;
  }

  .surface-card {
    break-inside: avoid;
    page-break-inside: avoid;
    margin-bottom: 20px;
  }
}

.surface-card {
  height: 100%;
}
</style>