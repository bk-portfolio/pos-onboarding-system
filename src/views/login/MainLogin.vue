<template>
  <div class="row m-0 p-0 h-100">
    <div class="col-xl-6 p-0 h-100 col-12 px-5 pt-5">
      <div class="row m-0 h-90 p-5 scroll--vertical">
        <div class="col d-flex justify-content-center align-items-center">
          <LoginForm v-if="storeLogin.loginPage" @post-login="checkData" />
          <LoginFormResetPasswordLink v-if="storeLogin.forgotPasswordPage" />
          <LoginFormResetPasswordLinkSuccess
            v-if="storeLogin.resetPasswordLinkSentPage" />
        </div>
      </div>
    </div>
    <div class="col-xl-6 p-0">
      <div class="layout__main--background"></div>
    </div>
  </div>
  <information-dialog
    :dialog="informationDialog"
    @close-dialog="closeInformationDialog" />
</template>

<script>
import LoginForm from "./components/MainLoginForm.vue";
import LoginFormResetPasswordLink from "./components/MainLoginFormResetPasswordLink.vue";
import { useStoreStore } from "../../stores/StoreStore";
import { useLoginStore } from "../../stores/LoginStore";
import { usePaymentStore } from "../../stores/PaymentStore";
import LoginFormResetPasswordLinkSuccess from "./components/MainLoginFormResetPasswordLinkSuccess.vue";

export default {
  name: "Main Login",
  setup() {
    const store = useStoreStore();
    const storeLogin = useLoginStore();
	  const storePayment = usePaymentStore();
    return {
      store,
      storeLogin,
	    storePayment
    };
  },
  data() {
    return {
      informationDialog: {
        appear: false,
        message: "",
      },
    };
  },
  components: {
    LoginForm,
    LoginFormResetPasswordLink,
    LoginFormResetPasswordLinkSuccess,
  },
  methods: {
    showInformationDialog(message) {
      this.informationDialog = {
        appear: true,
        message: message,
      };
    },
    closeInformationDialog() {
      this.informationDialog = {
        appear: false,
        message: "",
      };
    },
    checkData(data) {
      if (data.email && data.password) {
        this.postLogin(data);
      } else {
        this.showMessageDataEmpty();
      }
    },
    showMessageDataEmpty() {
      this.showInformationDialog("Email or Password field empty");
    },
    showMessageIncorrectData() {
      this.showInformationDialog("Incorrect email or password");
    },
    async postLogin(data) {
      try {
        const response = await this.$http.post("/auth/login", data);
        if (response.status == 200) {
          localStorage.setItem("isLogin", true);
          this.storeLogin.isLogin = JSON.parse(localStorage.getItem("isLogin"));
          this.checkDataStatus(response);
        }
      } catch (error) {
        this.showMessageIncorrectData();
      }
    },
    checkDataStatus(response) {
      let status = response.data.data_status;
      if (status == "INIT" || status == "PENDING" || status == null) {
        this.directToDashboard(response);
      } else if (status == "REVIEW") {
        this.directToPayment(response);
      } else if (status == "APPROVED") {
        this.showInformationDialog("Your data has been approved by admin.");
      }
    },
    directToDashboard(response) {
      let token = response.data.accessToken;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      this.$root.userInfo = response.data;
      this.$http.defaults.headers.common["Authorization"] = "Bearer " + token;
      this.checkIsAdmin(response.data);
    },
    checkIsAdmin(data) {
      if (data.is_admin) {
        this.$router.push("/wooshAdminListTenantPage");
      } else {
        this.checkIfUserHaveFilledBusinessDetails(data.packages);
      }
    },
    checkIfUserHaveFilledBusinessDetails(packages) {
      let routeTo = "/adm";
      if (packages.length == 0) {
        this.store.businessDetails = {
          restaurant_name: "",
          company_name: "",
          address: "",
          phone_number: "",
          email: "",
          language: "",
          internet_provider: "",
          company_logo: "",
          invoice_logo: "",
          packages: null,
          currency: "",
          modem: "",
          payment_provider: "",
          be_placed: null,
          abn: "",
        };
        routeTo = "/registrationSelectPackage";
      }
      this.$router.push(routeTo);
    },
    directToPayment(response) {
      let token = response.data.accessToken;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      this.$root.userInfo = response.data;
      this.$http.defaults.headers.common["Authorization"] = "Bearer " + token;

      this.checkSubscriptionStatus();
    },
    async checkSubscriptionStatus() {
      await this.storePayment.postFetchSubscriptionPackage();
      if (this.storePayment.paymentData) {
        this.$router.push("/subscription/checkout");
      } else {
        this.showInformationDialog("Your data is still being reviewed by admin.");
      }
    }
  },
};
</script>
