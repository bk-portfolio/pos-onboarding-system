<template>
  <img
    src="./../../../assets/img/wooshfood.png"
    class=""
    alt="Responsive image" />
  <div class="fw-bold company__logo">
    <div v-if="!$root.userInfo.is_admin" class="company__logo--name">
      {{ store.companyName }}
    </div>
    <div v-if="$root.userInfo.is_admin && isSuspended" class="suspended">This account was suspended</div>
    <div v-if="$root.userInfo.is_admin" class="company__logo--name">
      Review : {{ $root.selectedTenantName }}
    </div>
    <div class="company__logo--logo" data-bs-toggle="dropdown">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
      </svg>
      <ul class="dropdown-menu">
        <div
          v-if="$root.userInfo.is_admin"
          class="dropdown-item"
          @click="$router.push('/wooshAdminListTenantPage')">
          Change Tenant
        </div>
        <div
          v-if="!$root.userInfo.is_admin"
          @click="showPackList"
          class="dropdown-item">
          <p class="text-center">Update Pack</p>
          <p class="text-center fs-7 pt-2 woosh-text-primary">
            {{ userInfo.packages[0].name }}
          </p>
        </div>
        <li><hr class="dropdown-divider" /></li>
        <div
          v-if="$root.userInfo.is_admin"
          @click="$emit('sendComment')"
          class="dropdown-item woosh-bg-secondary py-3 mb-2">
          <div class="text-white text-center">Send Comment</div>
        </div>
        <div
          v-if="$root.userInfo.is_admin && isPaid"
          @click="approve"
          class="dropdown-item p-0">
          <button class="btn btn-secondary py-2 w-100 rounded-0 text-center">
            Approve
          </button>
        </div>
        <div
          v-if="$root.userInfo.is_admin && !subscriptionInfo.is_subscribed"
          @click="approve"
          class="dropdown-item p-0">
          <button class="btn btn-secondary py-2 w-100 rounded-0 text-center">
            Send Payment Link
          </button>
        </div>
        <div 
          v-if="$root.userInfo.is_admin && isPendingPayment"
          class="dropdown-item py-3 mb-2" style="pointer-events: none;">
          <div class="text-center">Pending Payment</div>
        </div>
        <div 
          v-if="$root.userInfo.is_admin && isSuspended"
          class="dropdown-item p-0"
          @click="$emit('activateAccount', subscriptionInfo.owner_id, postActive)">
          <button class="btn btn-danger py-2 w-100 rounded-0 text-center">
            Re-activated Account
          </button>
        </div>
        <div
          v-if="!$root.userInfo.is_admin"
          @click="$emit('submitData', 'submit')"
          class="dropdown-item woosh-bg-secondary py-3">
          <div class="text-white text-center">Submit Data</div>
        </div>
        <li><hr class="dropdown-divider" /></li>
        <div @click="$emit('logout', 'logout')" class="dropdown-item text-end">
          <a href="#" class="me-1">Logout</a>
          <svg
            style="width: 1.5rem"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
        </div>
      </ul>
    </div>

    <information-dialog
      :dialog="informationDialog"
      @close-dialog="closeInformationDialog" />
  </div>
</template>

<style scoped>
  .suspended {
      background-color: #ba0000; 
      color: white; 
      position: absolute; 
      top: 10%;
      right: 0%;
      z-index: 1000;
      padding: 10px 10px;
      border-radius: 0 0 5px 5px;
  }
</style>

<script>
import { useStoreStore } from "./../../../stores/StoreStore";
export default {
  setup() {
    const store = useStoreStore();
    return { store };
  },
  name: "Admin Header",
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      subscriptionInfo: JSON.parse(localStorage.getItem("subscriptionInfo")),
      informationDialog: {
        appear: false,
        message: "This feature is still in progress",
        callBack: false,
      },
      companyName: localStorage.getItem("companyName"),
      isSuspended: false
    };
  },
  computed : {
    isPendingPayment() {
      return this.subscriptionInfo.is_subscribed && !this.subscriptionInfo.is_paid;
    },
    isPaid() {
      return this.subscriptionInfo.is_subscribed && this.subscriptionInfo.is_paid;
    }
  },
  methods: {
    showPackList() {
      this.$emit("showPackList");
    },
    openInformationDialog() {
      this.informationDialog.appear = true;
    },
    closeInformationDialog(callBack) {
      if (callBack) {
        return;
      }
      this.informationDialog = {
        appear: false,
        message: "This feature is still in progress",
        callBack: false,
      };
    },
    approve() {
      if (!this.subscriptionInfo.is_subscribed) {
        // Send payment link
        let loadMessage = "Sending payment link ...";
        let infoMessage = "Payment link was successfully sent to " + this.subscriptionInfo.email_subscription;
        this.$emit('postApprove', infoMessage, loadMessage);
      } else {
        let loadMessage = "Initiating Odoo application ..."
        let infoMessage = "Your data was approved successfully";
        this.$emit('postApprove', infoMessage, loadMessage);
      }
    },
    async checkSubscriptionStatus() {
      const response = await this.$http.post("/subscription/checkByUser", {
        id : this.subscriptionInfo.owner_id
      });
      if (response.status = 200 && response.data.active != null) {
        this.isSuspended = !response.data.active;
      }
    },
    postActive() {
      this.isSuspended = false;
    }
  },
  mounted() {
    this.checkSubscriptionStatus();
  },
};
</script>
