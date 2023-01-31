import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./assets/scss/main.scss";
import axios from "axios";

const app = createApp(App);

//ADD GLOBAL METHODS
app.mixin({
  methods: {
    formatDateYYYYMMDD(date) {
      let yyyy = date.getFullYear();
      let mm = date.getMonth() + 1;
      let dd = date.getDate();
      return [
        yyyy,
        mm.toString().padStart(2, "0"),
        dd.toString().padStart(2, "0"),
      ].join("-");
    },
  },
});
// END OF ADD GLOBAL METHODS
// ---------------------

// PINIA SETUP
const pinia = createPinia();
app.use(pinia);
import { usePopUpDialogStore } from "./stores/PopUpDialogStore";
const popUpDialogStore = usePopUpDialogStore();

// add router as plugin in Pinia
pinia.use(({ store }) => {
  store.$router = markRaw(router);
});

// END OF PINIA SETUP
// ------------------

// GLOBAL REGISTRATION COMPONENTS
import InformationDialog from "./components/InformationDialog.vue";
import LoadingDialog from "./components/LoadingDialog.vue";
import ConfirmationDialog from "./components/ConfirmationDialog.vue";
import {
  Input,
  Switch,
  Checkbox,
  RadioButton,
} from "@progress/kendo-vue-inputs";
import { Button } from "@progress/kendo-vue-buttons";
import { Grid } from "@progress/kendo-vue-grid";
import { Dialog } from "@progress/kendo-vue-dialogs";
import {
  ComboBox,
  DropDownList,
  MultiSelect,
} from "@progress/kendo-vue-dropdowns";

app.component("informationDialog", InformationDialog);
app.component("loadingDialog", LoadingDialog);
app.component("confirmationDialog", ConfirmationDialog);
app.component("k-input", Input);
app.component("k-switch", Switch);
app.component("k-checkbox", Checkbox);
app.component("k-radio-button", RadioButton);
app.component("k-button", Button);
app.component("k-grid", Grid);
app.component("k-dialog", Dialog);
app.component("k-dropdown-combobox", ComboBox);
app.component("k-dropdown", DropDownList);
app.component("k-multiselect", MultiSelect);
// END OF GLOBAL REGISTRATION COMPONENTS
// -------------------------------------

// AXIOS SETUP
axios.defaults.baseURL = _env_.API_BACKEND_URL;
app.config.globalProperties.$http = axios;

// Set interceptors response for handle expired token with error code = 401
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const {
      response: {status}
    } = error;
    if (status == 401) {
      popUpDialogStore.informationDialog.message = 'Session Expired. Please re Login';
      popUpDialogStore.informationDialog.appear = true;
      router.push('/');
    } else {
      return error.response;
    }
  }
);
// END OF AXIOS SETUP
// ------------------

// Navigation Guards
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken !== 'null'){
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
})

app.use(router).mount("#app");
