<script setup>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const router = useRouter();
const { t } = useI18n();
</script>

<template>
  <div class="flex align-items-center justify-content-center min-h-screen">
    <div class="text-center">
      <i class="pi pi-database text-8xl mb-4 text-700"></i>
      <h2>{{ t("extras.noDataAvailable") }}</h2>
      <p>{{ t("extras.noDataAvailableDescription") }}</p>
      <Button
        class="mt-4"
        :label="t('extras.backToDashbaord')"
        @click="() => router.push('/dashboard')"
      />
    </div>
  </div>
</template>
