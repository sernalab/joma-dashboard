<script setup>
const { t } = useI18n();
import { useI18n } from "vue-i18n";

const items = [
  {
    id: 1,
    key: "manometer",
    route: "/dashboard/manometer",
  },
  {
    id: 2,
    key: "vacuum",
    route: "/dashboard/vacuum",
  },
  {
    id: 3,
    key: "oilPressure",
    route: "/dashboard/oil-pressure",
  },
  {
    id: 4,
    key: "fuelPressure",
    route: "/dashboard/fuel-pressure",
  },
  {
    id: 5,
    key: "commonRail",
    route: "/dashboard/common-rail",
  },
  {
    id: 6,
    key: "compression",
    route: "/dashboard/compression",
  },
  {
    id: 7,
    key: "turboPressure",
    route: "/dashboard/turbo-pressure",
  },
  {
    id: 8,
    key: "brakePressure",
    route: "/dashboard/brake-pressure",
  },
  {
    id: 9,
    key: "dpfPressure",
    route: "/dashboard/dpf-pressure",
  },
  {
    id: 10,
    key: "adbluePressure",
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
              <h3 class="text-700 font-semibold mb-2">
                {{ t(`selectionView.${item.key}.title`) }}
              </h3>
              <p class="text-sm text-700">
                {{ t(`selectionView.${item.key}.description`) }}
              </p>
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
