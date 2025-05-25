<script setup>
import { defineProps, defineEmits, computed } from "vue";
import { useI18n } from "vue-i18n";
import { Form } from "@primevue/forms";

const { t } = useI18n();
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

// Valores iniciales computados para mantener sincronización
const initialValues = computed(() => ({
  nombreTaller: props.modelValue?.nombreTaller || '',
  nombre: props.modelValue?.nombre || '',
  telefono: props.modelValue?.telefono || '',
  email: props.modelValue?.email || ''
}));

// Resolver personalizado para validación
const resolver = ({ values }) => {
  const errors = {};
  
  // Validar nombre del taller
  if (!values.nombreTaller || !values.nombreTaller.trim()) {
    errors.nombreTaller = [{ message: t('validation.required') }];
  } else if (values.nombreTaller.length < 3) {
    errors.nombreTaller = [{ message: t('validation.minLength', { min: 3 }) }];
  }
  
  // Validar nombre
  if (!values.nombre || !values.nombre.trim()) {
    errors.nombre = [{ message: t('validation.required') }];
  } else if (values.nombre.length < 2) {
    errors.nombre = [{ message: t('validation.minLength', { min: 2 }) }];
  }
  
  // Teléfono sin validación - acepta cualquier formato
  
  // Validar email (opcional)
  if (values.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      errors.email = [{ message: t('validation.invalidEmail') }];
    }
  }
  
  return { errors };
};

// Estado del formulario
let formValid = false;

// Actualizar campo y emitir cambios
const updateField = (field, value) => {
  const updatedData = { ...props.modelValue, [field]: value };
  emit("update:modelValue", updatedData);
};

// Manejar el envío del formulario
const onFormSubmit = ({ valid }) => {
  formValid = valid;
};

// Exponer métodos para el componente padre
defineExpose({
  validate: () => {
    // Forzar validación ejecutando el resolver
    const result = resolver({ values: initialValues.value });
    formValid = Object.keys(result.errors).length === 0;
    return formValid;
  },
  isValid: () => formValid
});
</script>

<template>
  <div class="mb-4">
    <h2 class="text-xl mb-3">{{ t("printView.clientData") }}</h2>
    
    <Form 
      v-slot="$form" 
      :initialValues="initialValues" 
      :resolver="resolver"
      :validateOnBlur="true"
      :validateOnValueUpdate="false"
      @submit="onFormSubmit"
    >
      <div class="grid">
        <!-- Nombre del Taller -->
        <div class="col-12 md:col-4">
          <div class="field">
            <label class="block mb-2">
              {{ t("printView.workshopName") }} 
              <span class="text-red-500">*</span>
            </label>
            <InputText
              name="nombreTaller"
              @update:modelValue="(value) => updateField('nombreTaller', value)"
              :class="['w-full', { 'p-invalid': $form.nombreTaller?.invalid }]"
              fluid
            />
            <small v-if="$form.nombreTaller?.invalid" class="p-error">
              {{ $form.nombreTaller.error?.message }}
            </small>
          </div>
        </div>

        <!-- Nombre -->
        <div class="col-12 md:col-4">
          <div class="field">
            <label class="block mb-2">
              {{ t("printView.name") }}
              <span class="text-red-500">*</span>
            </label>
            <InputText
              name="nombre"
              @update:modelValue="(value) => updateField('nombre', value)"
              :class="['w-full', { 'p-invalid': $form.nombre?.invalid }]"
              fluid
            />
            <small v-if="$form.nombre?.invalid" class="p-error">
              {{ $form.nombre.error?.message }}
            </small>
          </div>
        </div>

        <!-- Teléfono -->
        <div class="col-12 md:col-4">
          <div class="field">
            <label class="block mb-2">{{ t("printView.phone") }}</label>
            <InputText
              name="telefono"
              type="tel"
              placeholder="+34 123 456 789"
              @update:modelValue="(value) => updateField('telefono', value)"
              :class="['w-full', { 'p-invalid': $form.telefono?.invalid }]"
              fluid
            />
            <small v-if="$form.telefono?.invalid" class="p-error">
              {{ $form.telefono.error?.message }}
            </small>
          </div>
        </div>

        <!-- Email -->
        <div class="col-12 md:col-4">
          <div class="field">
            <label class="block mb-2">{{ t("printView.email") }}</label>
            <InputText
              name="email"
              type="email"
              @update:modelValue="(value) => updateField('email', value)"
              :class="['w-full', { 'p-invalid': $form.email?.invalid }]"
              fluid
            />
            <small v-if="$form.email?.invalid" class="p-error">
              {{ $form.email.error?.message }}
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

/* Ocultar el form submit button ya que no lo necesitamos */
:deep(form) {
  display: contents;
}
</style>