// 1. Component Imports
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import Divider from "primevue/divider";
import ProgressSpinner from "primevue/progressspinner";
import Message from "primevue/message";
import Badge from "primevue/badge";

// 2. Directive Imports
import Ripple from "primevue/ripple";
import StyleClass from "primevue/styleclass";

// 3. Configuration Objects
const directives = {
  styleclass: StyleClass,
  ripple: Ripple,
};

const components = {
  Button,
  Avatar,
  Menubar,
  InputText,
  Card,
  Divider,
  ProgressSpinner,
  Message,
  Badge,
};

// 4. Setup Function
export function setupPrimeVueComponents(app) {
  // Register directives
  Object.entries(directives).forEach(([name, directive]) => {
    app.directive(name, directive);
  });

  // Register components
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
}
