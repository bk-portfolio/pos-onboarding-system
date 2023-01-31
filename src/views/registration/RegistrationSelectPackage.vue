<template>
  <div class="row m-0 p-0 h-100">
    <div class="col-xl-6 p-0 h-100 col-12 px-5 pt-5">
      <div class="row m-0 h-90 p-5 scroll--vertical">
        <div class="col">
          <RegistrationSelectPackagePack />
        </div>
      </div>
      <div class="row m-0 h-10 px-5 align-items-center">
        <div class="col my-auto">
          <RegistrationFooter :next="'/registrationBusinessDetails'">
          </RegistrationFooter>
        </div>
      </div>
    </div>
    <div class="col-xl-6 p-0">
      <div class="layout__main--background"></div>
    </div>
  </div>
</template>

<script>
import RegistrationSelectPackagePack from "./components/RegistrationSelectPackagePack.vue";
import RegistrationFooter from "./components/RegistrationFooter.vue";

export default {
  name: "Registration Select Package",
  data() {
    return {};
  },
  components: {
    RegistrationSelectPackagePack,
    RegistrationFooter,
  },
  methods: {},
};
</script>
