<template>
  <div class="row h-10 px-4 align-items-center">
    <div class="col ps-0 pe-5 d-flex">
      <div class="pe-2">
        <img src="./../../../../assets/img/store.svg" alt="icon {product}" />
      </div>
      <div v-if="$root.userInfo" class="fs-5 fw-bold">
        {{ addOrEditPage }} {{ pageName }}
      </div>
    </div>
    <div class="col-auto">
      <k-button
        @click="backToMainProductPage()"
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
import { useStoreStore } from "./../../../../stores/StoreStore.js";
export default {
  name: "Admin Store Sub Header",
  props: {
    pageName: String,
    addOrEditPage: String,
  },
  setup() {
    const store = useStoreStore();
    return { store };
  },
  data() {
    return {};
  },
  methods: {
    backToMainProductPage() {
      if (this.$route.path === "/adminStoreEmployeesAddAndEdit") {
        localStorage.removeItem("employeeDetails");
        this.store.$reset();
        this.$router.push("/adminStoreEmployees");
      } else if (this.$route.path === "/adminStoreVendorsAddAndEdit") {
        localStorage.removeItem("vendorDetails");
        this.store.$reset();
        this.$router.push("/adminStoreVendors");
      } else if (this.$route.path === "/adminStoreStockAddAndEdit") {
        localStorage.removeItem("stockLocationDetails");
        this.store.$reset();
        this.$router.push("/adminStoreStock");
      }
    },
    saveData() {
      if (this.$route.path === "/adminStoreEmployeesAddAndEdit") {
        if (localStorage.getItem("addOrEditPage") === "Edit") {
          this.store.checkMandatoryFieldsEmployee();
          let check = false;
          if (
            this.store.mandatoryFieldBoxEmployee.name === true ||
            this.store.mandatoryFieldBoxEmployee.email === true ||
            this.store.mandatoryFieldBoxEmployee.phone === true ||
            this.store.mandatoryFieldBoxEmployee.mobile === true ||
            this.store.mandatoryFieldBoxEmployee.department === true ||
            this.store.mandatoryFieldBoxEmployee.gender === true ||
            this.store.mandatoryFieldBoxEmployee.dob === true ||
            this.store.mandatoryFieldBoxEmployee.country === true
          ) {
            this.store.openInformationDialog(
              "Please fill in all mandatory fields"
            );
            check = true;
          }
          if (check === false) {
            this.store.postEditEmployee();
          }
        } else {
          this.store.checkMandatoryFieldsEmployee();
          let check = false;
          if (
            this.store.mandatoryFieldBoxEmployee.name === true ||
            this.store.mandatoryFieldBoxEmployee.email === true ||
            this.store.mandatoryFieldBoxEmployee.phone === true ||
            this.store.mandatoryFieldBoxEmployee.mobile === true ||
            this.store.mandatoryFieldBoxEmployee.department === true ||
            this.store.mandatoryFieldBoxEmployee.gender === true ||
            this.store.mandatoryFieldBoxEmployee.dob === true ||
            this.store.mandatoryFieldBoxEmployee.country === true
          ) {
            this.store.openInformationDialog(
              "Please fill in all mandatory fields"
            );
            check = true;
          }
          if (check === false) {
            this.store.postCreateEmployee();
          }
        }
      } else if (this.$route.path === "/adminStoreVendorsAddAndEdit") {
        if (localStorage.getItem("addOrEditPage") === "Edit") {
          this.store.checkMandatoryFieldsVendor();
          let check = false;
          if (
            this.store.mandatoryFieldBoxVendor.name === true ||
            this.store.mandatoryFieldBoxVendor.email === true ||
            this.store.mandatoryFieldBoxVendor.phone === true ||
            this.store.mandatoryFieldBoxVendor.mobile === true ||
            this.store.mandatoryFieldBoxVendor.street === true ||
            this.store.mandatoryFieldBoxVendor.zip === true ||
            this.store.mandatoryFieldBoxVendor.city === true ||
            this.store.mandatoryFieldBoxVendor.state === true ||
            this.store.mandatoryFieldBoxVendor.country === true
          ) {
            this.store.openInformationDialog(
              "Please fill in all mandatory fields"
            );
            check = true;
          }
          if (check === false) {
            this.store.postEditVendor();
          }
        } else {
          this.store.checkMandatoryFieldsVendor();
          let check = false;
          if (
            this.store.mandatoryFieldBoxVendor.name === true ||
            this.store.mandatoryFieldBoxVendor.email === true ||
            this.store.mandatoryFieldBoxVendor.phone === true ||
            this.store.mandatoryFieldBoxVendor.mobile === true ||
            this.store.mandatoryFieldBoxVendor.street === true ||
            this.store.mandatoryFieldBoxVendor.zip === true ||
            this.store.mandatoryFieldBoxVendor.city === true ||
            this.store.mandatoryFieldBoxVendor.state === true ||
            this.store.mandatoryFieldBoxVendor.country === true
          ) {
            this.store.openInformationDialog(
              "Please fill in all mandatory fields"
            );
            check = true;
          }
          if (check === false) {
            this.store.postCreateVendor();
          }
        }
      } else if (this.$route.path === "/adminStoreStockAddAndEdit") {
        if (localStorage.getItem("addOrEditPage") === "Edit") {
          this.store.checkMandatoryFieldsStockLocation();
          let check = false;
          if (
            this.store.mandatoryFieldBoxStockLocation.name === true ||
            this.store.mandatoryFieldBoxStockLocation.type === true ||
            this.store.mandatoryFieldBoxStockLocation.parent_location ===
              true ||
            this.store.mandatoryFieldBoxStockLocation.removal_strategy === true
          ) {
            this.store.openInformationDialog(
              "Please fill in all mandatory fields"
            );
            check = true;
          }
          if (check === false) {
            this.store.postEditStockLocation();
          }
        } else {
          this.store.checkMandatoryFieldsStockLocation();
          let check = false;
          if (
            this.store.mandatoryFieldBoxStockLocation.name === true ||
            this.store.mandatoryFieldBoxStockLocation.parent_location ===
              true ||
            this.store.mandatoryFieldBoxStockLocation.removal_strategy === true
          ) {
            this.store.openInformationDialog(
              "Please fill in all mandatory fields"
            );
            check = true;
          }
          if (check === false) {
            this.store.postCreateStockLocation();
          }
        }
      }
    },
  },
};
</script>
