<script setup>
import { inject, computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const formData = inject('formData');
const updateFormData = inject('updateFormData');

// Track which fields have been touched
const touched = ref({
  tallerNombre: false,
  tallerTelefono: false,
  tallerDireccion: false,
  tallerDireccion2: false
});

const updateField = (field, value) => {
  updateFormData({ [field]: value });
  touched.value[field] = true;
};
</script>

<template>
  <div class="workshop-step">
    <div class="form-grid">
      <!-- Workshop Name -->
      <div class="field-container">
        <FloatLabel>
          <InputText
            id="workshop-name"
            v-model="formData.tallerNombre"
            @input="updateField('tallerNombre', $event.target.value)"
            class="w-full"
            :class="{ 'p-invalid': touched.tallerNombre && !formData.tallerNombre }"
          />
          <label for="workshop-name">
            {{ t('printView.workshopName') }} *
          </label>
        </FloatLabel>
        <small v-if="touched.tallerNombre && !formData.tallerNombre" class="p-error">
          {{ t('validation.required') }}
        </small>
      </div>

      <!-- Workshop Phone -->
      <div class="field-container">
        <FloatLabel>
          <InputText
            id="workshop-phone"
            v-model="formData.tallerTelefono"
            @input="updateField('tallerTelefono', $event.target.value)"
            class="w-full"
            :class="{ 'p-invalid': touched.tallerTelefono && !formData.tallerTelefono }"
          />
          <label for="workshop-phone">
            {{ t('printView.workshopPhone') }} *
          </label>
        </FloatLabel>
        <small v-if="touched.tallerTelefono && !formData.tallerTelefono" class="p-error">
          {{ t('validation.required') }}
        </small>
      </div>

      <!-- Workshop Address -->
      <div class="field-container">
        <FloatLabel>
          <InputText
            id="workshop-address"
            v-model="formData.tallerDireccion"
            @input="updateField('tallerDireccion', $event.target.value)"
            class="w-full"
            :class="{ 'p-invalid': touched.tallerDireccion && !formData.tallerDireccion }"
          />
          <label for="workshop-address">
            {{ t('printView.workshopAddress') }} *
          </label>
        </FloatLabel>
        <small v-if="touched.tallerDireccion && !formData.tallerDireccion" class="p-error">
          {{ t('validation.required') }}
        </small>
      </div>

      <!-- Workshop Address 2 -->
      <div class="field-container">
        <FloatLabel>
          <InputText
            id="workshop-address2"
            v-model="formData.tallerDireccion2"
            @input="updateField('tallerDireccion2', $event.target.value)"
            class="w-full"
          />
          <label for="workshop-address2">
            {{ t('printView.workshopAddress2') }}
          </label>
        </FloatLabel>
      </div>
    </div>

    <!-- Info card -->
    <div class="info-card mt-4">
      <div class="flex align-items-start gap-3">
        <i class="pi pi-building text-blue-500 mt-1"></i>
        <div>
          <h4 class="text-sm font-semibold text-900 m-0 mb-2">
            {{ t('reportWizard.workshopInfo.title') }}
          </h4>
          <p class="text-sm text-600 m-0 line-height-3">
            {{ t('reportWizard.workshopInfo.description') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.workshop-step {
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

.info-card {
  background: var(--p-blue-50);
  border: 1px solid var(--p-blue-200);
  border-radius: 0.75rem;
  padding: 1.25rem;
}

.app-dark .info-card {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.2);
}

/* Responsive */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>