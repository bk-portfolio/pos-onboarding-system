<template>
  <div class="layout__main--navbar">
    <AdminHeader
      @show-pack-list="showPackList"
      @submit-data="showConfirmationDialog"
      @send-comment="showAdminSendCommentDialog"
      @post-approve="postApprove"
      @logout="showConfirmationDialog"
      @activate-account="activateAccount"/>
  </div>
  <div class="layout__main--body">
    <div class="layout__admin--body">
      <div class="layout__admin--sidemenu pt-2 border-end">
        <div class="menu">
          <router-link
            v-for="menu in listMenu"
            :key="menu.key"
            :to="menu.link"
            class="row m-0 py-4 px-2">
            <div class="col d-flex align-items-center">
              <div class="pe-2">
                <img :src="menu.icon" :alt="'icon ' + menu.name" />
              </div>
              <div v-if="maximizeMenu" class="fw-bold">{{ menu.name }}</div>
            </div>
          </router-link>
          <!-- <div class="d-flex align-items-center justify-content-center"> -->
          <button
            v-if="!$root.userInfo.is_admin"
            class="bg-transparent border-0 row m-0 px-2 hover-help bottom-div d-flex align-items-center text-center w-100"
            @click="showAdminSendHelpMessageDialog">
            <div
              class="fw-bold col showhide-button d-flex align-items-center justify-content-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-question-circle"
                viewBox="0 0 16 16">
                <path
                  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path
                  d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
              </svg>
              <span>
                <p class="ps-2" v-if="maximizeMenu">Help</p>
              </span>
            </div>
          </button>
          <!-- </div> -->
        </div>
        <div
          class="showhide-button d-flex align-items-center justify-content-center">
          <button @click="showHideMenu" class="btn border-0 text-secondary">
            <svg
              v-if="maximizeMenu"
              height="1.5rem"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
            </svg>
            <svg
              v-if="!maximizeMenu"
              height="1.5rem"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
            </svg>
            <i v-if="maximizeMenu" class="fs-7">Hide</i>
          </button>
        </div>
      </div>
      <div class="layout__admin--content">
        <router-view />
      </div>
    </div>
  </div>

  <admin-pack-list
    v-if="showAdminPackList"
    @save-update-pack="saveUpdatePack"
    @close-admin-pack-list="closeAdminPackList" />

  <admin-send-comment
    v-if="showAdminSendComment"
    @close-admin-send-comment="closeAdminSendCommentDialog"
    @send-comment="sendComment" />

  <confirmation-dialog
    :dialog="confirmationDialog"
    @close-dialog="closeConfirmationDialog"
    @yes-action="postSubmitData" />

  <information-dialog
    :dialog="informationDialog"
    @close-dialog="closeInformationDialog" />

  <AdminSendHelpMessage
    v-if="showAdminHelpMessage"
    @close-admin-send-help-message="closeAdminSendHelpMessageDialog"
    @send-help-message="sendHelpMessage" />
</template>

<script>
import AdminHeader from "./components/AdminHeader.vue";
import AdminPackList from "./components/AdminPackList.vue";
import AdminSendComment from "./components/AdminSendComment.vue";
import AdminSendHelpMessage from "./components/AdminSendHelpMessage.vue";
import router from "./../../router/index.js";
import { useStoreStore } from "./../../stores/StoreStore.js";
import { useLoginStore } from "./../../stores/LoginStore.js";
import { usePackagesStore } from "./../../stores/PackagesStore.js";
import { useLoaderStore } from "./../../stores/LoaderStore";

