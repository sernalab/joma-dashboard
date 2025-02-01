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
    description: "Medición de la presión negativa en sistemas de vacío.",
    route: "/dashboard/vacuum",
  },
  {
    id: 3,
    title: "Presión de aceite",
    description: "Monitorización de la presión del aceite en el motor.",
    route: "/dashboard/oil-pressure",
  },
  {
    id: 4,
    title: "Presión de combustible",
    description:
      "Medición de la presión del sistema de inyección de combustible.",
    route: "/dashboard/fuel-pressure",
  },
  {
    id: 5,
    title: "Common rail",
    description:
      "Diagnóstico de la presión en sistemas de inyección common rail.",
    route: "/dashboard/common-rail",
  },
  {
    id: 6,
    title: "Compresión",
    description: "Evaluación de la compresión en los cilindros del motor.",
    route: "/dashboard/compression",
  },
  {
    id: 7,
    title: "Presión turbo",
    description: "Control de la presión del sistema de turboalimentación.",
    route: "/dashboard/turbo-pressure",
  },
  {
    id: 8,
    title: "Presión de frenos",
    description: "Medición de la presión en el circuito de frenos.",
    route: "/dashboard/brake-pressure",
  },
  {
    id: 9,
    title: "Presión filtro de partículas",
    description: "Monitorización de la presión diferencial en el DPF.",
    route: "/dashboard/dpf-pressure",
  },
  {
    id: 10,
    title: "Presión AdBlue",
    description:
      "Medición de la presión en el sistema AdBlue para reducción de emisiones.",
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
