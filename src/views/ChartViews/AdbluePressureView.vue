<!-- AdBlueView.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { useReportStore } from "@/store/reportStore";
import BarChart from "@/components/charts/BarChart.vue";

const reportStore = useReportStore();
const graphData = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const data = await reportStore.fetchGraphData("dataadblue");

    if (data) {
      graphData.value = data;
    } else {
      error.value = "No hay datos de AdBlue disponibles";
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
      <i class="pi pi-arrow-left mr-2"></i>Volver al Dashboard
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
      <BarChart :data="graphData" />
    </div>

    <EmptyDataView v-else />
  </div>
</template>