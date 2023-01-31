<template>
  <div class="h-100 py-4 px-5">
    <admin-store-trading-hours-table class="w-100" />
  </div>
</template>

<script>
import AdminStoreTradingHoursTable from "./components/AdminStoreTradingHoursTable.vue";

export default {
  name: "Admin Store Trading Hours",
  components: {
    AdminStoreTradingHoursTable,
  },
};
</script>
