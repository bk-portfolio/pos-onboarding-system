<template>
  <div class="row m-0 p-0 h-100">
    <div class="col-xl-6 p-0 h-100 col-12">
      <div class="row m-0 h-90 p-3">
        <div class="col mt-4">
          <div id="email marketing">
            <p class="fw-bold fs-5">Email Marketing</p>
            <div class="d-flex justify-content-between mt-4 mb-3">
              <p style="color: #c96340" class="fw-bold">
                Have you used email marketing before?
              </p>
              <div class="row ms-5">
                <div class="col d-flex">
                  <kradiobutton
                    :checked="store.marketingDetails.is_emailexp === false"
                    @change="handleIsEmailExp"
                    class="px-2"
                    :name="'emailexp'"
                    :value="false"
                    :disabled="$root.userInfo.is_admin" />
                  <label class="fw-bold" for="">No</label>
                </div>
                <div class="col d-flex">
                  <kradiobutton
                    :checked="store.marketingDetails.is_emailexp === true"
                    @change="handleIsEmailExp"
                    class="px-2"
                    :name="'emailexp'"
                    :value="true"
                    :disabled="$root.userInfo.is_admin" />
                  <label class="fw-bold" for="">Yes</label>
                </div>
              </div>
            </div>
            <div class="mt-4">
              <p style="color: #c96340" class="fw-bold">
                If yes, what company of marketing have you used ?
              </p>
              <k-input
                v-model="store.marketingDetails.email_marketing"
                type="text"
                class="mt-3 border-0 bg-white w-50"
                :disabled="$root.userInfo.is_admin" />
            </div>
            <div class="mt-4">
              <p style="color: #c96340" class="fw-bold">
                How often would you like to send email marketing ?
              </p>
              <k-input
                v-model="store.marketingDetails.email_freq"
                type="text"
                class="mt-3 border-0 bg-white w-50"
                :disabled="$root.userInfo.is_admin" />
            </div>
          </div>
          <div id="social media" class="mt-5">
            <p class="fw-bold fs-5">Social Platforms</p>
            <div class="d-flex justify-content-between mt-4 mb-2">
              <p style="color: #c96340" class="fw-bold">
                Do you use social platforms for marketing?
              </p>
              <div class="row d-flex justify-content-between ms-5">
                <div class="col d-flex flex-row">
                  <kradiobutton
                    :checked="store.marketingDetails.is_socialexp === false"
                    @change="handleIsSocialExp"
                    class="px-2"
                    :name="'is_socialexp'"
                    :value="false"
                    :disabled="$root.userInfo.is_admin" />
                  <label class="fw-bold" for="">No</label>
                </div>
                <div class="col d-flex flex-row">
                  <kradiobutton
                    :checked="store.marketingDetails.is_socialexp === true"
                    @change="handleIsSocialExp"
                    class="px-2"
                    :name="'is_socialexp'"
                    :value="true"
                    :disabled="$root.userInfo.is_admin" />
                  <label class="fw-bold" for="">Yes</label>
                </div>
              </div>
            </div>
            <div class="mt-4">
              <p style="color: #c96340" class="fw-bold">If so, which ones?</p>
              <k-input
                v-model="store.marketingDetails.social_platform"
                type="text"
                class="mt-3 border-0 bg-white w-50"
                :disabled="$root.userInfo.is_admin" />
            </div>
            <div class="mt-4">
              <p style="color: #c96340" class="fw-bold">
                How often do you post on social platforms (previously)?
              </p>
              <k-input
                v-model="store.marketingDetails.social_freq"
                type="text"
                class="mt-3 border-0 bg-white w-50"
                :disabled="$root.userInfo.is_admin" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-6 p-0 h-100 col-12">
      <div class="row m-0 h-90 p-3">
        <div class="col">
          <div id="sms marketing" class="mt-4 pb-4">
            <p class="fw-bold fs-5">SMS Marketing</p>
            <div class="mt-4">
              <p style="color: #c96340" class="fw-bold">
                Have you used SMS marketing before? If yes, which supplier?
              </p>
              <k-input
                v-model="store.marketingDetails.sms_marketing"
                type="text"
                class="mt-3 border-0 bg-white w-50"
                :disabled="$root.userInfo.is_admin" />
            </div>
            <div class="mt-4">
              <p style="color: #c96340" class="fw-bold">
                If yes, how often did you SMS use marketing?
              </p>
              <k-input
                v-model="store.marketingDetails.sms_freq"
                type="text"
                class="mt-3 border-0 bg-white w-50"
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
import { useMarketingStore } from "./../../../../stores/MarketingStore.js";

export default {
  name: "Admin Marketing Form",
  components: {
    kradiobutton: RadioButton,
  },
  setup() {
    const store = useMarketingStore();
    return { store };
  },
  data() {
    return {};
  },
  methods: {
    handleIsEmailExp(e) {
      this.store.marketingDetails.is_emailexp = e.value;
    },
    handleIsSocialExp(e) {
      this.store.marketingDetails.is_socialexp = e.value;
    },
    handleIsSmsExp(e) {
      this.store.marketingDetails.is_smsexp = e.value;
    },
  },
  mounted() {
    this.store.$reset();
    this.store.postFetchMarketingDetails(this.$root.selectedTenantId);
  },
};
</script>
