<template>
  <div class="col h-100 py-4 px-5">
    <admin-store-delivery-form />
  </div>
</template>

<script>
import AdminStoreDeliveryForm from "./components/AdminStoreDeliveryForm.vue";

export default {
  name: "Admin Store Pos",
  components: {
    AdminStoreDeliveryForm,
  },
};
</script>
