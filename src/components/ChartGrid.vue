<script setup>
import { ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  userData: {
    type: Object,
    default: () => ({}),
  },
});

const charts = ref([
  {
    title: "Presión",
    type: "bar",
    data: {
      series: [
        {
          data: [],
        },
      ],
      options: {
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
      },
    },
  },
  {
    title: "Temperatura",
    type: "line",
    data: {
      series: [
        {
          data: [30, 40, 35, 50],
        },
      ],
      options: {
        chart: { type: "line" },
      },
    },
  },
  {
    title: "Humedad",
    type: "area",
    data: {
      series: [
        {
          data: [70, 65, 75, 60],
        },
      ],
      options: {
        chart: { type: "area" },
      },
    },
  },
  {
    title: "Consumo",
    type: "pie",
    data: {
      series: [44, 55, 41, 17],
      options: {
        chart: { type: "pie" },
      },
    },
  },
]);

watchEffect(() => {
  if (props.userData?.datacompression) {
    charts.value[0].data.series[0].data = props.userData.datacompression;
  }
});
</script>

<template>
  <div id="charts-container" class="grid">
    <div v-for="chart in charts" :key="chart.title" class="col-12 md:col-6 p-2">
      <div class="surface-card p-4 border-round shadow-2">
        <h3 class="text-xl mb-4">{{ chart.title }}</h3>
        <apexchart
          :type="chart.type"
          :options="chart.data.options"
          :series="chart.data.series"
          height="300"
        />
      </div>
    </div>
  </div>
</template>

<style>
</style>