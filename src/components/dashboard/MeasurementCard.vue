<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import { useI18n } from 'vue-i18n';

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

const hasData = computed(() => {
  return props.card.lastValue && props.card.lastValue !== '-' && props.card.lastValue !== null;
});
</script>

<template>
  <Card class="measurement-card" @click="handleClick">
    <template #content>
      <div class="card-content-design1">
        <div class="card-header-minimal">
          <div class="card-icon-minimal">
            <i :class="card.icon"></i>
          </div>
          <div class="card-info">
            <h3 class="card-title-minimal">{{ card.title }}</h3>
            <p class="card-description-minimal">{{ card.description }}</p>
          </div>
        </div>
        <div class="card-value-hero">
          <span v-if="hasData" class="value-hero">{{ card.lastValue }}</span>
          <div v-if="hasData" class="trend-minimal">
            <i :class="getTrendIcon(card.trend)" :style="{ color: getTrendColor(card.trend) }"></i>
            <span :style="{ color: getTrendColor(card.trend) }">{{ card.trendValue }}</span>
          </div>
          <div v-else class="no-data-section">
            <span class="no-data-text">{{ t('measurements.noData') }}</span>
            <div class="no-data-indicator">
              <i class="pi pi-info-circle"></i>
              <span>{{ t('measurements.noDataAvailable') }}</span>
            </div>
          </div>
        </div>
        <div class="card-action-minimal">
          <span class="action-text">{{ t('dashboard.viewDetails') || 'View Details' }}</span>
          <i class="pi pi-arrow-right action-arrow"></i>
        </div>
      </div>
    </template>
  </Card>
</template>

<!-- 
OTROS DISEÑOS DISPONIBLES:

======================================== 
DISEÑO 1 - Cards minimalistas con datos prominentes 
======================================== 
<Card class="measurement-card" @click="handleClick">
  <template #content>
    <div class="card-content-design1">
      <div class="card-header-minimal">
        <div class="card-icon-minimal">
          <i :class="card.icon"></i>
        </div>
        <div class="card-info">
          <h3 class="card-title-minimal">{{ card.title }}</h3>
          <p class="card-description-minimal">{{ card.description }}</p>
        </div>
      </div>
      <div class="card-value-hero">
        <span class="value-hero">{{ card.lastValue }}</span>
        <div class="trend-minimal">
          <i :class="getTrendIcon(card.trend)" :style="{ color: getTrendColor(card.trend) }"></i>
          <span :style="{ color: getTrendColor(card.trend) }">{{ card.trendValue }}</span>
        </div>
      </div>
      <div class="card-action-minimal">
        <span class="action-text">{{ t('dashboard.viewDetails') || 'View Details' }}</span>
        <i class="pi pi-arrow-right action-arrow"></i>
      </div>
    </div>
  </template>
</Card>

======================================== 
DISEÑO 3 - Cards tipo widget/métrica
======================================== 
<Card class="measurement-card measurement-card-design3" @click="handleClick">
  <template #content>
    <div class="card-content-design3">
      <div class="card-row-design3">
        <div class="info-section-design3">
          <i :class="card.icon" class="icon-design3"></i>
          <div class="text-content-design3">
            <h3 class="title-design3">{{ card.title }}</h3>
            <p class="subtitle-design3">Última medición</p>
          </div>
        </div>
        <div class="metrics-section-design3">
          <div class="current-value-design3">
            <span class="value-design3">{{ card.lastValue }}</span>
            <div class="trend-indicator-design3" :style="{ color: getTrendColor(card.trend) }">
              <i :class="getTrendIcon(card.trend)"></i>
              {{ card.trendValue }}
            </div>
          </div>
          <div class="action-hint-design3">
            <i class="pi pi-angle-right"></i>
          </div>
        </div>
      </div>
    </div>
  </template>
</Card>

======================================== 
DISEÑO 4 - Cards compactas estilo lista
======================================== 
<Card class="measurement-card measurement-card-design4" @click="handleClick">
  <template #content>
    <div class="card-content-design4">
      <div class="left-section-design4">
        <div class="icon-badge-design4">
          <i :class="card.icon"></i>
        </div>
        <div class="info-design4">
          <h3 class="title-design4">{{ card.title }}</h3>
          <div class="meta-info-design4">
            <span class="value-inline-design4">{{ card.lastValue }}</span>
            <span class="separator-design4">•</span>
            <span class="trend-inline-design4" :style="{ color: getTrendColor(card.trend) }">
              <i :class="getTrendIcon(card.trend)"></i>
              {{ card.trendValue }}
            </span>
          </div>
        </div>
      </div>
      <i class="pi pi-chevron-right arrow-design4"></i>
    </div>
  </template>
</Card>
-->

<style scoped>
/* ========================================
   DISEÑO 1 - Cards minimalistas con datos prominentes
   ======================================== */
.measurement-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--p-surface-border);
  height: 100%;
}

.measurement-card :deep(.p-card-body) {
  height: 100%;
  padding: 0;
}

.measurement-card :deep(.p-card-content) {
  height: 100%;
  padding: 0;
}

.measurement-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-content-design1 {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
  min-height: 280px;
}

.card-header-minimal {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.card-icon-minimal {
  width: 48px;
  height: 48px;
  border-radius: 0.75rem;
  background: var(--p-surface-100);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--p-primary-color);
  flex-shrink: 0;
}

