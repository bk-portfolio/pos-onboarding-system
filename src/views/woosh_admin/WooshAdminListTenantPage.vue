<template>
  <div class="row m-0 p-0 h-100">
    <div class="col-xl-6 p-0 h-100 col-12 px-5 pt-5">
      <div class="row m-0 h-90 px-2 pb-5 scroll--vertical">
        <div class="col">
          <p class="text-center pb-4 sticky-top woosh-bg-primary fs-5 fw-bold">
            LIST TENANT
          </p>
          <table class="table table-borderless">
            <thead>
              <tr class="border-bottom border-secondary fw-bold">
                <th scope="col">Status</th>
                <th scope="col">Tenant</th>
                <th scope="col">Payment Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="business in businessList"
                class="border-bottom"
                :key="business.key">
                <th scope="col">
                  <i
                    class="py-1 px-2 rounded-end fs-7"
                    :class="coloringLabel(business.status)"
                    >o {{ business.status }}</i
                  >
                </th>
                <th scope="col">
                  {{ business.name }}
                </th>
                <th scope="col">
                  <i class="py-1 px-2 rounded fs-7" :class="paymentLabel(business)">
                      {{ getPaymentStatus(business) }}
                  </i>
                </th>
                <th scope="col" class="text-end">
                  <button
                    v-if="business.is_paid == true && business.is_subscribed == true"
                    class="py-2 px-3 text-white bg-black"
                    @click="showConfirmationDialog(business.ownerId)"
                    >
                    Unsubscribe
                  </button>
                </th>
                <th scope="col" class="text-end">
                  <button
                    @click="ViewDetails(business)"
                    class="py-2 px-3 text-white bg-black">
                    View Details
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="col-xl-6 p-0">
      <div class="layout__main--background"></div>
    </div>
    <confirmation-dialog
    :dialog="confirmationDialog"
    @close-dialog="closeConfirmationDialog()"
    @yes-action="unsubscribe" />
    <information-dialog
    :dialog="informationDialog"
    @close-dialog="closeInformationDialog()" />
  </div>
</template>
<script>
import axios from 'axios';
import { useLoaderStore } from './../../stores/LoaderStore';
export default {
  name: "Woosh List Tenant Page",
  setup() {
    const loaderStore = useLoaderStore();
    return { loaderStore };
  },
  data() {
    return {
      businessList: [],
      confirmationDialog: {
        appear: false,
        name: "Are you sure you want to unsubscribe selected user? <br/> user will no longer able to access wooshfood.",
        button: {
          yes: "Confirm",
          no: "Cancel",
        },
      },
      informationDialog: {
				appear: false,
				message: ""
			},
    };
  },
  methods: {
    getPaymentStatus(business) {
      if (business.is_subscribed && business.is_paid) {
        return "Paid";
      }
      if (business.is_subscribed && !business.is_paid) {
        return "Waiting Paid";
      }
    },
    paymentLabel(business) {
      let status = this.getPaymentStatus(business);
      let color = "";
      if (status == "Paid") {
        color = "bg-secondary text-white";
      }
      if (status == "Waiting Paid") {
        color = "bg-danger text-white"
      }
      return color;
    },
    coloringLabel(status) {
      let color = "bg-success text-white fw-bold";
      if (status == "REVIEW") {
        color = "woosh-bg-secondary text-white fw-bold";
      } else if (status == "PENDING") {
        color = "bg-warning text-white fw-bold";
      }
      return color;
    },
    async FetchBusinessList() {
      this.loaderStore.openLoadingDialog('Loading...');
      const response = await this.$http.post("/admin/business/list");
      this.businessList = response.data;
      this.loaderStore.closeLoadingDialog();
    },
    ViewDetails(business) {
      this.updateUserInfo(business);
      this.updateSubscriptionInfo(business);
      this.$root.selectedTenantId = business.id;
      this.$root.selectedTenantName = business.name;
      localStorage.setItem("selectedTenantName", business.name);
      localStorage.setItem("selectedTenantId", JSON.stringify(business.id));
      this.$router.push("adm");
    },
    updateUserInfo(business) {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      userInfo.packages = [business.choosen_package];
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    },
    unsubscribe(){
      axios.post("/admin/business/subscription/stop", {id: this.confirmationDialog.ownerId}).then(response => {
        if(response.status == 200){
          this.closeConfirmationDialog();
        } else {
          this.closeConfirmationDialog();
          this.showInformationDialog("Failed to unsubscribe due the account is suspended");
        }
      });
    },
    showConfirmationDialog(ownerId) {
      this.confirmationDialog.appear = true;
      this.confirmationDialog.ownerId = ownerId;
    },
    closeConfirmationDialog() {
      this.confirmationDialog.appear = false;
      this.confirmationDialog.ownerId = null;
      this.FetchBusinessList();
    },
    showInformationDialog(message) {
			this.informationDialog = {
				appear: true,
				message: message
			};
		},
		closeInformationDialog() {
			this.informationDialog = {
				appear: false,
				message: ""
			};
		},
    updateSubscriptionInfo(business) {
      let subscriptionInfo = {
        "is_paid" : business.is_paid,
        "is_subscribed" : business.is_subscribed,
        "email_subscription" : business.email_subscription,
        "owner_id" : business.ownerId
      }
      localStorage.setItem("subscriptionInfo", JSON.stringify(subscriptionInfo));
    }
  },
  mounted() {
    this.FetchBusinessList();
  },
};
</script>
