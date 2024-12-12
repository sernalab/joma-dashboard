<script setup>
import { ref, watchEffect } from "vue";

import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  datos: {
    type: Array,
    default: () => [],
  },
});

console.log("Props recibidos en BarChart:", props.datos);

const series = ref([
  {
    data: props.datos,
  },
]);

const chartOptions = ref({
  chart: {
    type: "bar",
    height: 350,
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      borderRadiusApplication: "end",
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [
      t("extras.cylinder") + " 1",
      t("extras.cylinder") + " 2",
      t("extras.cylinder") + " 3",
      t("extras.cylinder") + " 4",
    ],
  },
});

watchEffect(() => {
  series.value = [
    {
      data: props.datos,
    },
  ];
});
</script>
    
<template>
  <div id="chart">
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>
