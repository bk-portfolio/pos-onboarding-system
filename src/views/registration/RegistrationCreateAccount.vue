<template>
  <div class="row m-0 p-0 h-100">
    <div class="col-xl-6 p-0 h-100 col-12 px-5 pt-5">
      <div class="row m-0 h-90 p-5 scroll--vertical">
        <div class="col d-flex justify-content-center align-items-center">
          <RegistrationCreateAccountForm
            @post-signup="postSignup"
            v-if="!isSuccess" />
          <RegistrationCreateAccountSuccess
            class="text-center"
            v-if="isSuccess" />
        </div>
      </div>
    </div>
    <div class="col-xl-6 p-0">
      <div class="layout__main--background"></div>
    </div>
  </div>
</template>

<script>
import RegistrationCreateAccountForm from "./components/RegistrationCreateAccountForm.vue";
import RegistrationCreateAccountSuccess from "./components/RegistrationCreateAccountSuccess.vue";

export default {
  name: "Registration Create Account",
  data() {
    return {
      isSuccess: false,
    };
  },
  components: {
    RegistrationCreateAccountForm,
    RegistrationCreateAccountSuccess,
  },
  methods: {
    async postSignup(data) {
      try {
        const response = await this.$http.post("/auth/signup", data);
        if (response.status == 200) {
          this.isSuccess = true;
        }
      } catch (error) {
        alert(error.response.data);
      }
    },
  },
};
</script>
