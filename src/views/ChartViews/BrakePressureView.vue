<script setup>
import EmptyDataView from "@/views/EmptyDataView.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const datos = ref([]);
import { ref } from "vue";
import LineChart from "@/components/charts/LineChart.vue";
</script>
<template>
  <div>
    <router-link to="/dashboard" class="p-3 text-700 no-underline">
      <i class="pi pi-arrow-left mr-2"></i>{{ t("extras.backToDashbaord") }}
    </router-link>
    <div v-if="datos.length">
      <LineChart :datos="datos" />
    </div>
    <EmptyDataView v-else />
  </div>
</template>
