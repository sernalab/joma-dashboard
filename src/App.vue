<script setup>
import Menu from "@/components/Menu.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="main-container">
    <Menu />
    <RouterView />
  </div>
</template>

<style scoped>
</style>
