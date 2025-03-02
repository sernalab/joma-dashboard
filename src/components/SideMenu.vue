<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authService } from "@/services/auth.service";

const router = useRouter();

const handleLogout = () => {
  authService.logout();
  router.push("/");
};
const items = ref([
  {
    label: "Graficos",
    items: [
      {
        label: "Manómetro",
        icon: "pi pi-angle-right",
        command: () => router.push("/dashboard/manometer"),
      },
      {
        label: "Vacío",
        icon: "pi pi-angle-right",
        command: () => router.push("/dashboard/vacuum"),
      },
      {
        label: "Presión de aceite",
        icon: "pi pi-angle-right",
        command: () => router.push("/dashboard/oil-pressure"),
      },
      {
        label: "Presión de combustible",
        icon: "pi pi-angle-right",
        command: () => router.push("/dashboard/fuel-pressure"),
      },
      {
        label: "Common rail",
        icon: "pi pi-angle-right",
        command: () => router.push("/dashboard/common-rail"),
      },
      {
        label: "Compresión",
        icon: "pi pi-angle-right",
        command: () => router.push("/dashboard/compression"),
      },
      {
        label: "Presión turbo",
        icon: "pi pi-angle-right",
        command: () => router.push("/dashboard/turbo-pressure"),
      },
      {
        label: "Presión de frenos",
        icon: "pi pi-angle-right",
        command: () => router.push("/dashboard/brake-pressure"),
      },
      {
        label: "Presión filtro de partículas",
        icon: "pi pi-angle-right",
        command: () => router.push("/dashboard/dpf-pressure"),
      },
      {
        label: "Presión AdBlue",
        icon: "pi pi-angle-right",
        command: () => router.push("/dashboard/adblue-pressure"),
      },
    ],
  },
  {
    label: "Profile",
    items: [
      {
        label: "Logout",
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