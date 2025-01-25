
<script>
import SideMenu from "./SideMenu.vue";
export default {
  components: {
    SideMenu,
  },
};
</script>
<template>
  <div class="sidenav-container">
    <div class="flex justify-content-center">
      <img src="@/assets/beta-logo.png" />
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