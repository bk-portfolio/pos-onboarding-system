<template>
  <div class="row m-0 p-0 h-100 scroll--vertical">
    <div class="col-xl-6 p-0 h-100 col-12">
      <div class="row m-0 h-90 p-3">
        <div class="col">
          <div id="email marketing">
            <p class="fw-bold fs-5">Delivery Details</p>
            <div class="d-flex justify-content-between mt-4 mb-2">
              <p style="color: #c96340" class="fw-bold">
                Do you currently provide a delivery service?
              </p>
              <div
                class="row -5 me-5"
                :class="
                  store.mandatoryFieldBoxDelivery.is_provider
                    ? 'border border-1 border-danger p-2 text-center rounded-2'
                    : ''
                ">
                <div class="col d-flex flex-row">
                  <kradiobutton
                    :checked="store.deliveryDetails.is_provider === false"
                    @change="store.deliveryDetails.is_provider = false"
                    :required="true"
                    class="px-2"
                    :name="'is_provider'"
                    :value="false"
                    :disabled="$root.userInfo.is_admin" />
                  <label class="fw-bold" for="">No</label>
                </div>
                <div class="col d-flex flex-row">
                  <kradiobutton
                    :checked="store.deliveryDetails.is_provider === true"
                    @change="store.deliveryDetails.is_provider = true"
                    :required="true"
                    class="px-2"
                    :name="'is_provider'"
                    :value="true"
                    :disabled="$root.userInfo.is_admin" />
                  <label class="fw-bold" for="">Yes</label>
                </div>
              </div>
            </div>
            <div class="mt-5">
              <p style="color: #c96340" class="fw-bold">
                What is your current delivery time promise to your customers?
              </p>
              <k-input
                v-model="store.deliveryDetails.promised_time"
                :wrapper-class="
                  store.mandatoryFieldBoxDelivery.promised_time
                    ? 'mandatory-field'
                    : ''
                "
                :required="true"
                :disabled="$root.userInfo.is_admin"
                type="text"
                placeholder="Ex : 30-45 minutes"
                class="mt-3 w-75" />
            </div>
            <div class="mt-5">
              <p style="color: #c96340" class="fw-bold">
                Generally how long will it take for a delivery to arrive with
                the customer?
              </p>
              <k-input
                v-model="store.deliveryDetails.actual_time"
                :wrapper-class="
                  store.mandatoryFieldBoxDelivery.actual_time
                    ? 'mandatory-field'
                    : ''
                "
                :required="true"
                :disabled="$root.userInfo.is_admin"
                type="text"
                placeholder="Ex : 30-45 minutes"
                class="mt-3 w-75" />
            </div>
          </div>
          <div class="d-flex justify-content-between mt-5 mb-2">
            <p style="color: #c96340" class="fw-bold">
              Do you use your own drivers?
            </p>
            <div
              class="row me-5"
              :class="
                store.mandatoryFieldBoxDelivery.is_owndriver
                  ? 'border border-1 border-danger p-2 text-center rounded-2'
                  : ''
              ">
              <div class="col d-flex flex-row">
                <kradiobutton
                  :checked="store.deliveryDetails.is_owndriver === false"
                  @change="store.deliveryDetails.is_owndriver = false"
                  :required="true"
                  class="px-2"
                  :name="'is_owndriver'"
                  :value="false"
                  :disabled="$root.userInfo.is_admin" />
                <label class="fw-bold" for="">No</label>
              </div>
              <div class="col d-flex flex-row">
                <kradiobutton
                  :checked="store.deliveryDetails.is_owndriver === true"
                  @change="store.deliveryDetails.is_owndriver = true"
                  :required="true"
                  class="px-2"
                  :name="'is_owndriver'"
                  :value="true"
                  :disabled="$root.userInfo.is_admin" />
                <label class="fw-bold" for="">Yes</label>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between mt-5 mb-2">
            <p style="color: #c96340" class="fw-bold">
              Do you outsource your delivery fulfilment to a third party?
            </p>
            <div
              class="row me-5"
              :class="
                store.mandatoryFieldBoxDelivery.is_outsource
                  ? 'border border-1 border-danger p-2 text-center rounded-2'
                  : ''
              ">
              <div class="col d-flex flex-row">
                <kradiobutton
                  :checked="store.deliveryDetails.is_outsource === false"
                  @change="store.deliveryDetails.is_outsource = false"
                  :required="true"
                  class="px-2"
                  :name="'is_outsource'"
                  :value="false"
                  :disabled="$root.userInfo.is_admin" />
                <label class="fw-bold" for="">No</label>
              </div>
              <div class="col d-flex flex-row">
                <kradiobutton
                  :checked="store.deliveryDetails.is_outsource === true"
                  @change="store.deliveryDetails.is_outsource = true"
                  :required="true"
                  :disabled="$root.userInfo.is_admin"
                  class="px-2"
                  :name="'is_outsource'"
                  :value="'Package 3'" />
                <label class="fw-bold" for="">Yes</label>
              </div>
            </div>
          </div>
          <div id="" class="mt-5">
            <div class="mt-5">
              <p style="color: #c96340" class="fw-bold">
                What third party delivery services do you currently use?
              </p>
              <k-input
                v-model="store.deliveryDetails.third_party"
                :wrapper-class="
                  store.mandatoryFieldBoxDelivery.third_party
                    ? 'mandatory-field'
                    : ''
                "
                :required="true"
                :disabled="$root.userInfo.is_admin"
                type="text"
                class="mt-3 w-75" />
            </div>
            <div class="mt-4">
              <p style="color: #c96340" class="fw-bold">
                If yes for the above, please provide your admin credentials for
                the manager portal for each and tablet log in credentials?
              </p>
              <div
                v-for="(adminCredential, index) in store.deliveryDetails
                  .credentials"
                :key="index"
                class="border-bottom border-white mt-4">
                <div class="d-flex justify-content-between">
                  <p class="fw-bold mb-2">Admin Credential {{ index + 1 }}</p>
                  <button
                    v-if="!$root.userInfo.is_admin"
                    @click="removeAdminCredentials"
                    class="border-0 bg-transparent">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="#D5601F"
                      class="bi bi-x-circle-fill"
                      viewBox="0 0 16 16">
                      <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                    </svg>
                  </button>
                </div>
                <div class="row">
                  <div class="col mt-3">
                    <label style="color: #c96340" class="fw-bold" for=""
                      >Username / Email </label
                    ><br />
                    <k-input
                      v-model="adminCredential.username"
                      type="text"
                      :disabled="$root.userInfo.is_admin"
                      class="mt-3 border-0 bg-white w-100" />
                  </div>
                  <div class="col mt-3">
                    <label style="color: #c96340" class="fw-bold" for=""
                      >Password </label
                    ><br />
                    <k-input
                      v-model="adminCredential.password"
                      type="password"
                      :disabled="$root.userInfo.is_admin"
                      class="mt-3 border-0 bg-white w-100" />
                  </div>
                </div>
                <div class="mt-4 mb-4">
                  <label style="color: #c96340" class="fw-bold" for=""
                    >Description </label
                  ><br />
                  <k-input
                    v-model="adminCredential.description"
                    :disabled="$root.userInfo.is_admin"
                    type="text"
                    class="mt-3 w-75" />
                </div>
              </div>
              <div
                v-if="!$root.userInfo.is_admin"
                class="d-flex fw-bold justify-content-end align-items-center mt-3">
                <p style="color: #d5601f">Add Admin Credential</p>
                <button
                  @click="addAdminCredentials"
                  class="border-0 bg-transparent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="#D5601F"
                    class="bi bi-plus-square-fill ms-3"
                    style="color: #d5601f"
                    viewBox="0 0 16 16">
                    <path
                      d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="mt-4">
              <p style="color: #c96340" class="fw-bold">
                How far does your store deliver? (suburbs or drive time)
              </p>
              <k-input
                v-model="this.store.deliveryDetails.distance"
                :disabled="$root.userInfo.is_admin"
                :wrapper-class="
                  store.mandatoryFieldBoxDelivery.distance
                    ? 'mandatory-field'
                    : ''
                "
                :required="true"
                type="text"
                class="mt-3 w-75" />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
    <div class="col-xl-6 p-0 h-100 col-12">
      <div class="row m-0 h-90 p-3">
        <p style="color: #c96340" class="fw-bold">
          What are your trading hours for Delivery?
        </p>
        <div class="col-md-auto">
          <div class="row mt-5">
            <div class="col fw-bold d-flex align-items-center">Monday :</div>
            <div class="col d-flex align-items-center">
              <p class="ms-5 me-4">From</p>
              <k-input
                v-model="store.tradingHoursValue.trading[1].monday_open"
                step="1"
                type="time"
                class="form-control"
                id=""
                :disabled="$root.userInfo.is_admin" />
            </div>
            <div class="col d-flex flex-col align-items-center">
              <p class="me-4">To</p>
              <k-input
                v-model="store.tradingHoursValue.trading[1].monday_close"
                step="1"
                type="time"
                class="form-control"
                id=""
                :disabled="$root.userInfo.is_admin" />
            </div>
          </div>
          <div class="row mt-5">
            <div class="col fw-bold d-flex align-items-center">Tuesday :</div>
            <div class="col d-flex align-items-center">
              <p class="ms-5 me-4">From</p>
              <k-input
                v-model="store.tradingHoursValue.trading[1].tuesday_open"
                step="1"
                type="time"
                class="form-control"
                id=""
                :disabled="$root.userInfo.is_admin" />
            </div>
            <div class="col d-flex flex-col align-items-center">
              <p class="me-4">To</p>
              <k-input
                v-model="store.tradingHoursValue.trading[1].tuesday_close"
                step="1"
                type="time"
                class="form-control"
                id=""
                :disabled="$root.userInfo.is_admin" />
            </div>
          </div>
          <div class="row mt-5">
            <div class="col fw-bold d-flex align-items-center">Wednesday :</div>
            <div class="col d-flex align-items-center">
              <p class="ms-5 me-4">From</p>
              <k-input
                v-model="store.tradingHoursValue.trading[1].wednesday_open"
                step="1"
                type="time"
                class="form-control"
                id=""
                :disabled="$root.userInfo.is_admin" />
            </div>
            <div class="col d-flex flex-col align-items-center">
              <p class="me-4">To</p>
              <k-input
                v-model="store.tradingHoursValue.trading[1].wednesday_close"
                step="1"
                type="time"
                class="form-control"
                id=""
                :disabled="$root.userInfo.is_admin" />
            </div>
          </div>
          <div class="row mt-5">
            <div class="col fw-bold d-flex align-items-center">Thursday :</div>
            <div class="col d-flex align-items-center">
              <p class="ms-5 me-4">From</p>
              <k-input
                v-model="store.tradingHoursValue.trading[1].thursday_open"
                step="1"
                type="time"
                class="form-control"
                id=""
                :disabled="$root.userInfo.is_admin" />
            </div>
            <div class="col d-flex flex-col align-items-center">
              <p class="me-4">To</p>
              <k-input
                v-model="store.tradingHoursValue.trading[1].thursday_close"
                step="1"
                type="time"
                class="form-control"
                id=""
                :disabled="$root.userInfo.is_admin" />
            </div>
          </div>
          <div class="row mt-5">
            <div class="col fw-bold d-flex align-items-center">Friday :</div>
            <div class="col d-flex align-items-center">
              <p class="ms-5 me-4">From</p>
              <k-input
                v-model="store.tradingHoursValue.trading[1].friday_open"
                step="1"
                type="time"
                class="form-control"
                id=""
                :disabled="$root.userInfo.is_admin" />
            </div>
            <div class="col d-flex flex-col align-items-center">
              <p class="me-4">To</p>
              <k-input
                v-model="store.tradingHoursValue.trading[1].friday_close"
                step="1"
                type="time"
                class="form-control"
                id=""
                :disabled="$root.userInfo.is_admin" />
            </div>
          </div>
          <div class="row mt-5">
            <div class="col fw-bold d-flex align-items-center">Saturday :</div>
            <div class="col d-flex align-items-center">
              <p class="ms-5 me-4">From</p>
              <k-input
                v-model="store.tradingHoursValue.trading[1].saturday_open"
                step="1"
                type="time"
                class="form-control"
                id=""
                :disabled="$root.userInfo.is_admin" />
            </div>
            <div class="col d-flex flex-col align-items-center">
              <p class="me-4">To</p>
              <k-input
                v-model="store.tradingHoursValue.trading[1].saturday_close"
                step="1"
                type="time"
                class="form-control"
                id=""
                :disabled="$root.userInfo.is_admin" />
            </div>
          </div>
          <div class="row mt-5">
            <div class="col fw-bold d-flex align-items-center">Sunday :</div>
            <div class="col d-flex align-items-center">
              <p class="me-4">From</p>
              <k-input
                v-model="store.tradingHoursValue.trading[1].sunday_open"
                step="1"
                type="time"
                class="form-control"
                id=""
                :disabled="$root.userInfo.is_admin" />
            </div>
            <div class="col d-flex flex-col align-items-center">
              <p class="me-4">To</p>
              <k-input
                v-model="store.tradingHoursValue.trading[1].sunday_close"
                step="1"
                type="time"
                class="form-control"
                id=""
                :disabled="$root.userInfo.is_admin" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RadioButton } from "@progress/kendo-vue-inputs";
import { useStoreStore } from "./../../../../stores/StoreStore";

export default {
  name: "Admin Store Delivery Form",
  components: {
    kradiobutton: RadioButton,
  },
  setup() {
    const store = useStoreStore();
    return { store };
  },
  data() {
    return {
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    };
  },
  methods: {
    addAdminCredentials() {
      this.store.deliveryDetails.credentials.push({
        username: "",
        password: "",
        description: "",
      });
      console.log(this.store.deliveryDetails.credentials);
    },
    removeAdminCredentials(index) {
      this.store.deliveryDetails.credentials.splice(index, 1);
    },
  },
  created() {
    this.store.fetchDelivery(this.$root.selectedTenantId);
    this.store.fetchTradingHours();
  },
};
</script>
