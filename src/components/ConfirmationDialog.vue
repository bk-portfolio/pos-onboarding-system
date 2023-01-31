<template>
  <k-dialog v-if="dialog.appear">
    <div class="row mx-0 mb-4">
      <div class="col text-center fw-bold" v-html="dialog.name"></div>
    </div>
    <div class="row mx-0 mb-4">
      <div class="col">
        <p class="text-center py-1 fs-5 fw-bold">{{dialog.message}}</p>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col text-center">
        <k-button @click="$emit('closeDialog')" class="mx-2 rounded-0 text-white fs-6 px-5 py-3 fw-bold border-0 bg-secondary hover:bg-warning">
          Cancel
        </k-button>
      </div>
      <div class="col text-center">
        <k-button @click="$emit('yesAction')" class="mx-2 rounded-0 text-white fs-6 px-5 py-3 fw-bold border-0">
          {{ dialog.button.yes }}
        </k-button>
      </div>
    </div>
  </k-dialog>
</template>

<script>
export default {
  name: "Confirmation Dialog",
  props: {
    // Pars the data below to control data in this dialogue
    // dialog: {
    //   appear: true,
    //   name: "Add New Optional Group ?",
    //   message: "Pesan ini ini ininin ini",
    //   button: {
    //     yes: "Yes, Next",
    //     no: "Cancel"
    //   }
    // },
    dialog: Object
  },
};
</script>