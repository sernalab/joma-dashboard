<script setup>
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import Button from 'primevue/button';

const { t } = useI18n();
const router = useRouter();

defineProps({
  activities: {
    type: Array,
    required: true
  }
});

const viewAllActivities = () => {
  router.push('/dashboard/recent-activity');
};
</script>

<template>
  <div class="activity-section">
    <div class="section-header">
      <h2 class="section-title">{{ t("dashboard.recentActivity") }}</h2>
      <Button
        :label="t('common.viewAll')"
        icon="pi pi-arrow-right"
        iconPos="right"
        class="p-button-text p-button-sm view-all-btn"
        @click="viewAllActivities"
      />
    </div>

    <Card class="activity-card">
      <template #content>
        <div class="activity-list">
          <div
            v-for="(activity, index) in activities"
            :key="index"
            class="activity-item"
          >
            <div :class="['activity-icon', `activity-${activity.color}`]">
              <i :class="activity.icon"></i>
            </div>
            <div class="activity-content">
              <p class="activity-action">{{ activity.action }}</p>
              <p class="activity-type">{{ activity.type }}</p>
            </div>
            <span class="activity-time">{{ activity.time }}</span>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
/* Activity Section */
.activity-section {
  margin-top: 3rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--p-text-color);
  margin: 0;
}

.activity-card {
  border: 1px solid var(--p-surface-border);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.activity-success {
  background: #d1fae5;
  color: #10b981;
}

.activity-info {
  background: #dbeafe;
  color: #3b82f6;
}

.activity-warning {
  background: #f59e0b;
  color: white;
}

.activity-content {
  flex: 1;
}

.activity-action {
  font-weight: 600;
  color: var(--p-text-color);
  margin: 0 0 0.25rem 0;
}

.activity-type {
  color: var(--p-text-muted-color);
  font-size: 0.875rem;
  margin: 0;
}

.activity-time {
  color: var(--p-text-muted-color);
  font-size: 0.875rem;
}

.view-all-btn {
  color: var(--p-primary-color) !important;
}

.app-dark .view-all-btn {
  color: var(--p-primary-400) !important;
}

/* Dark mode activity colors */
.app-dark .activity-success {
  background: rgba(16, 185, 129, 0.2);
  color: #6ee7b7;
}

.app-dark .activity-info {
  background: rgba(59, 130, 246, 0.2);
  color: #93bbfc;
}

.app-dark .activity-warning {
  background: rgba(245, 158, 11, 0.2);
  color: #fcd34d;
}

/* Responsive */
@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .activity-list {
    gap: 1rem;
  }

  .activity-item {
    flex-wrap: wrap;
  }

  .activity-time {
    width: 100%;
    margin-top: 0.5rem;
  }
}
</style>