<template>
  <div class="row m-0 p-0 h-100">
    <div class="col-xl-6 p-0 h-100 col-12">
      <div class="row m-0 h-90 p-3">
        <div class="col">
          <p class="fw-bold fs-5 mb-4 mt-4">Loyalty Program Details</p>
          <div class="">
            <k-input
              v-model="store.loyaltyDetails[0].name"
              label="Name"
              type="text"
              class="fw-bold"
              :disabled="$root.userInfo.is_admin" />
          </div>
          <div class="">
            <k-input
              v-model="store.loyaltyDetails[0].point_awarded"
              min="0"
              label="Points awarded"
              type="number"
              class="fw-bold"
              :disabled="$root.userInfo.is_admin" />
            <p class="fs-7 text-secondary px-2">
              &#8627; Example: Customer will be awarded 1.00 point for every $10
              spent; *currency should change per country where applicable.
            </p>
          </div>
          <div class="">
            <k-input
              v-model="store.loyaltyDetails[0].when_award"
              min="0"
              label="When to award the points ?"
              type="number"
              class="fw-bold"
              :disabled="$root.userInfo.is_admin" />
            <p class="fs-7 text-secondary px-2">
              &#8627; Example: Customer chooses a free Cheeseburger, or Can of
              Coke for achieving 1000 points!
            </p>
          </div>
          <div class="">
            <k-input
              v-model="store.loyaltyDetails[0].description"
              label="Description"
              type="text"
              class="fw-bold"
              :disabled="$root.userInfo.is_admin" />
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-6 p-0 h-100 col-12 scroll--vertical">
      <div class="row m-0 p-3">
        <p class="fw-bold fs-5 mt-4">Redemption Calculation</p>
        <div
          v-for="(loyaltyDetail) in store.loyaltyDetails" :key="loyaltyDetail.key"
          class="col mb-0">
          <div class="border-white border-bottom"
            v-for="(royaltyRule, index) in loyaltyDetail.redemption_rule" :key="royaltyRule.key">
            <div
              v-if="!$root.userInfo.is_admin"
              class="d-flex justify-content-end mt-3">
              <button
                @click="removeRedemptionRule(index, royaltyRule.name)"
                class="border-0">
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
            <div class="">
              <k-input
                v-model="royaltyRule.rule_name"
                label="Rule name"
                type="text"
                class="fw-bold"
                :disabled="$root.userInfo.is_admin" />
            </div>
            <div class="row">
              <div class="col">
                <k-input
                  v-model="royaltyRule.start_point"
                  min="0"
                  label="Point Start"
                  type="number"
                  class="fw-bold"
                  :disabled="$root.userInfo.is_admin" />
              </div>
              <div class="col">
                <k-input
                  v-model="royaltyRule.end_point"
                  min="0"
                  label="Point End"
                  type="number"
                  class="fw-bold"
                  :disabled="$root.userInfo.is_admin" />
              </div>
            </div>
            <div>
              <MultiSelect
                label="Available Product"
                :data-items="productList"
                :text-field="'name'"
                :data-item-key="'id'"
                v-model="royaltyRule.products"
                class="fw-bold mb-4"
                :disabled="$root.userInfo.is_admin" />
            </div>
          </div>
        </div>
        <div
          v-if="!$root.userInfo.is_admin"
          class="d-flex fw-bold justify-content-end align-items-center mt-4">
          <p style="color: #d5601f">Add Redemption Rule</p>
          <button @click="addRedemptionRule" class="border-0 bg-transparent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
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
    </div>
    <confirmation-dialog
      :dialog="confirmationDialog"
      @close-dialog="closeConfirmationDialog()"
      @yes-action="this.postDeleteRedemption(this.employeeId)" />
  </div>
</template>

<script>
import { MultiSelect } from "@progress/kendo-vue-dropdowns";
import { RadioButton } from "@progress/kendo-vue-inputs";
import { useLoyaltyStore } from "./../../../../stores/LoyaltyStore";
export default {
  components: {
    kradiobutton: RadioButton,
    MultiSelect,
  },
  name: "Admin Loyalty Form",
  setup() {
    const store = useLoyaltyStore();
    return { store };
  },
  data() {
    return {
      productList: [],
      sports: [
        { text: "Basketball", id: 1 },
        { text: "Football", id: 2 },
        { text: "Tennis", id: 3 },
        { text: "Volleyball", id: 4 },
      ],
      tes: ["tes 1", "tes 2", "tes 3", "tes 4"],
      value: { text: "", id: null },
      confirmationDialog: {
        appear: false,
        name: "Are you sure you want to delete this item type?",
        message: "",
        button: {
          yes: "Remove",
          no: "Cancel",
        },
      },
      redemptionIndex: null,
    };
  },
  methods: {
    addRedemptionRule() {
      this.store.loyaltyDetails[0].redemption_rule.push({
        rule_name: "",
        start_point: null,
        end_point: null,
        products: [],
      });
    },
    removeRedemptionRule(index, ruleName) {
      this.redemptionIndex = index;
      this.showConfirmationDialog(ruleName);
    },

    async getProductList() {
      const id = this.$root.selectedTenantId;
      const response = await this.$http.post("/product/list", { id: id });
      for (let i = 0; i < response.data.length; i++) {
        this.productList.push({
          id: response.data[i].id,
          name: response.data[i].name,
        });
      }
      // this.setProductName();
    },

    // setProductName() {
    //   let array1 = this.store.loyaltyDetails[0].redemption_rule;
    //   let array2 = this.productList;
    //   for (let i = 0; i < array1.length; i++) {
    //     let found = array2.find((e) => e.id === array1[i].product_id);
    //     array1[i].available_product = found;
    //   }
    // },
    showConfirmationDialog(message) {
      this.confirmationDialog.message = message;
      this.confirmationDialog.appear = true;
    },
    closeConfirmationDialog() {
      this.confirmationDialog = {
        appear: false,
        name: "Are you sure you want to delete this item type?",
        message: "",
        button: {
          yes: "Remove",
          no: "Cancel",
        },
      };
    },
    postDeleteRedemption() {
      this.store.loyaltyDetails[0].redemption_rule.splice(
        this.redemptionIndex,
        1
      );
      this.closeConfirmationDialog();
    },
  },
  created() {
    if (localStorage.getItem("addOrEditPage") == "Add New") {
      this.store.loyaltyDetails = this.store.addLoyalty;
    }
    this.getProductList();
  },
  mounted() {
    if (localStorage.getItem("addOrEditPage") == "Add New") {
      this.store.loyaltyDetails = this.store.addLoyalty;
    }
  },
};
</script>
