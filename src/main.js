// 1. Styles
import "./assets/main.css";
import "./assets/modern-dashboard.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

// 2. Vue Core
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

// 3. Third Party Libraries
import VueApexCharts from "vue3-apexcharts";
import PrimeVue from "primevue/config";
import BetaPreset from "./theme/betaPreset";

// 4. Local Imports
import { i18n } from "./i18n/i18n-instance";
import { setupPrimeVueComponents } from "./plugins/primevue-components";

// 6. App Setup
const app = createApp(App);
const pinia = createPinia();

setupPrimeVueComponents(app);

app
  .use(router)
  .use(VueApexCharts)
  .use(i18n)
  .use(pinia)
  .use(PrimeVue, {
    theme: {
      preset: BetaPreset,
      options: {
        darkModeSelector: ".app-dark",
        cssLayer: false
      },
    },
  });

// Check if app is already mounted
const container = document.querySelector("#app");
if (container && !container.__vue_app__) {
  app.mount("#app");
} else {
  console.warn("App is already mounted or container not found");
}
