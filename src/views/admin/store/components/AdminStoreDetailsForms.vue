<template>
  <div>
    <form>
      <fieldset style="background-color: #f7f5f4" class="border-0 fw-bold">
        <legend class="fw-bold fs-5 mb-3">Business Details</legend>
        <div class="mt-3">
          <k-input
            :value="store.businessDetails.restaurant_name"
            v-model="store.businessDetails.restaurant_name"
            :wrapper-class="
              store.mandatoryFieldBoxDetails.restaurant_name
                ? 'mandatory-field'
                : ''
            "
            name="restaurant"
            :name="'restaurantName'"
            :label="'Restaurant Name'"
            :min-length="2"
            :required="true"
            :placeholder="'Restaurant name'"
            class="fw-bold"
            :disabled="$root.userInfo.is_admin">
          </k-input>
        </div>
        <div class="mt-2">
          <k-input
            :value="store.businessDetails.company_name"
            v-model="store.businessDetails.company_name"
            :wrapper-class="
              store.mandatoryFieldBoxDetails.company_name
                ? 'mandatory-field'
                : ''
            "
            :name="'companyName'"
            :label="'Company Name'"
            :pattern="'[A-Za-z]+'"
            :min-length="2"
            :required="true"
            :placeholder="'Company name'"
            class="fw-bold"
            :disabled="$root.userInfo.is_admin">
          </k-input>
        </div>
        <div class="mt-2">
          <k-input
            :value="store.businessDetails.address"
            v-model="store.businessDetails.address"
            :wrapper-class="
              store.mandatoryFieldBoxDetails.address ? 'mandatory-field' : ''
            "
            :name="'address'"
            :label="'Address'"
            :pattern="'[A-Za-z]+'"
            :min-length="2"
            :required="true"
            :placeholder="'Address'"
            class="fw-bold"
            :disabled="$root.userInfo.is_admin">
          </k-input>
        </div>
        <div class="mt-2">
          <k-input
            :value="store.businessDetails.phone_number"
            v-model="store.businessDetails.phone_number"
            :wrapper-class="
              store.mandatoryFieldBoxDetails.phone_number
                ? 'mandatory-field'
                : ''
            "
            :name="'phoneNumber'"
            :label="'Phone Number'"
            :pattern="'[A-Za-z]+'"
            :min-length="2"
            :required="true"
            :placeholder="'Phone Number'"
            class="fw-bold"
            :disabled="$root.userInfo.is_admin">
          </k-input>
        </div>
        <div class="mt-2">
          <k-input
            :value="store.businessDetails.email"
            v-model="store.businessDetails.email"
            :wrapper-class="
              store.mandatoryFieldBoxDetails.email ? 'mandatory-field' : ''
            "
            :name="'email'"
            :label="'Contact Email'"
            :type="'email'"
            :pattern="'[A-Za-z]+'"
            :min-length="2"
            :required="true"
            :placeholder="'Contact Email'"
            class="fw-bold border-0"
            :disabled="$root.userInfo.is_admin">
          </k-input>
        </div>
        <div class="mt-2">
          <k-input
            :value="store.businessDetails.abn"
            v-model="store.businessDetails.abn"
            :wrapper-class="
              store.mandatoryFieldBoxDetails.abn ? 'mandatory-field' : ''
            "
            :name="'ABN '"
            :label="'ABN ( Australian Business Number )'"
            :min-length="2"
            :required="true"
            :placeholder="'ABN ( Australian Business Number )'"
            class="fw-bold"
            :disabled="$root.userInfo.is_admin">
          </k-input>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import { DropDownList } from "@progress/kendo-vue-dropdowns";
import { useStoreStore } from "./../../../../stores/StoreStore.js";
import "@progress/kendo-theme-default/dist/all.css";

export default {
  name: "Admin Store Details Forms",
  components: {
    dropdownlist: DropDownList,
  },
  setup() {
    const store = useStoreStore();
    return { store };
  },
  data() {
    return {
      success: false,
      businessDetails: {},
    };
  },
  methods: {
    async fetchData() {
      if (this.$root.userInfo.is_admin) {
        const id = this.$root.selectedTenantId;
        await this.store.fetchBusinessDetails(id);
      } else {
        await this.store.fetchBusinessDetails();
      }
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
    if (this.$route.path !== "/registrationBusinessDetails") {
      this.fetchData();
    }
  },
};
</script>
