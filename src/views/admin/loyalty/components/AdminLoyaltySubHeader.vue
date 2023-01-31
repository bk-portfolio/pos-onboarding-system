<template>
  <div class="row h-10 px-4 align-items-center">
    <div class="col ps-0 pe-5 d-flex">
      <div class="pe-2">
        <img src="./../../../../assets/img/store.svg" alt="icon {product}" />
      </div>
      <div class="fs-5 fw-bold">{{ addOrEditPage }} {{ pageName }}</div>
    </div>
    <div class="col-auto">
      <k-button
        @click="cancelButton()"
        class="k-button--secondary rounded-0"
        :theme-color="'primary'">
        Cancel
      </k-button>
    </div>
    <div class="col-auto px-0">
      <k-button @click="saveData()" class="rounded-0" :theme-color="'primary'">
        Save {{ pageName }}
      </k-button>
    </div>
  </div>
</template>

<script>
import { useLoyaltyStore } from "./../../../../stores/LoyaltyStore";
export default {
  name: "Admin Loyalty Sub Header",
  props: {
    pageName: String,
    addOrEditPage: String,
  },
  setup() {
    const store = useLoyaltyStore();
    return { store };
  },
  data() {
    return {};
  },
  methods: {
    saveData() {
      if (localStorage.getItem("addOrEditPage") === "Edit") {
        this.store.postUpdateLoyalty();
      } else {
        this.store.postCreateLoyalty();
      }
    },
    cancelButton() {
      localStorage.removeItem("loyaltyDetails");
      this.$router.push("/adminLoyalty");
    },
  },
};
</script>
