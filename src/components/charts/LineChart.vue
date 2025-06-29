<script setup>
import { ref, watchEffect, computed } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      values: [],
      categories: [],
      title: "",
      yAxisTitle: "",
    }),
  },
});

const series = ref([
  {
    name: props.data.title || "Valor",
    data: [],
  },
]);

// Detect dark mode
const isDarkMode = computed(() => {
  return document.documentElement.classList.contains('app-dark');
});

const chartOptions = ref({
  chart: {
    type: "line",
    height: 350,
    background: 'transparent',
    toolbar: {
      show: true
    }
  },
  theme: {
    mode: isDarkMode.value ? 'dark' : 'light'
  },
  xaxis: {
    categories: props.data.categories || [],
    labels: {
      style: {
        colors: isDarkMode.value ? '#e2e8f0' : '#64748b'
      }
    }
  },
  yaxis: {
    title: {
      text: props.data.yAxisTitle || "",
      style: {
        color: isDarkMode.value ? '#e2e8f0' : '#64748b'
      }
    },
    labels: {
      style: {
        colors: isDarkMode.value ? '#e2e8f0' : '#64748b'
      }
    }
  },
  grid: {
    borderColor: isDarkMode.value ? '#334155' : '#e2e8f0'
  },
  tooltip: {
    theme: isDarkMode.value ? 'dark' : 'light'
  }
});

watchEffect(() => {
  if (props.data) {
    series.value[0].data = props.data.data;
    series.value[0].name = props.data.title;
    chartOptions.value.xaxis.categories = props.data.categories;
    chartOptions.value.yaxis.title.text = props.data.yAxisTitle;
  }
  
  // Update theme when dark mode changes
  const isDark = document.documentElement.classList.contains('app-dark');
  chartOptions.value.theme.mode = isDark ? 'dark' : 'light';
  chartOptions.value.xaxis.labels.style.colors = isDark ? '#e2e8f0' : '#64748b';
  chartOptions.value.yaxis.title.style.color = isDark ? '#e2e8f0' : '#64748b';
  chartOptions.value.yaxis.labels.style.colors = isDark ? '#e2e8f0' : '#64748b';
  chartOptions.value.grid.borderColor = isDark ? '#334155' : '#e2e8f0';
  chartOptions.value.tooltip.theme = isDark ? 'dark' : 'light';
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