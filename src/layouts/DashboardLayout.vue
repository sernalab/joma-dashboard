<script>
import HeaderMenu from "@/components/HeaderMenu.vue";
import Sidenav from "@/components/Sidenav.vue";

export default {
  components: {
    HeaderMenu,
    Sidenav,
  },
};
</script>
<template>
  <div class="layout-wrapper flex">
    <Sidenav />
    <div class="flex-1 flex flex-column">
      <header class="shadow-1 no-print">
        <div class="mx-auto px-4">
          <HeaderMenu />
        </div>
      </header>
      <main class="flex-1">
        <div class="container mx-auto px-4 pt-5">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>

<style>
.layout-wrapper {
  min-height: 100vh;
  background-color: #f9fafb;
}

header {
  background-color: #fff;
}
</style>