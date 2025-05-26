<script setup>
import { defineProps, defineEmits } from 'vue';
import Button from 'primevue/button';
import Badge from 'primevue/badge';

const emit = defineEmits(['toggle', 'navigate']);

defineProps({
  sidebarVisible: {
    type: Boolean,
    required: true
  },
  menuItems: {
    type: Array,
    required: true
  },
  isMobile: {
    type: Boolean,
    default: false
  },
  logo: {
    type: String,
    default: '/src/assets/beta-logo.png'
  }
});

const isActiveRoute = (route) => {
  return window.location.pathname === route;
};

const navigateTo = (route) => {
  emit('navigate', route);
};

const toggleSidebar = () => {
  emit('toggle');
};
</script>

<template>
  <aside :class="['sidebar', { 'sidebar-visible': sidebarVisible }]">
    <div class="sidebar-header">
      <img :src="logo" alt="Beta" class="logo" />
      <Button
        v-if="isMobile"
        icon="pi pi-times"
        @click="toggleSidebar"
        class="p-button-text p-button-plain sidebar-close"
      />
    </div>

    <nav class="sidebar-nav">
      <template v-for="item in menuItems" :key="item.label">
        <!-- Items con subitems -->
        <div v-if="item.items" class="nav-group">
          <div class="nav-group-label">
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </div>
          <div class="nav-group-items">
            <a
              v-for="subItem in item.items"
              :key="subItem.label"
              :class="['nav-item', { active: isActiveRoute(subItem.route) }]"
              @click="navigateTo(subItem.route)"
            >
              <i :class="subItem.icon"></i>
              <span>{{ subItem.label }}</span>
            </a>
          </div>
        </div>

        <!-- Items sin subitems -->
        <a
          v-else
          :class="['nav-item', { active: isActiveRoute(item.route), special: item.special }]"
          @click="navigateTo(item.route)"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
          <Badge v-if="item.badge" :value="item.badge" severity="success" class="nav-badge" />
        </a>
      </template>
    </nav>
  </aside>
</template>

<style scoped>
/* Sidebar */
.sidebar {
  width: var(--sidebar-width);
  background: var(--p-surface-0);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  border-right: 1px solid var(--p-surface-border);
  display: flex;
  flex-direction: column;
  z-index: 999;
  transition: transform 0.3s ease;
}

.sidebar-header {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--p-surface-border);
}

.logo {
  height: 40px;
  width: auto;
}

.sidebar-close {
  color: var(--p-text-muted-color);
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
}

/* Hide scrollbar but keep functionality */
.sidebar-nav::-webkit-scrollbar {
  width: 6px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: var(--p-surface-400);
  border-radius: 3px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: var(--p-surface-500);
}

.nav-group {
  margin-bottom: 1rem;
}

.nav-group-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: var(--p-text-muted-color);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
}

.nav-group-items {
  margin-top: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: var(--p-text-color);
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
}

.nav-group-items .nav-item {
  padding-left: 3.5rem;
}

.nav-item:hover {
  background: var(--p-surface-100);
  color: var(--p-primary-color);
}

.nav-item.active {
  background: var(--p-primary-100);
  color: var(--p-primary-700);
  font-weight: 600;
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--p-primary-color);
}

/* Special nav item (Reports) */
.nav-item.special {
  background: linear-gradient(135deg, var(--p-primary-50) 0%, var(--p-primary-100) 100%);
  border: 1px solid var(--p-primary-200);
  border-radius: 0.5rem;
  margin: 0.25rem 0.75rem;
  padding: 0.875rem 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.nav-item.special::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--p-primary-400), var(--p-primary-600));
}

.nav-item.special:hover {
  background: linear-gradient(135deg, var(--p-primary-100) 0%, var(--p-primary-200) 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.nav-item.special .nav-badge {
  background: var(--p-primary-color);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  margin-left: auto;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

/* Dark mode */
.app-dark .sidebar {
  background: var(--p-surface-900);
  border-right-color: var(--p-surface-800);
}

.app-dark .nav-item:hover {
  background: var(--p-surface-800);
}

.app-dark .nav-item.active {
  background: var(--p-primary-900);
  color: var(--p-primary-300);
}

/* Dark mode special item */
.app-dark .nav-item.special {
  background: linear-gradient(135deg, var(--p-primary-950) 0%, var(--p-primary-900) 100%);
  border-color: var(--p-primary-700);
}

.app-dark .nav-item.special:hover {
  background: linear-gradient(135deg, var(--p-primary-900) 0%, var(--p-primary-800) 100%);
}

.app-dark .nav-item.special::before {
  background: linear-gradient(90deg, var(--p-primary-500), var(--p-primary-400));
}

/* Mobile */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar-visible {
    transform: translateX(0);
  }
}

</style>