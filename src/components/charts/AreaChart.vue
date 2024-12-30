<!-- components/charts/AreaChart.vue (Eficiencia de Combustión) -->
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
    name: "Eficiencia",
    data: props.datos,
  },
]);

const chartOptions = ref({
  chart: {
    type: "area",
    height: 350,
    stacked: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.45,
      opacityTo: 0.05,
      stops: [20, 100, 100, 100],
    },
  },
  xaxis: {
    categories: ["C1", "C2", "C3", "C4"],
  },
  yaxis: {
    title: {
      text: "Eficiencia (%)",
    },
    max: 100,
  },
  tooltip: {
    shared: true,
  },
});

watchEffect(() => {
  series.value = [
    {
      name: "Eficiencia",
      data: props.datos.map((value) => (value / 16) * 100),
    },
  ];
});
</script>

<template>
  <div id="chart">
    <apexchart
      type="area"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>