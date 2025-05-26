<script setup>
import { defineProps, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';
import Card from 'primevue/card';
import Button from 'primevue/button';

const { t } = useI18n();
const emit = defineEmits(['click']);

const props = defineProps({
  card: {
    type: Object,
    required: true
  }
});

const getTrendIcon = (trend) => {
  switch (trend) {
    case "up":
      return "pi pi-arrow-up";
    case "down":
      return "pi pi-arrow-down";
    default:
      return "pi pi-minus";
  }
};

const getTrendColor = (trend) => {
  switch (trend) {
    case "up":
      return "#10b981";
    case "down":
      return "#ef4444";
    default:
      return "#6b7280";
  }
};

const getColorClass = (card) => {
  // Map card colors to color classes
  const colorMap = {
    "#3b82f6": "blue",
    "#10b981": "green", 
    "#f59e0b": "orange",
    "#6366f1": "purple",
    "#ef4444": "red"
  };
  return colorMap[card.color] || "blue";
};

const handleClick = () => {
  emit('click', props.card.route);
};
</script>

<template>
  <Card
    class="measurement-card"
    @click="handleClick"
  >
    <template #header>
      <div :class="['card-header', `card-header-${getColorClass(card)}`]">
        <div class="card-icon">
          <i :class="card.icon"></i>
        </div>
        <div class="card-trend">
          <i
            :class="getTrendIcon(card.trend)"
            :style="{ color: getTrendColor(card.trend) }"
          ></i>
          <span :style="{ color: getTrendColor(card.trend) }">
            {{ card.trendValue }}
          </span>
        </div>
      </div>
    </template>

    <template #title>
      <h3 class="card-title">{{ card.title }}</h3>
    </template>

    <template #subtitle>
      <p class="card-description">{{ card.description }}</p>
    </template>

    <template #content>
      <div class="card-value">
        <span class="value-label">Last reading:</span>
        <span class="value-number">{{ card.lastValue }}</span>
      </div>
    </template>

    <template #footer>
      <Button
        :label="t('dashboard.viewDetails') || 'View Details'"
        icon="pi pi-arrow-right"
        iconPos="right"
        class="p-button-text p-button-sm w-full card-action-btn"
      />
    </template>
  </Card>
</template>

<style scoped>
.measurement-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--p-surface-border);
}

.measurement-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem 0.5rem 0 0;
}

/* Card header color classes */
.card-header-blue {
  background-color: var(--color-blue-bg);
  color: var(--color-blue-text);
}

.card-header-green {
  background-color: var(--color-green-bg);
  color: var(--color-green-text);
}

.card-header-orange {
  background-color: var(--color-orange-bg);
  color: var(--color-orange-text);
}

.card-header-purple {
  background-color: var(--color-purple-bg);
  color: var(--color-purple-text);
}

.card-header-red {
  background-color: var(--color-red-bg);
  color: var(--color-red-text);
}

.card-icon {
  font-size: 2.5rem;
  color: inherit;
}

.card-trend {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.card-title {
  margin: 0;
  font-size: 1.25rem;
  color: var(--p-text-color);
}

.card-description {
  color: var(--p-text-muted-color);
  margin: 0.5rem 0 0 0;
  font-size: 0.875rem;
}

.card-value {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 1rem;
}

.value-label {
  color: var(--p-text-muted-color);
  font-size: 0.875rem;
}

.value-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--p-text-color);
}

.card-action-btn {
  color: var(--p-primary-color) !important;
}

.app-dark .card-action-btn {
  color: var(--p-primary-400) !important;
}

/* Responsive */
@media (max-width: 768px) {
  .card-header {
    padding: 1rem;
  }

  .card-icon {
    font-size: 2rem;
  }

  .card-title {
    font-size: 1.125rem;
  }

  .value-number {
    font-size: 1.25rem;
  }
}
</style>