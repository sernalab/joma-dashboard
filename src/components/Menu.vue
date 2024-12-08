
<template>
  <div class="flex justify-content-center w-full">
    <Menubar :model="menuItems" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const menuItems = computed(() => [
  {
    label: t("menu.home"),
    icon: "pi pi-home",
  },
  {
    label: t("menu.features"),
    icon: "pi pi-star",
  },
  {
    label: t("menu.projects"),
    icon: "pi pi-search",
    items: [
      {
        label: t("menu.components"),
        icon: "pi pi-bolt",
      },
      {
        label: t("menu.blocks"),
        icon: "pi pi-server",
      },
      {
        label: t("menu.uiKit"),
        icon: "pi pi-pencil",
      },
      {
        label: t("menu.templates"),
        icon: "pi pi-palette",
        items: [
          {
            label: t("menu.apollo"),
            icon: "pi pi-palette",
          },
          {
            label: t("menu.ultima"),
            icon: "pi pi-palette",
          },
        ],
      },
    ],
  },
  {
    label: t("menu.printReports"),
    icon: "pi pi-print",
  },
]);
</script>
