<script setup>
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import Button from 'primevue/button';

const { t } = useI18n();

defineProps({
  userName: {
    type: String,
    required: true
  },
  quickActions: {
    type: Array,
    default: () => []
  }
});
</script>

<template>
  <div class="welcome-section">
    <div class="welcome-content">
      <h1 class="welcome-title">
        {{ t("dashboard.welcome") }},
        {{ userName }}! 👋
      </h1>
      <p class="welcome-subtitle">
        {{ t("dashboard.subtitle") }}
      </p>
    </div>
    <div class="quick-actions">
      <Button
        v-for="action in quickActions"
        :key="action.label"
        :label="action.label"
        :icon="action.icon"
        @click="action.command"
        class="p-button-outlined quick-action-btn"
      />
    </div>
  </div>
</template>

<style scoped>
/* ========================================
   BLOQUE 1 - Welcome Section (Azul-Púrpura)
   Tu favorito - Gradiente azul a púrpura
   ======================================== */
/*
.welcome-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 1rem;
  padding: 2rem;
  color: white;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.app-dark .welcome-section {
  background: linear-gradient(135deg, #4c1d95 0%, #5b21b6 100%);
}
*/

/* ========================================
   BLOQUE 2 - Welcome Section (Naranja Vibrante)
   Alternativa con tema naranja corporativo
   ======================================== */
/*
.welcome-section {
  background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);
  border-radius: 1rem;
  padding: 2rem;
  color: white;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  position: relative;
  overflow: hidden;
}

.welcome-section::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transform: translate(50%, -50%);
}

.welcome-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 150px;
  height: 150px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  transform: translate(-50%, 50%);
}

.app-dark .welcome-section {
  background: linear-gradient(135deg, #c2410c 0%, #92400e 100%);
  box-shadow: 0 8px 32px rgba(245, 158, 11, 0.3);
}
*/

/* ========================================
   BLOQUE 3 - Welcome Section (Minimalista)
   Diseño limpio y elegante
   ======================================== */
.welcome-section {
  background: var(--p-surface-0);
  border: 1px solid var(--p-surface-border);
  border-left: 4px solid var(--p-primary-color);
  border-radius: 0.75rem;
  padding: 2rem;
  color: var(--p-text-color);
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.welcome-title {
  color: var(--p-text-color);
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
}

.welcome-subtitle {
  color: var(--p-text-muted-color);
  font-size: 1.125rem;
  opacity: 1;
  margin: 0;
}

.quick-action-btn {
  background: var(--p-primary-color);
  border-color: var(--p-primary-color);
  color: white !important;
}

.quick-action-btn:hover {
  background: var(--p-primary-600);
  border-color: var(--p-primary-600);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.app-dark .welcome-section {
  background: var(--p-surface-900);
  border-color: var(--p-surface-800);
  border-left-color: var(--p-primary-color);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.welcome-title {
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
}

.welcome-subtitle {
  font-size: 1.125rem;
  opacity: 0.9;
  margin: 0;
}

.quick-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.quick-action-btn {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  color: white !important;
}

.quick-action-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.6);
  color: white !important;
}

/* Responsive */
@media (max-width: 768px) {
  .welcome-section {
    padding: 1.5rem;
  }

  .welcome-title {
    font-size: 1.5rem;
  }

  .welcome-subtitle {
    font-size: 1rem;
  }

  .quick-actions {
    width: 100%;
  }

  .quick-action-btn {
    flex: 1;
    min-width: 120px;
  }
}
</style>