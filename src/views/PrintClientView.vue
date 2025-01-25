
<script setup>
import { Form } from "@primevue/forms";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import Button from "primevue/button";

const initialValues = {
  nombre: "",
  vehiculo: "",
  matricula: "",
  graficos: [],
};

const availableCharts = [
  { name: "Manómetro", value: "manometer" },
  { name: "Vacío", value: "vacuum" },
  { name: "Presión de aceite", value: "oil-pressure" },
  { name: "Presión de combustible", value: "fuel-pressure" },
  { name: "Common rail", value: "common-rail" },
  { name: "Compresión", value: "compression" },
  { name: "Presión turbo", value: "turbo-pressure" },
  { name: "Presión de frenos", value: "brake-pressure" },
  { name: "Presión filtro de partículas", value: "dpf-pressure" },
  { name: "Presión AdBlue", value: "adblue-pressure" },
];
</script>

<template>
  <div class="surface-card p-4">
    <Form :initial-values="initialValues" v-slot="$form" @submit="onSubmit">
      <div class="flex flex-column gap-3">
        <div class="field">
          <InputText name="nombre" placeholder="Nombre del cliente" />
        </div>

        <div class="field">
          <InputText name="vehiculo" placeholder="Vehículo" />
        </div>

        <div class="field">
          <InputText name="matricula" placeholder="Matrícula" />
        </div>

        <div class="field">
          <MultiSelect
            name="graficos"
            :options="availableCharts"
            optionLabel="name"
            placeholder="Seleccionar gráficos"
          />
        </div>

        <Button type="submit" label="Generar informe" />
      </div>
    </Form>
  </div>
</template>