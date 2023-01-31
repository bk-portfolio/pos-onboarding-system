import { defineStore } from "pinia";
import { useLoaderStore } from "./LoaderStore";
import { usePopUpDialogStore } from "./PopUpDialogStore"
import axios from "axios";

export const useLoyaltyStore = defineStore({
  id: "loyaltyStore",
  state: () => ({
    loadTheData: false,
    loaderStore: useLoaderStore(),
    popUpDialogStore: usePopUpDialogStore(),
    loyaltyList: [],
    addLoyalty: [
      {
        id: null,
        name: "",
        point_awarded: null,
        when_award: null,
        description: "",
        redemption_rule: [
          {
            rule_name: "",
            start_point: null,
            end_point: null,
            products: [],
          },
        ],
      },
    ],
    loyaltyDetails: [JSON.parse(localStorage.getItem("loyaltyDetails"))]
  }),
  actions: {
    async getLoyaltyList(id) {
      try {
      this.loadTheData = true;
        const response = await axios.post("/loyalty/list", { id });
        if (response.status === 200) {
          this.loyaltyList = response.data;
          this.loadTheData = false;
        }
      } catch (error) {
        this.loadTheData = false;
        console.log(error.response.data);
      }
    },

    async setLoyaltyDetails(props) {
      localStorage.setItem("loyaltyDetails", JSON.stringify(props));
      this.loyaltyDetails = [
        JSON.parse(localStorage.getItem("loyaltyDetails")),
      ];
    },

    checkValueLowerThanZero(value) {
      let lowerThanZero = false;
      let loyalty = {
       point_awarded : +value.point_awarded,
       when_award : +value.when_award,
       redemption_rule : value.redemption_rule
      }
      if (loyalty.point_awarded < 0 || loyalty.when_award < 0) {
        lowerThanZero = true;
      } else {
        loyalty.redemption_rule.every((redRule) => {
          if (+redRule.start_point < 0 || +redRule.end_point < 0) {
            lowerThanZero = true;
            return false;
          } else {
            return true;
          }
        });
      }
      return lowerThanZero;
    },

    async postCreateLoyalty() {
      if (this.checkValueLowerThanZero(this.loyaltyDetails[0])) {
        this.openInformationDialog('Please enter a number greater than or equal to 0');
      } else {
        try {
          this.loaderStore.openLoadingDialog("Loading...");
          let data = this.loyaltyDetails;
          const response = await axios.post("/loyalty/create", data);
          if (response.status === 200) {
            useLoyaltyStore().$reset();
            this.loaderStore.closeLoadingDialog();
            this.$router.push("/adminLoyalty");
            this.openInformationDialog("Your data was successfully saved!");
          }
        } catch (error) {
          this.loaderStore.closeLoadingDialog();
          console.log(error.response.data);
        }
      }
    },

    async postUpdateLoyalty() {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        let data = this.loyaltyDetails;
        const response = await axios.post("/loyalty/update", data);
        if (response.status === 200) {
          this.loaderStore.closeLoadingDialog();
          localStorage.removeItem("loyaltyDetails");
          this.$router.push("/adminLoyalty");
          this.openInformationDialog("Your data was successfully saved!");
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        console.log(error.response.data);
      }
    },


    async postDeleteLoyalty(id) {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        const response = await axios.post("/loyalty/delete", { id });
        if (response.status === 200) {
          this.getLoyaltyList();
          this.loaderStore.closeLoadingDialog();
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        console.log(error.response.data);
      }
    },

    openInformationDialog(message) {
      this.popUpDialogStore.openInformationDialog(message);
    },
  },
});
