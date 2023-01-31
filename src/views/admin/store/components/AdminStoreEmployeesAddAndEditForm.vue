<template>
  <div class="row m-0 p-0 h-100">
    <div class="col-xl-6 p-0 h-100 col-12 border-end border-white">
      <div class="row m-0 h-90 p-5 scroll--vertical">
        <div class="col">
          <p class="fw-bold fs-5">Employee Details</p>
          <div>
            <k-input
              v-model="store.employeeDetails.name"
              :wrapper-class="
                store.mandatoryFieldBoxEmployee.name ? 'mandatory-field' : ''
              "
              :name="'name'"
              :label="'Name'"
              :required="true"
              :placeholder="'Name'"
              class="fw-bold"
              :disabled="$root.userInfo.is_admin">
            </k-input>
          </div>
          <div>
            <k-input
              v-model="store.employeeDetails.email"
              :wrapper-class="
                store.mandatoryFieldBoxEmployee.email ? 'mandatory-field' : ''
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
          <div class="">
            <k-input
              v-model="store.employeeDetails.department"
              :wrapper-class="
                store.mandatoryFieldBoxEmployee.department
                  ? 'mandatory-field'
                  : ''
              "
              :name="'department'"
              :label="'Department'"
              :min-length="2"
              :required="true"
              :placeholder="'Department'"
              class="fw-bold"
              :disabled="$root.userInfo.is_admin">
            </k-input>
          </div>
          <div class="row">
            <div class="col">
              <k-input
                v-model="store.employeeDetails.phone"
                :wrapper-class="
                  store.mandatoryFieldBoxEmployee.phone ? 'mandatory-field' : ''
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
                v-model="store.employeeDetails.mobile"
                :wrapper-class="
                  store.mandatoryFieldBoxEmployee.mobile
                    ? 'mandatory-field'
                    : ''
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
          <div class="row">
            <div class="col">
              <k-dropdown-combobox
                v-model="store.employeeDetails.gender"
                :class-name="
                  store.mandatoryFieldBoxEmployee.gender
                    ? 'mandatory-field'
                    : ''
                "
                :value-primitive="true"
                :value-field="'value'"
                :label="'Gender'"
                :data-items="genders"
                :text-field="'text'"
                :data-item-key="'value'"
                @change="store.employeeDetails.gender = $event.value"
                class="fw-bold"
                :disabled="$root.userInfo.is_admin">
              </k-dropdown-combobox>
            </div>
            <div class="col">
              <k-dropdown-combobox
                v-model="store.employeeDetails.marital_status"
                :label="'Marital Status'"
                :data-items="maritalStatus"
                class="fw-bold"
                :disabled="$root.userInfo.is_admin">
              </k-dropdown-combobox>
            </div>
            <div class="col">
              <k-dropdown-combobox
                v-model="store.employeeDetails.country"
                :class-name="
                  store.mandatoryFieldBoxEmployee.country
                    ? 'mandatory-field'
                    : ''
                "
                :label="'Nationality'"
                :data-items="countries"
                class="fw-bold"
                :disabled="$root.userInfo.is_admin">
              </k-dropdown-combobox>
              <!-- <autocomplete
                @focus="handleShowList"
                @close="handleHideList"
                :opened="showList"
                :label="'Nationality'"
                v-model="store.employeeDetails.country"
                :data-items="countries"
                :disabled="$root.userInfo.is_admin"
                :class="
                  store.mandatoryFieldBoxEmployee.country
                    ? 'mandatory-field'
                    : ''
                "
                :required="true">
              </autocomplete> -->
            </div>
          </div>
          <div>
            <datepicker
              :id="'tes'"
              :style="{ width: '230px' }"
              :label="'Date of Birth'"
              :fill-mode="
                store.mandatoryFieldBoxEmployee.dob
                  ? 'solid mandatory-field'
                  : 'solid'
              "
              :required="true"
              :default-value="dateValue(store.employeeDetails.dob)"
              @change="onChangeDatePickerDob"
              :placeholder="''"
              :disabled="$root.userInfo.is_admin">
            </datepicker>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-6 p-0 h-100 col-12">
      <div class="row m-0 h-90 p-5 scroll--vertical">
        <div class="col">
          <div class="row mt-4">
            <div class="col">
              <k-input
                v-model="store.employeeDetails.id_number"
                :name="'indetificationNumber'"
                :label="'Identification Number'"
                :min-length="2"
                :placeholder="'Identification Number'"
                class="fw-bold"
                :disabled="$root.userInfo.is_admin">
              </k-input>
            </div>
            <div class="col">
              <k-input
                v-model="store.employeeDetails.passport_number"
                :name="'passportNumber'"
                :label="'Passport Number'"
                :min-length="2"
                :placeholder="'Passport Number'"
                class="fw-bold"
                :disabled="$root.userInfo.is_admin">
              </k-input>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <k-input
                v-model="store.employeeDetails.visa_number"
                :name="'visaNumber'"
                :label="'Visa Number'"
                :min-length="2"
                :placeholder="'Visa Number'"
                class="fw-bold"
                :disabled="$root.userInfo.is_admin">
              </k-input>
            </div>
            <div class="col">
              <k-input
                v-model="store.employeeDetails.workpermit_number"
                :name="'workPermitNumber'"
                :label="'Work Permit Number'"
                :min-length="2"
                :placeholder="'Work Permit Number'"
                class="fw-bold"
                :disabled="$root.userInfo.is_admin">
              </k-input>
            </div>
          </div>
          <div>
            <datepicker
              :style="{ width: '50%' }"
              :label="'Visa Expire Date'"
              :default-value="
                !store.employeeDetails.visa_expiredate
                  ? ''
                  : dateValue(store.employeeDetails.visa_expiredate)
              "
              @change="onChangeDatePickerVisa"
              :placeholder="''"
              :disabled="$root.userInfo.is_admin">
            </datepicker>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountryList from "./../../../../../src/data_dummy/CountryList.json";