export default {
  name: "Admin",
  components: {
    AdminHeader,
    AdminPackList,
    AdminSendComment,
    AdminSendHelpMessage,
  },
  setup() {
    const store = useStoreStore();
    const loginStore = useLoginStore();
    const pack = usePackagesStore();
    const loaderStore = useLoaderStore();
    return { store, pack, loginStore, loaderStore };
  },
  computed: {
    businessDetails() {
      return this.store.businessDetails;
    },
    listMenu() {
      return this.pack.sideMenu;
    },
  },
  data() {
    return {
      maximizeMenu: true,
      showAdminPackList: false,
      showAdminSendComment: false,
      showAdminHelpMessage: false,
      confirmationDialog: {
        appear: false,
        name: "",
        message: "",
        button: {
          yes: "Confirm",
          no: "Cancel",
        },
      },
      informationDialog: {
        appear: false,
        message: "",
        callBack: false,
      },
      submitType: "",
    };
  },
  methods: {
    showHideMenu() {
      this.maximizeMenu = !this.maximizeMenu;
    },
    showPackList() {
      this.store.fetchBusinessDetails();
      this.showAdminPackList = true;
    },
    closeAdminPackList() {
      this.showAdminPackList = false;
    },
    saveUpdatePack() {
      this.showConfirmationDialog("changePack", this.store.selectedPackageName);
    },
    showAdminSendCommentDialog() {
      this.showAdminSendComment = true;
    },
    closeAdminSendCommentDialog() {
      this.showAdminSendComment = false;
    },
    showAdminSendHelpMessageDialog() {
      this.showAdminHelpMessage = true;
    },
    closeAdminSendHelpMessageDialog() {
      this.showAdminHelpMessage = false;
    },
    async postApprove(infoMessage, loadMessage) {
      const id = this.$root.selectedTenantId;
      try {
        this.loaderStore.openLoadingDialog(loadMessage);
        const response = await this.$http.post("/admin/business/approve/", {
          id,
        });
        if (response.status == 200) {
            this.loaderStore.closeLoadingDialog();
            this.showInformationDialog(infoMessage);
        }
      } catch(error) {
        console.log(error);
        this.loaderStore.closeLoadingDialog();
        this.showInformationDialog(infoMessage);
      }
    },
    async activateAccount(id, postActive) {
      this.loaderStore.openLoadingDialog("Checking your account...");
      const response = await this.$http.post("/subscription/activate", {
        id
      });
      if (response.status == 200) {
        this.loaderStore.closeLoadingDialog();
        this.showInformationDialog("Your account succesfully activated");
        postActive();
      } else {
        this.loaderStore.closeLoadingDialog();
        this.showInformationDialog(response.data.error);
      }
    },
    showHelpMessageDialog(message, callBack) {
      this.HelpMessageDialog = {
        appear: true,
        message: message,
        callBack: callBack,
      };
    },
    showInformationDialog(message, callBack) {
      this.informationDialog = {
        appear: true,
        message: message,
        callBack: callBack,
      };
    },
    closeInformationDialog(callBack) {
      if (callBack) {
        this.logOut();
      }
      this.informationDialog = {
        appear: false,
        message: "",
        callBack: false,
      };
    },
    showConfirmationDialog(type, packName) {
      if (type === "logout") {
        this.submitType = "logout";
        this.confirmationDialog = {
          appear: true,
          name: "Are you sure you want to logout?",
          message: "",
          button: {
            yes: "Confirm",
            no: "Cancel",
          },
        };
      } else if (type === "submit") {
        this.submitType = "submit";
        this.confirmationDialog = {
          appear: true,
          name: "Are you sure you want to submit all your company data?",
          message:
            "Please note, if you have click on Yes button to submit, you can't change or update your data details. ",
          button: {
            yes: "Yes",
            no: "Cancel",
          },
        };
      } else if (type === "changePack") {
        this.submitType = "changePack";
        this.confirmationDialog = {
          appear: true,
          name: "",
          message:
            `The package has been updated to the "` +
            packName +
            `". Some items which have been saved on the previous packages setting will be update to adjust with the current packages.`,
          button: {
            yes: "Confirm",
            no: "Cancel",
          },
        };
      }
    },
    closeConfirmationDialog() {
      this.confirmationDialog = {
        appear: false,
        name: "",
        message: "",
        button: {
          yes: "Confirm",
          no: "Cancel",
        },
      };
    },
    postSubmitData() {
      if (this.submitType == "logout") {
        this.logOut();
      } else if (this.submitType == "submit") {
        this.submitData();
        // this.closeConfirmationDialog();
      } else if (this.submitType == "changePack") {
        this.store.postEditBusinessDetails();
        this.closeConfirmationDialog();
        this.showInformationDialog(
          "Please Re-Login to apply updated Package.",
          true
        );
      }
    },

    async submitData() {
      const response = await this.$http.post("/business/submit");
      if (response.status == 200) {
        await this.logOut();
      }
    },

    async sendComment(comment) {
      let data = {
        business_id: this.$root.selectedTenantId,
        comment: comment,
      };
      this.loaderStore.openLoadingDialog("Sending...");
      const response = await this.$http.post(
        "/admin/business/send/comment",
        data
      );
      this.loaderStore.closeLoadingDialog();
      if (response.status == 200) {
        this.closeAdminSendCommentDialog();
        this.showInformationDialog("Your message was sent successfully");
      }
    },

    async logOut() {
      try {
        const response = await this.$http.post("/auth/logout");
        if (response.status === 200) {
          localStorage.clear();
          this.loginStore.$reset();
          await router.push("/");
        }
      } catch (e) {
        if (e.response.status === 401) {
          localStorage.clear();
          await router.push("/");
        }
      }
    },

    async sendHelpMessage(message) {
      this.loaderStore.openLoadingDialog("Sending your message...");
      const response = await this.$http.post("/helpdesk/ask", {
        comment: message,
      });
      if (response.status == 200) {
        this.showAdminHelpMessage = false;
        this.showInformationDialog("Your message was sent successfully");
      }
      this.loaderStore.closeLoadingDialog();
    },
  },
  mounted() {
    this.pack.updateSideMenu();
  },
};
</script>
