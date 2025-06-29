<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import ReportWizard from '@/components/forms/ReportWizard.vue';

const { t } = useI18n();
const wizardRef = ref(null);

const handleGeneratePDF = async (formData) => {
  console.log('Generating PDF with data:', formData);
  // The PDF generation is handled in PreviewStep
};
</script>

<template>
  <div class="print-client-view">
    <ReportWizard 
      ref="wizardRef"
      @generate-pdf="handleGeneratePDF"
    />
  </div>
</template>

<style scoped>
.print-client-view {
  min-height: 100vh;
  background: var(--p-surface-ground);
}

/* Remove print styles since we're using the new PDF generator */
@media print {
  .print-client-view {
    display: none;
  }
}
</style>