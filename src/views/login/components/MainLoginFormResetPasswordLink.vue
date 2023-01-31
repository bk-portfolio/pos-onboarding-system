<template>
  <div class="w-50">
    <form class="">
      <fieldset class="border-0">
        <legend class="fw-bold fs-5 mb-3 d-flex justify-content-center">
          Reset password link
        </legend>
        <div class="">
          <k-input
            v-model="store.emailResetPassword"
            :name="'email'"
            :label="'Email'"
            :min-length="2"
            :placeholder="'email@email.com'"
            class="fw-bold">
          </k-input>
        </div>
        <div class="mt-4 d-flex justify-content-end align-items-center">
          <k-button
            @click.prevent="store.sendLinkResetPassword"
            class="mx-2 rounded-0 text-white fs-6 px-5 py-3 fw-bold border-0">
            Send
          </k-button>
        </div>
      </fieldset>
    </form>
    <LoadingDialog
      :dialog="store.loadingDialog"
      @close-dialog="store.closeLoadingDialog" />
    <information-dialog
      :dialog="store.informationDialog"
      @close-dialog="store.closeInformationDialog" />
  </div>
</template>

<script>
import { DropDownList } from "@progress/kendo-vue-dropdowns";
import LoadingDialog from "./../../../components/LoadingDialog.vue";
import { useLoginStore } from "./../../../stores/LoginStore";
import "@progress/kendo-theme-default/dist/all.css";

export default {
  name: "Main Login Form Reset Password Link",
  components: {
    dropdownlist: DropDownList,
    LoadingDialog,
  },
  setup() {
    const store = useLoginStore();
    return {
      store,
    };
  },
  data: function () {
    return {};
  },
  methods: {},
  created() {
    this.store.emailResetPassword = "";
  },
};
</script>
