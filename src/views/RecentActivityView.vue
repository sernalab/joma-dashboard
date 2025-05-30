<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';

const { t } = useI18n();
const router = useRouter();

// Filtros
const filterType = ref('all');
const filterDate = ref(null);
const searchQuery = ref('');

// Tipos de actividad para el filtro
const activityTypes = computed(() => [
  { label: t('activity.allActivities'), value: 'all' },
  { label: t('activity.measurements'), value: 'measurement' },
  { label: t('activity.reports'), value: 'report' },
  { label: t('activity.diagnostics'), value: 'diagnostic' },
  { label: t('activity.alerts'), value: 'alert' }
]);

// Datos de ejemplo expandidos
const allActivities = ref([
  {
    id: 1,
    type: 'measurement',
    action: 'Medición de presión de aceite',
    description: 'Ford Focus - ABC 1234',
    value: '3.5 bar',
    status: 'normal',
    icon: 'pi pi-chart-line',
    color: 'success',
    time: '10:30',
    date: new Date()
  },
  {
    id: 2,
    type: 'report',
    action: 'Informe generado',
    description: 'Cliente: Juan Pérez - VW Golf',
    icon: 'pi pi-file-pdf',
    color: 'info',
    time: '09:45',
    date: new Date()
  },
  {
    id: 3,
    type: 'alert',
    action: 'Presión baja detectada',
    description: 'Sistema de combustible - Seat León',
    value: '1.8 bar',
    status: 'warning',
    icon: 'pi pi-exclamation-triangle',
    color: 'warning',
    time: '09:15',
    date: new Date()
  },
  {
    id: 4,
    type: 'diagnostic',
    action: 'Diagnóstico completo',
    description: 'Mercedes C220 - XYZ 5678',
    status: '8/10 sistemas OK',
    icon: 'pi pi-check-circle',
    color: 'success',
    time: '08:30',
    date: new Date(Date.now() - 86400000) // Ayer
  },
  {
    id: 5,
    type: 'measurement',
    action: 'Compresión de cilindros',
    description: 'BMW 320d - DEF 9012',
    value: 'Cilindro 3: Baja',
    status: 'critical',
    icon: 'pi pi-chart-bar',
    color: 'danger',
    time: '17:20',
    date: new Date(Date.now() - 86400000)
  },
  {
    id: 6,
    type: 'measurement',
    action: 'Presión de turbo',
    description: 'Audi A4 - GHI 3456',
    value: '1.2 bar',
    status: 'normal',
    icon: 'pi pi-chart-line',
    color: 'success',
    time: '16:45',
    date: new Date(Date.now() - 86400000)
  },
  {
    id: 7,
    type: 'report',
    action: 'Informe de mantenimiento',
    description: 'Flota empresa TransLogic',
    icon: 'pi pi-file-pdf',
    color: 'info',
    time: '15:30',
    date: new Date(Date.now() - 172800000) // Hace 2 días
  },
  {
    id: 8,
    type: 'alert',
    action: 'DPF necesita regeneración',
    description: 'Peugeot 308 - JKL 7890',
    status: 'urgent',
    icon: 'pi pi-exclamation-circle',
    color: 'danger',
    time: '14:00',
    date: new Date(Date.now() - 172800000)
  }
]);

// Agrupar actividades por fecha
const groupedActivities = computed(() => {
  // Filtrar actividades
  let filtered = allActivities.value;
  
  if (filterType.value !== 'all') {
    filtered = filtered.filter(activity => activity.type === filterType.value);
  }
  
  if (filterDate.value) {
    filtered = filtered.filter(activity => {
      const activityDate = new Date(activity.date);
      const filterDay = new Date(filterDate.value);
      return activityDate.toDateString() === filterDay.toDateString();
    });
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(activity => 
      activity.action.toLowerCase().includes(query) ||
      activity.description.toLowerCase().includes(query)
    );
  }

  // Agrupar por fecha
  const groups = {};
  filtered.forEach(activity => {
    const dateKey = formatDateGroup(activity.date);
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(activity);
  });

  return groups;
});

