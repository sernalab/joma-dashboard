<script setup>
import { ref } from "vue";
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
  <main>
    <h1>Bienvenido</h1>
    <h2>FIREBASE TEST</h2>
    <Button label="Cargar Datos" @click="fetchData" />
    <div v-if="datos.length > 0">
      <pre>{{ JSON.stringify(datos, null, 2) }}</pre>
    </div>
  </main>
</template>