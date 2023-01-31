import { defineStore } from "pinia";

export const usePopUpDialogStore = defineStore({
  id: "popUpDialogStore",
  state: () => ({
    informationDialog: {
      appear: false,
      message: "",
    },
  }),
  actions: {
    openInformationDialog(message) {
      this.informationDialog.appear = true;
      this.informationDialog.message = message;
    },
    closeInformationDialog() {
      this.informationDialog = {
        appear: false,
        message: ""
      };
    },
  },
});
