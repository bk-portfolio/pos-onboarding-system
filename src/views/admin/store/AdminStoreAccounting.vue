<template>
  <div class="row m-0 p-0 h-100">
    <div class="col-xl-6 p-0 h-100 col-12">
      <div class="row m-0 h-90 p-5">
        <div class="col">
          <admin-store-accounting-form />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminStoreAccountingForm from "./components/AdminStoreAccountingForm.vue";

export default {
  name: "Admin Store Accounting",
  components: {
    AdminStoreAccountingForm,
  },
};
</script>
