<template>
  <div class="row m-0 p-0 h-100">
    <div class="col-xl-6 p-0 h-100 col-12">
      <div class="row m-0 h-90 p-5 scroll--vertical">
        <div class="col">
          <p class="fw-bold fs-5">Stock Details</p>
          <div>
            <k-input
              v-model="store.stockLocationDetails.name"
              :wrapper-class="
                store.mandatoryFieldBoxStockLocation.name
                  ? 'mandatory-field'
                  : ''
              "
              :name="'locationName'"
              :label="'Location Name'"
              :min-length="2"
              :required="true"
              :placeholder="'Location Name'"
              class="fw-bold"
              :disabled="$root.userInfo.is_admin">
            </k-input>
          </div>
          <div class="col">
            <k-dropdown-combobox
              v-model="store.stockLocationDetails.type"
              :class-name="
                store.mandatoryFieldBoxStockLocation.type
                  ? 'mandatory-field'
                  : ''
              "
              @change="showScrapLocation"
              :label="'Location Type'"
              :data-items="locationType"
              class="fw-bold"
              :disabled="$root.userInfo.is_admin">
            </k-dropdown-combobox>
          </div>
          <div class="col">
            <k-dropdown-combobox
              v-model="store.stockLocationDetails.parent_location"
              :class-name="
                store.mandatoryFieldBoxStockLocation.parent_location
                  ? 'mandatory-field'
                  : ''
              "
              :label="'Parent Location'"
              :data-items="parentLocation"
              class="fw-bold"
              :disabled="$root.userInfo.is_admin">
            </k-dropdown-combobox>
          </div>
          <div class="col">
            <k-dropdown-combobox
              v-model="store.stockLocationDetails.removal_strategy"
              :class-name="
                store.mandatoryFieldBoxStockLocation.removal_strategy
                  ? 'mandatory-field'
                  : ''
              "
              :label="'Removal Strategy'"
              :data-items="removalStrategy"
              class="fw-bold"
              :disabled="$root.userInfo.is_admin">
            </k-dropdown-combobox>
          </div>
          <div class="row">
            <div class="col mt-4">
              <div class="col d-flex mt-3 mb-2">
                <p style="color: #c96340" class="fw-bold">
                  Is a Return Location ?
                </p>
                <div class="col d-flex flex-row ms-4">
                  <checkbox
                    :label="''"
                    class="fw-bold"
                    :default-checked="store.stockLocationDetails.is_return"
                    @change="store.stockLocationDetails.is_return = true"
                    :disabled="$root.userInfo.is_admin" />
                </div>
              </div>
            </div>
            <div v-if="isScrapLocation" class="col mt-4">
              <div class="col d-flex mt-3 mb-2">
                <p style="color: #c96340" class="fw-bold">
                  Is a Scrap Location ?
                </p>
                <div class="col d-flex flex-row ms-4">
                  <checkbox
                    :label="''"
                    class="fw-bold"
                    :default-checked="store.stockLocationDetails.is_scrap"
                    @change="store.stockLocationDetails.is_scrap = true"
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
import { RadioButton } from "@progress/kendo-vue-inputs";
import { Checkbox } from "@progress/kendo-vue-inputs";
import { DatePicker } from "@progress/kendo-vue-dateinputs";
import { useStoreStore } from "./../../../../stores/StoreStore.js";
import "@progress/kendo-theme-default/dist/all.css";

export default {
  name: "Admin Store Stock Add And Edit Form",
  setup() {
    const store = useStoreStore();
    return { store };
  },
  data() {
    return {
      locationType: [
        "Vendor Location",
        "View",
        "Internal Location",
        "Customer Location",
        "Inventory Loss",
        "Production",
        "Transit Location",
      ],
      removalStrategy: [
        "First in First Out (FIFO)",
        "Last in First Out (LIFO)",
      ],
      parentLocation: [
        "Partner Locations",
        "Partner Locations/Customers",
        "Partner Locations/Vendors",
        "Physical Locations",
        "Virtual Locations",
      ],
      isScrapLocation: false,
    };
  },
  components: {
    dropdownlist: DropDownList,
    datepicker: DatePicker,
    kradiobutton: RadioButton,
    checkbox: Checkbox,
  },
  methods: {
    showScrapLocation() {
      if (
        this.store.stockLocationDetails.type === "Inventory Loss" ||
        this.store.stockLocationDetails.type === "Internal Location"
      ) {
        this.isScrapLocation = true;
      } else {
        this.isScrapLocation = false;
      }
    },
  },
  created() {
    if (localStorage.getItem("addOrEditPage") == "Add New") {
      this.store.stockLocationDetails = this.store.addStockLocation;
    }
  },
  mounted() {
    if (localStorage.getItem("addOrEditPage") == "Add New") {
      this.store.stockLocationDetails = this.store.addStockLocation;
    }
  },
};
</script>
