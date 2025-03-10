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
    <h2 class="text-xl mb-3">{{ t("printView.clientData") }}</h2>
    <div class="grid">
      <div class="col-12 md:col-4">
        <label class="block mb-2">{{ t("printView.name") }}</label>
        <InputText
          :value="modelValue.nombre"
          @input="(e) => updateField('nombre', e.target.value)"
          class="w-full"
        />
      </div>
      <div class="col-12 md:col-4">
        <label class="block mb-2">{{ t("printView.phone") }}</label>
        <InputText
          :value="modelValue.telefono"
          @input="(e) => updateField('telefono', e.target.value)"
          class="w-full"
        />
      </div>
      <div class="col-12 md:col-4">
        <label class="block mb-2">{{ t("printView.email") }}</label>
        <InputText
          :value="modelValue.email"
          @input="(e) => updateField('email', e.target.value)"
          class="w-full"
        />
      </div>
    </div>
  </div>
</template>