import { useStoreStore } from "./../../../../stores/StoreStore.js";
import { DatePicker } from "@progress/kendo-vue-dateinputs";
import { AutoComplete } from "@progress/kendo-vue-dropdowns";
import "@progress/kendo-theme-default/dist/all.css";

export default {
  nmae: "Admin Store Employees Add and Edit Form",
  setup() {
    const store = useStoreStore();
    return { store };
  },
  data() {
    return {
      genders: [
        {
          text: "Male",
          value: 1,
        },
        {
          text: "Female",
          value: 0,
        },
        {
          text: "Other",
          value: 2,
        },
      ],
      maritalStatus: [
        "Single",
        "Married",
        "Legal Cohabitant",
        "Widower",
        "Divorce",
      ],
      showList: false,
      countries: CountryList.countries,
      showPassportAndVisaFields: false,
    };
  },
  components: {
    autocomplete: AutoComplete,
    datepicker: DatePicker,
  },
  methods: {
    handleShowList() {
      this.showList = true;
    },
    handleHideList() {
      this.showList = false;
    },
    onChangeDatePickerDob: function (e) {
      this.store.employeeDetails.dob = this.formatDateYYYYMMDD(e.value);
    },
    onChangeDatePickerVisa: function (e) {
      this.store.employeeDetails.visa_expiredate = this.formatDateYYYYMMDD(
        e.value
      );
    },
    onChangeMaritalStatus: function (e) {
      this.store.employeeDetails.marital_status = e.value;
    },
    dateValue(date) {
      if (localStorage.getItem("addOrEditPage") === "Edit") {
        return new Date(date);
      }
    },
  },
  created() {
    if (localStorage.getItem("addOrEditPage") == "Add New") {
      this.store.employeeDetails = this.store.addEmployee;
    }
  },
  mounted() {
    if (localStorage.getItem("addOrEditPage") == "Add New") {
      this.store.employeeDetails = this.store.addEmployee;
    }
  },
};
</script>
