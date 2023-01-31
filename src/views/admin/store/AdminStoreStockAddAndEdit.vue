<template>
  <div class="h-100">
    <!--  User Header  -->
    <AdminStoreSubHeader
      v-if="!$root.userInfo.is_admin"
      :pageName="pageName"
      :addOrEditPage="addOrEditPage" />
    <!--  Woosh Food Admin Header  -->
    <div
      v-if="$root.userInfo.is_admin"
      class="row h-10 px-4 align-items-center">
      <div class="col-auto px-5">
        <button @click="$router.push('/adminStoreStock')" class="btn px-0">
          &lt; <u>back</u>
        </button>
      </div>
    </div>
    <admin-store-stock-add-and-edit-form class="woosh-bg-primary" />
  </div>
</template>

<script>
import AdminStoreStockAddAndEditForm from "./components/AdminStoreStockAddAndEditForm.vue";
import AdminStoreSubHeader from "./components/AdminStoreSubHeader.vue";
import { useStoreStore } from "./../../../stores/StoreStore.js";

export default {
  name: "Admin Store Stock Add And Edit",
  components: {
    AdminStoreStockAddAndEditForm,
    AdminStoreSubHeader,
  },
  setup() {
    const store = useStoreStore();
    return { store };
  },
  data() {
    return {
      pageName: "Stock",
      addOrEditPage: localStorage.getItem("addOrEditPage"),
    };
  },
};
</script>
