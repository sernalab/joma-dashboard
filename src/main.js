import "./assets/main.css";

import { createApp } from "vue";
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

import { firebaseApp } from "@/firebase.js";

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
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

app.mount("#app");
