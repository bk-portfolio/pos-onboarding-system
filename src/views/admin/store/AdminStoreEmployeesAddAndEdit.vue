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
        <button @click="$router.push('/adminStoreEmployees')" class="btn px-0">
          &lt; <u>back</u>
        </button>
      </div>
    </div>
    <admin-store-employees-add-and-edit-form class="woosh-bg-primary" />
    <InformationDialog
      :dialog="this.store.informationDialog"
      @close-dialog="this.store.closeInformationDialog" />
  </div>
</template>

<script>
import AdminStoreEmployeesAddAndEditForm from "./components/AdminStoreEmployeesAddAndEditForm.vue";
import AdminStoreSubHeader from "./components/AdminStoreSubHeader.vue";
import InformationDialog from "./../../../components/InformationDialog.vue";
import { useStoreStore } from "./../../../stores/StoreStore.js";

export default {
  name: "Admin Store Employees Add And Edit",
  components: {
    AdminStoreEmployeesAddAndEditForm,
    AdminStoreSubHeader,
    InformationDialog,
  },
  setup() {
    const store = useStoreStore();
    return { store };
  },
  data() {
    return {
      pageName: "Employee",
      addOrEditPage: localStorage.getItem("addOrEditPage"),
    };
  },
};
</script>
