<template>
    <k-dialog v-if="dialog.appear">
        <div class="row mx-0 mb-4">
          <div class="col text-center fw-bold">{{dialog.name}} <span class="woosh-text-primary">{{dialog.type}}</span></div>
        </div>
        <div class="row mx-0 mb-4">
          <div class="col">
            <p v-for="content in dialog.content" :key="content.key" class="text-center py-1 fs-5 fw-bold">{{content}}</p>
          </div>
        </div>
        <div class="row mx-0">
          <div class="col text-center">
            <k-button @click="$emit('closeDialog')" class="mx-2 rounded-0 text-white fs-6 px-5 py-3 fw-bold border-0">
                Close
            </k-button>
          </div>
        </div>
    </k-dialog>
</template>

<script>
export default {
    name: "Admin Produk List Dialog",
    props: {
        dialog: Object
    },
};
</script>