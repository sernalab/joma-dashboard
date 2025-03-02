<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { languageService } from "@/services/language.service";

onMounted(() => {
  languageService.initializeLanguage();
});
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
