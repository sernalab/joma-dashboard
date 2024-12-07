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
