<script setup>
import AreaChart from "@/components/charts/AreaChart.vue";
import EmptyDataView from "@/views/EmptyDataView.vue";

const datos = [8.5, 11.2, 9.8, 12.3, 10.5, 9.9, 11.8];
</script>

<template>
  <div v-if="datos.length">
    <div class="surface-card p-4 border-round">
      <h2>Presión de Aceite</h2>
      <AreaChart :datos="datos" />
    </div>
  </div>
  <EmptyDataView v-else />
</template>