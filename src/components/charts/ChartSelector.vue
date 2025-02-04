<script setup>
import AreaChart from "./AreaChart.vue";
import BarChart from "./BarChart.vue";
import LineChart from "./LineChart.vue";
import PieChart from "./PieChart.vue";

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => Object.values(CHART_TYPES).includes(value),
  },
  data: {
    type: Object,
    required: true,
  },
});

const chartComponents = {
  [CHART_TYPES.AREA]: AreaChart,
  [CHART_TYPES.BAR]: BarChart,
  [CHART_TYPES.LINE]: LineChart,
  [CHART_TYPES.PIE]: PieChart,
};
</script>

<template>
  <component
    :is="chartComponents[type]"
    v-if="chartComponents[type]"
    :data="data"
  />
</template>