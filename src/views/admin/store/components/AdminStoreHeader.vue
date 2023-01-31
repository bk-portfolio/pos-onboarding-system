<template>
  <div class="row h-10 m-0">
    <div class="col px-4 py-3 border-bottom border-1 border-light bg-white">
      <div class="row h-100 align-items-center">
        <div class="col-auto ps-0 pe-5 d-flex">
          <div class="pe-2">
            <img src="./../../../../assets/img/store.svg" alt="icon product" />
          </div>
          <div class="fs-5 fw-bold">Store</div>
        </div>
        <div class="col row m-0 align-items-center">
          <router-link
            v-for="menu in listMenu"
            :key="menu.key"
            :to="menu.link"
            class="col-auto py-2 px-3 fs-7 fw-bold">
            {{ menu.name }}
          </router-link>
        </div>
        <div v-if="!$root.userInfo.is_admin" class="col-auto px-0">
          <k-button
            @click="goToAddPage()"
            class="rounded-0 fw-fold"
            :theme-color="'primary'">
            {{ headerButton }}
          </k-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useStoreStore } from "./../../../../stores/StoreStore.js";

export default {
  name: "Admin Product Header",
  components: {},
  props: {
    listMenu: Array,
  },
  setup() {
    const store = useStoreStore();
    return { store };
  },
  data() {
    return {};
  },
  computed: {
    headerButton() {
      if (this.$route.path === "/adminStoreEmployees") {
        return "Add Employee";
      } else if (this.$route.path === "/adminStoreVendors") {
        return "Add Vendors";
      } else if (this.$route.path === "/adminStoreStock") {
        return "Add Stock";
      } else {
        return "Save";
      }
    },
  },
  methods: {
    goToAddPage() {
      if (this.$route.path === "/adminStoreEmployees") {
        this.store.employeeDetails = this.store.addEmployee;
        localStorage.setItem("addOrEditPage", "Add New");
        this.$router.push("/adminStoreEmployeesAddAndEdit");
      } else if (this.$route.path === "/adminStoreVendors") {
        this.store.vendorDetails = this.store.addVendor;
        localStorage.setItem("addOrEditPage", "Add New");
        this.$router.push("/adminStoreVendorsAddAndEdit");
      } else if (this.$route.path === "/adminStoreStock") {
        this.store.stockLocationDetails = this.store.addStockLocation;
        localStorage.setItem("addOrEditPage", "Add New");
        this.$router.push("/adminStoreStockAddAndEdit");
      } else if (this.$route.path === "/adminStoreDetails") {
        this.store.checkMandatoryFieldsDetails();
        if (
          this.store.mandatoryFieldBoxDetails.restaurant_name === true ||
          this.store.mandatoryFieldBoxDetails.company_name === true ||
          this.store.mandatoryFieldBoxDetails.address === true ||
          this.store.mandatoryFieldBoxDetails.phone_number === true ||
          this.store.mandatoryFieldBoxDetails.email === true ||
          this.store.mandatoryFieldBoxDetails.abn === true
        ) {
          this.store.openInformationDialog("Please fill all mandatory fields");
        } else {
          this.store.postEditBusinessDetails();
        }
      } else if (this.$route.path === "/adminStoreTradingHours") {
        this.store.checkMandatoryFieldsTradingHours();
        let check = false;

        if (this.store.mandatoryFieldBoxTradingHours.be_placed === true) {
          this.store.openInformationDialog("Please fill all mandatory fields");
          check = true;
        }

        if (check === false) {
          if (this.store.tradingHoursLength === 0) {
            this.store.postCreateTradingHours();
          } else {
            this.store.postEditTradingHours();
          }
        }
      } else if (this.$route.path === "/adminStorePos") {
        this.store.checkMandatoryFieldsPosAdd();
        this.store.checkMandatoryFieldsPos();
        let check = false;

        this.store.mandatoryFieldBoxPos.forEach((e) => {
          if (
            e.name === true ||
            e.function === true ||
            e.hardware_type === true ||
            e.payment_methods === true ||
            e.session_color === true
          ) {
            this.store.openInformationDialog(
              "Please fill all mandatory fields"
            );
            check = true;
          }
        });

        this.store.mandatoryFieldBoxPos.forEach((e) => {
          if (e.users === true) {
            check = true;
          } else if (e.isUserMandatoryMin1 === true) {
            check = true;
          }
        });

        this.store.mandatoryFieldBoxPosAdd.forEach((e) => {
          if (
            e.name === true ||
            e.function === true ||
            e.hardware_type === true ||
            e.payment_methods === true ||
            e.session_color === true
          ) {
            this.store.openInformationDialog(
              "Please fill all mandatory fields"
            );
            check = true;
          }
        });

        this.store.mandatoryFieldBoxPosAdd.forEach((e) => {
          if (e.users === true) {
            check = true;
          } else if (e.isUserMandatoryMin1 === true) {
            check = true;
          }
        });

        if (check === false) {
          let isSame =
            JSON.stringify(this.store.posSessionsFetch) ===
            JSON.stringify(this.store.posSessionDefault);

          if (!isSame && this.store.posSessionsAdd.length !== 0) {
            this.store.postUpdatePos();
            this.store.postCreatePos();
          } else if (this.store.posSessionsAdd.length === 0) {
            this.store.postUpdatePos();
          } else {
            this.store.postCreatePos();
          }
        }
      } else if (this.$route.path === "/adminStoreTableBookings") {
        this.store.checkMandatoryFieldsTableBooking();
        this.store.checkMandatoryFieldsTableBookingAdd();
        let check = false;

        this.store.mandatoryFieldBoxTableBooking.forEach((e) => {
          if (e.tables_name === true || e.seat === true) {
            this.store.openInformationDialog(
              "Please fill all mandatory fields"
            );
            check = true;
          }
        });
        this.store.mandatoryFieldBoxTableBookingAdd.forEach((e) => {
          if (e.tables_name === true || e.seat === true) {
            this.store.openInformationDialog(
              "Please fill all mandatory fields"
            );
            check = true;
          }
        });
        if (check === false) {
          let isSame =
            JSON.stringify(this.store.tableBookingsList) ===
            JSON.stringify(this.store.tableBookingsDefault);

          if (!isSame && this.store.tableBookingsAdd.length !== 0) {
            this.store.postUpdateTableBookings();
            this.store.postCreateTableBookings();
          } else if (this.store.tableBookingsAdd.length === 0) {
            this.store.postUpdateTableBookings();
          } else {
            this.store.postCreateTableBookings();
          }
        }
      } else if (this.$route.path === "/adminStoreAccounting") {
        if (!this.store.accountingList.id) {
          this.store.checkMandatoryFieldsAccounting();
          let check = false;
          if (
            this.store.mandatoryFieldBoxAccounting.salestax_code === true ||
            this.store.mandatoryFieldBoxAccounting.salestax === true ||
            this.store.mandatoryFieldBoxAccounting.purchasetax_code === true ||
            this.store.mandatoryFieldBoxAccounting.purchasetax === true ||
            this.store.mandatoryFieldBoxAccounting.currency === true
          ) {
            this.store.openInformationDialog(
              "Please fill all mandatory fields"
            );
            check = true;
          }
          if (check === false) {
            this.store.postCreateAccounting();
          }
        } else {
          this.store.checkMandatoryFieldsAccounting();
          let check = false;
          if (
            this.store.mandatoryFieldBoxAccounting.salestax_code === true ||
            this.store.mandatoryFieldBoxAccounting.salestax === true ||
            this.store.mandatoryFieldBoxAccounting.purchasetax_code === true ||
            this.store.mandatoryFieldBoxAccounting.purchasetax === true ||
            this.store.mandatoryFieldBoxAccounting.currency === true
          ) {
            this.store.openInformationDialog(
              "Please fill all mandatory fields"
            );
            check = true;
          }
          if (check === false) {
            this.store.postEditAccounting();
          }
        }
      } else if ((this.$route.path = "adminStoreDelivery")) {
        let check = false;
        this.store.checkMandatoryFieldsDelivery();

        if (
          this.store.mandatoryFieldBoxDelivery.is_provider === true ||
          this.store.mandatoryFieldBoxDelivery.promised_time === true ||
          this.store.mandatoryFieldBoxDelivery.actual_time === true ||
          this.store.mandatoryFieldBoxDelivery.is_owndriver === true ||
          this.store.mandatoryFieldBoxDelivery.is_outsource === true ||
          this.store.mandatoryFieldBoxDelivery.third_party === true ||
          this.store.mandatoryFieldBoxDelivery.distance === true
        ) {
          this.store.openInformationDialog("Please fill all mandatory fields");
          check = true;
        }

        if (check === false) {
          if (!this.store.deliveryDetails.id) {
            this.store.postCreateDelivery();
            this.store.postCreateTradingHours();
          } else {
            this.store.postUpdateDelivery();
            this.store.postEditTradingHours();
          }
        }
      }
    },
  },
};
</script>
