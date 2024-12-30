<script setup>
import { ref, onMounted } from "vue";
import BarChart from "@/components/charts/BarChart.vue";
import LineChart from "@/components/charts/LineChart.vue";
import PieChart from "@/components/charts/PieChart.vue";
import AreaChart from "@/components/charts/AreaChart.vue";

import { useI18n } from "vue-i18n";

const userData = ref(null);
const { t } = useI18n();

onMounted(() => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    userData.value = user;
  }
});
</script>

<template>
  <div class="mb-4">
    <h1 class="text-3xl font-medium">
      {{ t("login.title") }} {{ userData?.name || userData?.id }}
    </h1>
  </div>

  <!-- <div class="grid mb-4">
    <WelcomeWidget />
  </div> -->

  <div class="grid">
    <div class="col-12 md:col-6 mb-4">
      <div class="mb-3">
        <span class="text-lg md:text-xl text-900 font-medium block"
          >Compresión por Cilindro</span
        >
        <span class="text-500">Medición en PSI</span>
      </div>
      <div class="widget shadow-1 p-4">
        <BarChart :datos="userData?.datacompression" />
      </div>
    </div>
    <div class="col-12 md:col-6 mb-4">
      <div class="mb-3">
        <span class="text-lg md:text-xl text-900 font-medium block"
          >Compresión por Cilindro</span
        >
        <span class="text-500">Medición en PSI</span>
      </div>
      <div class="widget shadow-1 p-4">
        <LineChart :datos="userData?.datacompression" />
      </div>
    </div>

    <div class="col-12 md:col-6">
      <div class="mb-3">
        <span class="text-lg md:text-xl text-900 font-medium block"
          >Compresión por Cilindro</span
        >
        <span class="text-500">Medición en PSI</span>
      </div>
      <div class="widget shadow-1 p-4">
        <PieChart :datos="userData?.datacompression" />
      </div>
    </div>
    <div class="col-12 md:col-6">
      <div class="mb-3">
        <span class="text-lg md:text-xl text-900 font-medium block"
          >Compresión por Cilindro</span
        >
        <span class="text-500">Medición en PSI</span>
      </div>
      <div class="widget shadow-1 p-4">
        <AreaChart :datos="userData?.datacompression" />
      </div>
    </div>
  </div>
</template>

<style>
.widget {
  background-color: #fff;
  border-radius: 10px;
}
</style>