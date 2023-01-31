<template>
  <div class="col h-100 py-4">
    <admin-store-employees-table />
  </div>
</template>

<script>
import AdminStoreEmployeesTable from "./components/AdminStoreEmployeesTable.vue";

export default {
  name: "Admin Store Employees",
  components: {
    AdminStoreEmployeesTable,
  },
};
</script>
