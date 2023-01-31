<template>
  <div class="row mb-4">
    <div class="d-flex col fw-bold fs-5 mb-5 align-items-center">
      <p>POS</p>
      <button @click="addSession" class="border-0 bg-transparent me-3 ms-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="#D5601F"
          class="bi bi-plus-square-fill ms-3"
          style="color: #d5601f"
          viewBox="0 0 16 16">
          <path
            d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
        </svg>
      </button>
      <p style="color: #d5601f">Add POS Session</p>
      <confirmation-dialog
        :dialog="confirmationDialog"
        @close-dialog="closeConfirmationDialog()"
        @yes-action="this.postDeletePos(this.posSessionId)" />
    </div>
  </div>
  <table class="table">
    <thead>
      <tr class="fw-bold text-center">
        <th></th>
        <th></th>
        <th class="border border-white border-top-0">Name</th>
        <th class="border border-white border-top-0">Function</th>
        <th class="border border-white border-top-0">Type of Hardware</th>
        <th class="border border-white border-top-0">Printer Type</th>
        <th class="border border-white border-top-0">Printer IP address</th>
        <th class="border border-white border-top-0">Tax included price</th>
        <th class="border border-white border-top-0">Payment Methods</th>
        <th class="border border-white border-top-0">POS Session Color</th>
        <th class="border border-white border-top-0">Allow Order Notes</th>
        <th></th>
      </tr>
    </thead>
    <tbody style="color: #d5601f" class="fw-bold text-center">
      <tr v-for="(sessionPinia, index) in store.posSessionsFetch" :key="index">
        <td v-if="!$root.userInfo.is_admin">
          <button
            @click="deletePosSession(sessionPinia.id, sessionPinia.name)"
            class="border-0"
            style="background-color: #f7f5f4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#9B4A2E"
              class="bi bi-trash3-fill"
              viewBox="0 0 16 16">
              <path
                d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
            </svg>
          </button>
        </td>
        <th class="border border-white" style="width: max-content">
          POS Session {{ index + 1 }}
        </th>
        <td class="border border-white">
          <k-input
            v-model="sessionPinia.name"
            :wrapper-class="
              store.mandatoryFieldBoxPos[index].name ? 'mandatory-field' : ''
            "
            type="text"
            :required="true"
            class="fw-bold"
            placeholder="Name"
            :disabled="$root.userInfo.is_admin" />
        </td>
        <td class="border border-white">
          <k-dropdown-combobox
            v-model="sessionPinia.function"
            :data-items="functionType"
            @change="sessionPinia.function = $event.value"
            :class-name="
              store.mandatoryFieldBoxPos[index].function
                ? 'mandatory-field'
                : ''
            "
            :required="true"
            class="fw-bold"
            :disabled="$root.userInfo.is_admin">
          </k-dropdown-combobox>
        </td>
        <td class="border border-white">
          <k-dropdown-combobox
            v-model="sessionPinia.hardware_type"
            :class-name="
              store.mandatoryFieldBoxPos[index].hardware_type
                ? 'mandatory-field'
                : ''
            "
            @change="sessionPinia.hardware_type = $event.value"
            :required="true"
            :data-items="typeOfHardware"
            class="fw-bold"
            :disabled="$root.userInfo.is_admin">
          </k-dropdown-combobox>
        </td>
        <td class="border border-white">
          <k-input
            v-model="sessionPinia.printer_type"
            :wrapper-class="
              store.mandatoryFieldBoxPos[index].printer_type
                ? 'mandatory-field'
                : ''
            "
            :required="true"
            type="text"
            class="fw-bold"
            placeholder="Printer Type"
            :disabled="$root.userInfo.is_admin" />
        </td>
        <td class="border border-white">
          <k-input
            v-model="sessionPinia.ip_address"
            :wrapper-class="
              store.mandatoryFieldBoxPos[index].ip_address
                ? 'mandatory-field'
                : ''
            "
            :required="true"
            type="text"
            class="fw-bold"
            placeholder="Printer IP address"
            :disabled="$root.userInfo.is_admin" />
        </td>
        <td class="border border-white">
          <k-dropdown-combobox
            v-model="sessionPinia.include_tax"
            :value-primitive="true"
            :value-field="'value'"
            :data-items="yesOrNoOption"
            :text-field="'text'"
            :data-item-key="'value'"
            @change="sessionPinia.include_tax = $event.value"
            :placeholder="'Include Tax'"
            class="fw-bold"
            :disabled="$root.userInfo.is_admin">
          </k-dropdown-combobox>
        </td>
        <td class="border border-white">
          <k-dropdown-combobox
            v-model="sessionPinia.payment_methods"
            :class-name="
              store.mandatoryFieldBoxPos[index].payment_methods
                ? 'mandatory-field'
                : ''
            "
            :placeholder="'Payment Methods'"
            :required="true"
            :data-items="paymentMethods"
            class="fw-bold"
            :disabled="$root.userInfo.is_admin">
          </k-dropdown-combobox>
        </td>
        <td class="border border-white">
          <ColorPicker
            :view="'gradient'"
            v-model="sessionPinia.session_color"
            :class-name="
              store.mandatoryFieldBoxPos[index].session_color
                ? 'mandatory-field'
                : ''
            "
            :required="true"
            v-on:change="sessionPinia.session_color = $event.value"
            :gradient-settings="{
              backgroundColor: backgroundColor,
            }"
            :disabled="$root.userInfo.is_admin" />
        </td>
        <td class="border border-white">
          <k-dropdown
            v-model="sessionPinia.allow_notes"
            :value-primitive="true"
            :value-field="'value'"
            :data-items="yesOrNoOption"
            :text-field="'text'"
            :data-item-key="'value'"
            @change="sessionPinia.allow_notes = $event.value"
            :placeholder="'Allow Notes'"
            class="fw-bold"
            :disabled="true">
          </k-dropdown>
        </td>
        <td>
          <button
            class="border-0 bg-transparent woosh-text-primary fw-bold text-decoration-underline"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="true"
            @click="closeMandatoryNotifications(index)"
            id="dropdownMenuClickableInside"
            data-bs-auto-close="outside">
            Manage User
          </button>
          <ul class="dropdown-menu p-4 mt-2">
            <user-form-dialog
              :pos-index="index"
              :new-pos-index="index"
              :is-new-session="isNewSession"
              aria-labelledby="dropdownMenuClickableInside" />
          </ul>
          <ul
            v-if="store.mandatoryFieldBoxPos[index].showFillNotification"
            class="dropdown-menu show p-1 mt-2"
            style="right: 4rem"
            data-popper-placement="bottom-end"
            aria-labelledby="dropdownMenuClickableInside">
            <span class="woosh-text-primary ms-1 me-1"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="red"
                class="bi bi-exclamation-diamond-fill me-2"
                viewBox="0 0 16 16">
                <path
                  d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              Please fill all user mandatory fields</span
            >
          </ul>
          <ul
            v-if="store.mandatoryFieldBoxPos[index].showMin1Notification"
            class="dropdown-menu show p-2 mt-2"
            style="right: 4rem"
            data-popper-placement="bottom-end"
            aria-labelledby="dropdownMenuClickableInside">
            <span class="woosh-text-primary ms-1 me-1"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="red"
                class="bi bi-exclamation-diamond-fill me-2"
                viewBox="0 0 16 16">
                <path
                  d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              Please add at least 1 user for each POS Session</span
            >
          </ul>
        </td>
      </tr>
      <tr v-for="(session, index) in store.posSessionsAdd" :key="index">
        <td>
          <button
            @click="deletePosSessionAdd(index)"
            class="border-0"
            style="background-color: #f7f5f4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#9B4A2E"
              class="bi bi-trash3-fill"
              viewBox="0 0 16 16">
              <path
                d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
            </svg>
          </button>
        </td>
        <th class="border border-white" style="width: max-content">
          POS Session {{ index + 1 + store.posSessionsFetch.length }}
        </th>
        <td class="border border-white">
          <k-input
            v-model="session.name"
            :wrapper-class="
              store.mandatoryFieldBoxPosAdd[index].name ? 'mandatory-field' : ''
            "
            type="text"
            :required="true"
            class="fw-bold"
            placeholder="Name" />
        </td>
        <td class="border border-white">
          <k-dropdown-combobox
            v-model="session.function"
            :class-name="
              store.mandatoryFieldBoxPosAdd[index].function
                ? 'mandatory-field'
                : ''
            "
            :placeholder="'Function'"
            :required="true"
            :data-items="functionType"
            class="fw-bold"
            :disabled="$root.userInfo.is_admin">
          </k-dropdown-combobox>
        </td>
        <td class="border border-white">
          <k-dropdown-combobox
            v-model="session.typeOfHardware"
            :class-name="
              store.mandatoryFieldBoxPosAdd[index].hardware_type
                ? 'mandatory-field'
                : ''
            "
            :required="true"
            :placeholder="'Hardware Type'"
            @change="
              store.posSessionsAdd[index].hardware_type = $event.target.value
            "
            :data-items="typeOfHardware"
            class="fw-bold"
            :disabled="$root.userInfo.is_admin">
          </k-dropdown-combobox>
        </td>
        <td class="border border-white">
          <k-input
            v-model="session.printer_type"
            :required="true"
            type="text"
            class="fw-bold"
            placeholder="Printer Type" />
        </td>
        <td class="border border-white">
          <k-input
            v-model="session.ip_address"
            :required="true"
            type="text"
            class="fw-bold"
            placeholder="Printer IP address" />
        </td>
        <td class="border border-white">
          <k-dropdown-combobox
            v-model="session.include_tax"
            :value-primitive="true"
            :value-field="'value'"
            :data-items="yesOrNoOption"
            :text-field="'text'"
            :data-item-key="'value'"
            @change="session.include_tax = $event.value"
            :placeholder="'Include Tax'"
            class="fw-bold">
          </k-dropdown-combobox>
        </td>
        <td class="border border-white">
          <k-dropdown-combobox
            v-model="session.payment_methods"
            :class-name="
              store.mandatoryFieldBoxPosAdd[index].payment_methods
                ? 'mandatory-field'
                : ''
            "
            :placeholder="'Payment Methods'"
            :required="true"
            :data-items="paymentMethods"
            class="fw-bold"
            :disabled="$root.userInfo.is_admin">
          </k-dropdown-combobox>
        </td>
        <td class="border border-white">
          <ColorPicker
            :view="'gradient'"
            :class="
              store.mandatoryFieldBoxPosAdd[index].session_color
                ? 'mandatory-field'
                : ''
            "
            :required="true"
            v-model="session.session_color"
            @change="session.session_color = $event.value" />
        </td>
        <td class="border border-white">
          <k-dropdown
            v-model="session.allow_notes"
            :data-items="yesOrNoOption"
            :value-primitive="true"
            :value-field="'value'"
            :text-field="'text'"
            :data-item-key="'value'"
            @change="session.allow_notes = $event.value"
            :placeholder="'Allow Notes'"
            :disabled="true"
            class="fw-bold">
          </k-dropdown>
        </td>
        <td>
          <button
            class="border-0 bg-transparent woosh-text-primary fw-bold text-decoration-underline"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="true"
            @click="closeMandatoryAddNotifications(index)"
            id="dropdownMenuClickableInside"
            data-bs-auto-close="outside">
            Manage User
          </button>
          <ul class="dropdown-menu p-4 mt-2">
            <user-form-dialog
              :pos-index="index"
              :new-pos-index="index"
              :is-new-session="!isNewSession"
              aria-labelledby="dropdownMenuClickableInside" />
          </ul>
          <ul
            v-if="store.mandatoryFieldBoxPosAdd[index].showFillNotification"
            class="dropdown-menu show p-1 mt-2"
            style="right: 4rem"
            data-popper-placement="bottom-end"
            aria-labelledby="dropdownMenuClickableInside">
            <span class="woosh-text-primary ms-1 me-1"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="red"
                class="bi bi-exclamation-diamond-fill me-2"
                viewBox="0 0 16 16">
                <path
                  d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              Please fill all user mandatory fields</span
            >
          </ul>
          <ul
            v-if="store.mandatoryFieldBoxPosAdd[index].showMin1Notification"
            class="dropdown-menu show p-1 mt-2"
            style="right: 4rem"
            data-popper-placement="bottom-end"
            aria-labelledby="dropdownMenuClickableInside">
            <span class="woosh-text-primary ms-1 me-1"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="red"
                class="bi bi-exclamation-diamond-fill me-2"
                viewBox="0 0 16 16">
                <path
                  d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              Please add at least 1 user for each POS Session</span
            >
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ColorPicker } from "@progress/kendo-vue-inputs";
import { DropDownList } from "@progress/kendo-vue-dropdowns";
import { useStoreStore } from "./../../../../stores/StoreStore.js";
import { Fade } from "@progress/kendo-vue-animation";
import {
  Notification,
  NotificationGroup,
} from "@progress/kendo-vue-notification";
import UserFormDialog from "./../../../../components/UserFormDialog.vue";

