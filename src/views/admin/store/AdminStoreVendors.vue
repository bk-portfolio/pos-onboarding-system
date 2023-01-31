<template>
  <div class="col h-100 py-4">
    <admin-store-vendors-table />
  </div>
</template>

<script>
import AdminStoreVendorsTable from "./components/AdminStoreVendorsTable.vue";

export default {
  name: "Admin Store Vendors",
  components: {
    AdminStoreVendorsTable,
  },
};
</script>
