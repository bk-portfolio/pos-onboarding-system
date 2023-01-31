<template>
  <div class="layout__main--navbar">
    <RegistrationHeader />
  </div>
  <div class="layout__main--body">
    <router-view />
  </div>
</template>

<script>
import RegistrationHeader from "./../../components/RegistrationHeader.vue";

export default {
  name: "The Login",
  components: {
    RegistrationHeader,
  },
};
</script>
