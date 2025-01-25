<script setup>
import BarChart from "@/components/charts/BarChart.vue";
import EmptyDataView from "@/views/EmptyDataView.vue";

const datos = [8.5, 11.2, 9.8, 12.3, 10.5, 9.9, 11.8];
</script>

<template>
  <div v-if="datos.length">
    <div class="surface-card p-4 border-round">
      <h2>AdBlue</h2>
      <BarChart :datos="datos" />
    </div>
  </div>
  <EmptyDataView v-else />
</template>

