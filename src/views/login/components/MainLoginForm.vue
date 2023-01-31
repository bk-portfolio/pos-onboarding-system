<template>
  <div class="w-50">
    <form class="" @submit.prevent="postLogin()">
      <fieldset class="border-0">
        <legend class="fw-bold fs-5 mb-3 d-flex justify-content-center">
          Login
        </legend>
        <div class="">
          <k-input
            :name="'email'"
            :label="'Email'"
            :min-length="2"
            :placeholder="'Email@email.com'"
            type="text"
            v-model="form.email"
            class="fw-bold k-textbox">
          </k-input>
          <div class="pre-icon os-icon os-icon-email-2-at2"></div>
          <!-- Error Message -->
          <!--          <div-->
          <!--            class="input-errors"-->
          <!--            v-for="(error, index) of v$.form.email.$errors"-->
          <!--            :key="index">-->
          <!--            <div class="error-msg" style="color: #9b4a2e; font-size: small">-->
          <!--              <svg-->
          <!--                xmlns="http://www.w3.org/2000/svg"-->
          <!--                width="16"-->
          <!--                height="16"-->
          <!--                fill="currentColor"-->
          <!--                class="bi bi-exclamation-triangle-fill me-1"-->
          <!--                viewBox="0 0 16 16">-->
          <!--                <path-->
          <!--                  d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />-->
          <!--              </svg>-->
          <!--              {{ error.$message }}-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
        <div class="password">
          <k-input
            :type="password.type"
            :name="'password'"
            :label="'Password'"
            :min-length="2"
            :placeholder="'password'"
            v-model="form.password"
            class="fw-bold">
          </k-input>
          <!--            v-model="v$.form.password.$model"-->
          <div @click="ShowHidePassword()" class="showHide">
            <img :src="password.icon" alt="icon" />
          </div>
          <div class="pre-icon os-icon os-icon-fingerprint"></div>
          <!-- Error Message -->
          <!--          <div-->
          <!--            class="input-errors"-->
          <!--            v-for="(error, index) of v$.form.password.$errors"-->
          <!--            :key="index">-->
          <!--            <div class="error-msg" style="color: #9b4a2e; font-size: small">-->
          <!--              <svg-->
          <!--                xmlns="http://www.w3.org/2000/svg"-->
          <!--                width="16"-->
          <!--                height="16"-->
          <!--                fill="currentColor"-->
          <!--                class="bi bi-exclamation-triangle-fill me-1"-->
          <!--                viewBox="0 0 16 16">-->
          <!--                <path-->
          <!--                  d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />-->
          <!--              </svg>-->
          <!--              {{ error.$message }}-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
        <div class="mt-4 d-flex justify-content-between align-items-center">
          <a
            v-if="!store.forgotPasswordPage"
            @click.prevent="store.showForgotPasswordPage"
            style="text-decoration: underline; cursor: pointer"
            >Forgot password?</a
          >
          <k-button
            type="submit"
            class="mx-2 rounded-0 text-white fs-6 px-5 py-3 fw-bold border-0">
            Login
          </k-button>
        </div>
      </fieldset>
    </form>
    <information-dialog
      :dialog="this.store.informationDialog"
      @close-dialog="this.store.closeInformationDialog" />
  </div>
</template>
<script>
import { DropDownList } from "@progress/kendo-vue-dropdowns";
import "@progress/kendo-theme-default/dist/all.css";
// import useVuelidate from "@vuelidate/core";
// import { required, helpers } from "@vuelidate/validators";
import eye from "./../../../assets/img/eye.svg";
import eyeSlash from "./../../../assets/img/eyeSlash.svg";
import { useLoginStore } from "../../../stores/LoginStore";

export default {
  name: "Main Login Form",
  setup() {
    const store = useLoginStore();
    return { store };
  },
  components: {
    dropdownlist: DropDownList,
  },
  props: ["forgotPasswordPage"],
  emits: ["showForgotPasswordPage"],
  data: function () {
    return {
      password: {
        type: "Password",
        icon: eyeSlash,
      },
      forgotPassword: false,
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ShowHidePassword(index) {
      if (this.password.type == "Password") {
        this.password.type = "text";
        this.password.icon = eye;
      } else {
        this.password.type = "Password";
        this.password.icon = eyeSlash;
      }
    },
    toForgotPasswordPage() {
      this.$emit("showForgotPasswordPage");
    },
    postLogin() {
      this.$emit("postLogin", this.form);
    },
  },
  created() {
    localStorage.clear();
  },
  // setup() {
  //   return { v$: useVuelidate() };
  // },
  // validations() {
  //   return {
  //     form: {
  //       email: {
  //         required: helpers.withMessage("Email field empty", required),
  //       },
  //       password: {
  //         required: helpers.withMessage("Password field empty", required),
  //       },
  //     },
  //   };
  // },
};
</script>
