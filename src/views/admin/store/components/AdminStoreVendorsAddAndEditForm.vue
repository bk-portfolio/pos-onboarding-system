<template>
  <div class="row m-0 p-0 h-100">
    <div class="col-xl-6 p-0 h-100 col-12">
      <div class="row m-0 h-90 p-5">
        <div class="col">
          <p class="fw-bold fs-5">Vendor Details</p>
          <div>
            <k-input
              v-model="store.vendorDetails.name"
              :wrapper-class="
                store.mandatoryFieldBoxVendor.name ? 'mandatory-field' : ''
              "
              :name="'name'"
              :label="'Name'"
              :min-length="2"
              :required="true"
              :placeholder="'Name'"
              class="fw-bold"
              :disabled="$root.userInfo.is_admin">
            </k-input>
          </div>
          <div>
            <k-input
              v-model="store.vendorDetails.email"
              :wrapper-class="
                store.mandatoryFieldBoxVendor.email ? 'mandatory-field' : ''
              "
              :name="'email'"
              :label="'Email'"
              :min-length="2"
              :required="true"
              :placeholder="'email@email.com'"
              class="fw-bold"
              :disabled="$root.userInfo.is_admin">
            </k-input>
          </div>
          <div class="row">
            <div class="col">
              <k-input
                v-model="store.vendorDetails.phone"
                :wrapper-class="
                  store.mandatoryFieldBoxVendor.phone ? 'mandatory-field' : ''
                "
                :name="'workPhone'"
                :label="'Work Phone'"
                :min-length="2"
                :required="true"
                :placeholder="'Work Phone'"
                class="fw-bold"
                :disabled="$root.userInfo.is_admin">
              </k-input>
            </div>
            <div class="col">
              <k-input
                v-model="store.vendorDetails.mobile"
                :wrapper-class="
                  store.mandatoryFieldBoxVendor.mobile ? 'mandatory-field' : ''
                "
                :name="'workMobile'"
                :label="'Work Mobile'"
                :min-length="2"
                :required="true"
                :placeholder="'Work Mobile'"
                class="fw-bold"
                :disabled="$root.userInfo.is_admin">
              </k-input>
            </div>
          </div>
          <div>
            <k-input
              v-model="store.vendorDetails.street"
              :wrapper-class="
                store.mandatoryFieldBoxVendor.street ? 'mandatory-field' : ''
              "
              :name="'street'"
              :label="'Street'"
              :min-length="2"
              :required="true"
              :placeholder="'Street'"
              class="fw-bold"
              :disabled="$root.userInfo.is_admin">
            </k-input>
          </div>
          <div class="row">
            <div class="col">
              <k-input
                v-model="store.vendorDetails.zip"
                :wrapper-class="
                  store.mandatoryFieldBoxVendor.zip ? 'mandatory-field' : ''
                "
                :name="'zip'"
                :label="'Zip'"
                :min-length="2"
                :required="true"
                :placeholder="'Zip'"
                class="fw-bold"
                :disabled="$root.userInfo.is_admin">
              </k-input>
            </div>
            <div class="col">
              <k-input
                v-model="store.vendorDetails.city"
                :wrapper-class="
                  store.mandatoryFieldBoxVendor.city ? 'mandatory-field' : ''
                "
                :name="'city'"
                :label="'City'"
                :min-length="2"
                :required="true"
                :placeholder="'City'"
                class="fw-bold"
                :disabled="$root.userInfo.is_admin">
              </k-input>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <k-input
                v-model="store.vendorDetails.state"
                :wrapper-class="
                  store.mandatoryFieldBoxVendor.state ? 'mandatory-field' : ''
                "
                :name="'state'"
                :label="'State'"
                :min-length="2"
                :required="true"
                :placeholder="'State'"
                class="fw-bold"
                :disabled="$root.userInfo.is_admin">
              </k-input>
            </div>
            <div class="col">
              <k-dropdown-combobox
                v-model="store.vendorDetails.country"
                :class-name="
                  store.mandatoryFieldBoxVendor.country ? 'mandatory-field' : ''
                "
                :data-items="countries"
                :label="'Country'"
                class="fw-bold"
                :disabled="$root.userInfo.is_admin">
              </k-dropdown-combobox>
            </div>
          </div>
          <div class="row">
            <div class="col d-flex mt-5 mb-2">
              <p style="color: #c96340" class="fw-bold">Are you a Company ?</p>
              <div class="row d-flex justify-content-between ms-5">
                <div class="col d-flex flex-row">
                  <checkbox
                    :default-checked="store.vendorDetails.is_company"
                    @change="onCheckisCompany"
                    :disabled="$root.userInfo.is_admin" />
                </div>
              </div>
            </div>
            <div class="col d-flex mt-5 mb-2">
              <p style="color: #c96340" class="fw-bold">Are you a Merchant ?</p>
              <div class="row d-flex justify-content-between ms-5">
                <div class="col d-flex flex-row">
                  <checkbox
                    :default-checked="store.vendorDetails.is_merchant"
                    @change="onCheckisMerchant"
                    :disabled="$root.userInfo.is_admin" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DropDownList } from "@progress/kendo-vue-dropdowns";
import CountryList from "./../../../../../src/data_dummy/CountryList.json";
import { Checkbox } from "@progress/kendo-vue-inputs";
import { DatePicker } from "@progress/kendo-vue-dateinputs";
import { useStoreStore } from "./../../../../stores/StoreStore.js";
import "@progress/kendo-theme-default/dist/all.css";

export default {
  name: "Admin Store Vendors Add And Edit Form",
  setup() {
    const store = useStoreStore();
    return { store };
  },
  data() {
    return {
      countries: CountryList.countries,
    };
  },
  components: {
    dropdownlist: DropDownList,
    datepicker: DatePicker,
    checkbox: Checkbox,
  },
  methods: {
    onCheckisCompany() {
      if (this.store.vendorDetails.is_company === true) {
        this.store.vendorDetails.is_company = false;
      } else {
        this.store.vendorDetails.is_company = true;
      }
    },
    onCheckisMerchant() {
      if (this.store.vendorDetails.is_merchant === true) {
        this.store.vendorDetails.is_merchant = false;
      } else {
        this.store.vendorDetails.is_merchant = true;
      }
    },
  },
  created() {
    if (localStorage.getItem("addOrEditPage") == "Add New") {
      this.store.vendorDetails = this.store.addVendor;
    }
  },
  mounted() {
    if (localStorage.getItem("addOrEditPage") == "Add New") {
      this.store.vendorDetails = this.store.addVendor;
    }
  },
};
</script>
