<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import CardDashboard from "./CardDashboard.vue";

const router = useRouter();

const services = ref([
  {
    title: "Monitorización",
    icon: "pi pi-chart-line",
    description: "Seguimiento en tiempo real de presiones y medidas",
    route: "/dashboard/monitoring",
  },
  {
    title: "Estadísticas",
    icon: "pi pi-chart-bar",
    description: "Análisis detallado de datos históricos",
    route: "/dashboard/stats",
  },
  {
    title: "Reportes",
    icon: "pi pi-file",
    description: "Generación de informes personalizados",
    route: "/dashboard/reports",
  },
  {
    title: "Configuración",
    icon: "pi pi-cog",
    description: "Ajustes del dispositivo y preferencias",
    route: "/dashboard/settings",
  },
]);

const navigateTo = (route) => {
  router.push(route);
};
</script>

<template>
  <div class="grid">
    <div
      v-for="service in services"
      :key="service.title"
      class="col-12 sm:col-6 lg:col-6 p-2"
    >
      <CardDashboard
        :title="service.title"
        :icon="service.icon"
        :description="service.description"
        @cardClick="navigateTo(service.route)"
      />
    </div>
  </div>
</template>