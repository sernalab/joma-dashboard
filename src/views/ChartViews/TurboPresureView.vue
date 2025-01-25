<script setup>
import { ref } from "vue";
import EmptyDataView from "@/views/EmptyDataView.vue";
import LineChart from "@/components/charts/LineChart.vue";

const datos = ref([]);
</script>

<template>
  <div v-if="datos.length">
    <LineChart :datos="datos" />
  </div>
  <EmptyDataView v-else />
</template>