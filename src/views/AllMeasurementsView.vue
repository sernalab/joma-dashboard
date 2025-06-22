<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import MeasurementCard from "@/components/dashboard/MeasurementCard.vue";
import Button from "primevue/button";
import { firebaseService } from "@/services/firebase.service";
import { authService } from "@/services/auth.service";

// Import PNG icons
import GaugeIcon from '@/assets/Gauge60.png';
import VacuumIcon from '@/assets/Vacuum60.png';
import OilIcon from '@/assets/Oil60.png';
import FuelIcon from '@/assets/Fuel60.png';
import InjectorIcon from '@/assets/Injector60.png';
import CompresionIcon from '@/assets/Compresion60.png';
import TurbochargerIcon from '@/assets/Turbocharger60.png';
import AdBlueIcon from '@/assets/AdBlue60.png';
import BrakeIcon from '@/assets/Brake60.png';
import FiltroParticulasIcon from '@/assets/FiltroParticulas60.png';

const { t } = useI18n();
const router = useRouter();

const loading = ref(true);
const realMeasurementData = ref({});

// Función para actualizar las mediciones con datos reales
const updateMeasurementsWithRealData = () => {
  allMeasurements.value = allMeasurements.value.map(measurement => {
    const realData = realMeasurementData.value[measurement.id];
    
    if (realData) {
      return {
        ...measurement,
        lastValue: realData.hasData && realData.lastValue ? realData.lastValue : null,
        trend: "stable",
        trendValue: realData.hasData && realData.lastValue ? t("measurements.lastValue") : t("measurements.noData"),
        hasRealData: realData.hasData,
        dataCount: realData.dataCount
      };
    }
    
    // Para frenos y DPF que no están en Firebase
    return {
      ...measurement,
      lastValue: null,
      trend: "stable", 
      trendValue: t("measurements.noData"),
      hasRealData: false,
      dataCount: 0
    };
  });
};

// Cargar datos reales al montar el componente
onMounted(async () => {
  try {
    const currentUser = authService.getCurrentUser();
    
    if (currentUser && currentUser.id) {
      realMeasurementData.value = await firebaseService.getAvailableMeasurements(currentUser.id);
      updateMeasurementsWithRealData();
    }
  } catch (error) {
    console.error("Error al cargar datos de mediciones:", error);
  } finally {
    loading.value = false;
  }
});

// Todas las mediciones disponibles
const allMeasurements = ref([
  {
    id: "manometer",
    title: t("selectionView.manometer.title"),
    description: t("selectionView.manometer.description"),
    icon: GaugeIcon,
    route: "/dashboard/manometer",
    lastValue: null,
    trend: "stable",
    trendValue: t("measurements.noData"),
  },
  {
    id: "vacuum",
    title: t("selectionView.vacuum.title"),
    description: t("selectionView.vacuum.description"),
    icon: VacuumIcon,
    route: "/dashboard/vacuum",
    lastValue: null,
    trend: "stable",
    trendValue: t("measurements.noData"),
  },
  {
    id: "oil-pressure",
    title: t("selectionView.oilPressure.title"),
    description: t("selectionView.oilPressure.description"),
    icon: OilIcon,
    route: "/dashboard/oil-pressure",
    lastValue: null,
    trend: "stable",
    trendValue: t("measurements.noData"),
  },
  {
    id: "fuel-pressure",
    title: t("selectionView.fuelPressure.title"),
    description: t("selectionView.fuelPressure.description"),
    icon: FuelIcon,
    route: "/dashboard/fuel-pressure",
    lastValue: null,
    trend: "stable",
    trendValue: t("measurements.noData"),
  },
  {
    id: "common-rail",
    title: t("selectionView.commonRail.title"),
    description: t("selectionView.commonRail.description"),
    icon: InjectorIcon,
    route: "/dashboard/common-rail",
    lastValue: null,
    trend: "stable",
    trendValue: t("measurements.noData"),
  },
  {
    id: "compression",
    title: t("selectionView.compression.title"),
    description: t("selectionView.compression.description"),
    icon: CompresionIcon,
    route: "/dashboard/compression",
    lastValue: null,
    trend: "stable",
    trendValue: t("measurements.noData"),
  },
  {
    id: "turbo-pressure",
    title: t("selectionView.turboPressure.title"),
    description: t("selectionView.turboPressure.description"),
    icon: TurbochargerIcon,
    route: "/dashboard/turbo-pressure",
    lastValue: null,
    trend: "stable",
    trendValue: t("measurements.noData"),
  },
  {
    id: "brake-pressure",
    title: t("selectionView.brakePressure.title"),
    description: t("selectionView.brakePressure.description"),
    icon: BrakeIcon,
    route: "/dashboard/brake-pressure",
    lastValue: null,
    trend: "stable",
    trendValue: t("measurements.noData"),
  },
  {
    id: "dpf-pressure",
    title: t("selectionView.dpfPressure.title"),
    description: t("selectionView.dpfPressure.description"),
    icon: FiltroParticulasIcon,
    route: "/dashboard/dpf-pressure",
    lastValue: null,
    trend: "stable",
    trendValue: t("measurements.noData"),
  },
  {
    id: "adblue-pressure",
    title: t("selectionView.adbluePressure.title"),
    description: t("selectionView.adbluePressure.description"),
    icon: AdBlueIcon,
    route: "/dashboard/adblue-pressure",
    lastValue: null,
    trend: "stable",
    trendValue: t("measurements.noData"),
  },
]);

const navigateTo = (route) => {
  router.push(route);
};

const goBack = () => {
  router.push("/dashboard");
};
</script>

<template>
  <div class="all-measurements-view">
    <!-- Header -->
    <div class="view-header">
      <div class="header-left">
        <Button
          icon="pi pi-arrow-left"
          class="p-button-text p-button-plain"
          @click="goBack"
        />
        <h1 class="view-title">{{ t("measurements.allTypes") }}</h1>
      </div>
      <div class="header-right">
        <span class="measurement-count">{{ t("measurements.typesAvailable", { count: allMeasurements.length }) }}</span>
      </div>
    </div>

    <!-- Measurement Grid -->
    <div class="measurements-grid">
      <MeasurementCard
        v-for="measurement in allMeasurements"
        :key="measurement.id"
        :card="measurement"
        @click="navigateTo"
      />
    </div>
  </div>
</template>

<style scoped>
.all-measurements-view {
  min-height: 100%;
  animation: fadeIn 0.5s ease;
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

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--p-surface-border);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.view-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--p-text-color);
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.measurement-count {
  color: var(--p-text-muted-color);
  font-size: 0.875rem;
  font-weight: 500;
}

.measurements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .view-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .measurements-grid {
    grid-template-columns: 1fr;
  }

  .view-title {
    font-size: 1.5rem;
  }
}
</style>