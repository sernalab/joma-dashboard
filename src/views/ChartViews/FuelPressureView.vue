<script setup>
import { ref, onMounted } from "vue";
import { useReportStore } from "@/store/reportStore";
import EmptyDataView from "@/views/EmptyDataView.vue";
import LineChart from "@/components/charts/LineChart.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const reportStore = useReportStore();
const graphData = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const data = await reportStore.fetchGraphData("datafuel");
    graphData.value = data || null;
  } catch (err) {
    console.error("Error al cargar los datos:", err);
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

    <div v-else-if="graphData" class="my-5">
      <div class="surface-card p-4 border-round">
        <h2>{{ graphData.title }}</h2>
        <p v-if="graphData.description" class="text-500">
          {{ graphData.description }}
        </p>
        <LineChart :data="graphData" />
      </div>
    </div>

    <EmptyDataView v-else />
  </div>
</template>