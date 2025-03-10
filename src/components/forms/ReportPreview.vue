<script setup>
import { defineProps } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  reportStore: {
    type: Object,
    required: true,
  },
  chartComponents: {
    type: Object,
    required: true,
  },
  showPreview: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div id="printable-content" :class="{ hidden: !showPreview }" class="mt-4">
    <div class="print-header">
      <h1 class="font-bold">{{ t("printView.technicalReport") }}</h1>
    </div>

    <!-- Información del cliente -->
    <div class="client-info">
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

      <!-- Información del vehículo -->
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

    <!-- Observaciones -->
    <div v-if="formData.observaciones" class="observations-section mt-3">
      <h2 class="font-bold">{{ t("printView.observations") }}</h2>
      <p>{{ formData.observaciones }}</p>
    </div>

    <!-- Gráficos -->
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
              {{ t("printView.noDataAvailable", { chartName: grafico.name }) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.observations-section {
  margin-top: 1rem;
  margin-bottom: 1.5rem;
}

@media print {
  .observations-section {
    display: block !important;
    margin-top: 20px !important;
    margin-bottom: 20px !important;
    page-break-inside: avoid !important;
  }

  .observations-section h2 {
    display: block !important;
    color: #333 !important;
    margin-bottom: 10px !important;
    font-weight: bold !important;
  }

  .observations-section p {
    display: block !important;
    margin-bottom: 15px !important;
  }
}
</style>