<script setup>
import EmptyDataView from "@/views/EmptyDataView.vue";

import LineChart from "@/components/charts/LineChart.vue";

const datos = [30, 40, 35, 50, 49, 60, 70];
</script>

<template>
  <div>
    <router-link to="/dashboard" class="p-3 text-700 no-underline">
      <i class="pi pi-arrow-left mr-2"></i>Volver al Dashboard
    </router-link>
    <div v-if="datos.length">
      <div class="surface-card p-4 border-round">
        <h2>Medición de Compresión</h2>
        <LineChart :datos="datos" />
      </div>
    </div>
    <EmptyDataView v-else />
  </div>
</template>