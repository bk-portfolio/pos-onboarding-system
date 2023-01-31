<template>
    <div class="row h-10">
      <div class="col px-4">
        <div class="row h-100 align-items-center border-bottom border-1 border-secondary">
          <div class="col-auto ps-0 pe-5 d-flex">
            <div class="pe-2"><img src="./../../../../assets/img/products.svg" alt="icon product" /></div>
            <div class="fs-5 fw-bold">Products</div>
          </div>
          <router-link 
            v-for="menu in listMenu" :key="menu.key" :to="menu.link"
            class="col-auto py-2 fs-8 fw-bold"
          >
            {{menu.name}}
          </router-link>
          <div class="col"></div>
          <div v-if="pageName === 'Product'" class="col-3">
            <k-input
                placeholder="Search"
                inputClass="text-end"
                class="border"
                v-model="search"
            >
            </k-input>
          </div>
          <div v-if="!$root.userInfo.is_admin" class="col-auto px-0">
            <k-button @click="goToAddPage()" class="rounded-0" :theme-color="'primary'">
              Add {{pageName}}
            </k-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {useProductStore} from './../../../../stores/ProductStore.js';
export default {
    name: "Admin Product Header",
    props: {
        listMenu: Array
    },
    data() {
      return {
        search:""
      };
    },
    watch: {
      search(newVal) {
        this.deBounce(this.searchingData,500,newVal)
      }
    },
    computed: {
      pageName() {
        return useProductStore().pageName;
      }
    },
    methods: {
      goToAddPage() {
        localStorage.setItem('addOrEditPage', 'Add New');
        useProductStore().goToAddOrEditPage();
      },
      searchingData(name) {
        useProductStore().searchProduct(name);
      },
      deBounce(func, timeout, params) {
        clearTimeout(this.$root.timer);
        this.$root.timer = setTimeout(() => {
          if (params != undefined) {
            func(params);
          } else {
            func();
          }
        }, timeout);
      },
    }
}
</script>