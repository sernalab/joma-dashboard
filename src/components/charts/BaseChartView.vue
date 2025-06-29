<script setup>
import { ref, onMounted } from "vue";
import { useReportStore } from "@/store/reportStore";
import { useI18n } from "vue-i18n";
import EmptyDataView from "@/views/EmptyDataView.vue";
import LineChart from "@/components/charts/LineChart.vue";

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

// Títulos de las mediciones
const measurementTitles = {
  datamanometer80: () => t("selectionView.manometer.title"),
  datavacuum: () => t("selectionView.vacuum.title"),
  dataoil: () => t("selectionView.oilPressure.title"),
  datafuel: () => t("selectionView.fuelPressure.title"),
  datacommonrail: () => t("selectionView.commonRail.title"),
  datacompression: () => t("selectionView.compression.title"),
  dataturbo: () => t("selectionView.turboPressure.title"),
  dataadblue: () => t("selectionView.adbluePressure.title"),
  databrake: () => t("selectionView.brakePressure.title"),
  datadpf: () => t("selectionView.dpfPressure.title"),
};

const getTitle = () => {
  return measurementTitles[props.dataKey]?.() || '';
};

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
  <div class="chart-view-container">
    <!-- Header -->
    <div class="view-header">
      <div class="header-left">
        <Button
          icon="pi pi-arrow-left"
          class="p-button-text p-button-plain"
          @click="$router.push('/dashboard/all-measurements')"
        />
        <h1 class="view-title">{{ getTitle() }}</h1>
      </div>
    </div>

    <div class="content-area">
      <div v-if="loading" class="flex align-items-center justify-content-center h-full">
        <ProgressSpinner />
      </div>

      <div v-else-if="graphData && graphData.data" class="my-5">
        <div class="surface-card p-4 border-round">
          <p v-if="graphData.description" class="text-500 mb-4">
            {{ graphData.description }}
          </p>
          <LineChart :data="graphData" />
        </div>
      </div>

      <EmptyDataView v-else />
    </div>
  </div>
</template>

<style scoped>
.chart-view-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.view-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.view-title {
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
  color: var(--p-text-color);
}

.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 500px;
}

.h-full {
  height: 100%;
}

@media (max-width: 768px) {
  .view-title {
    font-size: 1.5rem;
  }
  
  .content-area {
    min-height: 400px;
  }
}
</style>

<style scoped>
.surface-card {
  max-width: 1200px;
  margin: 0 auto;
}
</style>