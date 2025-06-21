<script setup>
import { ref, computed, provide, markRaw } from 'vue';
import { useI18n } from 'vue-i18n';

// Step components
import ClientStep from './steps/ClientStep.vue';
import VehicleStep from './steps/VehicleStep.vue';
import MeasurementsStep from './steps/MeasurementsStep.vue';
import ObservationsStep from './steps/ObservationsStep.vue';
import PreviewStep from './steps/PreviewStep.vue';

const { t } = useI18n();
const currentStep = ref(0);

// Form data
const formData = ref({
  // Client data
  nombreTaller: '',
  nombre: '',
  telefono: '',
  email: '',
  vin: '',
  datosAdicionales: '',
  
  // Vehicle data
  marca: '',
  modelo: '',
  matricula: '',
  año: null,
  kilometraje: null,
  
  // Measurements
  graficos: [],
  
  // Observations
  observaciones: '',
});

// Steps configuration - mark components as raw to avoid reactivity warnings
const steps = ref([
  {
    label: t('reportWizard.steps.client'),
    icon: 'pi pi-user',
    component: markRaw(ClientStep)
  },
  {
    label: t('reportWizard.steps.vehicle'),
    icon: 'pi pi-car',
    component: markRaw(VehicleStep)
  },
  {
    label: t('reportWizard.steps.measurements'),
    icon: 'pi pi-chart-line',
    component: markRaw(MeasurementsStep)
  },
  {
    label: t('reportWizard.steps.observations'),
    icon: 'pi pi-file-edit',
    component: markRaw(ObservationsStep)
  },
  {
    label: t('reportWizard.steps.preview'),
    icon: 'pi pi-eye',
    component: markRaw(PreviewStep)
  }
]);

// Computed properties
const currentStepComponent = computed(() => steps.value[currentStep.value].component);
const isFirstStep = computed(() => currentStep.value === 0);
const isLastStep = computed(() => currentStep.value === steps.value.length - 1);
const canProceed = computed(() => validateCurrentStep());
const selectedMeasurements = computed(() => formData.value.graficos || []);

// Validation functions
const validateCurrentStep = () => {
  switch (currentStep.value) {
    case 0: // Client
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return formData.value.nombreTaller && 
             formData.value.nombre && 
             formData.value.telefono && 
             formData.value.email && 
             formData.value.vin &&
             emailRegex.test(formData.value.email);
    case 1: // Vehicle
      return formData.value.marca && formData.value.modelo;
    case 2: // Measurements
      return formData.value.graficos.length > 0;
    case 3: // Observations
      return true; // Optional step
    case 4: // Preview
      return true;
    default:
      return true;
  }
};

// Navigation functions
const nextStep = () => {
  if (currentStep.value < steps.value.length - 1 && canProceed.value) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const goToStep = (index) => {
  if (index >= 0 && index < steps.value.length) {
    currentStep.value = index;
  }
};

// Provide form data to child components
provide('formData', formData);
provide('updateFormData', (updates) => {
  Object.assign(formData.value, updates);
});

// Emit for parent component
const emit = defineEmits(['generate-pdf']);

const isGenerating = ref(false);

// Event bus for triggering PDF generation
const shouldGeneratePDF = ref(false);

const generateReport = async () => {
  shouldGeneratePDF.value = true;
  // Reset after a short delay
  setTimeout(() => {
    shouldGeneratePDF.value = false;
  }, 100);
};

// Provide the trigger to child components
provide('shouldGeneratePDF', shouldGeneratePDF);
provide('setGenerating', (value) => {
  isGenerating.value = value;
});
</script>

<template>
  <div class="report-wizard">
    <!-- Header -->
    <div class="wizard-header">
      <div class="mb-4">
        <h1 class="text-3xl font-bold text-900 m-0">
          {{ t('reportWizard.title') }}
        </h1>
        <p class="text-600 text-lg mt-2 mb-0">
          {{ t('reportWizard.subtitle') }}
        </p>
      </div>

      <!-- Steps indicator -->
      <Card class="mb-4">
        <template #content>
          <Steps 
            :model="steps" 
            :activeStep="currentStep"
            class="custom-steps"
          />
        </template>
      </Card>
    </div>

    <!-- Step content -->
    <Card class="step-content">
      <template #content>
        <div class="step-header mb-4">
          <div class="flex align-items-center gap-3">
            <div class="step-icon">
              <i :class="steps[currentStep].icon"></i>
            </div>
            <div>
              <h2 class="text-2xl font-semibold text-900 m-0">
                {{ steps[currentStep].label }}
              </h2>
              <p class="text-muted-color mt-1 mb-0">
                {{ t(`reportWizard.descriptions.step${currentStep + 1}`) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Dynamic step component -->
        <component 
          :is="currentStepComponent" 
          :formData="formData"
          @update="(updates) => Object.assign(formData, updates)"
        />
      </template>
    </Card>

    <!-- Navigation -->
    <Card class="mt-4">
      <template #content>
        <div class="flex justify-content-between align-items-center">
          <Button
            v-if="!isFirstStep"
            :label="t('common.previous')"
            icon="pi pi-arrow-left"
            @click="prevStep"
            outlined
          />
          <div v-else></div>

          <div class="flex align-items-center gap-2">
            <span class="text-sm text-muted-color">
              {{ t('reportWizard.progress', { current: currentStep + 1, total: steps.length }) }}
            </span>
          </div>

          <div class="flex gap-2">
            <Button
              v-if="!isLastStep"
              :label="t('common.next')"
              icon="pi pi-arrow-right"
              iconPos="right"
              :disabled="!canProceed"
              @click="nextStep"
            />
            <Button
              v-else
              :label="t('reportWizard.generateReport')"
              icon="pi pi-file-pdf"
              iconPos="right"
              :disabled="!canProceed || selectedMeasurements.length === 0"
              :loading="isGenerating"
              @click="generateReport"
              severity="warning"
            />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.report-wizard {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.step-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--p-primary-100);
  color: var(--p-primary-700);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.app-dark .step-icon {
  background: var(--p-primary-900);
  color: var(--p-primary-300);
}

.custom-steps :deep(.p-steps-item) {
  flex: 1;
}

.custom-steps :deep(.p-steps-item .p-menuitem-link) {
  padding: 1rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.custom-steps :deep(.p-steps-item.p-highlight .p-menuitem-link) {
  background: var(--p-primary-50);
  border-color: var(--p-primary-500);
}

.app-dark .custom-steps :deep(.p-steps-item.p-highlight .p-menuitem-link) {
  background: var(--p-primary-900);
}

.step-content {
  min-height: 500px;
}

/* Responsive */
@media (max-width: 768px) {
  .report-wizard {
    padding: 1rem;
  }
  
  .wizard-header .flex {
    flex-direction: column;
    gap: 1rem;
  }
  
  .custom-steps :deep(.p-steps) {
    flex-direction: column;
  }
}
</style>