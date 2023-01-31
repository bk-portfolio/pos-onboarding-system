<template>
  <k-dialog>
    <div class="container-fluid h-100 scroll--vertical">
      <div class="row mb-5 sticky-top bg-white">
        <div class="col px-0">
          <k-button
            @click="$emit('closeAdminPackList')"
            class="k-button--secondary rounded-0"
            :theme-color="'primary'"
          >
            Cancel
          </k-button>
        </div>
        <div class="col text-center align-self-center fw-bold">
          <p class="text-center fw-bold fs-4">Change Package</p>
        </div>
        <div class="col text-end px-0">
          <k-button
            @click="$emit('saveUpdatePack')"
            class="text-white rounded-0"
          >
            Save
          </k-button>
        </div>
      </div>

      <registration-select-package-pack />
    </div>
  </k-dialog>
</template>

<script>
import RegistrationSelectPackagePack from "./../../registration/components/RegistrationSelectPackagePack.vue";
export default {
  name: "Admin Pack List",
  components: {
    RegistrationSelectPackagePack,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
