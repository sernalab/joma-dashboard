<template>
  <Menubar :model="items" class="border-none surface-0">
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
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();

const handlePrint = () => router.push("/dashboard/print-client-report");

const items = [
  {
    label: t("menu.home"),
    icon: "pi pi-home",
    command: () => router.push("/dashboard"),
  },
  // {
  //   label: t("menu.reports"),
  //   icon: "pi pi-chart-bar",
  //   command: () => router.push("/reports"),
  // },
  {
    label: t("menu.contact"),
    icon: "pi pi-cog",
    command: () => router.push("/dashboard"),
  },
];
</script>