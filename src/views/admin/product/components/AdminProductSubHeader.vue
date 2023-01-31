<template>
    <div class="row h-10 px-4 align-items-center">
      <div class="col ps-0 pe-5 d-flex">
        <div class="pe-2">
          <img src="./../../../../assets/img/products.svg" alt="icon {product}" />
        </div>
        <div class="fs-5 fw-bold">{{addOrEditPage}} {{pageName}}</div>
      </div>
      <div class="col-auto">
        <k-button
            @click="backToMainProductPage()"
            class="k-button--secondary rounded-0"
            :theme-color="'primary'"
        >
          Cancel
        </k-button>
      </div>
      <div class="col-auto px-0">
        <k-button @click="saveData()" class="rounded-0" :theme-color="'primary'">
          Save {{pageName}}
        </k-button>
      </div>
    </div>
</template>

<script>
import {useProductStore} from './../../../../stores/ProductStore.js';
export default {
    name: "Admin Product Header",
    props: {
        pageName: String,
        addOrEditPage: String
    },
    data() {
      return {
      };
    },
    methods: {
      backToMainProductPage() {
        this.$emit('cancel');
        useProductStore().backToMainProductPage();
      },
      saveData() {
        this.$emit('saveData');
      }
    }
}
</script>