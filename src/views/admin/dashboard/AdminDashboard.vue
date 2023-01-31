<template>
  <div class="h-100 woosh-bg-primary">
    <div class="row m-0 p-5">
      <div class="col-auto bg-white rounded-3 shadow">
        <div class="row py-5 px-5 gap-3">
          <div class="col-auto d-flex align-items-center">
            <img
              :src="store.businessDetails.company_logo"
              class="dashboard--image"
            />
          </div>
          <div class="col-auto">
              <p class="fs-5 fw-bold mb-3">Business Details</p>
              <p class="py-2">{{ store.businessDetails.address }}</p>
              <p class="py-2">{{ store.businessDetails.phone_number }}</p>
              <p class="py-2">{{ store.businessDetails.email }}</p>
              <div class="pt-4">
                <k-button
                  @click="this.$router.push('/adminStoreDetails')"
                  class="text-white">
                  Edit details
                </k-button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStoreStore } from "../../../stores/StoreStore";

export default {
  name: "Admin Dashboard",
  components: {},
  setup() {
    const store = useStoreStore();
    return { store };
  },
  methods: {},
  mounted() {
    this.store.fetchBusinessDetails(this.$root.selectedTenantId);
  },
};
</script>
