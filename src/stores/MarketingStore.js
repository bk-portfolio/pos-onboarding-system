import { defineStore } from "pinia";
import { useLoaderStore } from "./LoaderStore";
import axios from "axios";

export const useMarketingStore = defineStore({
  id: "marketingStore",
  state: () => ({
    loaderStore: useLoaderStore(),
    marketingDetails: {
      is_emailexp: false,
      email_marketing: "",
      email_freq: "",
      is_socialexp: false,
      social_platform: "",
      social_freq: "",
      is_smsexp: false,
      sms_marketing: "",
      sms_freq: "",
    },
    informationDialog: {
      appear: false,
      message: "",
      callBack: false,
    },
  }),
  actions: {
    async postFetchMarketingDetails(id) {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        const response = await axios.post("/marketing/find", { id: id });
        if (response.status === 200) {
          this.marketingDetails = response.data;
          if (this.marketingDetails.length === 0) {
            this.marketingDetails = {
              is_emailexp: false,
              email_marketing: "",
              email_freq: "",
              is_socialexp: false,
              social_platform: "",
              social_freq: "",
              is_smsexp: false,
              sms_marketing: "",
              sms_freq: "",
            };
          }
          this.loaderStore.closeLoadingDialog();
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        console.log(error);
      }
    },

    async postCreateMarketingDetails() {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        let data = this.marketingDetails;
        const response = await axios.post("/marketing/create", data);
        if (response.status === 200) {
          this.postFetchMarketingDetails();
          this.loaderStore.closeLoadingDialog();
          this.openInformationDialog("Your data was successfully saved!");
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        console.log(error.response);
      }
    },

    async postUpdateMarketingDetails() {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        let data = this.marketingDetails;
        const response = await axios.post("/marketing/update", data);
        if (response.status === 200) {
          this.postFetchMarketingDetails();
          this.loaderStore.closeLoadingDialog();
          this.openInformationDialog("Your data was successfully saved!");
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        console.log(error.response);
      }
    },

    openInformationDialog(message) {
      this.informationDialog.message = message;
      this.informationDialog.appear = true;
    },

    closeInformationDialog(callBack) {
      if (callBack) {
        this.$router.back();
      }
      this.informationDialog = {
        appear: false,
        message: "",
        callBack: false,
      };
    },
  },
});
