<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Button from 'primevue/button';

const { t } = useI18n();
const router = useRouter();
const countdown = ref(10);
let countdownInterval = null;

// Auto-redirect después de 10 segundos
onMounted(() => {
  countdownInterval = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(countdownInterval);
      router.push('/dashboard');
    }
  }, 1000);
});

// Limpiar el interval al desmontar
onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});

const goToDashboard = () => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  router.push('/dashboard');
};

const goBack = () => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  router.go(-1);
};
</script>

<template>
  <div class="not-found-container">
    <div class="content-wrapper">
      <div class="error-code">404</div>
      <h1 class="error-title">{{ t('errors.pageNotFound') }}</h1>
      <p class="error-description">
        {{ t('errors.pageNotFoundDescription') }}
      </p>
      
      <div class="countdown-message">
        {{ t('errors.redirectingIn', { seconds: countdown }) }}
      </div>

      <div class="action-buttons">
        <Button
          :label="t('common.goToDashboard')"
          icon="pi pi-home"
          @click="goToDashboard"
          severity="primary"
        />
      </div>

      <div class="decorative-element"></div>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  position: relative;
  overflow: hidden;
}

.content-wrapper {
  text-align: center;
  z-index: 1;
  position: relative;
  padding: 2rem;
  max-width: 600px;
}

.error-code {
  font-size: 10rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ff8e53 0%, #ffce54 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: -2rem;
  font-family: 'Roboto', sans-serif;
  opacity: 0.3;
}

.error-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 600;
}

.error-description {
  font-size: 1.25rem;
  color: #6c757d;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.countdown-message {
  font-size: 1rem;
  color: #495057;
  margin-bottom: 2rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 142, 83, 0.1);
  border: 1px solid rgba(255, 142, 83, 0.2);
  border-radius: 50px;
  display: inline-block;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.action-buttons :deep(.p-button) {
  min-width: 150px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.action-buttons :deep(.p-button:hover) {
  transform: translateY(-2px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.decorative-element {
  position: absolute;
  width: 800px;
  height: 800px;
  background: linear-gradient(135deg, rgba(255, 142, 83, 0.08) 0%, rgba(255, 206, 84, 0.08) 100%);
  border-radius: 50%;
  top: -400px;
  right: -400px;
  pointer-events: none;
}

.decorative-element::before {
  content: '';
  position: absolute;
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, rgba(255, 170, 0, 0.06) 0%, rgba(255, 206, 84, 0.06) 100%);
  border-radius: 50%;
  bottom: -200px;
  left: -500px;
}

@media (max-width: 768px) {
  .error-code {
    font-size: 6rem;
  }
  
  .error-title {
    font-size: 1.75rem;
  }
  
  .error-description {
    font-size: 1rem;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .action-buttons :deep(.p-button) {
    width: 100%;
    max-width: 250px;
  }
}
</style>