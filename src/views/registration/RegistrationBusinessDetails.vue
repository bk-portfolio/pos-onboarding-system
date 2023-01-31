<template>
  <div class="row m-0 p-0 h-100">
    <div class="col-xl-6 p-0 h-100 col-12 px-5 pt-5">
      <div class="row m-0 h-90 p-5 scroll--vertical">
        <div class="col">
          <AdminStoreDetailsFormsVue />
          <AdminStoreBusinessDetailsLogoVue />
        </div>
      </div>
      <div class="row m-0 h-10 px-5 align-items-center">
        <div class="col my-auto">
          <RegistrationFooter :back="'/registrationSelectPackage'">
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
import AdminStoreBusinessDetailsLogoVue from "../admin/store/components/AdminStoreBusinessDetailsLogo.vue";
import AdminStoreDetailsFormsVue from "../admin/store/components/AdminStoreDetailsForms.vue";
import RegistrationFooter from "./components/RegistrationFooter.vue";

export default {
  name: "Registration Business Details",
  components: {
    AdminStoreDetailsFormsVue,
    AdminStoreBusinessDetailsLogoVue,
    RegistrationFooter,
  },
  methods: {},
};
</script>
