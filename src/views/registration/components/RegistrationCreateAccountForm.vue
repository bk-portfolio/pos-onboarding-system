<template>
  <div class="w-50">
    <legend class="fw-bold fs-5 mb-3 d-flex justify-content-center">
      Create an account
    </legend>
    <div>
      <k-input
        v-model="signUp.email"
        :name="'email'"
        :label="'Email'"
        :min-length="2"
        :required="true"
        :placeholder="'Email@email.com'"
        class="fw-bold">
      </k-input>
    </div>
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
    <div class="d-flex justify-content-end mt-4">
      <k-button
        @click="saveData()"
        class="mx-2 rounded-0 text-white fs-6 px-5 py-3 fw-bold border-0">
        Register
      </k-button>
    </div>
  </div>
</template>

<script>
import eyeSlash from "./../../../assets/img/eyeSlash.svg";
import eye from "./../../../assets/img/eye.svg";

export default {
  name: "Registration Create Account Forms",
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
      signUp: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ShowHidePassword(index) {
      if (this.password[index].type == "Password") {
        this.password[index].type = "text";
        this.password[index].icon = eye;
      } else {
        this.password[index].type = "Password";
        this.password[index].icon = eyeSlash;
      }
    },
    saveData() {
      const pass = this.password;
      if (pass[0].value == pass[1].value) {
        this.signUp.password = pass[0].value;
        this.sendData();
      } else {
        alert("Password doesn't match");
      }
    },
    sendData() {
      this.$emit("postSignup", this.signUp);
    },
  },
  created() {
    localStorage.clear();
  },
};
</script>
