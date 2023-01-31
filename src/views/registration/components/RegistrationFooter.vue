<template>
  <div class="row m-0 align-items-center justify-content-between">
    <div class="col px-0">
      <PaginationPage />
    </div>
    <div class="col-auto">
      <button v-if="back" @click="BackPage()" class="border-0 bg-transparent">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="gray"
          class="bi bi-arrow-left"
          viewBox="0 0 16 16">
          <path
            fill-rule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 
            .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
        </svg>
      </button>
      <k-button
        @click="NextPage()"
        class="mx-2 rounded-0 text-white fs-6 px-5 py-3 fw-bold border-0">
        {{ buttonMovePage }}
      </k-button>
    </div>
    <InformationDialog
      :dialog="this.store.informationDialog"
      @close-dialog="this.store.closeInformationDialog" />
  </div>
</template>

<script>
import PaginationPage from "./../../../components/PaginationPage.vue";
import { useStoreStore } from "./../../../stores/StoreStore";
import InformationDialog from "./../../../components/InformationDialog.vue";

export default {
  name: "Registration Footer",
  components: {
    PaginationPage,
    InformationDialog,
  },
  props: {
    back: String,
    next: String,
  },
  setup() {
    const store = useStoreStore();
    return { store };
  },
  computed: {
    buttonMovePage() {
      if (this.$route.path === "/registrationBusinessDetails") {
        return "Finish";
      }
      return "Next";
    },
  },
  methods: {
    NextPage() {
      if (this.$route.path === "/registrationBusinessDetails") {
        this.store.checkMandatoryFieldsDetails();
        let check = false;
        if (
          this.store.mandatoryFieldBoxDetails.restaurant_name === true ||
          this.store.mandatoryFieldBoxDetails.company_name === true ||
          this.store.mandatoryFieldBoxDetails.address === true ||
          this.store.mandatoryFieldBoxDetails.phone_number === true ||
          this.store.mandatoryFieldBoxDetails.email === true ||
          this.store.mandatoryFieldBoxDetails.language === true ||
          this.store.mandatoryFieldBoxDetails.currency === true ||
          this.store.mandatoryFieldBoxDetails.internet_provider === true ||
          this.store.mandatoryFieldBoxDetails.abn === true ||
          this.store.mandatoryFieldBoxDetails.modem === true ||
          this.store.mandatoryFieldBoxDetails.payment_provider === true ||
          this.store.mandatoryFieldBoxDetails.be_placed === true
        ) {
          this.store.openInformationDialog(
            "Please fill in all mandatory fields"
          );
          check = true;
        }
        if (check === false) {
          this.store.postBusinessCreate();
        }
      } else {
        this.$router.push(this.next);
      }
    },
    BackPage() {
      this.$router.push(this.back);
    },
  },
};
</script>
