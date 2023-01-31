<template>
  <div class="layout__admin--product container-fluid h-100">
    <AdminMarketingHeader />
    <div class="row h-90 scroll--vertical woosh-bg-primary">
      <AdminMarketingForm />
    </div>
  </div>
</template>

<script>
import AdminMarketingHeader from "./components/AdminMarketingHeader.vue";
import AdminMarketingForm from "./components/AdminMarketingForm.vue";
import { useLoaderStore } from "./../../../stores/LoaderStore.js";

export default {
  name: "AdminMarketing",
  setup() {
    const store = useLoaderStore();
    return { store };
  },
  components: {
    AdminMarketingHeader,
    AdminMarketingForm,
  },
};
</script>
