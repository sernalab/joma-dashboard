<script>
import Menu from "@/components/Menu.vue";

export default {
  components: {
    Menu,
  },
};
</script>
<template>
  <div class="min-h-screen flex flex-column">
    <header class="surface-0 shadow-1">
      <div class="mx-auto px-4">
        <Menu />
      </div>
    </header>

    <main class="main flex-1">
      <div class="container mx-auto px-4 pt-5">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style>
.container {
  background-color: #e5e7eb;
}
</style>