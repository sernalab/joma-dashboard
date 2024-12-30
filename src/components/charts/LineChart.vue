<!-- components/charts/LineChart.vue (Temperatura en el tiempo) -->
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

const series = ref([
  {
    name: "Temperatura",
    data: props.datos,
  },
]);

const chartOptions = ref({
  chart: {
    type: "line",
    height: 350,
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  markers: {
    size: 4,
  },
  xaxis: {
    categories: ["0s", "10s", "20s", "30s", "40s", "50s", "60s"],
  },
  yaxis: {
    title: {
      text: "Temperatura (°C)",
    },
  },
  tooltip: {
    y: {
      formatter: (value) => `${value}°C`,
    },
  },
});

watchEffect(() => {
  series.value = [
    {
      name: "Temperatura",
      data: props.datos,
    },
  ];
});
</script>

<template>
  <div id="chart">
    <apexchart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>