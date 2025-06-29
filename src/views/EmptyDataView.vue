<script setup>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const router = useRouter();
const { t } = useI18n();
</script>

<template>
  <div class="empty-data-container">
    <div class="text-center">
      <i class="pi pi-database text-6xl mb-4 text-400"></i>
      <h2 class="text-2xl font-semibold mb-2">{{ t("extras.noDataAvailable") }}</h2>
      <p class="text-500 mb-4">{{ t("extras.noDataAvailableDescription") }}</p>
      <Button
        :label="t('extras.backToAllMeasurements')"
        @click="() => router.push('/dashboard/all-measurements')"
        outlined
      />
    </div>
  </div>
</template>

<style scoped>
.empty-data-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  flex: 1;
  height: 100%;
}
</style>
