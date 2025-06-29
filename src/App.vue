<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { languageService } from "@/services/language.service";

// Initialize dark mode using PrimeVue architecture
const initDarkMode = () => {
  const darkMode = localStorage.getItem('darkMode') === 'true';
  if (darkMode) {
    document.documentElement.classList.add('app-dark');
  }
};

// Run immediately
initDarkMode();

onMounted(() => {
  // Remove preload class to enable transitions
  document.body.classList.remove('preload');
  languageService.initializeLanguage();
});
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
