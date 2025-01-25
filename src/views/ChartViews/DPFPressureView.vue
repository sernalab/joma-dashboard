<script setup>
import EmptyDataView from "@/views/EmptyDataView.vue";
const datos = ref([]);
</script>
<template>
  <div v-if="datos.length">
    <LineChart :datos="datos" />
  </div>
  <EmptyDataView v-else />
</template>
