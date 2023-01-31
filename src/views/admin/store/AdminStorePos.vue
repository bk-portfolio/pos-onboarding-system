<template>
  <div class="col h-100 py-4 px-5">
    <admin-store-pos-table />
  </div>
</template>

<script>
import AdminStorePosTable from "./components/AdminStorePosTable.vue";

export default {
  name: "Admin Store Pos",
  components: {
    AdminStorePosTable,
  },
};
</script>
