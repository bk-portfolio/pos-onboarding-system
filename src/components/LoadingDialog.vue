<template>
  <k-dialog v-if="dialog.appear" class="loader">
    <div class="row mx-0 mb-4 d-flex justify-content-center">
      <p class="text-center py-1 fs-4 fw-bold">
        {{ dialog.message }}<br />
        <Loader
          class="text-center mt-3 py-1"
          :type="'converging-spinner'"
          :size="'large'" />
      </p>
    </div>
  </k-dialog>
</template>

<script>
import { Loader } from "@progress/kendo-vue-indicators";
export default {
  name: "Loading Dialog",
  components: {
    Loader,
  },
  props: {
    // Pars the data below to control data in this dialogue
    // dialog: {
    //   appear: true,
    //   message: "Pesan ini ini ininin ini",
    //   callBack: false,
    // },
    dialog: Object,
  },
};
</script>
