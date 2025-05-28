<script setup>
import { inject, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const formData = inject('formData');
const updateFormData = inject('updateFormData');

const updateObservations = (value) => {
  updateFormData({ observaciones: value });
};

const characterLimit = 500;
const remainingChars = computed(() => characterLimit - (formData.value.observaciones?.length || 0));
</script>

<template>
  <div class="observations-step">
    <div class="observations-container">
      <FloatLabel>
        <Textarea
          id="observations"
          v-model="formData.observaciones"
          @input="updateObservations($event.target.value)"
          rows="8"
          class="w-full"
          :maxlength="characterLimit"
          autoResize
        />
        <label for="observations">
          {{ t('printView.observations') }}
        </label>
      </FloatLabel>
      
      <div class="flex justify-content-between align-items-center mt-2">
        <small class="text-muted-color">
          {{ t('reportWizard.observationsHelp') }}
        </small>
        <small class="text-muted-color" :class="{ 'text-orange-500': remainingChars < 50 }">
          {{ remainingChars }} {{ t('common.charactersLeft') }}
        </small>
      </div>
    </div>

    <!-- Info card -->
    <div class="info-card mt-4">
      <div class="flex align-items-start gap-3">
        <i class="pi pi-lightbulb text-yellow-500 mt-1"></i>
        <div>
          <h4 class="text-sm font-semibold text-900 m-0 mb-2">
            {{ t('reportWizard.observationsTips.title') }}
          </h4>
          <ul class="text-sm text-600 m-0 pl-4">
            <li>{{ t('reportWizard.observationsTips.tip1') }}</li>
            <li>{{ t('reportWizard.observationsTips.tip2') }}</li>
            <li>{{ t('reportWizard.observationsTips.tip3') }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.observations-step {
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

.observations-container {
  max-width: 600px;
}

.info-card {
  background: var(--p-yellow-50);
  border: 1px solid var(--p-yellow-200);
  border-radius: 0.75rem;
  padding: 1.25rem;
  max-width: 600px;
}

.app-dark .info-card {
  background: rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.2);
}

.info-card ul {
  list-style-type: disc;
}

.info-card li {
  margin-bottom: 0.5rem;
}

.info-card li:last-child {
  margin-bottom: 0;
}
</style>