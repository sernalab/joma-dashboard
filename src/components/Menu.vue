<template>
  <Menubar :model="items" class="border-none surface-0">
    <template #start>
      <div class="flex align-items-center">
        <img src="/src/assets/beta-logo.png" />
      </div>
    </template>
    <template #end>
      <Button
        @click="handlePrint"
        icon="pi pi-print"
        :label="t('menu.printReports')"
        class="print-button p-button-rounded"
      />
    </template>
  </Menubar>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const items = [
  {
    label: t("menu.home"),
    icon: "pi pi-home",
    to: "/dashboard",
  },
  {
    label: t("menu.reports"),
    icon: "pi pi-chart-bar",
  },
  {
    label: t("menu.settings"),
    icon: "pi pi-cog",
  },
];

const handlePrint = async () => {
  const dashboard = document.querySelector(".grid");

  try {
    // Añade una clase temporal para estilos de impresión
    dashboard.classList.add("printing");

    // Usa la API nativa de impresión del navegador
    window.print();

    // Elimina la clase temporal
    dashboard.classList.remove("printing");
  } catch (error) {
    console.error("Error al imprimir:", error);
  }
};
</script>

<style>
img {
  height: 3rem;
}

.print-button {
  background-color: #f07d13 !important;
  border-color: #f07d13 !important;
  transition: all 0.2s ease;
}

@media print {
  body * {
    visibility: hidden;
  }

  .grid.printing,
  .grid.printing * {
    visibility: visible;
  }

  .grid.printing {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
}
</style>