<script setup>
import { ref } from "vue";

const inputValue = ref("");
const handleClick = () => {
  alert(`Input value: ${inputValue.value}`);
};
</script>

<template>
  <div class="p-4">
    <h2 class="text-primary">PrimeVue Test</h2>

    <!-- InputText -->
    <InputText v-model="inputValue" placeholder="Type something..." />

    <!-- Button -->
    <Button label="Click Me" @click="handleClick" class="mt-2" />
  </div>
</template>

<style scoped>
</style>