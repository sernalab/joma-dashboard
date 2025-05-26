<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authService } from "@/services/auth.service";
import { useI18n } from "vue-i18n";

const router = useRouter();
const userId = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

const handleLogin = async () => {
  if (!userId.value || !password.value) {
    error.value = "login.error.required";
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
    error.value = "login.error.credentials";
  } finally {
    loading.value = false;
  }
};

const { t } = useI18n();
</script>

<template>
  <div class="flex h-screen login-container">
    <div class="w-full flex align-items-center justify-content-center">
      <div class="p-4 border-round w-full lg:w-4 login-card">
        <div class="text-center mb-5">
          <img src="/src/assets/beta-logo.png" height="50" />
          <div class="text-900 text-3xl font-medium mb-3">
            {{ t("login.title") }}
          </div>
          <span class="text-600 font-medium">{{ t("login.subtitle") }}</span>
        </div>

        <div class="flex flex-column gap-3">
          <Message v-if="error" severity="error" class="w-full">
            {{ t(error) }}
          </Message>
          <div class="flex flex-column gap-2">
            <label for="userId">{{ t("login.userId") }}</label>
            <InputText
              id="userId"
              v-model="userId"
              type="text"
              :disabled="loading"
            />
          </div>
          <div class="flex flex-column gap-2">
            <label for="password">{{ t("login.password") }}</label>
            <InputText
              id="password"
              v-model="password"
              type="password"
              :disabled="loading"
            />
          </div>
          <Button
            :label="t('login.submit')"
            @click="handleLogin"
            :loading="loading"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Login specific styles */
.login-container {
  background: var(--p-surface-100);
  min-height: 100vh;
}

.login-card {
  background: var(--p-surface-0);
  border: 1px solid var(--p-surface-border);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

img {
  height: 100px;
}

/* Dark mode adjustments */
.app-dark .login-container {
  background: var(--p-surface-950);
}

.app-dark .login-card {
  background: var(--p-surface-900);
  border: 1px solid var(--p-surface-800);
}
</style>
