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
      },
      {
        label: "Vacío",
        icon: "pi pi-angle-right",
      },
      {
        label: "Presión de aceite",
        icon: "pi pi-angle-right",
      },
      {
        label: "Presión de combustible",
        icon: "pi pi-angle-right",
      },
      {
        label: "Common rail",
        icon: "pi pi-angle-right",
      },
      {
        label: "Compresión",
        icon: "pi pi-angle-right",
      },
      {
        label: "Presión turbo",
        icon: "pi pi-angle-right",
      },
      {
        label: "Presión de frenos",
        icon: "pi pi-angle-right",
      },
      {
        label: "Presión filtro de partículas",
        icon: "pi pi-angle-right",
      },
      {
        label: "Presión AdBlue",
        icon: "pi pi-angle-right",
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