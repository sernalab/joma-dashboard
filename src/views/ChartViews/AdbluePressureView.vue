<script setup>
import { ref, onMounted } from "vue";
import { useReportStore } from "@/store/reportStore";
import BarChart from "@/components/charts/BarChart.vue";
import EmptyDataView from "@/views/EmptyDataView.vue";
const reportStore = useReportStore();
const graphData = ref(null);

onMounted(async () => {
  const data = await reportStore.fetchGraphData("adblue-pressure");
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
        <h2>AdBlue</h2>
        <BarChart :data="graphData" />
      </div>
    </div>
    <EmptyDataView v-else />
  </div>
</template>

