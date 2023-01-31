<template>
  <div class="row h-10">
    <div class="col px-4">
      <div
        class="row h-100 align-items-center border-bottom border-1 border-secondary"
      >
        <div class="col-auto ps-0 pe-5 d-flex">
          <div class="pe-2">
            <img src="./../../../../assets/img/store.svg" alt="icon product" />
          </div>
          <div class="fs-5 fw-bold">Loyalty</div>
        </div>
        <div class="col"></div>
        <div v-if="!$root.userInfo.is_admin" class="col-auto px-0">
          <k-button
            @click="goToAddPage()"
            class="rounded-0 fw-fold"
            :theme-color="'primary'"
          >
            Add Loyalty
          </k-button>
        </div>
      </div>
    </div>
  </div>
  <!-- <InformationDialog
    :dialog="this.store.informationDialog"
    @close-dialog="this.store.closeInformationDialog"
  /> -->
</template>

<script>
import { useLoyaltyStore } from "./../../../../stores/LoyaltyStore";
// import InformationDialog from "./../../../../components/InformationDialog.vue";

export default {
  name: "Admin Loyalty Header",
  components: {
    // InformationDialog,
  },
  setup() {
    const store = useLoyaltyStore();
    return { store };
  },
  data() {
    return {};
  },
  methods: {
    goToAddPage() {
      this.store.loyaltyDetails = this.store.addLoyalty;
      localStorage.setItem("addOrEditPage", "Add New");
      this.$router.push("/adminLoyaltyAddAndEdit");
    },
  },
};
</script>