export default {
  name: "Admin Store Pos Table",
  components: {
    ColorPicker,
    dropdownlist: DropDownList,
    UserFormDialog,
    Fade,
    Notification,
    NotificationGroup,
  },
  setup() {
    const store = useStoreStore();
    return { store };
  },
  data() {
    return {
      wrapper: this.$refs.wrapper,
      open: false,
      targetElement: null,
      yesOrNoOption: [
        {
          text: "Yes",
          value: true,
        },
        {
          text: "No",
          value: false,
        },
      ],
      confirmationDialog: {
        appear: false,
        name: "Are you sure you want to delete this item type?",
        message: "",
        button: {
          yes: "Remove",
          no: "Cancel",
        },
      },
      posSessionId: null,
      paymentMethods: ["Cash", "Credit Card"],
      functionType: ["POS", "KVS"],
      typeOfHardware: ["Tablet", "Printer"],
      userForm: false,
      posIndex: null,
      newPosIndex: null,
      isNewSession: false,
    };
  },
  methods: {
    closeMandatoryAddNotifications(index) {
      this.store.mandatoryFieldBoxPosAdd[index].showFillNotification = false;
      this.store.mandatoryFieldBoxPosAdd[index].showMin1Notification = false;
    },
    closeMandatoryNotifications(index) {
      this.store.mandatoryFieldBoxPos[index].showFillNotification = false;
      this.store.mandatoryFieldBoxPos[index].showMin1Notification = false;
    },
    showTooltip(element) {
      this.open = true;
      this.targetElement = element;
    },
    hideTooltip(element) {
      this.open = false;
      this.targetElement = null;
    },
    addSession() {
      this.store.posSessionsAdd.push({
        name: "",
        function: "",
        hardware_type: "",
        printer_type: "",
        ip_address: "",
        allow_notes: true,
        payment_methods: "",
        include_tax: "",
        session_color: "",
        users: [{ name: "", email: "", password: "" }],
      });
      this.store.mandatoryFieldBoxPosAdd.push({
        name: false,
        users: false,
        function: false,
        hardware_type: false,
        printer_type: false,
        ip_address: false,
        payment_methods: false,
        session_color: false,
        isUserMandatoryMin1: false,
        showFillNotification: false,
        showMin1Notification: false,
      });
    },
    deletePosSessionAdd(index) {
      this.store.posSessionsAdd.splice(index, 1);
      this.store.mandatoryFieldBoxPosAdd.splice(index, 1);
    },
    showConfirmationDialog(message) {
      this.confirmationDialog.message = message;
      this.confirmationDialog.appear = true;
    },
    closeConfirmationDialog() {
      this.confirmationDialog = {
        appear: false,
        name: "Are you sure you want to delete this item type?",
        message: "",
        button: {
          yes: "Remove",
          no: "Cancel",
        },
      };
    },
    deletePosSession(id, name) {
      this.posSessionId = id;
      this.showConfirmationDialog(name);
    },
    postDeletePos(id) {
      this.store.postDeletePos(id);
      this.store.posSessionsFetch.splice(id, 1);
      this.store.posSessionsFetchLength--;
      this.closeConfirmationDialog();
    },
  },
  mounted() {
    this.store.fetchPosSessions(this.$root.selectedTenantId);
  },
};
</script>

<style></style>
