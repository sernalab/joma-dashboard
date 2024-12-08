<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authService } from "@/services/auth.service";

const router = useRouter();
const userId = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

const handleLogin = async () => {
  if (!userId.value || !password.value) {
    error.value = "Por favor, introduce todas las credenciales";
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    const user = await authService.login(userId.value, password.value);
    if (user) {
      router.push("/dashboard");
    }
  } catch (err) {
    error.value = "Credenciales inválidas";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex h-screen">
    <div class="w-full flex align-items-center justify-content-center">
      <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div class="text-center mb-5">
          <img src="/src/assets/beta-logo.png" height="50" />
          <div class="text-900 text-3xl font-medium mb-3">Bienvenido</div>
          <span class="text-600 font-medium">Introduce tus credenciales</span>
        </div>

        <div class="flex flex-column gap-3">
          <Message v-if="error" severity="error" class="w-full">
            {{ error }}
          </Message>
          <div class="flex flex-column gap-2">
            <label for="userId">ID de Usuario</label>
            <InputText
              id="userId"
              v-model="userId"
              type="text"
              :disabled="loading"
            />
          </div>
          <div class="flex flex-column gap-2">
            <label for="password">Contraseña</label>
            <InputText
              id="password"
              v-model="password"
              type="password"
              :disabled="loading"
            />
          </div>
          <Button
            label="Iniciar Sesión"
            @click="handleLogin"
            :loading="loading"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Joma Colors */
/* .p-button {
  background-color: #386ec7 !important;
  border: #386ec7 !important;
}

.p-inputtext:focus {
  border-color: #386ec7 !important;
} */

/* Beta Colors */
.p-button {
  background-color: #ec7d13 !important;
  border: #ec7d13 !important;
}

.p-inputtext:focus {
  border-color: #ec7d13 !important;
}

img {
  height: 100px;
}
</style>
