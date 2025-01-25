
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
    <div>
      <img src="@/assets/beta-logo.png" height="40" />
    </div>

    <SideMenu />
  </div>
</template>

<style>
.sidenav-container {
  background-color: white;
}
</style>