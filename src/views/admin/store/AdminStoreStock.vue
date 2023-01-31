<template>
  <div class="col h-100 py-4">
    <admin-store-stock-table />
  </div>
</template>

<script>
import AdminStoreStockTable from "./components/AdminStoreStockTable.vue";

export default {
  name: "Admin Store Stock",
  components: {
    AdminStoreStockTable,
  },
};
</script>
