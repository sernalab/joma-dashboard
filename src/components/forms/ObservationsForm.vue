<script setup>
import { defineProps, defineEmits } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);

const updateObservations = (value) => {
  const updatedData = { ...props.modelValue, observaciones: value };
  emit("update:modelValue", updatedData);
};
</script>

<template>
  <div class="mb-4">
    <h2 class="text-xl mb-3">{{ t("printView.observations") }}</h2>
    <Textarea
      :value="modelValue.observaciones"
      @input="(e) => updateObservations(e.target.value)"
      rows="3"
      class="w-full"
      :placeholder="t('printView.addNotes')"
    />
  </div>
</template>