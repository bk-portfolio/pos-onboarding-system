<template>
  <div class="h-100">
    <!--  User Header  -->
    <AdminLoyaltySubHeader
      v-if="!$root.userInfo.is_admin"
      :pageName="pageName"
      :addOrEditPage="addOrEditPage" />
    <!--  Woosh Food Admin Header  -->
    <div v-if="$root.userInfo.is_admin" class="row m-0 h-10 align-items-center">
      <div class="col-auto px-4">
        <button @click="$router.push('/adminLoyalty')" class="btn px-0">
          &lt; <u>back</u>
        </button>
      </div>
    </div>

    <admin-loyalty-add-and-edit-form class="woosh-bg-primary" />
  </div>
</template>

<script>
import AdminLoyaltyAddAndEditForm from "./components/AdminLoyaltyAddAndEditForm.vue";
import AdminLoyaltySubHeader from "./components/AdminLoyaltySubHeader.vue";

export default {
  name: "Admin Loyalty Add And Edit",
  components: {
    AdminLoyaltySubHeader,
    AdminLoyaltyAddAndEditForm,
  },
  data() {
    return {
      pageName: "Loyalty",
      addOrEditPage: localStorage.getItem("addOrEditPage"),
    };
  },
};
</script>
