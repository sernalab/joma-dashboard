<script setup>
import { inject, ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { authService } from '@/services/auth.service';
import { firebaseService } from '@/services/firebase.service';

const { t } = useI18n();
const formData = inject('formData');
const updateFormData = inject('updateFormData');

const availableMeasurements = ref([]);
const loading = ref(true);

// Available measurement types with their configurations
const measurementConfigs = {
  'datamanometer80': {
    id: 'datamanometer80',
    name: t('selectionView.manometer.title'),
    description: t('selectionView.manometer.description'),
    icon: 'pi pi-gauge',
    color: '#3b82f6',
    bgColor: '#dbeafe'
  },
  'datavacuum': {
    id: 'datavacuum',
    name: t('selectionView.vacuum.title'),
    description: t('selectionView.vacuum.description'),
    icon: 'pi pi-circle',
    color: '#8b5cf6',
    bgColor: '#ede9fe'
  },
  'dataoil': {
    id: 'dataoil',
    name: t('selectionView.oilPressure.title'),
    description: t('selectionView.oilPressure.description'),
    icon: 'pi pi-filter',
    color: '#f59e0b',
    bgColor: '#fef3c7'
  },
  'datafuel': {
    id: 'datafuel',
    name: t('selectionView.fuelPressure.title'),
    description: t('selectionView.fuelPressure.description'),
    icon: 'pi pi-bolt',
    color: '#10b981',
    bgColor: '#d1fae5'
  },
  'datacommonrail': {
    id: 'datacommonrail',
    name: t('selectionView.commonRail.title'),
    description: t('selectionView.commonRail.description'),
    icon: 'pi pi-server',
    color: '#ef4444',
    bgColor: '#fee2e2'
  },
  'datacompression': {
    id: 'datacompression',
    name: t('selectionView.compression.title'),
    description: t('selectionView.compression.description'),
    icon: 'pi pi-chart-bar',
    color: '#6366f1',
    bgColor: '#e0e7ff'
  },
  'dataturbo': {
    id: 'dataturbo',
    name: t('selectionView.turboPressure.title'),
    description: t('selectionView.turboPressure.description'),
    icon: 'pi pi-sync',
    color: '#10b981',
    bgColor: '#d1fae5'
  },
  'dataadblue': {
    id: 'dataadblue',
    name: t('selectionView.adbluePressure.title'),
    description: t('selectionView.adbluePressure.description'),
    icon: 'pi pi-box',
    color: '#6366f1',
    bgColor: '#e0e7ff'
  },
  'databrake': {
    id: 'databrake',
    name: t('selectionView.brakePressure.title'),
    description: t('selectionView.brakePressure.description'),
    icon: 'pi pi-stop-circle',
    color: '#dc2626',
    bgColor: '#fee2e2'
  },
  'datadpf': {
    id: 'datadpf',
    name: t('selectionView.dpfPressure.title'),
    description: t('selectionView.dpfPressure.description'),
    icon: 'pi pi-filter-fill',
    color: '#7c3aed',
    bgColor: '#ede9fe'
  }
};

onMounted(async () => {
  loading.value = true;
  try {
    const currentUser = authService.getCurrentUser();
    if (currentUser && currentUser.id) {
      const measurementData = await firebaseService.getAvailableMeasurements(currentUser.id);
      
      // Transform data for display
      availableMeasurements.value = Object.entries(measurementConfigs).map(([firebaseKey, config]) => {
        const mappedKey = mapFirebaseKeyToMeasurementId(firebaseKey);
        const data = measurementData[mappedKey];
        
        return {
          ...config,
          hasData: data?.hasData || false,
          lastValue: data?.lastValue || null,
          dataCount: data?.dataCount || 0,
          isSelected: (formData.value.graficos || []).some(g => g.value === firebaseKey)
        };
      });
    }
  } catch (error) {
    console.error('Error loading measurements:', error);
  } finally {
    loading.value = false;
  }
});

// Map Firebase keys to measurement IDs
const mapFirebaseKeyToMeasurementId = (firebaseKey) => {
  const mapping = {
    'datamanometer80': 'manometer',
    'datavacuum': 'vacuum',
    'dataoil': 'oil-pressure',
    'datafuel': 'fuel-pressure',
    'datacommonrail': 'common-rail',
    'datacompression': 'compression',
    'dataturbo': 'turbo-pressure',
    'dataadblue': 'adblue-pressure',
    'databrake': 'brake-pressure',
    'datadpf': 'dpf-pressure'
  };
  return mapping[firebaseKey] || firebaseKey;
};

const toggleMeasurement = (measurement) => {
  if (!measurement.hasData) return; // Don't allow selection if no data
  
  // Ensure graficos is always an array
  const graficos = formData.value.graficos || [];
  const currentSelection = Array.isArray(graficos) ? [...graficos] : [];
  const existingIndex = currentSelection.findIndex(item => item.value === measurement.id);
  
  if (existingIndex > -1) {
    // Remove if already selected
    currentSelection.splice(existingIndex, 1);
  } else {
    // Add to selection
    currentSelection.push({
      name: measurement.name,
      value: measurement.id
    });
  }
  
  updateFormData({ graficos: currentSelection });
  
  // Update local state
  measurement.isSelected = !measurement.isSelected;
};

const selectAll = () => {
  const availableWithData = availableMeasurements.value.filter(m => m.hasData);
  const newSelection = availableWithData.map(measurement => ({
    name: measurement.name,
    value: measurement.id
  }));
  
  updateFormData({ graficos: newSelection });
  
  // Update local state
  availableMeasurements.value.forEach(measurement => {
    measurement.isSelected = measurement.hasData;
  });
};

const clearAll = () => {
  updateFormData({ graficos: [] });
  availableMeasurements.value.forEach(measurement => {
    measurement.isSelected = false;
  });
};
</script>

<template>
  <div class="measurements-step">
    <!-- Header with actions -->
    <div class="flex justify-content-between align-items-center mb-4">
      <div>
        <p class="text-600 m-0">
          {{ t('reportWizard.measurementsInfo') }}
        </p>
      </div>
      <div class="flex gap-2">
        <Button
          :label="t('common.selectAll')"
          size="small"
          @click="selectAll"
          outlined
          :disabled="loading"
        />
        <Button
          :label="t('common.clearAll')"
          size="small"
          @click="clearAll"
          outlined
          severity="secondary"
          :disabled="!formData.graficos || formData.graficos.length === 0"
        />
      </div>
    </div>

    <!-- Selection summary -->
    <div v-if="formData.graficos && formData.graficos.length > 0" class="selection-summary mb-4">
      <div class="flex align-items-center gap-2">
        <i class="pi pi-check-circle text-green-500"></i>
        <span class="font-semibold">
          {{ t('reportWizard.selectedMeasurements', { count: formData.graficos.length }) }}
        </span>
      </div>
      <div class="selected-items mt-2">
        <Badge
          v-for="item in formData.graficos"
          :key="item.value"
          :value="item.name"
          severity="success"
          class="mr-2 mb-2"
        />
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="loading-grid">
      <div v-for="n in 6" :key="n" class="measurement-card-skeleton">
        <div class="skeleton-header"></div>
        <div class="skeleton-content"></div>
      </div>
    </div>

    <!-- Measurements grid -->
    <div v-else class="measurements-grid">
      <Card
        v-for="measurement in availableMeasurements"
        :key="measurement.id"
        class="measurement-card"
        :class="{
          'measurement-selected': measurement.isSelected,
          'measurement-disabled': !measurement.hasData,
          'measurement-available': measurement.hasData
        }"
        @click="toggleMeasurement(measurement)"
      >
        <template #content>
          <div class="measurement-content">
            <!-- Header with checkbox -->
            <div class="measurement-header">
              <div class="measurement-icon" :style="{ backgroundColor: measurement.bgColor, color: measurement.color }">
                <i :class="measurement.icon"></i>
              </div>
              <Checkbox
                :modelValue="measurement.isSelected"
                :disabled="!measurement.hasData"
                class="measurement-checkbox"
                @click.stop
              />
            </div>

            <!-- Content -->
            <div class="measurement-info">
              <h3 class="measurement-title">{{ measurement.name }}</h3>
              <p class="measurement-description">{{ measurement.description }}</p>
            </div>

            <!-- Status -->
            <div class="measurement-status">
              <div v-if="measurement.hasData" class="status-badge status-available">
                <i class="pi pi-check-circle"></i>
                <span>{{ t('measurements.hasData') }}</span>
                <Badge :value="measurement.dataCount" severity="info" />
              </div>
              <div v-else class="status-badge status-no-data">
                <i class="pi pi-exclamation-triangle"></i>
                <span>{{ t('measurements.noData') }}</span>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- No data message -->
    <div v-if="!loading && availableMeasurements.filter(m => m.hasData).length === 0" class="no-data-message">
      <div class="text-center">
        <i class="pi pi-exclamation-triangle text-orange-500" style="font-size: 3rem;"></i>
        <h3 class="text-xl font-semibold mt-3 mb-2">{{ t('reportWizard.noDataTitle') }}</h3>
        <p class="text-600">{{ t('reportWizard.noDataDescription') }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.measurements-step {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.selection-summary {
  background: var(--p-green-50);
  border: 1px solid var(--p-green-200);
  border-radius: 0.75rem;
  padding: 1rem;
}

.app-dark .selection-summary {
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.2);
}

.measurements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.25rem;
}

