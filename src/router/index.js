import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/dashboard",
      component: DashboardLayout,
      children: [
        {
          path: "",
          name: "dashboard",
          component: () => import("../views/DashboardView.vue"),
        },
        {
          path: "manometer",
          name: "manometer",
          component: () => import("../views/ChartViews/ManometerView.vue"),
        },
        {
          path: "vacuum",
          name: "vacuum", // Vacio
          component: () => import("../views/ChartViews/VacuumView.vue"),
        },
        {
          path: "oil-pressure",
          name: "oil-pressure",
          component: () => import("../views/ChartViews/OilPressureView.vue"),
        },
        {
          path: "fuel-pressure",
          name: "fuel-pressure",
          component: () => import("../views/ChartViews/FuelPressureView.vue"),
        },
        {
          path: "common-rail",
          name: "common-rail",
          component: () => import("../views/ChartViews/CommonRailView.vue"),
        },
        {
          path: "compression",
          name: "compression",
          component: () => import("../views/ChartViews/CompresionView.vue"),
        },
        {
          path: "turbo-pressure",
          name: "turbo-pressure",
          component: () => import("../views/ChartViews/TurboPresureView.vue"),
        },
        {
          path: "brake-pressure",
          name: "brake-pressure",
          component: () => import("../views/ChartViews/BrakePressureView.vue"),
        },
        {
          path: "dpf-pressure",
          name: "dpf-pressure",
          component: () => import("../views/ChartViews/DPFPressureView.vue"),
        },
        {
          path: "adblue-pressure",
          name: "adblue-pressure",
          component: () => import("../views/ChartViews/AdbluePressureView.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authService.isAuthenticated()) {
    next("/");
  } else {
    next();
  }
});

export default router;
