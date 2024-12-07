<script setup>
import Menu from "@/components/Menu.vue";
</script>

<template>
  <div class="h-screen flex flex-column p-5">
    <Menu />
    <div class="flex-1">
      <RouterView />
    </div>
  </div>
</template>