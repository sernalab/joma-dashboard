<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

import { useRouter } from "vue-router";
import { authService } from "@/services/auth.service";

const router = useRouter();

const handleLogout = () => {
  authService.logout();
  router.push("/");
};
const items = ref([
  {
    label: t("sideMenu.graphics"),
    items: [
      {
        label: t("sideMenu.manometer"),
        icon: "pi pi-angle-right",
        command: () => router.push("/dashboard/manometer"),
      },
      {
        label: t("sideMenu.vacuum"),
        icon: "pi pi-angle-right",
        command: () => router.push("/dashboard/vacuum"),
      },
      {
        label: t("sideMenu.oilPressure"),
        icon: "pi pi-angle-right",
        command: () => router.push("/dashboard/oil-pressure"),
      },
      {
        label: t("sideMenu.fuelPressure"),
        icon: "pi pi-angle-right",
        command: () => router.push("/dashboard/fuel-pressure"),
      },
      {
        label: t("sideMenu.commonRail"),
        icon: "pi pi-angle-right",
        command: () => router.push("/dashboard/common-rail"),
      },
      {
        label: t("sideMenu.compression"),
        icon: "pi pi-angle-right",
        command: () => router.push("/dashboard/compression"),
      },
      {
        label: t("sideMenu.turboPressure"),
        icon: "pi pi-angle-right",
        command: () => router.push("/dashboard/turbo-pressure"),
      },
      {
        label: t("sideMenu.brakePressure"),
        icon: "pi pi-angle-right",
        command: () => router.push("/dashboard/brake-pressure"),
      },
      {
        label: t("sideMenu.dpfPressure"),
        icon: "pi pi-angle-right",
        command: () => router.push("/dashboard/dpf-pressure"),
      },
      {
        label: t("sideMenu.adbluePressure"),
        icon: "pi pi-angle-right",
        command: () => router.push("/dashboard/adblue-pressure"),
      },
    ],
  },
  {
    label: t("sideMenu.profile"),
    items: [
      {
        label: t("sideMenu.logout"),
        icon: "pi pi-sign-out",
        command: handleLogout,
      },
    ],
  },
]);
</script>

<template>
  <div class="card flex justify-center">
    <Menu :model="items" />
  </div>
</template>

<style>
.p-menu {
  border: none !important;
  box-shadow: none !important;
}
</style>