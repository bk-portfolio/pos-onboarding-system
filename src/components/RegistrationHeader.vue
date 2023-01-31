<template>
  <img
    src="./../assets/img/wooshfood.png"
    class="img-fluid"
    alt="Responsive image" />
  <div v-if="!loginStore.isLogin" class="row m-0">
    <router-link to="/reg" class="col-auto">
      <k-button
        class="mx-2 rounded-0 text-white fs-7 px-5 py-3 fw-bold border-0">
        Register Now
      </k-button>
    </router-link>
    <router-link to="/" class="col-auto">
      <k-button
        @click="loginStore.toLoginPage"
        class="k-button--secondary mx-2 rounded-0 text-white fs-7 px-5 py-3 fw-bold border-0">
        Login
      </k-button>
    </router-link>
  </div>
  <div v-if="loginStore.isLogin" class="row m-0">
    <k-button
      @click="showConfirmationDialog"
      class="mx-2 rounded-0 text-white fs-7 px-5 py-3 fw-bold border-0">
      Logout
    </k-button>
  </div>
  <confirmation-dialog
    :dialog="confirmationDialog"
    @close-dialog="closeConfirmationDialog()"
    @yes-action="logout" />
</template>

<script>
import { useStoreStore } from "./../stores/StoreStore";
import { useLoyaltyStore } from "./../stores/LoyaltyStore.js";
import { useMarketingStore } from "./../stores/MarketingStore";
import { useProductStore } from "./../stores/ProductStore";
import { useLoginStore } from "./../stores/LoginStore";
export default {
  name: "Registration Header",
  setup() {
    const storeStore = useStoreStore();
    const loyaltyStore = useLoyaltyStore();
    const marketingStore = useMarketingStore();
    const productStore = useProductStore();
    const loginStore = useLoginStore();
    return {
      storeStore,
      loyaltyStore,
      marketingStore,
      productStore,
      loginStore,
    };
  },
  data() {
    return {
      isLogin: true,
      confirmationDialog: {
        appear: false,
        name: "Are you sure you want to logout?",
        button: {
          yes: "Confirm",
          no: "Cancel",
        },
      },
    };
  },
  methods: {
    async logout() {
      try {
        const response = await this.$http.post("/auth/logout");
        if (response.status === 200) {
          this.closeConfirmationDialog();
          localStorage.clear();
          this.$router.push("/");
          this.loginStore.isLogin = false;
          this.storeStore.$reset();
          this.loyaltyStore.$reset();
          this.marketingStore.$reset();
          this.productStore.$reset();
        }
      } catch (e) {
        if (e.response.status === 401) {
          localStorage.clear();
          this.$router.push("/");
        }
      }
    },
    showConfirmationDialog() {
      this.confirmationDialog.appear = true;
    },
    closeConfirmationDialog() {
      this.confirmationDialog = {
        appear: false,
        name: "Are you sure you want to logout?",
        button: {
          yes: "Confirm",
          no: "Cancel",
        },
      };
    },
  },
  mounted() {},
};
</script>
