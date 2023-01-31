<template>
  <k-dialog v-if="dialog.appear">
    <div class="row mx-0 mb-4">
      <div class="col">
        <p class="text-center py-1 fs-5 fw-bold">{{ dialog.message }}</p>
        <p class="text-center py-1">{{ dialog.message2 }}</p>
      </div>
    </div>
    <div class="row mx-0">
      <div v-if="dialog.callBack" class="col text-center">
        <k-button
          @click="$emit('closeDialog', true)"
          class="mx-2 rounded-0 text-white fs-6 px-5 py-3 fw-bold border-0">
          Close
        </k-button>
      </div>
      <div v-if="!dialog.callBack" class="col text-center">
        <k-button
          @click="$emit('closeDialog')"
          class="mx-2 rounded-0 text-white fs-6 px-5 py-3 fw-bold border-0">
          Close
        </k-button>
      </div>
    </div>
  </k-dialog>
</template>

<script>
export default {
  name: "Information Dialog",
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
