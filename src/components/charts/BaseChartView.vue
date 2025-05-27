<script setup>
import { ref, onMounted } from "vue";
import { useReportStore } from "@/store/reportStore";
import { useI18n } from "vue-i18n";
import EmptyDataView from "@/views/EmptyDataView.vue";
import LineChart from "@/components/charts/LineChart.vue";
import ProgressSpinner from "primevue/progressspinner";

const props = defineProps({
  dataKey: {
    type: String,
    required: true
  }
});

const { t } = useI18n();
const reportStore = useReportStore();
const graphData = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const data = await reportStore.fetchGraphData(props.dataKey);
    graphData.value = data || null;
  } catch (err) {
    // Error handling is done in the store
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <router-link to="/dashboard/all-measurements" class="p-3 text-700 no-underline">
      <i class="pi pi-arrow-left mr-2"></i>{{ t("extras.backToAllMeasurements") }}
    </router-link>

    <div v-if="loading" class="flex justify-content-center my-5">
      <ProgressSpinner />
    </div>

    <div v-else-if="graphData && graphData.data" class="my-5">
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

<style scoped>
.surface-card {
  max-width: 1200px;
  margin: 0 auto;
}
</style>