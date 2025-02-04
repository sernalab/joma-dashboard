// 1. Styles
import "./assets/main.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

// 2. Vue Core
import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

// 3. Third Party Libraries
import VueApexCharts from "vue3-apexcharts";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";

// 4. Local Imports
import { messages } from "./i18n";
import { setupPrimeVueComponents } from "./plugins/primevue-components";

// 5. i18n Configuration
const browserLang = navigator.language.split("-")[0];
const supportedLanguages = [
  "en",
  "es",
  "it",
  "fr",
  "pl",
  "nl",
  "pt",
  "de",
  "hu",
];
const defaultLocale = supportedLanguages.includes(browserLang)
  ? browserLang
  : "en";

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: "en",
  messages,
});

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
      preset: Aura,
      options: {
        darkModeSelector: ".disable-dark-mode-completely",
      },
    },
  });

app.mount("#app");
