import { defineStore } from "pinia";

export const useLoaderStore = defineStore({
  id: "loaderStore",
  state: () => ({
    loadingDialog: {
      appear: false,
      message: "",
    },
  }),
  actions: {
    openLoadingDialog(message) {
      this.loadingDialog.appear = true;
      this.loadingDialog.message = message;
    },

    closeLoadingDialog() {
      this.loadingDialog = {
        appear: false,
        message: ""
      };
    },
  },
});
