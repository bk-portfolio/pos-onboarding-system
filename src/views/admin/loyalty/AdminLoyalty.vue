<template>
  <div class="layout__admin--product container-fluid h-100">
    <admin-loyalty-header />
    <div class="row h-90 scroll--vertical">
      <admin-loyalty-table />
    </div>
  </div>
</template>

<script>
import AdminLoyaltyTable from "./components/AdminLoyaltyTable.vue";
import AdminLoyaltyHeader from "./components/AdminLoyaltyHeader.vue";

export default {
  name: "Admin Loyalty",
  components: {
    AdminLoyaltyHeader,
    AdminLoyaltyTable,
  },
};
</script>
