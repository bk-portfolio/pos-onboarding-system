<template>
  <div class="text-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      fill="#C96340"
      class="bi bi-patch-check-fill"
      viewBox="0 0 16 16">
      <path
        d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
    </svg>
    <p class="mt-5 fw-bold fs-5">Password reset succesfully</p>
    <p class="mt-4 fs-5">Login to access your account</p>
    <k-button
      @click="toLoginPage"
      class="mx-2 rounded-0 text-white fs-6 px-5 py-3 fw-bold border-0 mt-5">
      Login
    </k-button>
  </div>
</template>

<script>
export default {
  name: "Login Reset Password Success",
  methods: {
    toLoginPage() {
      this.$router.push({ path: "/login" });
    },
  },
};
</script>
