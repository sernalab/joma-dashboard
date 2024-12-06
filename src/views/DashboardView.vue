<script setup>
import { ref } from "vue";
import ServiceGrid from "@/components/ServiceGrid.vue";
import { firebaseService } from "@/services/firebase.service";

const datos = ref([]);

const fetchData = async () => {
  try {
    datos.value = await firebaseService.fetchBetaData();
    console.log("Datos obtenidos:", datos.value);
  } catch (error) {
    console.error("Error:", error);
  }
};
</script>

<template>
  <div class="p-4">
    <div class="mb-4">
      <h1>Bienvenido al Dashboard</h1>
      <Button label="Cargar Datos" @click="fetchData" class="mb-3" />
      <div v-if="datos.length > 0">
        <pre>{{ JSON.stringify(datos, null, 2) }}</pre>
      </div>
    </div>

    <ServiceGrid />
  </div>
</template>