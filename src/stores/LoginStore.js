import { defineStore } from "pinia";
import axios from "axios";

export const useLoginStore = defineStore({
  id: "loginStore",
  state: () => ({
    emailResetPassword: "",
    isLogin: JSON.parse(localStorage.getItem("isLogin")),
    loadingDialog: {
      appear: false,
      message: "Sending link to your email",
    },
    informationDialog: {
      appear: false,
      message: "",
      message2: "",
    },
    loginPage: true,
    forgotPasswordPage: false,
    resetPasswordLinkSentPage: false,
    resetPasswordForm: false,
  }),
  actions: {
    openLoadingDialog() {
      this.loadingDialog.appear = true;
    },

    closeLoadingDialog() {
      this.loadingDialog = {
        appear: false,
      };
    },

    openInformationDialog(message, message2) {
      this.informationDialog.appear = true;
      this.informationDialog.message = message;
      this.informationDialog.message2 = message2;
    },

    closeInformationDialog(callBack) {
      if (callBack) {
        this.$router.back();
      }
      this.informationDialog = {
        appear: false,
        callBack: false,
      };
    },
    showForgotPasswordPage() {
      this.forgotPasswordPage = true;
      this.loginPage = false;
    },

    toLoginPage() {
      this.loginPage = true;
      this.forgotPasswordPage = false;
      this.resetPasswordLinkSentPage = false;
    },

    async sendLinkResetPassword() {
      let validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (this.emailResetPassword === "") {
        this.openInformationDialog("Email field empty");
      } else if (
        !this.emailResetPassword.match(validRegex) &&
        this.emailResetPassword !== ""
      ) {
        this.openInformationDialog("Invalid email adress");
      } else {
        try {
          this.openLoadingDialog();
          const response = await axios.post("/auth/password/reset/init", {
            email: this.emailResetPassword,
          });
          if (response.status === 200) {
            this.closeLoadingDialog();
            this.resetPasswordLinkSentPage = true;
            this.forgotPasswordPage = false;
            this.loginPage = false;
          }
        } catch (error) {
          console.log(error.response.data);
        }
      }
    },

    async submitResetPassword(token, password) {
      try {
        const response = await axios.post("/auth/password/reset", {
          token,
          password,
        });
        if (response.status === 200) {
          this.resetPasswordForm = true;
        }
      } catch (error) {
        console.log(error.response.data);
      }
    },
  },
});
