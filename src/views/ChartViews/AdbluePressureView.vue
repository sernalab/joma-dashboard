<script setup>
import BarChart from "@/components/charts/BarChart.vue";
import EmptyDataView from "@/views/EmptyDataView.vue";
import { ref } from "vue";

const datos = [8.5, 11.2, 9.8, 12.3, 10.5, 9.9, 11.8];
</script>

<template>
  <div>
    <router-link to="/dashboard" class="p-3 text-700 no-underline">
      <i class="pi pi-arrow-left mr-2"></i>Volver al Dashboard
    </router-link>
    <div v-if="datos.length">
      <div class="surface-card p-4 border-round">
        <h2>AdBlue</h2>
        <BarChart :datos="datos" />
      </div>
    </div>
    <EmptyDataView v-else />
  </div>
</template>