// Formatear fecha para agrupación
const formatDateGroup = (date) => {
  const today = new Date();
  const activityDate = new Date(date);
  
  // Resetear horas para comparar solo fechas
  today.setHours(0, 0, 0, 0);
  activityDate.setHours(0, 0, 0, 0);
  
  const diffTime = today - activityDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return t('activity.today');
  if (diffDays === 1) return t('activity.yesterday');
  if (diffDays < 7) return t('activity.daysAgo', { days: diffDays });
  
  return activityDate.toLocaleDateString(t('common.locale') || 'es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const goBack = () => {
  router.push('/dashboard');
};

// Obtener color de severidad para los estados
const getSeverityColor = (status) => {
  switch (status) {
    case 'normal': return 'success';
    case 'warning': return 'warning';
    case 'critical': return 'danger';
    case 'urgent': return 'danger';
    default: return 'info';
  }
};
</script>

<template>
  <div class="recent-activity-view">
    <div class="page-header">
      <div class="header-content">
        <Button
          icon="pi pi-arrow-left"
          class="p-button-text p-button-rounded back-btn"
          @click="goBack"
        />
        <div>
          <h1 class="page-title">{{ t("dashboard.recentActivity") }}</h1>
          <p class="page-subtitle">{{ t('activity.completeHistory') }}</p>
        </div>
      </div>
      
      <div class="header-filters">
        <span class="p-input-icon-left search-wrapper">
          <i class="pi pi-search" />
          <InputText 
            v-model="searchQuery" 
            :placeholder="t('common.search')" 
            class="search-input"
          />
        </span>
        <Dropdown 
          v-model="filterType" 
          :options="activityTypes" 
          optionLabel="label" 
          optionValue="value"
          :placeholder="t('activity.typeFilter')"
          class="filter-dropdown"
        />
        <Calendar 
          v-model="filterDate" 
          :placeholder="t('common.selectDate')"
          dateFormat="dd/mm/yy"
          showIcon
          class="filter-calendar"
        />
      </div>
    </div>

    <div class="activity-timeline">
      <div v-for="(activities, dateGroup) in groupedActivities" :key="dateGroup" class="date-group">
        <div class="date-header">
          <h3 class="date-title">{{ dateGroup }}</h3>
          <span class="activity-count">{{ t('activity.activitiesCount', { count: activities.length }) }}</span>
        </div>
        
        <div class="activities-grid">
          <div v-for="activity in activities" :key="activity.id" class="activity-item">
            <div :class="['activity-icon', `activity-${activity.color}`]">
              <i :class="activity.icon"></i>
            </div>
            <div class="activity-content">
              <div class="activity-main">
                <h4 class="activity-title">{{ activity.action }}</h4>
                <p class="activity-description">{{ activity.description }}</p>
              </div>
              <div class="activity-meta">
                <span v-if="activity.value" class="activity-value">{{ activity.value }}</span>
                <span v-if="activity.status" :class="['activity-status', `status-${getSeverityColor(activity.status)}`]">
                  {{ activity.status }}
                </span>
              </div>
            </div>
            <span class="activity-time">{{ activity.time }}</span>
          </div>
        </div>
      </div>
      
      <div v-if="Object.keys(groupedActivities).length === 0" class="empty-state">
        <i class="pi pi-inbox empty-icon"></i>
        <h3>{{ t('activity.noActivitiesFound') }}</h3>
        <p>{{ t('activity.adjustFilters') }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recent-activity-view {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* Header */
.page-header {
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.back-btn {
  color: var(--p-text-muted-color);
}

.back-btn:hover {
  background: var(--p-surface-100);
  color: var(--p-text-color);
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: var(--p-text-color);
}

.page-subtitle {
  color: var(--p-text-muted-color);
  margin: 0.25rem 0 0 0;
}

/* Filters */
.header-filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.search-wrapper {
  flex: 1;
  min-width: 250px;
  position: relative;
}

.search-wrapper :deep(.pi-search) {
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--p-text-muted-color);
  font-size: 1rem;
}

.search-input {
  width: 100%;
  height: 2.5rem;
  padding-left: 2.5rem;
}

.search-input :deep(.p-inputtext) {
  height: 2.5rem;
  padding-left: 2.5rem;
}

.filter-dropdown,
.filter-calendar {
  min-width: 180px;
  height: 2.5rem;
}

.filter-dropdown :deep(.p-dropdown),
.filter-calendar :deep(.p-calendar) {
  height: 2.5rem;
}

.filter-dropdown :deep(.p-dropdown .p-inputtext),
.filter-calendar :deep(.p-calendar .p-inputtext) {
  height: 2.5rem;
  padding: 0.5rem 0.75rem;
}

/* Timeline */
.activity-timeline {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.date-group {
  position: relative;
}

.date-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--p-surface-border);
}

.date-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--p-text-color);
  margin: 0;
}

