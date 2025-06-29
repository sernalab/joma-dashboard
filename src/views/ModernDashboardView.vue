<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { authService } from "@/services/auth.service";
import { firebaseService } from "@/services/firebase.service";
import Button from "primevue/button";

// Import new components
import WelcomeSection from "@/components/dashboard/WelcomeSection.vue";
import StatsGrid from "@/components/dashboard/StatsGrid.vue";
import MeasurementCard from "@/components/dashboard/MeasurementCard.vue";
import ActivityList from "@/components/dashboard/ActivityList.vue";

// Import PNG icons
import GaugeIcon from '@/assets/Gauge60.png';
import VacuumIcon from '@/assets/Vacuum60.png';
import OilIcon from '@/assets/Oil60.png';
import FuelIcon from '@/assets/Fuel60.png';
import InjectorIcon from '@/assets/Injector60.png';
import CompresionIcon from '@/assets/Compresion60.png';
import TurbochargerIcon from '@/assets/Turbocharger60.png';
import AdBlueIcon from '@/assets/AdBlue60.png';

const { t } = useI18n();
const router = useRouter();
const currentUser = ref(authService.getCurrentUser());
const loading = ref(true);

// Mediciones que se mostrarán (solo las que tienen datos)
const measurementCards = ref([]);

// Mapeo de mediciones posibles con sus configuraciones visuales
const measurementConfigs = {
  manometer: {
    title: () => t("selectionView.manometer.title"),
    description: () => t("selectionView.manometer.description"),
    icon: GaugeIcon,
    route: "/dashboard/manometer",
    color: "#3b82f6",
    bgColor: "#dbeafe",
  },
  vacuum: {
    title: () => t("selectionView.vacuum.title"),
    description: () => t("selectionView.vacuum.description"),
    icon: VacuumIcon,
    route: "/dashboard/vacuum",
    color: "#8b5cf6",
    bgColor: "#ede9fe",
  },
  "oil-pressure": {
    title: () => t("selectionView.oilPressure.title"),
    description: () => t("selectionView.oilPressure.description"),
    icon: OilIcon,
    route: "/dashboard/oil-pressure",
    color: "#f59e0b",
    bgColor: "#fef3c7",
  },
  "fuel-pressure": {
    title: () => t("selectionView.fuelPressure.title"),
    description: () => t("selectionView.fuelPressure.description"),
    icon: FuelIcon,
    route: "/dashboard/fuel-pressure",
    color: "#10b981",
    bgColor: "#d1fae5",
  },
  "common-rail": {
    title: () => t("selectionView.commonRail.title"),
    description: () => t("selectionView.commonRail.description"),
    icon: InjectorIcon,
    route: "/dashboard/common-rail",
    color: "#ef4444",
    bgColor: "#fee2e2",
  },
  compression: {
    title: () => t("selectionView.compression.title"),
    description: () => t("selectionView.compression.description"),
    icon: CompresionIcon,
    route: "/dashboard/compression",
    color: "#6366f1",
    bgColor: "#e0e7ff",
  },
  "turbo-pressure": {
    title: () => t("selectionView.turboPressure.title"),
    description: () => t("selectionView.turboPressure.description"),
    icon: TurbochargerIcon,
    route: "/dashboard/turbo-pressure",
    color: "#10b981",
    bgColor: "#d1fae5",
  },
  "adblue-pressure": {
    title: () => t("selectionView.adbluePressure.title"),
    description: () => t("selectionView.adbluePressure.description"),
    icon: AdBlueIcon,
    route: "/dashboard/adblue-pressure",
    color: "#6366f1",
    bgColor: "#e0e7ff",
  },
};

// Estadísticas generales
const stats = ref([
  // Estadísticas reales (nuevas)
  {
    label: t("dashboard.activeMeasurementTypes"),
    value: "0",
    icon: "pi pi-check-circle",
    color: "#3b82f6",
    colorClass: "blue",
  },
  {
    label: t("dashboard.totalMeasurements"),
    value: "0",
    icon: "pi pi-chart-line",
    color: "#10b981",
    colorClass: "green",
  },
  {
    label: t("dashboard.mostUsedMeasurement"),
    value: "-",
    icon: "pi pi-star",
    color: "#f59e0b",
    colorClass: "orange",
  },
  {
    label: t("dashboard.dataCompleteness"),
    value: "0%",
    icon: "pi pi-percentage",
    color: "#ef4444",
    colorClass: "red",
  },
  // Estadísticas antiguas (simuladas)
  {
    label: t("dashboard.totalMeasurements"),
    value: "248",
    icon: "pi pi-chart-line",
    color: "#3b82f6",
    colorClass: "blue",
    change: "+12%",
  },
  {
    label: t("dashboard.todayMeasurements"),
    value: "24",
    icon: "pi pi-calendar",
    color: "#10b981",
    colorClass: "green",
    change: "+8%",
  },
  {
    label: t("dashboard.activeDevices"),
    value: "3",
    icon: "pi pi-tablet",
    color: "#f59e0b",
    colorClass: "orange",
    change: "0%",
  },
  {
    label: t("dashboard.reportsGenerated"),
    value: "156",
    icon: "pi pi-file-pdf",
    color: "#ef4444",
    colorClass: "red",
    change: "+24%",
  },
]);

