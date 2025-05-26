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
/* Welcome Section */
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

/* Dark mode welcome section - darker gradient */
.app-dark .welcome-section {
  background: linear-gradient(135deg, #4c1d95 0%, #5b21b6 100%);
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