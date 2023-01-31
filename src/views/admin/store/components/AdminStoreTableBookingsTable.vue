<template>
  <div class="fw-bold fs-5 mb-5">
    <p>Table bookings</p>
  </div>
  <table class="table">
    <thead>
      <tr class="fw-bold text-center fs-5">
        <th class="border border-white border-top-0">
          {{ store.tableBookingsList.length }} Tables
        </th>
        <th class="border border-white border-top-0">
          {{ this.totalSeats }} Seats
        </th>
      </tr>
    </thead>
    <tbody style="color: #d5601f" class="fw-bold text-center">
      <tr v-for="(table, index) in store.tableBookingsList" :key="index">
        <td class="border border-white">
          <k-input
            v-model="table.tables_name"
            :class="
              store.mandatoryFieldBoxTableBooking[index].tables_name
                ? 'mandatory-field'
                : ''
            "
            :required="true"
            type="text"
            class="fw-bold"
            placeholder="Table name"
            :disabled="$root.userInfo.is_admin" />
        </td>
        <td class="border border-white">
          <k-input
            oninput="validity.valid||(value='')"
            min="0"
            v-model="table.seat"
            :class="
              store.mandatoryFieldBoxTableBooking[index].seat
                ? 'mandatory-field'
                : ''
            "
            :required="true"
            type="number"
            class="fw-bold"
            placeholder="Seats"
            :disabled="$root.userInfo.is_admin" />
        </td>
        <td v-if="!$root.userInfo.is_admin">
          <button
            @click="deleteTableBooking(table.id, table.tables_name)"
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
      </tr>
      <tr v-for="(table, index) in store.tableBookingsAdd" :key="index">
        <td class="border border-white">
          <k-input
            v-model="table.tables_name"
            :class="
              store.mandatoryFieldBoxTableBookingAdd[index].tables_name
                ? 'mandatory-field'
                : ''
            "
            :required="true"
            type="text"
            class="fw-bold"
            placeholder="Table name" />
        </td>
        <td class="border border-white">
          <k-input
            v-model="table.seat"
            oninput="validity.valid||(value='')"
            min="0"
            :class="
              store.mandatoryFieldBoxTableBookingAdd[index].tables_name
                ? 'mandatory-field'
                : ''
            "
            :required="true"
            type="number"
            class="fw-bold"
            placeholder="Seats" />
        </td>
        <td>
          <button
            @click="deleteTable(index)"
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
      </tr>
    </tbody>
  </table>
  <div
    v-if="!$root.userInfo.is_admin"
    class="d-flex fw-bold justify-content-end align-items-center bor border-white border-bottom pb-4 pt-2 me-4">
    <p style="color: #d5601f">Add Table</p>
    <button @click="addTable" class="border-0 bg-transparent">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="42"
        height="42"
        fill="#D5601F"
        class="bi bi-plus-square-fill ms-3"
        style="color: #d5601f"
        viewBox="0 0 16 16">
        <path
          d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
      </svg>
    </button>
    <confirmation-dialog
      :dialog="confirmationDialog"
      @close-dialog="closeConfirmationDialog()"
      @yes-action="this.postDeleteTableBooking(this.tableBookingId)" />
  </div>
</template>

<script>
import { useStoreStore } from "./../../../../stores/StoreStore.js";

export default {
  name: "Admin Store Table Bookings Table",
  setup() {
    const store = useStoreStore();
    return { store };
  },
  data() {
    return {
      confirmationDialog: {
        appear: false,
        name: "Are you sure you want to delete this item type?",
        message: "",
        button: {
          yes: "Remove",
          no: "Cancel",
        },
      },
      tableBookingId: null,
    };
  },
  computed: {
    totalSeats() {
      let total = 0;
      this.store.tableBookingsList.forEach((table) => {
        total += +table.seat;
      });
      return total;
    },
  },
  methods: {
    addTable() {
      this.store.tableBookingsAdd.push({
        tables_name: "",
        seat: null,
      });
      this.store.mandatoryFieldBoxTableBookingAdd.push({
        tables_name: false,
        seat: false,
      });
    },
    deleteTable(index) {
      this.store.tableBookingsAdd.splice(index, 1);
      this.store.mandatoryFieldBoxTableBookingAdd.splice(index, 1);
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
    deleteTableBooking(id, name) {
      this.tableBookingId = id;
      this.showConfirmationDialog(name);
    },
    postDeleteTableBooking(id) {
      this.store.postDeleteTableBookings(id);
      this.store.tableBookingsList.splice(id, 1);
      this.closeConfirmationDialog();
    },
  },
  created() {
    this.store.fetchTableBookings(this.$root.selectedTenantId);
  },
};
</script>
