// 1. Component Imports
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import MultiSelect from "primevue/multiselect";
import Card from "primevue/card";
import Divider from "primevue/divider";
import ProgressSpinner from "primevue/progressspinner";
import Message from "primevue/message";
import Badge from "primevue/badge";
import Menu from "primevue/menu";
import { Form } from "@primevue/forms";
import Textarea from "primevue/textarea";
import ProgressBar from "primevue/progressbar";
import Tooltip from "primevue/tooltip";
import Steps from "primevue/steps";
import FloatLabel from "primevue/floatlabel";
import Checkbox from "primevue/checkbox";

// 2. Directive Imports
import Ripple from "primevue/ripple";
import StyleClass from "primevue/styleclass";

// 3. Configuration Objects
const directives = {
  styleclass: StyleClass,
  ripple: Ripple,
  tooltip: Tooltip,
};

const components = {
  Button,
  Avatar,
  Menubar,
  InputText,
  MultiSelect,
  Card,
  Divider,
  ProgressSpinner,
  Message,
  Badge,
  Menu,
  Form,
  InputNumber,
  Textarea,
  ProgressBar,
  Steps,
  FloatLabel,
  Checkbox,
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
