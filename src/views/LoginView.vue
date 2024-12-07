<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authService } from "@/services/auth.service";

const router = useRouter();
const userId = ref("");
const password = ref("");
const error = ref("");

const handleLogin = async () => {
  try {
    const user = await authService.login(userId.value, password.value);
    if (user) {
      router.push("/dashboard");
    }
  } catch (err) {
    error.value = "Credenciales inválidas";
  }
};
</script>

<template>
  <div class="flex h-screen">
    <div class="w-full flex align-items-center justify-content-center">
      <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div class="text-center mb-5">
          <img src="/src/assets/joma-logo.jpg" height="50" class="mb-3" />
          <div class="text-900 text-3xl font-medium mb-3">Bienvenido</div>
        </div>

        <div class="flex flex-column gap-3">
          <div class="flex flex-column gap-2">
            <label for="userId">ID de Usuario</label>
            <InputText id="userId" v-model="userId" type="text" />
          </div>
          <div class="flex flex-column gap-2">
            <label for="password">Contraseña</label>
            <InputText id="password" v-model="password" type="password" />
          </div>
          <small class="text-red-500" v-if="error">{{ error }}</small>
          <Button label="Iniciar Sesión" @click="handleLogin" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.p-button {
  background-color: #386ec7 !important;
  border: #386ec7 !important;
}

.p-inputtext:focus {
  border-color: #386ec7 !important;
}
</style>