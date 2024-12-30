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

const series = ref(props.datos);

const chartOptions = ref({
  chart: {
    type: "pie",
    height: 350,
  },
  labels: [
    t("extras.cylinder") + " 1",
    t("extras.cylinder") + " 2",
    t("extras.cylinder") + " 3",
    t("extras.cylinder") + " 4",
  ],
  colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560"],
  legend: {
    position: "bottom",
  },
  plotOptions: {
    pie: {
      donut: {
        size: "65%",
      },
    },
  },
  tooltip: {
    y: {
      formatter: (value) => `${value} PSI`,
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: "bottom",
        },
      },
    },
  ],
});

watchEffect(() => {
  series.value = props.datos;
});
</script>

<template>
  <div id="chart">
    <apexchart
      type="pie"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>