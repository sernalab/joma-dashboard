<script setup>
import { defineProps, defineEmits } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const updateField = (field, value) => {
  const updatedData = { ...props.modelValue, [field]: value };
  emit("update:modelValue", updatedData);
};
</script>

<template>
  <div class="mb-4">
    <h2 class="text-xl mb-3">{{ t("printView.vehicleDetails") }}</h2>
    <div class="grid">
      <div class="col-12 md:col-4">
        <label class="block mb-2">{{ t("printView.brand") }}</label>
        <InputText
          :value="modelValue.marca"
          @input="(e) => updateField('marca', e.target.value)"
          class="w-full"
        />
      </div>
      <div class="col-12 md:col-4">
        <label class="block mb-2">{{ t("printView.model") }}</label>
        <InputText
          :value="modelValue.modelo"
          @input="(e) => updateField('modelo', e.target.value)"
          class="w-full"
        />
      </div>
      <div class="col-12 md:col-4">
        <label class="block mb-2">{{ t("printView.plate") }}</label>
        <InputText
          :value="modelValue.matricula"
          @input="(e) => updateField('matricula', e.target.value)"
          class="w-full"
        />
      </div>
      <div class="col-12 md:col-4">
        <label class="block mb-2">{{ t("printView.year") }}</label>
        <InputNumber
          :modelValue="modelValue.año"
          @update:modelValue="updateField('año', $event)"
          class="w-full"
        />
      </div>
      <div class="col-12 md:col-4">
        <label class="block mb-2">{{ t("printView.mileage") }}</label>
        <InputNumber
          :modelValue="modelValue.kilometraje"
          @update:modelValue="updateField('kilometraje', $event)"
          suffix=" km"
          class="w-full"
        />
      </div>
    </div>
  </div>
</template>