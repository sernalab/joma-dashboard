<script setup>
import { inject, computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const formData = inject('formData');
const updateFormData = inject('updateFormData');

// Track which fields have been touched
const touched = ref({
  nombreTaller: false,
  nombre: false,
  telefono: false,
  email: false
});

const updateField = (field, value) => {
  updateFormData({ [field]: value });
  touched.value[field] = true;
};

// Validation
const isValidEmail = computed(() => {
  if (!formData.value.email) return true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(formData.value.email);
});
</script>

<template>
  <div class="client-step">
    <div class="form-grid">
      <!-- Workshop Name -->
      <div class="field-container">
        <FloatLabel>
          <InputText
            id="workshop-name"
            v-model="formData.nombreTaller"
            @input="updateField('nombreTaller', $event.target.value)"
            class="w-full"
            :class="{ 'p-invalid': touched.nombreTaller && !formData.nombreTaller }"
          />
          <label for="workshop-name">
            {{ t('printView.workshopName') }} *
          </label>
        </FloatLabel>
        <small v-if="touched.nombreTaller && !formData.nombreTaller" class="p-error">
          {{ t('validation.required') }}
        </small>
      </div>

      <!-- Client Name -->
      <div class="field-container">
        <FloatLabel>
          <InputText
            id="client-name"
            v-model="formData.nombre"
            @input="updateField('nombre', $event.target.value)"
            class="w-full"
            :class="{ 'p-invalid': touched.nombre && !formData.nombre }"
          />
          <label for="client-name">
            {{ t('printView.name') }} *
          </label>
        </FloatLabel>
        <small v-if="touched.nombre && !formData.nombre" class="p-error">
          {{ t('validation.required') }}
        </small>
      </div>

      <!-- Phone -->
      <div class="field-container">
        <FloatLabel>
          <InputText
            id="phone"
            v-model="formData.telefono"
            @input="updateField('telefono', $event.target.value)"
            class="w-full"
            :class="{ 'p-invalid': touched.telefono && !formData.telefono }"
          />
          <label for="phone">
            {{ t('printView.phone') }} *
          </label>
        </FloatLabel>
        <small v-if="touched.telefono && !formData.telefono" class="p-error">
          {{ t('validation.required') }}
        </small>
      </div>

      <!-- Email -->
      <div class="field-container">
        <FloatLabel>
          <InputText
            id="email"
            v-model="formData.email"
            @input="updateField('email', $event.target.value)"
            class="w-full"
            :class="{ 'p-invalid': touched.email && (!formData.email || (formData.email && !isValidEmail)) }"
            type="email"
          />
          <label for="email">
            {{ t('printView.email') }} *
          </label>
        </FloatLabel>
        <small v-if="touched.email && !formData.email" class="p-error">
          {{ t('validation.required') }}
        </small>
        <small v-else-if="touched.email && formData.email && !isValidEmail" class="p-error">
          {{ t('validation.invalidEmail') }}
        </small>
      </div>
    </div>

    <!-- Info card -->
    <div class="info-card mt-4">
      <div class="flex align-items-start gap-3">
        <i class="pi pi-info-circle text-blue-500 mt-1"></i>
        <div>
          <h4 class="text-sm font-semibold text-900 m-0 mb-2">
            {{ t('reportWizard.clientInfo.title') }}
          </h4>
          <p class="text-sm text-600 m-0 line-height-3">
            {{ t('reportWizard.clientInfo.description') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.client-step {
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