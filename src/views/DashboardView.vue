<script setup>
import { ref, onMounted } from "vue";
import ServiceGrid from "@/components/ServiceGrid.vue";
import ChartGrid from "@/components/ChartGrid.vue";
import BarChart from "@/components/charts/BarChart.vue";

const userData = ref(null);
const showData = ref(false);

onMounted(() => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    userData.value = user;
  }
});
</script>

<template>
  <div class="p-0 md:p-4">
    <div v-if="userData" class="mb-4">
      <h1>Bienvenido {{ userData.name || userData.id }}</h1>

      <Button
        label="DATOS USUARIO"
        @click="showData = !showData"
        class="mb-3"
      />

      <div v-if="showData" class="surface-card p-4 border-round mb-3">
        <pre>{{ JSON.stringify(userData, null, 2) }}</pre>
      </div>

      <div v-if="userData.datacompression">
        <h2>Datos de Compresión</h2>
        <BarChart :datos="userData.datacompression" />
      </div>

      <ServiceGrid />

      <Divider />

      <ChartGrid />
    </div>
  </div>
</template>