<script setup>
import { ref, onMounted } from "vue";
import { useReportStore } from "@/store/reportStore";
import EmptyDataView from "@/views/EmptyDataView.vue";
import LineChart from "@/components/charts/LineChart.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const reportStore = useReportStore();
const graphData = ref(null);

onMounted(async () => {
  const data = await reportStore.fetchGraphData("manometer");
  graphData.value = data;
});
</script>

<template>
  <div>
    <router-link to="/dashboard" class="p-3 text-700 no-underline">
      <i class="pi pi-arrow-left mr-2"></i>{{ t("extras.backToDashbaord") }}
    </router-link>
    <div v-if="graphData">
      <LineChart :data="graphData" />
    </div>
    <EmptyDataView v-else />
  </div>
</template>
