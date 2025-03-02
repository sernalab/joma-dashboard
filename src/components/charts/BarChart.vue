<script setup>
import { ref, watchEffect } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  horizontal: {
    type: Boolean,
    default: false,
  },
});

const series = ref([
  {
    name: props.data.title || "Valor",
    data: props.data.data || [],
  },
]);

const chartOptions = ref({
  chart: {
    type: "bar",
    height: 350,
  },
  plotOptions: {
    bar: {
      horizontal: props.horizontal,
    },
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
    chartOptions.value.plotOptions.bar.horizontal = props.horizontal;
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