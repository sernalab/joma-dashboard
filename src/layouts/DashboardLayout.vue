<script setup>
import Menu from "@/components/Menu.vue";
</script>

<template>
  <div class="h-screen flex flex-column">
    <Menu />
    <div class="flex-1 p-4">
      <RouterView />
    </div>
  </div>
</template>