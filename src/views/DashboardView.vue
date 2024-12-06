<script setup>
import { ref } from "vue";
import BarChart from "@/components/charts/BarChart.vue";
import ServiceGrid from "@/components/ServiceGrid.vue";
import { dashboardService } from "@/services/dashboard.service";

const datos = ref([]);
const compressionData = ref([]);

const fetchData = async () => {
  try {
    datos.value = await dashboardService.fetchGeneralData();
  } catch (error) {
    console.error("Error:", error);
  }
};

const fetchCompressionData = async () => {
  try {
    compressionData.value = await dashboardService.fetchCompressionData();
  } catch (error) {
    console.error("Error:", error);
  }
};
</script>

<template>
  <div class="p-4">
    <div class="mb-4">
      <h1>Bienvenido al Dashboard</h1>
      <Button label="Cargar Datos" @click="fetchData" class="mb-3" />
      <Button label="Cargar Gráfico" @click="fetchCompressionData" />
      <div v-if="datos.length > 0">
        <pre>{{ JSON.stringify(datos, null, 2) }}</pre>
      </div>
      <BarChart :datos="compressionData" v-if="compressionData.length > 0" />
    </div>

    <ServiceGrid />

    <Divider />
  </div>
</template>