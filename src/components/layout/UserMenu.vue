<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const emit = defineEmits(['toggle-menu']);
const userMenuRef = ref(null);

defineProps({
  user: {
    type: Object,
    required: true
  },
  menuItems: {
    type: Array,
    required: true
  },
  isMobile: {
    type: Boolean,
    default: false
  }
});

const toggleUserMenu = (event) => {
  userMenuRef.value.toggle(event);
  emit('toggle-menu', event);
};
</script>

<template>
  <div class="user-section" @click="toggleUserMenu">
    <Avatar 
      :label="user?.name?.charAt(0) || user?.id?.charAt(0) || 'U'"
      shape="circle"
      class="user-avatar"
    />
    <span v-if="!isMobile" class="user-name">
      {{ user?.name || user?.id || 'Usuario' }}
    </span>
    <i class="pi pi-chevron-down" style="font-size: 0.875rem"></i>
  </div>
  
  <Menu 
    ref="userMenuRef" 
    :model="menuItems"
    :popup="true"
    :pt="{
      root: { class: 'user-menu' }
    }"
  />
</template>

<style scoped>
.user-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.user-section:hover {
  background: var(--p-surface-100);
}

.user-avatar {
  background: #ff8e53;
  color: white;
}

.user-name {
  font-weight: 600;
  color: var(--p-text-color);
}

/* Dark mode */
.app-dark .user-section:hover {
  background: var(--p-surface-800);
}

/* Mobile */
@media (max-width: 768px) {
  .user-name {
    display: none;
  }
}
</style>

<style>
/* Global styles for the menu */
.user-menu {
  min-width: 200px;
}

.user-menu .p-submenu-list {
  min-width: 180px;
}
</style>