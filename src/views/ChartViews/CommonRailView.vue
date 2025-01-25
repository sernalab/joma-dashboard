<script setup>
import EmptyDataView from "@/views/EmptyDataView.vue";

import LineChart from "@/components/charts/LineChart.vue";

const datos = [30, 40, 35, 50, 49, 60, 70];
</script>

<template>
  <div v-if="datos.length">
    <div class="surface-card p-4 border-round">
      <h2>Medición de Compresión</h2>
      <LineChart :datos="datos" />
    </div>
  </div>
  <EmptyDataView v-else />
</template>