.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.25rem;
}

.measurement-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid var(--p-surface-border);
}

.measurement-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.measurement-selected {
  border-color: var(--p-green-500) !important;
  background: var(--p-green-50);
}

.app-dark .measurement-selected {
  background: rgba(16, 185, 129, 0.1);
}

.measurement-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.measurement-disabled:hover {
  transform: none;
  box-shadow: none;
}

.measurement-content {
  padding: 1.5rem;
}

.measurement-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.measurement-icon {
  width: 48px;
  height: 48px;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.measurement-info {
  margin-bottom: 1rem;
}

.measurement-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--p-text-color);
}

.measurement-description {
  font-size: 0.875rem;
  color: var(--p-text-muted-color);
  margin: 0;
  line-height: 1.4;
}

.measurement-status {
  border-top: 1px solid var(--p-surface-border);
  padding-top: 1rem;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.status-available {
  color: var(--p-green-600);
}

.status-no-data {
  color: var(--p-orange-600);
}

.measurement-card-skeleton {
  border: 1px solid var(--p-surface-border);
  border-radius: 0.75rem;
  padding: 1.5rem;
  animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-header {
  height: 48px;
  background: var(--p-surface-200);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.skeleton-content {
  height: 80px;
  background: var(--p-surface-200);
  border-radius: 0.5rem;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.no-data-message {
  text-align: center;
  padding: 3rem;
  background: var(--p-surface-50);
  border-radius: 0.75rem;
  border: 1px dashed var(--p-surface-border);
}

.app-dark .no-data-message {
  background: var(--p-surface-900);
}

/* Responsive */
@media (max-width: 768px) {
  .measurements-grid {
    grid-template-columns: 1fr;
  }
  
  .loading-grid {
    grid-template-columns: 1fr;
  }
}
</style>