.activity-count {
  color: var(--p-text-muted-color);
  font-size: 0.875rem;
}

/* Activities List - Diseño minimalista tipo lista */
.activities-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--p-surface-0);
  border: 1px solid var(--p-surface-border);
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.activity-item:hover {
  background: var(--p-surface-50);
  border-color: var(--p-primary-color);
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  background: var(--p-surface-100);
  color: var(--p-text-muted-color);
}

/* Iconos con color sutil basado en tipo */
.activity-success .activity-icon {
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.activity-info .activity-icon {
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}

.activity-warning .activity-icon {
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
}

.activity-danger .activity-icon {
  color: #dc2626;
  background: rgba(220, 38, 38, 0.1);
}

.activity-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.activity-main {
  flex: 1;
}

.activity-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: var(--p-text-color);
}

.activity-description {
  color: var(--p-text-muted-color);
  font-size: 0.875rem;
  margin: 0;
}

.activity-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.activity-value {
  font-weight: 600;
  color: var(--p-text-color);
  font-size: 0.875rem;
}

.activity-status {
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.status-success {
  color: #10b981;
}

.status-warning {
  color: #f59e0b;
}

.status-danger {
  color: #dc2626;
}

.status-info {
  color: #3b82f6;
}

.activity-time {
  color: var(--p-text-muted-color);
  font-size: 0.875rem;
  white-space: nowrap;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--p-text-muted-color);
}

.empty-icon {
  font-size: 4rem;
  opacity: 0.3;
  margin-bottom: 1rem;
}

.empty-state h3 {
  color: var(--p-text-color);
  margin: 1rem 0 0.5rem 0;
}

.empty-state p {
  margin: 0;
}

/* Dark mode */
.app-dark .activity-item {
  background: var(--p-surface-900);
  border-color: var(--p-surface-800);
}

.app-dark .activity-item:hover {
  background: var(--p-surface-800);
}

.app-dark .activity-icon {
  background: var(--p-surface-800);
}

.app-dark .activity-success .activity-icon {
  color: #6ee7b7;
  background: rgba(16, 185, 129, 0.15);
}

.app-dark .activity-info .activity-icon {
  color: #93bbfc;
  background: rgba(59, 130, 246, 0.15);
}

.app-dark .activity-warning .activity-icon {
  color: #fcd34d;
  background: rgba(245, 158, 11, 0.15);
}

.app-dark .activity-danger .activity-icon {
  color: #fca5a5;
  background: rgba(220, 38, 38, 0.15);
}

/* Responsive */
@media (max-width: 768px) {
  .recent-activity-view {
    padding: 1rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .header-filters {
    flex-direction: column;
  }

  .search-wrapper,
  .filter-dropdown,
  .filter-calendar {
    width: 100%;
  }

  .activity-item {
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  .activity-content {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  
  .activity-meta {
    margin-top: 0.5rem;
  }
  
  .activity-time {
    width: 100%;
    text-align: right;
    font-size: 0.75rem;
  }
}
</style>