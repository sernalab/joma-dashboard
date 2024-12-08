import "./assets/main.css";

import { createApp } from "vue";

import { createI18n } from "vue-i18n";
import { messages } from "./i18n";

import VueApexCharts from "vue3-apexcharts";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import App from "./App.vue";
import router from "./router";

import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import Ripple from "primevue/ripple";
import StyleClass from "primevue/styleclass";

// import components
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import Divider from "primevue/divider";
import ProgressSpinner from "primevue/progressspinner";
import Message from "primevue/message";

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

const app = createApp(App);

app.use(router);
app.use(VueApexCharts);
app.use(i18n);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".disable-dark-mode-completely",
    },
  },
});

// directives
app.directive("styleclass", StyleClass);
app.directive("ripple", Ripple);

// register components
app.component("Button", Button);
app.component("Avatar", Avatar);
app.component("Menubar", Menubar);
app.component("InputText", InputText);
app.component("Card", Card);
app.component("Divider", Divider);
app.component("ProgressSpinner", ProgressSpinner);
app.component("Message", Message);

app.mount("#app");
