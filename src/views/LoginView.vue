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
  <div class="login-view">

    <!-- Glass card -->
    <div class="login-content">
      <div class="glass-card">
        
        <!-- Logo -->
        <div class="logo-container">
          <img src="/src/assets/beta-logo.png" alt="JOMA" class="logo" />
        </div>

        <!-- Welcome text -->
        <div class="welcome-text">
          <h1>{{ t("login.title") }}</h1>
          <p>{{ t("login.subtitle") }}</p>
        </div>

        <!-- Error message with animation -->
        <Transition name="shake">
          <div v-if="error" class="error-box">
            <i class="pi pi-exclamation-circle"></i>
            {{ t(error) }}
          </div>
        </Transition>

        <!-- Modern form -->
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="input-group">
            <div class="input-wrapper">
              <i class="pi pi-user input-icon"></i>
              <input
                v-model="userId"
                type="text"
                class="modern-input"
                :placeholder="t('login.userIdPlaceholder')"
                :disabled="loading"
                autofocus
              />
            </div>
          </div>

          <div class="input-group">
            <div class="input-wrapper">
              <i class="pi pi-lock input-icon"></i>
              <input
                v-model="password"
                type="password"
                class="modern-input"
                :placeholder="t('login.passwordPlaceholder')"
                :disabled="loading"
              />
            </div>
          </div>

          <button
            type="submit"
            class="submit-btn"
            :disabled="!userId || !password || loading"
          >
            <span v-if="!loading" class="btn-text">
              {{ t('login.submit') }}
              <i class="pi pi-arrow-right btn-icon"></i>
            </span>
            <span v-else class="loading-spinner">
              <i class="pi pi-spin pi-spinner"></i>
            </span>
          </button>
        </form>

      </div>

      <!-- Floating elements -->
      <div class="floating-elements">
        <div class="float-element element-1">
          <i class="pi pi-chart-line"></i>
        </div>
        <div class="float-element element-2">
          <i class="pi pi-cog"></i>
        </div>
        <div class="float-element element-3">
          <i class="pi pi-shield"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Main container */
.login-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  position: relative;
  overflow: hidden;
}


/* Glass card */
.login-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 480px;
  padding: 2rem;
}

.glass-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 
    0 4px 24px rgba(0, 0, 0, 0.06),
    0 1px 3px rgba(0, 0, 0, 0.08);
}

/* Logo */
.logo-container {
  text-align: center;
  margin-bottom: 2.5rem;
}

.logo {
  height: 80px;
}

/* Welcome text */
.welcome-text {
  text-align: center;
  margin-bottom: 2.5rem;
}

.welcome-text h1 {
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.5px;
}

.welcome-text p {
  color: #6c757d;
  font-size: 1rem;
  margin: 0;
}

/* Error message */
.error-box {
  background: #fee;
  border: 1px solid #fcc;
  color: #c33;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.shake-enter-active {
  animation: shake 0.5s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

/* Modern form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.input-group {
  position: relative;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.input-wrapper:hover {
  border-color: #dee2e6;
}

.input-wrapper:focus-within {
  background: #ffffff;
  border-color: #ff8e53;
  box-shadow: 0 0 0 3px rgba(255, 142, 83, 0.1);
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: #adb5bd;
  font-size: 1.25rem;
  transition: color 0.3s;
}

.modern-input {
  width: 100%;
  background: transparent;
  border: none;
  color: #2c3e50;
  padding: 0.875rem 1rem 0.875rem 3rem;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s;
}

.modern-input::placeholder {
  color: #adb5bd;
}

.modern-input:focus {
  color: #2c3e50;
}

.input-wrapper:focus-within .input-icon {
  color: #ff8e53;
}

/* Submit button */
.submit-btn {
  background: #ff8e53;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  margin-top: 1rem;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.submit-btn:hover::before {
  left: 100%;
}

.submit-btn:hover:not(:disabled) {
  background: #ff7a3d;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 142, 83, 0.3);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-icon {
  transition: transform 0.3s;
}

.submit-btn:hover:not(:disabled) .btn-icon {
  transform: translateX(4px);
}

.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Floating elements */
.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.float-element {
  position: absolute;
  color: rgba(0, 0, 0, 0.05);
  font-size: 2rem;
  animation: floatUpDown 6s infinite ease-in-out;
}

.element-1 {
  top: 20%;
  left: -50px;
  animation-delay: 0s;
}

.element-2 {
  top: 60%;
  right: -50px;
  animation-delay: 2s;
}

.element-3 {
  bottom: 20%;
  left: -30px;
  animation-delay: 4s;
}

@keyframes floatUpDown {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
}

/* Responsive */
@media (max-width: 640px) {
  .glass-card {
    padding: 2rem;
  }
  
  .welcome-text h1 {
    font-size: 1.5rem;
  }
  
  .time-display {
    display: none;
  }
  
  .floating-elements {
    display: none;
  }
}
</style>