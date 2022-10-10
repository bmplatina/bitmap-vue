import { createApp } from "vue";
import VueHead from "vue-head";
import App from "./App.vue";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* import specific icons */
import {
  faUserSecret,
  faHatWizard,
  fas,
} from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

/* add icons to the library */
library.add(faUserSecret, faHatWizard, fas, far, fab);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon).mount("#app");
