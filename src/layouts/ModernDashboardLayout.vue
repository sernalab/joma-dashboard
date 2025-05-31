<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { authService } from "@/services/auth.service";
import { languageService } from "@/services/language.service";
import Button from "primevue/button";
import logoUrl from "@/assets/beta-logo.png";

// Import new components
import AppSidebar from "@/components/layout/AppSidebar.vue";
import UserMenu from "@/components/layout/UserMenu.vue";

const { t, locale } = useI18n();
const router = useRouter();

// Estado reactivo
const sidebarVisible = ref(false);
const currentUser = ref(authService.getCurrentUser());
const isMobile = ref(window.innerWidth < 768);
const darkMode = ref(localStorage.getItem("darkMode") === "true");

// Elementos del menú principal
const menuItems = [
  {
    label: t("menu.home"),
    icon: "pi pi-home",
    route: "/dashboard",
    badge: null,
  },
  {
    label: t("measurements.title"),
    icon: "pi pi-chart-line",
    route: "/dashboard/all-measurements",
    items: [
      {
        label: t("selectionView.manometer.title"),
        icon: "pi pi-gauge",
        route: "/dashboard/manometer",
      },
      {
        label: t("selectionView.vacuum.title"),
        icon: "pi pi-circle",
        route: "/dashboard/vacuum",
      },
      {
        label: t("selectionView.oilPressure.title"),
        icon: "pi pi-filter",
        route: "/dashboard/oil-pressure",
      },
      {
        label: t("selectionView.fuelPressure.title"),
        icon: "pi pi-bolt",
        route: "/dashboard/fuel-pressure",
      },
      {
        label: t("selectionView.commonRail.title"),
        icon: "pi pi-server",
        route: "/dashboard/common-rail",
      },
      {
        label: t("selectionView.compression.title"),
        icon: "pi pi-chart-bar",
        route: "/dashboard/compression",
      },
      {
        label: t("selectionView.turboPressure.title"),
        icon: "pi pi-sync",
        route: "/dashboard/turbo-pressure",
      },
      {
        label: t("selectionView.brakePressure.title"),
        icon: "pi pi-stop-circle",
        route: "/dashboard/brake-pressure",
      },
      {
        label: t("selectionView.dpfPressure.title"),
        icon: "pi pi-filter-fill",
        route: "/dashboard/dpf-pressure",
      },
      {
        label: t("selectionView.adbluePressure.title"),
        icon: "pi pi-box",
        route: "/dashboard/adblue-pressure",
      },
    ],
  },
  {
    label: t("menu.printReports"),
    icon: "pi pi-file-pdf",
    route: "/dashboard/print-client-report",
    special: true,
  },
];

// Funciones
const handleLogout = () => {
  authService.logout();
};

const changeLanguage = (lang) => {
  languageService.setLanguage(lang);
  locale.value = lang;
  window.location.reload();
};

// Opciones del menú de usuario
const userMenuItems = computed(() => [
  {
    label: currentUser.value?.name || currentUser.value?.id,
    items: [
      {
        label: t("menu.settings"),
        icon: "pi pi-cog",
        command: () => {
          // Navegación a configuración
        },
      },
      {
        label: t("common.language"),
        icon: "pi pi-globe",
        items: [
          { label: "Español", command: () => changeLanguage("es") },
          { label: "English", command: () => changeLanguage("en") },
          { label: "Italiano", command: () => changeLanguage("it") },
          { label: "Français", command: () => changeLanguage("fr") },
          { label: "Deutsch", command: () => changeLanguage("de") },
        ],
      },
      {
        label: t("common.darkMode"),
        icon: darkMode.value ? "pi pi-sun" : "pi pi-moon",
        command: toggleDarkMode,
      },
      { separator: true },
      {
        label: t("common.logout"),
        icon: "pi pi-sign-out",
        command: handleLogout,
      },
    ],
  },
]);

// Otras funciones
const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value;
};

const toggleUserMenu = (event) => {
  // Event is handled by UserMenu component
};

const navigateTo = (route) => {
  if (route) {
    router.push(route);
    sidebarVisible.value = false;
  }
};

const toggleDarkMode = () => {
  // Dark mode functionality disabled
  console.log('Dark mode toggle disabled');
};

const updateTheme = () => {
  // Always keep light mode
  document.documentElement.classList.remove("app-dark");
};

// Detectar cambios de tamaño de pantalla
const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
  if (!isMobile.value) {
    sidebarVisible.value = false;
  }
};


// Lifecycle
onMounted(() => {
  window.addEventListener("resize", handleResize);
  updateTheme();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div class="modern-dashboard-layout">
    <!-- Overlay para móvil -->
    <div
      v-if="sidebarVisible && isMobile"
      class="sidebar-overlay"
      @click="sidebarVisible = false"
    ></div>

    <!-- Sidebar -->
    <AppSidebar
      :sidebarVisible="sidebarVisible"
      :menuItems="menuItems"
      :isMobile="isMobile"
      :logo="logoUrl"
      @toggle="toggleSidebar"
      @navigate="navigateTo"
    />


    <!-- Main Content -->
    <div class="main-container">
      <!-- Header -->
      <header class="main-header">
        <div class="header-left">
          <Button
            icon="pi pi-bars"
            @click="toggleSidebar"
            class="p-button-text p-button-plain menu-toggle"
          />
          <h1 v-if="$route.path !== '/dashboard' && $route.meta?.title" class="page-title">{{ $route.meta.title }}</h1>
        </div>

        <div class="header-right">
          <!-- User Menu -->
          <UserMenu
            :user="currentUser"
            :menuItems="userMenuItems"
            :isMobile="isMobile"
            @toggle-menu="toggleUserMenu"
          />
        </div>
      </header>

      <!-- Page Content -->
      <main class="main-content">
        <div class="content-wrapper">
          <router-view v-slot="{ Component }">
            <transition name="fade-slide" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Use PrimeVue design tokens */

/* Layout principal */
.modern-dashboard-layout {
  display: flex;
  height: 100vh;
  background: var(--p-surface-ground);
}

/* Overlay móvil */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: none;
}

@media (max-width: 768px) {
  .sidebar-overlay {
    display: block;
  }
}


/* Main container */
.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-left: var(--sidebar-width);
}

@media (max-width: 768px) {
  .main-container {
    margin-left: 0;
  }
}

/* Header */
.main-header {
  height: var(--header-height);
  background: var(--p-surface-0);
  border-bottom: 1px solid var(--p-surface-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.menu-toggle {
  display: none;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--p-text-color);
  margin: 0;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 1.25rem;
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}


/* Main content */
.main-content {
  flex: 1;
  overflow-y: auto;
  background: var(--p-surface-ground);
}

.content-wrapper {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 1rem;
  }
}

/* Animaciones */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}


/* Utilidades */
:deep(.p-badge) {
  min-width: 1.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
}
</style>