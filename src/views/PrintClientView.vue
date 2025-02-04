<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import Button from "primevue/button";

const formData = ref({
  nombre: "",
  vehiculo: "",
  matricula: "",
  graficos: [],
});

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

const onSubmit = async () => {
  try {
    // Mostrar área de impresión
    const printContent = document.getElementById("printable-content");
    printContent.classList.remove("hidden");

    // Dar tiempo al DOM para actualizarse
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Imprimir
    window.print();

    // Ocultar área de impresión después
    printContent.classList.add("hidden");
  } catch (error) {
    console.error("Error:", error);
  }
};
</script>

<template>
  <div class="surface-card p-4">
    <!-- Formulario -->
    <div class="flex flex-column gap-3 no-print">
      <div class="field">
        <InputText v-model="formData.nombre" placeholder="Nombre del cliente" />
      </div>

      <div class="field">
        <InputText v-model="formData.vehiculo" placeholder="Vehículo" />
      </div>

      <div class="field">
        <InputText v-model="formData.matricula" placeholder="Matrícula" />
      </div>

      <div class="field">
        <MultiSelect
          v-model="formData.graficos"
          :options="availableCharts"
          optionLabel="name"
          placeholder="Seleccionar gráficos"
        />
      </div>

      <Button @click="onSubmit" label="Generar informe" />
    </div>

    <div id="printable-content" class="hidden">
      <div class="print-header">
        <h1>Informe Técnico</h1>
      </div>

      <div class="client-info">
        <p><strong>Cliente:</strong> {{ formData.nombre }}</p>
        <p><strong>Vehículo:</strong> {{ formData.vehiculo }}</p>
        <p><strong>Matrícula:</strong> {{ formData.matricula }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.hidden {
  display: none;
}

@media print {
  .no-print {
    display: none !important;
  }

  #printable-content {
    display: block !important;
    padding: 20px;
  }

  .print-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .client-info {
    margin-bottom: 30px;
  }

  .client-info p {
    margin: 10px 0;
  }
}
</style>