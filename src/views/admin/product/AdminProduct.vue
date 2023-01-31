<template>
  <div class="layout__admin--product container-fluid h-100">
    <admin-product-header :listMenu="listMenu" />

    <div class="row h-90 scroll--vertical">
      <router-view />
    </div>
  </div>
</template>

<script>
import AdminProductHeader from "./components/AdminProductHeader.vue"
export default {
  name: "Admin Products",
  components: {
    AdminProductHeader
  },
  data() {
    return {
      listMenu: [
        {name:"Product",link:"/adminProductList"},
        {name:"Manage Product Categories",link:"/adminProductManageCategory"},
      ]
    };
  },
};
</script>
