<template>
  <div class="">
    <p class="mb-5 fw-bold fs-5">Select a package</p>
    <form action="">
      <div
        v-for="pack in packageList"
        :key="pack.key"
        class="row px-4 py-4 mb-4"
        style="border: solid; border-color: #c96340; color: #c96340">
        <div class="col-1 d-flex align-items-center me-0">
          <k-radio-button
            :name="'packageGroup'"
            :value="pack"
            :id="pack.name"
            :checked="pack.id === store.businessDetails.packages"
            @change="selectPack" />
        </div>
        <label class="col" :for="pack.name">
          <i class="mb-3 fw-bold">{{ pack.name }}</i>
          <br />
          <i class="lh-base">{{ pack.description }}</i>
        </label>
      </div>
    </form>
  </div>
</template>

<script>
import { useStoreStore } from "./../../../stores/StoreStore.js";

export default {
  name: "Registration Select Package Pack",
  setup() {
    const store = useStoreStore();
    return { store };
  },
  data() {
    return {
      packageList: [{ id: null, name: "", description: "", features: [] }],
      selectedPack: 2,
    };
  },
  methods: {
    selectPack(event) {
      this.store.businessDetails.packages = event.value.id;
      this.store.selectedPackageName = event.value.name;
    },
    async fetchPackageList() {
      const response = await this.$http.get("/package/list");
      this.packageList = response.data;
    },
    checkIfUserHaveFilledBusinessDetails() {
      let x = JSON.parse(localStorage.getItem("userInfo")).business_id;
      let check = false;
      if (
        this.store.businessDetails.restaurant_name !== "" ||
        this.store.businessDetails.company_name !== "" ||
        this.store.businessDetails.address !== "" ||
        this.store.businessDetails.phone_number !== "" ||
        this.store.businessDetails.email !== "" ||
        this.store.businessDetails.company_logo !== "" ||
        this.store.businessDetails.invoice_logo !== "" ||
        this.store.businessDetails.packages !== null ||
        this.store.businessDetails.abn !== ""
      ) {
        check = true;
      }
      if (
        (!x && check === false) ||
        Object.keys(this.store.businessDetails).length === 0
      ) {
        this.store.businessDetails = {
          restaurant_name: "",
          company_name: "",
          address: "",
          phone_number: "",
          email: "",
          company_logo: "",
          invoice_logo: "",
          packages: null,
          abn: "",
        };
      }
    },
  },
  created() {
    this.checkIfUserHaveFilledBusinessDetails();
  },
  mounted() {
    this.fetchPackageList();
  },
};
</script>
