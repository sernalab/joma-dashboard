<script setup>
import { ref, watchEffect } from "vue";

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
    categories: ["Medición 1", "Medición 2", "Medición 3", "Medición 4"], // Etiquetas para cada valor
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
