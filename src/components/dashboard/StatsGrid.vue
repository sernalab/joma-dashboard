<script setup>
import { defineProps } from 'vue';
import Badge from 'primevue/badge';

defineProps({
  stats: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="stats-grid">
    <div v-for="stat in stats" :key="stat.label" class="stat-card">
      <div
        :class="['stat-icon', `stat-icon-${stat.colorClass || 'blue'}`]"
      >
        <i :class="stat.icon"></i>
      </div>
      <div class="stat-content">
        <p class="stat-label">{{ stat.label }}</p>
        <div class="stat-value-row">
          <h3 class="stat-value">{{ stat.value }}</h3>
          <Badge
            :value="stat.change"
            :severity="stat.change.startsWith('+') ? 'success' : 'danger'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: var(--p-surface-0);
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--p-surface-border);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

/* Stat icon color classes */
.stat-icon-blue {
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.stat-icon-green {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.stat-icon-orange {
  background-color: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.stat-icon-red {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

/* Dark mode stat icon colors */
.app-dark .stat-icon-blue {
  background-color: rgba(59, 130, 246, 0.2);
  color: #93bbfc;
}

.app-dark .stat-icon-green {
  background-color: rgba(16, 185, 129, 0.2);
  color: #6ee7b7;
}

.app-dark .stat-icon-orange {
  background-color: rgba(245, 158, 11, 0.2);
  color: #fcd34d;
}

.app-dark .stat-icon-red {
  background-color: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
}

.stat-content {
  flex: 1;
}

.stat-label {
  color: var(--p-text-muted-color);
  font-size: 0.875rem;
  margin: 0 0 0.5rem 0;
}

.stat-value-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--p-text-color);
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .stat-card {
    padding: 1rem;
  }

  .stat-value {
    font-size: 1.5rem;
  }
}
</style>