<script setup>
import { RouterView } from "vue-router";
import SideMenu from "./components/SideMenu.vue";
</script>

<template>
  <div class="main-container">
    <SideMenu />
    <div class="view-container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
</style>
