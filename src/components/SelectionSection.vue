<script setup>
const items = [
  {
    id: 1,
    title: "Manómetro",
    description: "Manómetro de 80 bar",
    route: "/dashboard/manometer",
  },
  {
    id: 2,
    title: "Vacío",
    description: "",
    route: "/dashboard/vacuum",
  },
  {
    id: 3,
    title: "Presión de aceite",
    description: "Control de emisiones",
    route: "/dashboard/oil-pressure",
  },
  {
    id: 4,
    title: "Presión de combustible",
    description: "Estado del aceite",
    route: "/dashboard/fuel-pressure",
  },
  {
    id: 5,
    title: "Common rail",
    description: "Sistema de frenos",
    route: "/dashboard/common-rail",
  },
  {
    id: 6,
    title: "Compresión",
    description: "Estado de batería",
    route: "/dashboard/compression",
  },
  {
    id: 7,
    title: "Presión turbo",
    description: "Presión y desgaste",
    route: "/dashboard/turbo-pressure",
  },
  {
    id: 8,
    title: "Presión de frenos",
    description: "Sistema de suspensión",
    route: "/dashboard/brake-pressure",
  },
  {
    id: 9,
    title: "Presión filtro de partículas",
    description: "Sistema de dirección",
    route: "/dashboard/dpf-pressure",
  },
  {
    id: 10,
    title: "Presión AdBlue",
    description: "Diagnóstico general",
    route: "/dashboard/adblue-pressure",
  },
];
</script>
<template>
  <div class="grid">
    <div
      v-for="item in items"
      :key="item.id"
      class="col-12 sm:col-6 md:col-4 lg:col-3 mb-3"
    >
      <router-link
        :to="item.route"
        class="flex flex-column bg-white border-round-xl cursor-pointer h-full shadow-1 hover:shadow-3 transition-all transition-duration-300 no-underline"
      >
        <div class="p-4">
          <div class="flex justify-content-between align-items-center gap-3">
            <div class="flex-grow-1">
              <h3 class="text-700 font-semibold mb-2">{{ item.title }}</h3>
              <p class="text-sm text-700">{{ item.description }}</p>
            </div>
            <i class="pi pi-chevron-right text-700"></i>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style>
a {
  text-decoration: none;
  color: #1f2937;
}
</style>
