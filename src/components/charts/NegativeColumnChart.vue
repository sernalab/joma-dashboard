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
    stacked: false,
  },
  colors: ["#34A5ED"],
  plotOptions: {
    bar: {
      horizontal: props.horizontal,
      columnWidth: "55%",
      borderRadius: 4,
      colors: {
        ranges: [
          {
            from: -1000000,
            to: 0,
            color: "#F15B46", // Rojo para valores negativos
          },
        ],
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: props.data.categories || [],
  },
  yaxis: {
    title: {
      text: props.data.yAxisTitle || "",
    },
    labels: {
      formatter: function (val) {
        return val.toFixed(1);
      },
    },
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val.toFixed(2);
      },
    },
  },
  grid: {
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  fill: {
    opacity: 1,
  },
});

watchEffect(() => {
  if (props.data) {
    series.value[0].data = props.data.data;
    series.value[0].name = props.data.title;
    chartOptions.value.xaxis.categories = props.data.categories;
    chartOptions.value.yaxis.title.text = props.data.yAxisTitle;
    chartOptions.value.plotOptions.bar.horizontal = props.horizontal;

    // Si hay una unidad especificada en los datos, actualizamos el tooltip
    if (props.data.unit) {
      chartOptions.value.tooltip.y.formatter = function (val) {
        return val.toFixed(2) + " " + props.data.unit;
      };
    }
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