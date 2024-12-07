<script setup>
import { ref } from "vue";

const charts = ref([
  {
    title: "Presión",
    type: "bar",
    data: {
      series: [
        {
          data: [400, 430, 448, 470],
        },
      ],
      options: {
        chart: { type: "bar" },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
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
</script>

<template>
  <div class="grid">
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