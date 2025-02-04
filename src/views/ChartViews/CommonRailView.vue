<script setup>
import { ref, onMounted } from "vue";
import { useReportStore } from "@/store/reportStore";
import EmptyDataView from "@/views/EmptyDataView.vue";

import LineChart from "@/components/charts/LineChart.vue";

const reportStore = useReportStore();
const graphData = ref(null);

onMounted(async () => {
  const data = await reportStore.fetchGraphData("common-rail");
  graphData.value = data;
});
</script>

<template>
  <div>
    <router-link to="/dashboard" class="p-3 text-700 no-underline">
      <i class="pi pi-arrow-left mr-2"></i>Volver al Dashboard
    </router-link>
    <div v-if="graphData">
      <div class="surface-card p-4 border-round">
        <h2>Medición de Compresión</h2>
        <LineChart :data="graphData" />
      </div>
    </div>
    <EmptyDataView v-else />
  </div>
</template>