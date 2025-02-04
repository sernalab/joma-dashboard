<script setup>
import { ref, watchEffect } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const series = ref([
  {
    name: props.data.title || "Valor",
    data: props.data.data || [], // Usar data directamente, no values
  },
]);

const chartOptions = ref({
  chart: {
    type: "bar",
    height: 350,
  },
  xaxis: {
    categories: props.data.categories || [],
  },
  yaxis: {
    title: {
      text: props.data.yAxisTitle || "",
    },
  },
});

watchEffect(() => {
  if (props.data) {
    series.value[0].data = props.data.data;
    series.value[0].name = props.data.title;
    chartOptions.value.xaxis.categories = props.data.categories;
    chartOptions.value.yaxis.title.text = props.data.yAxisTitle;
  }
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
