<template>
  <div class="row m-0 p-0 h-100">
    <div class="col-xl-6 p-0 h-100 col-12 px-5 pt-5">
      <div class="row m-0 h-90 p-5 scroll--vertical">
        <div class="col d-flex justify-content-center align-items-center">
          <LoginResetPasswordForm v-if="!store.resetPasswordForm" />
          <LoginResetPasswordSuccess v-if="store.resetPasswordForm" />
        </div>
      </div>
    </div>
    <div class="col-xl-6 p-0">
      <div class="layout__main--background"></div>
    </div>
    <information-dialog
      :dialog="store.informationDialog"
      @close-dialog="store.closeInformationDialog" />
  </div>
</template>

<script>
import LoginResetPasswordForm from "./components/LoginResetPasswordForm.vue";
import LoginResetPasswordSuccess from "./components/LoginResetPasswordSuccess.vue";
import { useLoginStore } from "../../stores/LoginStore";

export default {
  name: "Login Reset Password",
  setup() {
    const store = useLoginStore();
    return { store };
  },
  data() {
    return {};
  },
  components: {
    LoginResetPasswordForm,
    LoginResetPasswordSuccess,
  },
  methods: {},
};
</script>
