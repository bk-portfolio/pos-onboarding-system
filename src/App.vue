<template>
  <div>
    <div v-if="development" class="development">DEVELOPMENT</div>
    <router-view />
    <!-- For Global Use -->
    <information-dialog
      :dialog="this.popUpDialogStore.informationDialog"
      @close-dialog="this.popUpDialogStore.closeInformationDialog" />
    <loading-dialog
      :dialog="loaderStore.loadingDialog"
      @close-dialog="loaderStore.closeLoadingDialog" />
    
    <!-- for next review remove this component and use global instead -->
    <information-dialog
      :dialog="this.store.informationDialog"
      @close-dialog="this.store.closeInformationDialog" />
  </div>
</template>

<script>
import { usePopUpDialogStore } from "./stores/PopUpDialogStore";
import { useLoaderStore } from "./stores/LoaderStore.js";
import { useStoreStore } from "./stores/StoreStore.js";

export default {
  name: "App",
  setup() {
    const popUpDialogStore = usePopUpDialogStore();
    const loaderStore = useLoaderStore();
    const store = useStoreStore();
    return { popUpDialogStore, loaderStore, store };
  },
  data() {
    return {
      development: new URL(location.href).origin.includes("localhost"),
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      selectedTenantId: JSON.parse(localStorage.getItem("selectedTenantId")),
      selectedTenantName: localStorage.getItem("selectedTenantName"),
    };
  },
  mounted() {
    this.$http.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("accessToken");
  },
};
</script>
