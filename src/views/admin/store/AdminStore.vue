<template>
  <div class="layout__admin--product container-fluid h-100">
    <admin-store-header :listMenu="listMenu" />
    <div class="row h-90 scroll--vertical woosh-bg-primary">
      <router-view />
    </div>
  </div>
</template>

<script>
import AdminStoreHeader from "./components/AdminStoreHeader.vue";
import { useStoreStore } from "./../../../stores/StoreStore.js";
import { usePackagesStore } from "./../../../stores/PackagesStore.js";
export default {
  name: "Admin Store",
  components: {
    AdminStoreHeader,
  },
  setup() {
    const store = useStoreStore();
    const pack = usePackagesStore();
    return { store, pack };
  },
  computed: {
    listMenu() {
      return this.pack.storeMenu;
    }
  },
  mounted() {
    this.pack.updateStoreMenu();
  }
};
</script>
