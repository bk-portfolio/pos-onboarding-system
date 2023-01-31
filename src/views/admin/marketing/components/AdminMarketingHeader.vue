<template>
  <div class="row h-10">
    <div class="col px-4">
      <div
        class="row h-100 align-items-center border-bottom border-1 border-secondary">
        <div class="col-auto ps-0 pe-5 d-flex">
          <div class="pe-2">
            <img
              src="./../../../../assets/img/marketing.svg"
              alt="icon product" />
          </div>
          <div class="fs-5 fw-bold">Marketing</div>
        </div>
        <div class="col"></div>
        <div v-if="!$root.userInfo.is_admin" class="col-auto px-0">
          <k-button
            @click="addOrEditMarketing"
            class="rounded-0"
            :theme-color="'primary'">
            Save
          </k-button>
        </div>
      </div>
    </div>
  </div>
  <InformationDialog
    :dialog="this.store.informationDialog"
    @close-dialog="this.store.closeInformationDialog" />
</template>

<script>
import { useMarketingStore } from "./../../../../stores/MarketingStore.js";
import InformationDialog from "./../../../../components/InformationDialog.vue";
export default {
  name: "Admin Marketing Header",
  components: {
    InformationDialog,
  },
  setup() {
    const store = useMarketingStore();
    return { store };
  },
  methods: {
    addOrEditMarketing() {
      if (this.store.marketingDetails.id) {
        this.store.postUpdateMarketingDetails();
      } else {
        this.store.postCreateMarketingDetails();
      }
    },
  },
};
</script>
