<script setup>
import { defineProps, defineEmits, computed } from "vue";
import { useI18n } from "vue-i18n";
import { Form } from "@primevue/forms";

const { t } = useI18n();
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

// Valores iniciales computados
const initialValues = computed(() => ({
  marca: props.modelValue?.marca || '',
  modelo: props.modelValue?.modelo || '',
  matricula: props.modelValue?.matricula || '',
  año: props.modelValue?.año || null,
  kilometraje: props.modelValue?.kilometraje || null
}));

// Resolver personalizado
const resolver = ({ values }) => {
  const errors = {};
  const currentYear = new Date().getFullYear();
  
  // Validar marca
  if (!values.marca || !values.marca.trim()) {
    errors.marca = [{ message: t('validation.required') }];
  }
  
  // Validar modelo
  if (!values.modelo || !values.modelo.trim()) {
    errors.modelo = [{ message: t('validation.required') }];
  }
  
  // Matrícula sin validación (cada país tiene su formato)
  
  // Validar año (opcional)
  if (values.año) {
    if (values.año < 1900 || values.año > currentYear + 1) {
      errors.año = [{ message: t('validation.invalidYear', { min: 1900, max: currentYear + 1 }) }];
    }
  }
  
  // Validar kilometraje (opcional)
  if (values.kilometraje !== null && values.kilometraje !== undefined) {
    if (values.kilometraje < 0) {
      errors.kilometraje = [{ message: t('validation.mustBePositive') }];
    }
  }
  
  return { errors };
};

// Estado del formulario
let formValid = false;

// Actualizar campo
const updateField = (field, value) => {
  const updatedData = { ...props.modelValue, [field]: value };
  emit("update:modelValue", updatedData);
};

// Submit handler
const onFormSubmit = ({ valid }) => {
  formValid = valid;
};

// Exponer métodos
defineExpose({
  validate: () => {
    const result = resolver({ values: initialValues.value });
    formValid = Object.keys(result.errors).length === 0;
    return formValid;
  },
  isValid: () => formValid
});
</script>

<template>
  <div class="mb-4">
    <h2 class="text-xl mb-3">{{ t("printView.vehicleDetails") }}</h2>
    
    <Form 
      v-slot="$form" 
      :initialValues="initialValues" 
      :resolver="resolver"
      :validateOnBlur="true"
      :validateOnValueUpdate="false"
      @submit="onFormSubmit"
    >
      <div class="grid">
        <!-- Marca -->
        <div class="col-12 md:col-4">
          <div class="field">
            <label class="block mb-2">
              {{ t("printView.brand") }}
              <span class="text-red-500">*</span>
            </label>
            <InputText
              name="marca"
              @update:modelValue="(value) => updateField('marca', value)"
              :class="['w-full', { 'p-invalid': $form.marca?.invalid }]"
              placeholder="Toyota, Ford, etc."
              fluid
            />
            <small v-if="$form.marca?.invalid" class="p-error">
              {{ $form.marca.error?.message }}
            </small>
          </div>
        </div>

        <!-- Modelo -->
        <div class="col-12 md:col-4">
          <div class="field">
            <label class="block mb-2">
              {{ t("printView.model") }}
              <span class="text-red-500">*</span>
            </label>
            <InputText
              name="modelo"
              @update:modelValue="(value) => updateField('modelo', value)"
              :class="['w-full', { 'p-invalid': $form.modelo?.invalid }]"
              placeholder="Corolla, Focus, etc."
              fluid
            />
            <small v-if="$form.modelo?.invalid" class="p-error">
              {{ $form.modelo.error?.message }}
            </small>
          </div>
        </div>

        <!-- Matrícula -->
        <div class="col-12 md:col-4">
          <div class="field">
            <label class="block mb-2">{{ t("printView.plate") }}</label>
            <InputText
              name="matricula"
              @update:modelValue="(value) => updateField('matricula', value.toUpperCase())"
              :class="['w-full', { 'p-invalid': $form.matricula?.invalid }]"
              placeholder="1234-ABC"
              style="text-transform: uppercase"
              fluid
            />
            <small v-if="$form.matricula?.invalid" class="p-error">
              {{ $form.matricula.error?.message }}
            </small>
          </div>
        </div>

        <!-- Año -->
        <div class="col-12 md:col-4">
          <div class="field">
            <label class="block mb-2">{{ t("printView.year") }}</label>
            <InputNumber
              name="año"
              @update:modelValue="(value) => updateField('año', value)"
              :class="['w-full', { 'p-invalid': $form.año?.invalid }]"
              :useGrouping="false"
              :min="1900"
              :max="new Date().getFullYear() + 1"
              :placeholder="new Date().getFullYear().toString()"
              fluid
            />
            <small v-if="$form.año?.invalid" class="p-error">
              {{ $form.año.error?.message }}
            </small>
          </div>
        </div>

        <!-- Kilometraje -->
        <div class="col-12 md:col-4">
          <div class="field">
            <label class="block mb-2">{{ t("printView.mileage") }}</label>
            <InputNumber
              name="kilometraje"
              @update:modelValue="(value) => updateField('kilometraje', value)"
              :class="['w-full', { 'p-invalid': $form.kilometraje?.invalid }]"
              suffix=" km"
              :min="0"
              :max="999999"
              placeholder="50000"
              fluid
            />
            <small v-if="$form.kilometraje?.invalid" class="p-error">
              {{ $form.kilometraje.error?.message }}
            </small>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<style scoped>
.field {
  margin-bottom: 1rem;
}

.p-error {
  color: #ef4444 !important;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

/* Ocultar el form element */
:deep(form) {
  display: contents;
}
</style>