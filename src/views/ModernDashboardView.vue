<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { authService } from "@/services/auth.service";
import Button from "primevue/button";

// Import new components
import WelcomeSection from "@/components/dashboard/WelcomeSection.vue";
import StatsGrid from "@/components/dashboard/StatsGrid.vue";
import MeasurementCard from "@/components/dashboard/MeasurementCard.vue";
import ActivityList from "@/components/dashboard/ActivityList.vue";

const { t } = useI18n();
const router = useRouter();
const currentUser = ref(authService.getCurrentUser());

// Datos de ejemplo para las tarjetas
const measurementCards = ref([
  {
    id: "manometer",
    title: t("selectionView.manometer.title"),
    description: t("selectionView.manometer.description"),
    icon: "pi pi-gauge",
    route: "/dashboard/manometer",
    color: "#3b82f6",
    bgColor: "#dbeafe",
    lastValue: "75 bar",
    trend: "up",
    trendValue: "+5%",
  },
  {
    id: "vacuum",
    title: t("selectionView.vacuum.title"),
    description: t("selectionView.vacuum.description"),
    icon: "pi pi-circle",
    route: "/dashboard/vacuum",
    color: "#8b5cf6",
    bgColor: "#ede9fe",
    lastValue: "-0.8 bar",
    trend: "stable",
    trendValue: "0%",
  },
  {
    id: "oil-pressure",
    title: t("selectionView.oilPressure.title"),
    description: t("selectionView.oilPressure.description"),
    icon: "pi pi-filter",
    route: "/dashboard/oil-pressure",
    color: "#f59e0b",
    bgColor: "#fef3c7",
    textColor: "#f59e0b",
    lastValue: "4.2 bar",
    trend: "down",
    trendValue: "-2%",
  },
  {
    id: "fuel-pressure",
    title: t("selectionView.fuelPressure.title"),
    description: t("selectionView.fuelPressure.description"),
    icon: "pi pi-bolt",
    route: "/dashboard/fuel-pressure",
    color: "#10b981",
    bgColor: "#d1fae5",
    lastValue: "3.5 bar",
    trend: "up",
    trendValue: "+1%",
  },
  {
    id: "common-rail",
    title: t("selectionView.commonRail.title"),
    description: t("selectionView.commonRail.description"),
    icon: "pi pi-server",
    route: "/dashboard/common-rail",
    color: "#ef4444",
    bgColor: "#fee2e2",
    lastValue: "1800 bar",
    trend: "up",
    trendValue: "+3%",
  },
  {
    id: "compression",
    title: t("selectionView.compression.title"),
    description: t("selectionView.compression.description"),
    icon: "pi pi-chart-bar",
    route: "/dashboard/compression",
    color: "#6366f1",
    bgColor: "#e0e7ff",
    lastValue: "12-14 bar",
    trend: "stable",
    trendValue: "OK",
  },
]);

// Estadísticas generales
const stats = ref([
  {
    label: t("dashboard.totalMeasurements"),
    value: "248",
    icon: "pi pi-chart-line",
    color: "#3b82f6",
    change: "+12%",
  },
  {
    label: t("dashboard.todayMeasurements"),
    value: "24",
    icon: "pi pi-calendar",
    color: "#10b981",
    change: "+8%",
  },
  {
    label: t("dashboard.activeDevices"),
    value: "3",
    icon: "pi pi-tablet",
    color: "#f59e0b",
    textColor: "white",
    change: "0%",
  },
  {
    label: t("dashboard.reportsGenerated"),
    value: "156",
    icon: "pi pi-file-pdf",
    color: "#ef4444",
    change: "+24%",
  },
]);

// Actividad reciente
const recentActivity = ref([
  {
    time: "5 min ago",
    action: "Measurement completed",
    type: "Manometer",
    icon: "pi pi-check-circle",
    color: "success",
  },
  {
    time: "15 min ago",
    action: "Report generated",
    type: "Compression Test",
    icon: "pi pi-file-pdf",
    color: "info",
  },
  {
    time: "1 hour ago",
    action: "New measurement",
    type: "Common Rail",
    icon: "pi pi-plus-circle",
    color: "warning",
  },
]);

// Funciones
const navigateTo = (route) => {
  router.push(route);
};

// Quick actions
const quickActions = [
  {
    label: t("dashboard.newMeasurement"),
    icon: "pi pi-plus",
    command: () => router.push("/dashboard"),
  },
  {
    label: t("dashboard.generateReport"),
    icon: "pi pi-file-pdf",
    command: () => router.push("/dashboard/print-client-report"),
  },
  {
    label: t("dashboard.viewHistory"),
    icon: "pi pi-history",
    command: () => console.log("View history"),
  },
];
</script>

<template>
  <div class="modern-dashboard">
    <!-- Welcome Section -->
    <WelcomeSection 
      :userName="currentUser?.name || currentUser?.id"
      :quickActions="quickActions"
    />

    <!-- Stats Grid -->
    <StatsGrid :stats="stats" />

    <!-- Measurement Cards -->
    <div class="section-header">
      <h2 class="section-title">{{ t("dashboard.measurementTypes") }}</h2>
      <Button
        :label="t('common.viewAll')"
        icon="pi pi-arrow-right"
        iconPos="right"
        class="p-button-text p-button-sm view-all-btn"
      />
    </div>

    <div class="measurement-grid">
      <MeasurementCard
        v-for="card in measurementCards"
        :key="card.id"
        :card="card"
        @click="navigateTo"
      />
    </div>

    <!-- Recent Activity -->
    <ActivityList :activities="recentActivity" />
  </div>
</template>

<style scoped>
/* Dashboard principal */
.modern-dashboard {
  animation: fadeIn 0.5s ease;
  min-height: 100%;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


/* Section Headers */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--p-text-color);
  margin: 0;
}

/* Measurement Grid */
.measurement-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}




.view-all-btn {
  color: var(--p-primary-color) !important;
}

.app-dark .view-all-btn {
  color: var(--p-primary-400) !important;
}

/* Responsive */
@media (max-width: 768px) {
  .measurement-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 1.25rem;
  }
}
</style>