import "./assets/main.css";

import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import App from "./App.vue";
import router from "./router";

// import components
import Sidebar from "primevue/sidebar";
import Button from "primevue/button";
import Avatar from "primevue/avatar";

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

// register components
app.component("Button", Button);
app.component("Sidebar", Sidebar);
app.component("Avatar", Avatar);

app.mount("#app");