.card-info {
  flex: 1;
}

.card-title-minimal {
  margin: 0 0 0.25rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--p-text-color);
  line-height: 1.4;
}

.card-description-minimal {
  margin: 0;
  font-size: 0.875rem;
  color: var(--p-text-muted-color);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.4em; /* Asegura espacio para 2 líneas */
}

.card-value-hero {
  text-align: center;
  padding: 1rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.value-hero {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--p-text-color);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.no-data-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
}

.no-data-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--p-text-muted-color);
  opacity: 0.7;
}

.no-data-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--p-text-muted-color);
  font-style: italic;
}

.no-data-indicator i {
  opacity: 0.6;
}

.trend-minimal {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.card-action-minimal {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--p-surface-border);
  color: var(--p-text-muted-color);
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.measurement-card:hover .card-action-minimal {
  color: var(--p-primary-color);
}

.action-text {
  font-weight: 500;
}

.action-arrow {
  font-size: 0.75rem;
  transition: transform 0.2s ease;
}

.measurement-card:hover .action-arrow {
  transform: translateX(4px);
}

/* Dark mode */
.app-dark .card-icon-minimal {
  background: var(--p-surface-800);
}

/* ========================================
   DISEÑO 2 - Header con valor grande
   ======================================== */
.measurement-card-design2 .card-content-design2 {
  padding: 0;
}

.card-header-design2 {
  padding: 1.25rem;
  background: var(--p-surface-50);
  border-bottom: 1px solid var(--p-surface-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.value-container-design2 {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}

.value-design2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--p-text-color);
  line-height: 1;
}

.trend-badge-design2 {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.trend-badge-design2.trend-up {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.trend-badge-design2.trend-down {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.trend-badge-design2.trend-stable {
  background: var(--p-surface-100);
  color: var(--p-text-muted-color);
}

.icon-container-design2 {
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--p-primary-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.card-info-design2 {
  padding: 1rem 1.25rem;
}

.title-design2 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--p-text-color);
  margin: 0 0 0.25rem 0;
}

.description-design2 {
  font-size: 0.875rem;
  color: var(--p-text-muted-color);
  margin: 0;
  line-height: 1.4;
}

/* Dark mode Design 2 */
.app-dark .card-header-design2 {
  background: var(--p-surface-800);
}

.app-dark .icon-container-design2 {
  background: var(--p-surface-900);
}

/* ========================================
   DISEÑO 3 - Widget horizontal
   ======================================== */
.measurement-card-design3 {
  padding: 0;
}

.card-content-design3 {
  padding: 1.25rem;
}

.card-row-design3 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.info-section-design3 {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.icon-design3 {
  font-size: 2rem;
  color: var(--p-primary-color);
  opacity: 0.8;
}

.text-content-design3 {
  flex: 1;
}

.title-design3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--p-text-color);
  margin: 0 0 0.125rem 0;
}

.subtitle-design3 {
  font-size: 0.75rem;
  color: var(--p-text-muted-color);
  margin: 0;
}

.metrics-section-design3 {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.current-value-design3 {
  text-align: right;
}

.value-design3 {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--p-text-color);
  line-height: 1;
}

.trend-indicator-design3 {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.25rem;
}

.action-hint-design3 {
  color: var(--p-text-muted-color);
  font-size: 1.25rem;
}

/* ========================================
   DISEÑO 4 - Lista compacta
   ======================================== */
.measurement-card-design4 {
  border-radius: 0.5rem;
}

.measurement-card-design4:hover {
  transform: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-content-design4 {
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-section-design4 {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.icon-badge-design4 {
  width: 36px;
  height: 36px;
  background: var(--p-primary-100);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  color: var(--p-primary-700);
}

.info-design4 {
  flex: 1;
}

.title-design4 {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--p-text-color);
  margin: 0 0 0.25rem 0;
}

.meta-info-design4 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.value-inline-design4 {
  font-weight: 600;
  color: var(--p-text-color);
}

.separator-design4 {
  color: var(--p-text-muted-color);
  opacity: 0.5;
}

.trend-inline-design4 {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 500;
}

.arrow-design4 {
  color: var(--p-text-muted-color);
  font-size: 0.875rem;
}

/* Dark mode Design 4 */
.app-dark .icon-badge-design4 {
  background: var(--p-primary-900);
  color: var(--p-primary-300);
}

/* ========================================
   DISEÑO 2 - Cards orientadas a datos (comentado)
   ======================================== */
/*
.card-header-data {
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  background: var(--p-surface-50);
  border-bottom: 1px solid var(--p-surface-border);
}

.value-primary {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.value-large {
  font-size: 2rem;
  font-weight: 700;
  color: var(--p-text-color);
}

.trend-secondary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.card-content-data {
  padding: 1rem 1.5rem 1.5rem 1.5rem;
}

.title-with-icon {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.title-icon {
  font-size: 1.25rem;
  color: var(--p-primary-color);
}

.card-title-data {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--p-text-color);
}

.card-description-data {
  margin: 0;
  font-size: 0.875rem;
  color: var(--p-text-muted-color);
}

.app-dark .card-header-data {
  background: var(--p-surface-800);
}
*/

/* Responsive */
@media (max-width: 768px) {
  .card-content-design1 {
    padding: 1rem;
    gap: 1rem;
  }

  .value-hero {
    font-size: 2rem;
  }

  .card-icon-minimal {
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
  }
}
</style>