// Función para calcular estadísticas reales
const calculateStats = (measurementData) => {
  let activeMeasurements = 0;
  let totalMeasurements = 0;
  let mostUsedType = { name: "-", count: 0 };
  let measurementsWithData = 0;
  const totalPossibleTypes = 10; // Total de tipos de medición posibles

  Object.entries(measurementData).forEach(([id, data]) => {
    if (data.hasData) {
      activeMeasurements++;
      measurementsWithData++;
      totalMeasurements += data.dataCount || 0;

      if (data.dataCount > mostUsedType.count) {
        mostUsedType = {
          name: id,
          count: data.dataCount,
        };
      }
    }
  });

  // Actualizar stats
  stats.value[0].value = activeMeasurements.toString();
  stats.value[1].value = totalMeasurements.toString();

  // Traducir el nombre del tipo más usado
  const measurementTypeNames = {
    manometer: t("selectionView.manometer.title"),
    vacuum: t("selectionView.vacuum.title"),
    "oil-pressure": t("selectionView.oilPressure.title"),
    "fuel-pressure": t("selectionView.fuelPressure.title"),
    "common-rail": t("selectionView.commonRail.title"),
    compression: t("selectionView.compression.title"),
    "turbo-pressure": t("selectionView.turboPressure.title"),
    "adblue-pressure": t("selectionView.adbluePressure.title"),
    "brake-pressure": t("selectionView.brakePressure.title"),
    "dpf-pressure": t("selectionView.dpfPressure.title"),
  };

  stats.value[2].value = measurementTypeNames[mostUsedType.name] || "-";
  stats.value[3].value =
    Math.round((measurementsWithData / totalPossibleTypes) * 100) + "%";
};

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

const showAllMeasurements = () => {
  router.push("/dashboard/all-measurements");
};

// Quick actions
const quickActions = [
  {
    label: t("dashboard.generateReport"),
    icon: "pi pi-file-pdf",
    command: () => router.push("/dashboard/print-client-report"),
  },
  // {
  //   label: t("dashboard.viewHistory"),
  //   icon: "pi pi-history",
  //   command: () => router.push("/dashboard/recent-activity"),
  // },
];

// Cargar mediciones con datos reales
onMounted(async () => {
  loading.value = true;
  try {
    if (currentUser.value && currentUser.value.id) {
      const availableData = await firebaseService.getAvailableMeasurements(
        currentUser.value.id
      );

      // Calcular estadísticas reales
      calculateStats(availableData);

      // Crear cards solo para mediciones con datos
      measurementCards.value = Object.entries(availableData)
        .filter(([id, data]) => data.hasData && measurementConfigs[id])
        .map(([id, data]) => {
          const config = measurementConfigs[id];
          return {
            id,
            title: config.title(),
            description: config.description(),
            icon: config.icon,
            route: config.route,
            color: config.color,
            bgColor: config.bgColor,
            lastValue: data.lastValue,
            trend: "stable",
            trendValue: t("measurements.lastValue"),
            dataCount: data.dataCount,
            hasRealData: true, // Add this since we're only showing cards with data
          };
        });
    }
  } catch (error) {
    console.error("Error al cargar mediciones:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="modern-dashboard">
    <!-- Welcome Section -->
    <WelcomeSection
      :userName="currentUser?.name || currentUser?.id"
      :quickActions="quickActions"
    />

    <!-- Stats Grid - Datos Reales -->
    <!-- <div class="stats-section">
      <h3 class="stats-title">{{ t("dashboard.currentStatus") }}</h3>
      <StatsGrid :stats="stats.slice(0, 4)" />
      <StatsGrid :stats="stats.slice(4, 8)" />
    </div> -->

    <!-- Measurement Cards -->
    <div class="section-header">
      <h2 class="section-title">{{ t("dashboard.measurementTypes") }}</h2>
      <Button
        :label="t('common.viewAll')"
        icon="pi pi-arrow-right"
        iconPos="right"
        class="p-button-text p-button-sm view-all-btn"
        @click="showAllMeasurements"
      />
    </div>

    <div v-if="loading" class="loading-container">
      <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
      <p>Cargando mediciones...</p>
    </div>

    <div v-else-if="measurementCards.length > 0" class="measurement-grid">
      <MeasurementCard
        v-for="card in measurementCards"
        :key="card.id"
        :card="card"
        @click="navigateTo"
      />
    </div>

    <div v-else class="no-measurements">
      <i class="pi pi-info-circle" style="font-size: 2rem; opacity: 0.5"></i>
      <p>No hay mediciones disponibles</p>
    </div>

    <!-- Recent Activity -->
    <!-- <ActivityList :activities="recentActivity" /> -->
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

/* Stats Sections */
.stats-section {
  margin-bottom: 2rem;
}

.stats-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--p-text-muted-color);
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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

/* Loading and empty states */
.loading-container,
.no-measurements {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  color: var(--p-text-muted-color);
  gap: 1rem;
}

.loading-container i {
  color: var(--p-primary-color);
}

.no-measurements {
  background: var(--p-surface-50);
  border-radius: 0.75rem;
  border: 1px dashed var(--p-surface-border);
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