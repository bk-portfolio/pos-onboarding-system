<template>
  <div class="w-50">
    <form class="">
      <fieldset class="border-0">
        <legend class="fw-bold fs-5 mb-3 d-flex justify-content-center">
          Reset password
        </legend>
        <div v-for="(pass, index) in password" :key="pass.key" class="password">
          <k-input
            v-model="pass.value"
            :type="pass.type"
            :name="pass.name"
            :label="pass.name"
            :min-length="2"
            :required="true"
            :placeholder="'password'"
            class="fw-bold">
          </k-input>
          <div @click="ShowHidePassword(index)" class="showHide">
            <img :src="pass.icon" alt="icon" />
          </div>
        </div>
        <div class="mt-4 d-flex justify-content-end align-items-center">
          <k-button
            @click.prevent="saveData()"
            class="mx-2 rounded-0 text-white fs-6 px-5 py-3 fw-bold border-0">
            Reset
          </k-button>
        </div>
      </fieldset>
    </form>
  </div>
</template>
<script>
import { DropDownList } from "@progress/kendo-vue-dropdowns";
import "@progress/kendo-theme-default/dist/all.css";
import eyeSlash from "./../../../assets/img/eyeSlash.svg";
import eye from "./../../../assets/img/eye.svg";
import { useLoginStore } from "./../../../stores/LoginStore";

export default {
  name: "Login Reset Password Form",
  components: {
    dropdownlist: DropDownList,
  },
  emits: ["submitResetPassword"],
  setup() {
    const store = useLoginStore();
    return {
      store,
    };
  },
  data: function () {
    return {
      password: [
        {
          name: "Password",
          type: "Password",
          icon: eyeSlash,
          value: "",
        },
        {
          name: "Confirm Password",
          type: "Password",
          icon: eyeSlash,
          value: "",
        },
      ],
    };
  },
  methods: {
    saveData() {
      const pass = this.password;
      if (pass[0].value == pass[1].value) {
        this.store.submitResetPassword(this.$route.query.token, pass[0].value);
      } else {
        this.store.openInformationDialog("Password doesn't match");
      }
    },
    ShowHidePassword(index) {
      if (this.password[index].type == "Password") {
        this.password[index].type = "text";
        this.password[index].icon = eye;
      } else {
        this.password[index].type = "Password";
        this.password[index].icon = eyeSlash;
      }
    },
    async checkToken() {
      try {
        const response = await this.$http.post("/auth/token/check", {
          token: this.$route.query.token,
        });
        if (response.data === false) {
          this.store.openInformationDialog(
            "Invalid Token",
            "You can request a new link by going to the Forgot Password page"
          );
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error.response.data);
      }
    },
  },
  mounted() {
    this.checkToken();
  },
};
</script>
