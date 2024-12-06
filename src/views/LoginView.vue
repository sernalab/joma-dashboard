<template>
  <div
    class="h-screen flex align-items-center justify-content-center overflow-hidden"
  >
    <div class="surface-card p-4 border-round w-full sm:w-24rem shadow-2">
      <h2 class="text-center mb-5">Login</h2>
      <div class="flex flex-column gap-4">
        <div class="flex flex-column gap-2">
          <label for="username">Username</label>
          <InputText id="username" type="text" />
        </div>
        <div class="flex flex-column gap-2">
          <label for="password">Password</label>
          <InputText id="password" type="password" />
        </div>
        <Button label="Login" icon="pi pi-user"></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style>
.p-button.p-button-primary {
  background-color: #386ec7;
}
</style>