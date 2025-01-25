<template>
  <Menubar :model="items" class="border-none surface-0">
    <template #start></template>
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
    label: t("menu.contact"),
    icon: "pi pi-cog",
  },
];

const handlePrint = async () => {
  const dashboard = document.querySelector(".grid");

  try {
    dashboard.classList.add("printing");

    window.print();

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