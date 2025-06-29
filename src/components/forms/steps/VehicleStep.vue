<script setup>
import { inject, computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const formData = inject('formData');
const updateFormData = inject('updateFormData');

// Track which fields have been touched
const touched = ref({
  marca: false,
  modelo: false,
  matricula: false,
  año: false,
  kilometraje: false,
  vin: false
});

const updateField = (field, value) => {
  updateFormData({ [field]: value });
  touched.value[field] = true;
};

// Validation
const isValidMileage = computed(() => {
  if (!formData.value.kilometraje) return true;
  return formData.value.kilometraje >= 0 && formData.value.kilometraje <= 2000000;
});
</script>

<template>
  <div class="vehicle-step">
    <div class="form-grid">
      <!-- Brand -->
      <div class="field-container">
        <FloatLabel>
          <InputText
            id="brand"
            v-model="formData.marca"
            @input="updateField('marca', $event.target.value)"
            class="w-full"
            :class="{ 'p-invalid': touched.marca && !formData.marca }"
          />
          <label for="brand">
            {{ t('printView.brand') }} *
          </label>
        </FloatLabel>
        <small v-if="touched.marca && !formData.marca" class="p-error">
          {{ t('validation.required') }}
        </small>
      </div>

      <!-- Model -->
      <div class="field-container">
        <FloatLabel>
          <InputText
            id="model"
            v-model="formData.modelo"
            @input="updateField('modelo', $event.target.value)"
            class="w-full"
            :class="{ 'p-invalid': touched.modelo && !formData.modelo }"
          />
          <label for="model">
            {{ t('printView.model') }} *
          </label>
        </FloatLabel>
        <small v-if="touched.modelo && !formData.modelo" class="p-error">
          {{ t('validation.required') }}
        </small>
      </div>

      <!-- License Plate -->
      <div class="field-container">
        <FloatLabel>
          <InputText
            id="plate"
            v-model="formData.matricula"
            @input="updateField('matricula', $event.target.value.toUpperCase())"
            class="w-full"
            style="text-transform: uppercase;"
          />
          <label for="plate">
            {{ t('printView.plate') }}
          </label>
        </FloatLabel>
      </div>

      <!-- VIN -->
      <div class="field-container">
        <FloatLabel>
          <InputText
            id="vin"
            v-model="formData.vin"
            @input="updateField('vin', $event.target.value)"
            class="w-full"
            :class="{ 'p-invalid': touched.vin && !formData.vin }"
          />
          <label for="vin">
            VIN
          </label>
        </FloatLabel>
      </div>

      <!-- Year -->
      <div class="field-container">
        <FloatLabel>
          <InputNumber
            id="year"
            v-model="formData.año"
            @input="updateField('año', $event.value)"
            class="w-full"
            :useGrouping="false"
          />
          <label for="year">
            {{ t('printView.year') }}
          </label>
        </FloatLabel>
      </div>

      <!-- Mileage -->
      <div class="field-container">
        <FloatLabel>
          <InputNumber
            id="mileage"
            v-model="formData.kilometraje"
            @input="updateField('kilometraje', $event.value)"
            class="w-full"
            :class="{ 'p-invalid': touched.kilometraje && formData.kilometraje && !isValidMileage }"
            suffix=" km"
            :min="0"
            :max="2000000"
          />
          <label for="mileage">
            {{ t('printView.mileage') }}
          </label>
        </FloatLabel>
        <small v-if="touched.kilometraje && formData.kilometraje && !isValidMileage" class="p-error">
          {{ t('validation.invalidMileage') }}
        </small>
      </div>
    </div>

    <!-- Vehicle summary card -->
    <div class="vehicle-summary mt-4" v-if="formData.marca || formData.modelo">
      <div class="flex align-items-start gap-3">
        <div class="vehicle-icon">
          <i class="pi pi-car"></i>
        </div>
        <div class="flex-1">
          <h4 class="text-sm font-semibold text-900 m-0 mb-2">
            {{ t('reportWizard.vehicleSummary.title') }}
          </h4>
          <div class="vehicle-details">
            <div v-if="formData.marca && formData.modelo" class="detail-item">
              <strong>{{ formData.marca }} {{ formData.modelo }}</strong>
            </div>
            <div v-if="formData.año" class="detail-item">
              <span class="detail-label">{{ t('printView.year') }}:</span>
              <span>{{ formData.año }}</span>
            </div>
            <div v-if="formData.matricula" class="detail-item">
              <span class="detail-label">{{ t('printView.plate') }}:</span>
              <span class="font-mono">{{ formData.matricula }}</span>
            </div>
            <div v-if="formData.vin" class="detail-item">
              <span class="detail-label">VIN:</span>
              <span class="font-mono">{{ formData.vin }}</span>
            </div>
            <div v-if="formData.kilometraje" class="detail-item">
              <span class="detail-label">{{ t('printView.mileage') }}:</span>
              <span>{{ formData.kilometraje?.toLocaleString() }} km</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vehicle-step {
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

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.field-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.vehicle-summary {
  background: var(--p-green-50);
  border: 1px solid var(--p-green-200);
  border-radius: 0.75rem;
  padding: 1.25rem;
}

.app-dark .vehicle-summary {
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.2);
}

.vehicle-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--p-green-100);
  color: var(--p-green-700);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  flex-shrink: 0;
}

.app-dark .vehicle-icon {
  background: var(--p-green-900);
  color: var(--p-green-300);
}

.vehicle-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-item {
  display: flex;
  gap: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.4;
}

.detail-label {
  color: var(--p-text-muted-color);
  min-width: 80px;
}

/* Responsive */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>