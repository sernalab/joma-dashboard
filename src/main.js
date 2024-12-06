import "./assets/main.css";

import { createApp } from "vue";
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

const app = createApp(App);

app.use(router);
app.use(VueApexCharts);
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

app.mount("#app");
