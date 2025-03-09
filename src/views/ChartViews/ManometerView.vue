<script setup>
import { ref, onMounted } from "vue";
import { useReportStore } from "@/store/reportStore";
import EmptyDataView from "@/views/EmptyDataView.vue";
import BarChart from "@/components/charts/BarChart.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const reportStore = useReportStore();
const graphData = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    // Usar el nuevo nombre de campo datamanometer80
    const data = await reportStore.fetchGraphData("datamanometer80");

    if (data) {
      graphData.value = data;
    } else {
      // Intentar con el nombre antiguo por compatibilidad
      const legacyData = await reportStore.fetchGraphData("manometer");
      if (legacyData) {
        graphData.value = legacyData;
      } else {
        error.value = "No hay datos de manómetro disponibles";
      }
    }
  } catch (err) {
    error.value = "Error al cargar los datos";
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <router-link to="/dashboard" class="p-3 text-700 no-underline">
      <i class="pi pi-arrow-left mr-2"></i>{{ t("extras.backToDashbaord") }}
    </router-link>

    <div v-if="loading" class="flex justify-content-center my-5">
      <ProgressSpinner />
    </div>

    <div v-else-if="error" class="my-5">
      <Message severity="error">{{ error }}</Message>
    </div>

    <div v-else-if="graphData" class="my-5">
      <div class="surface-card p-4 border-round">
        <h2>{{ graphData.title }}</h2>
        <p v-if="graphData.description" class="text-500">
          {{ graphData.description }}
        </p>
        <BarChart :data="graphData" />
      </div>
    </div>

    <EmptyDataView v-else />
  </div>
</template>