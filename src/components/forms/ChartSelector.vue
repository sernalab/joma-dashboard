<script setup>
import { defineProps, defineEmits } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const props = defineProps(["modelValue", "availableCharts"]);
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="mb-4">
    <h2 class="text-xl mb-3">{{ t("printView.measurements") }}</h2>
    <MultiSelect
      :modelValue="modelValue"
      @update:modelValue="emit('update:modelValue', $event)"
      :options="availableCharts"
      optionLabel="name"
      :placeholder="t('printView.selectMeasurements')"
      class="w-full"
    />
  </div>
</template>