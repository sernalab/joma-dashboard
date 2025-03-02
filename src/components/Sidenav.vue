
<script>
import SideMenu from "./SideMenu.vue";
export default {
  components: {
    SideMenu,
  },
};
</script>
<template>
  <div class="sidenav-container no-print">
    <div class="flex justify-content-center">
      <router-link to="/dashboard">
        <img src="@/assets/beta-logo.png" alt="Logo" />
      </router-link>
    </div>
    <SideMenu />
  </div>
</template>

<style>
.sidenav-container {
  background-color: white;
}

img {
  height: 50px;
}
</style>