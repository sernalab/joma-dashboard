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
    const data = await reportStore.fetchGraphData("datacompression");

    if (data) {
      graphData.value = data;
    } else {
      error.value = "No hay datos de compresión disponibles";
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
      <h2>{{ graphData.title }}</h2>
      <p v-if="graphData.description" class="text-500">
        {{ graphData.description }}
      </p>
      <BarChart id="chart" :data="graphData" :horizontal="true" />
    </div>

    <EmptyDataView v-else />
  </div>
</template>

<style>
#chart {
  margin: 0 auto;
  max-width: 1200px;
}
</style>