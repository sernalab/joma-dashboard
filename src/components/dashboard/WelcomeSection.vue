<script setup>
import { useI18n } from 'vue-i18n';

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
        {{ userName }}!
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
        class="quick-action-btn"
      />
    </div>
  </div>
</template>

<style scoped>
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


/* Botones de acción rápida - Versión con borde visible */
.quick-action-btn {
  background: white !important;
  border: 2px solid var(--p-primary-color) !important;
  color: var(--p-primary-color) !important;
  font-weight: 500;
  transition: all 0.2s ease;
  padding: 0.5rem 1rem;
}

.quick-action-btn:hover {
  background: var(--p-primary-color) !important;
  border-color: var(--p-primary-color) !important;
  color: white !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.quick-action-btn:active {
  transform: translateY(0);
}

.quick-action-btn .p-button-icon {
  font-size: 1rem;
}

/* Force text color on button label */
.quick-action-btn :deep(.p-button-label) {
  color: var(--p-primary-color) !important;
}

.quick-action-btn:hover :deep(.p-button-label) {
  color: white !important;
}

/* Dark mode buttons */
.app-dark .quick-action-btn {
  background: var(--p-surface-900) !important;
  border-color: var(--p-primary-color) !important;
  color: var(--p-primary-color) !important;
}

.app-dark .quick-action-btn :deep(.p-button-label) {
  color: var(--p-primary-color) !important;
}

.app-dark .quick-action-btn:hover {
  background: var(--p-primary-color) !important;
  border-color: var(--p-primary-color) !important;
  color: white !important;
}

.app-dark .quick-action-btn:hover :deep(.p-button-label) {
  color: white !important;
}

.app-dark .welcome-section {
  background: var(--p-surface-900);
  border-color: var(--p-surface-800);
  border-left-color: var(--p-primary-color);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
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

.quick-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
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