<template>
  <div class="row m-0 p-0 h-100 scroll--vertical">
    <div class="col-xl-6 p-0 h-100 col-12">
      <div class="row m-0 h-90 p-5">
        <div class="col">
          <admin-store-details-forms />
        </div>
      </div>
    </div>
    <div class="col-xl-6 p-0 h-100 col-12">
      <div class="row m-0 px-5">
        <div class="col">
          <admin-store-business-details-logo />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminStoreDetailsForms from "./components/AdminStoreDetailsForms.vue";
import AdminStoreBusinessDetailsLogo from "./components/AdminStoreBusinessDetailsLogo.vue";

export default {
  name: "Admin Store Details",
  components: {
    AdminStoreDetailsForms,
    AdminStoreBusinessDetailsLogo,
  },
  data() {
    return {};
  },
};
</script>
