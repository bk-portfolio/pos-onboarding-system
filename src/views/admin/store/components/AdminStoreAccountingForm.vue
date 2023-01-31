<template>
  <div class="">
    <form action="">
      <legend class="fw-bold fs-5 mb-4">Accounting</legend>
      <div class="row">
        <div class="col me-3">
          <div class="form-group mb-2 w-50">
            <k-input
              v-model="store.accountingList.salestax_code"
              type="text"
              :name="'salesTaxName'"
              :label="'Sales Tax Name'"
              :placeholder="'Sales Tax Name'"
              class="fw-bold mandatory-field"
              :required="true"
              :wrapper-class="
                store.mandatoryFieldBoxAccounting.salestax_code
                  ? 'mandatory-field'
                  : ''
              "
              :disabled="$root.userInfo.is_admin">
            </k-input>
          </div>
          <div class="form-group mb-2 w-50">
            <k-input
              min="0"
              v-model="store.accountingList.salestax"
              :wrapper-class="
                store.mandatoryFieldBoxAccounting.salestax
                  ? 'mandatory-field'
                  : ''
              "
              type="number"
              :name="'salesTax%'"
              :label="'Sales Tax %'"
              :required="true"
              :placeholder="'Sales Tax %'"
              class="fw-bold"
              :disabled="$root.userInfo.is_admin">
            </k-input>
          </div>
          <div class="form-group mb-2 w-50">
            <k-input
              v-model="store.accountingList.purchasetax_code"
              :wrapper-class="
                store.mandatoryFieldBoxAccounting.purchasetax_code
                  ? 'mandatory-field'
                  : ''
              "
              type="text"
              :name="'PurchaseTaxName'"
              :label="'Purchase Tax Name'"
              :required="true"
              :placeholder="'Purchase Tax Name'"
              class="fw-bold"
              :disabled="$root.userInfo.is_admin">
            </k-input>
          </div>
          <div class="form-group mb-2 w-50">
            <k-input
              min="0"
              v-model="store.accountingList.purchasetax"
              :wrapper-class="
                store.mandatoryFieldBoxAccounting.purchasetax
                  ? 'mandatory-field'
                  : ''
              "
              type="number"
              :name="'purchaseTax%'"
              :label="'Purchase Tax %'"
              :min-length="2"
              :required="true"
              :placeholder="'Purchase Tax %'"
              class="fw-bold"
              :disabled="$root.userInfo.is_admin">
            </k-input>
          </div>
          <div class="form-group mb-2 w-50">
            <k-dropdown-combobox
              v-model="store.accountingList.currency"
              :class-name="
                store.mandatoryFieldBoxAccounting.currency
                  ? 'mandatory-field'
                  : ''
              "
              :label="'Currency'"
              :data-items="currencies"
              class="fw-bold"
              :disabled="$root.userInfo.is_admin">
            </k-dropdown-combobox>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { useStoreStore } from "./../../../../stores/StoreStore.js";
export default {
  name: "Admin Store Accounting Form",
  setup() {
    const store = useStoreStore();
    return { store };
  },
  data() {
    return {
      currencies: ["AUD", "SGD", "USD"],
    };
  },
  created() {
    this.store.postFetchAccounting(this.$root.selectedTenantId);
  },
};
</script>
