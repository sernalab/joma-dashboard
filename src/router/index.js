import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import { authService } from "@/services/auth.service";

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
      meta: { requiresAuth: true }, // Protege todas las rutas dentro de Dashboard
      children: [
        {
          path: "",
          name: "dashboard",
          component: () => import("../views/DashboardView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "manometer",
          name: "manometer",
          component: () => import("../views/ChartViews/ManometerView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "vacuum",
          name: "vacuum",
          component: () => import("../views/ChartViews/VacuumView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "oil-pressure",
          name: "oil-pressure",
          component: () => import("../views/ChartViews/OilPressureView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "fuel-pressure",
          name: "fuel-pressure",
          component: () => import("../views/ChartViews/FuelPressureView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "common-rail",
          name: "common-rail",
          component: () => import("../views/ChartViews/CommonRailView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "compression",
          name: "compression",
          component: () => import("../views/ChartViews/CompresionView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "turbo-pressure",
          name: "turbo-pressure",
          component: () => import("../views/ChartViews/TurboPresureView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "brake-pressure",
          name: "brake-pressure",
          component: () => import("../views/ChartViews/BrakePressureView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "dpf-pressure",
          name: "dpf-pressure",
          component: () => import("../views/ChartViews/DPFPressureView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "adblue-pressure",
          name: "adblue-pressure",
          component: () => import("../views/ChartViews/AdbluePressureView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "print-client-report",
          name: "print-client-report",
          component: () => import("../views/PrintClientView.vue"),
          meta: { requiresAuth: true },
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
