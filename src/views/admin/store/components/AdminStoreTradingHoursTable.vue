<template>
  <div class="fw-bold fs-4 mb-5">
    <p>Trading Hours</p>
  </div>
  <div class="mb-5" style="width: 400px">
    <label class="mb-2 fw-bold woosh-text-primary"
      >How far in advance can an order be placed?</label
    >
    <k-input
      :min="0"
      :value="store.tradingHoursValue.be_placed"
      v-model="store.tradingHoursValue.be_placed"
      :wrapper-class="
        store.mandatoryFieldBoxTradingHours.be_placed ? 'mandatory-field' : ''
      "
      :name="'orderPlaced'"
      type="number"
      :min-length="2"
      :required="true"
      class="fw-bold"
      :disabled="$root.userInfo.is_admin">
    </k-input>
  </div>
  <table class="table w-100">
    <thead>
      <tr class="text-center fw-bold fs-5">
        <th></th>
        <th
          class="border border-white border-top-0"
          colspan="2"
          v-for="(day, index) in days"
          :key="index">
          {{ day.day }}
        </th>
      </tr>
      <tr class="fw-bold" style="color: #d5601f">
        <th></th>
        <th class="border border-white text-center">Open</th>
        <th class="border border-white text-center">Closed</th>
        <th class="border border-white text-center">Open</th>
        <th class="border border-white text-center">Closed</th>
        <th class="border border-white text-center">Open</th>
        <th class="border border-white text-center">Closed</th>
        <th class="border border-white text-center">Open</th>
        <th class="border border-white text-center">Closed</th>
        <th class="border border-white text-center">Open</th>
        <th class="border border-white text-center">Closed</th>
        <th class="border border-white text-center">Open</th>
        <th class="border border-white text-center">Closed</th>
        <th class="border border-white text-center">Open</th>
        <th class="border border-white text-center">Closed</th>
      </tr>
    </thead>
    <tbody
      style="color: #d5601f"
      class="fw-bold border border-white border-start-0">
      <tr></tr>
      <tr v-for="(value, index) in tradingHoursValue.trading" :key="index">
        <th scope="row" class="">
          {{ value.name }}
        </th>
        <td class="border border-white">
          <k-input
            v-model="value.monday_open"
            step="1"
            type="time"
            class="form-control"
            id=""
            :disabled="$root.userInfo.is_admin" />
        </td>
        <td class="border border-white">
          <k-input
            v-model="value.monday_close"
            step="1"
            type="time"
            class="form-control"
            id=""
            :disabled="$root.userInfo.is_admin" />
        </td>
        <td class="border border-white">
          <k-input
            v-model="value.tuesday_open"
            step="1"
            type="time"
            class="form-control"
            id=""
            :disabled="$root.userInfo.is_admin" />
        </td>
        <td class="border border-white">
          <k-input
            v-model="value.tuesday_close"
            step="1"
            type="time"
            class="form-control"
            id=""
            :disabled="$root.userInfo.is_admin" />
        </td>
        <td class="border border-white">
          <k-input
            v-model="value.wednesday_open"
            step="1"
            type="time"
            class="form-control"
            id=""
            :disabled="$root.userInfo.is_admin" />
        </td>
        <td class="border border-white">
          <k-input
            v-model="value.wednesday_close"
            step="1"
            type="time"
            class="form-control"
            id=""
            :disabled="$root.userInfo.is_admin" />
        </td>
        <td class="border border-white">
          <k-input
            v-model="value.thursday_open"
            step="1"
            type="time"
            class="form-control"
            id=""
            :disabled="$root.userInfo.is_admin" />
        </td>
        <td class="border border-white">
          <k-input
            v-model="value.thursday_close"
            step="1"
            type="time"
            class="form-control"
            id=""
            :disabled="$root.userInfo.is_admin" />
        </td>
        <td class="border border-white">
          <k-input
            v-model="value.friday_open"
            step="1"
            type="time"
            class="form-control"
            id=""
            :disabled="$root.userInfo.is_admin" />
        </td>
        <td class="border border-white">
          <k-input
            v-model="value.friday_close"
            step="1"
            type="time"
            class="form-control"
            id=""
            :disabled="$root.userInfo.is_admin" />
        </td>
        <td class="border border-white">
          <k-input
            v-model="value.saturday_open"
            step="1"
            type="time"
            class="form-control"
            id=""
            :disabled="$root.userInfo.is_admin" />
        </td>
        <td class="border border-white">
          <k-input
            v-model="value.saturday_close"
            step="1"
            type="time"
            class="form-control"
            id=""
            :disabled="$root.userInfo.is_admin" />
        </td>
        <td class="border border-white">
          <k-input
            v-model="value.sunday_open"
            step="1"
            type="time"
            class="form-control"
            id=""
            :disabled="$root.userInfo.is_admin" />
        </td>
        <td class="border border-white">
          <k-input
            v-model="value.sunday_close"
            step="1"
            type="time"
            class="form-control"
            id=""
            :disabled="$root.userInfo.is_admin" />
        </td>
      </tr>
    </tbody>
  </table>
  <!-- <div class="mt-5" style="width: 400px">
    <label class="mb-2 fw-bold"
      >How far in advance can an order be placed?</label
    >
    <k-input
      oninput="validity.valid||(value='')"
      :min="0"
      :value="store.businessDetails.be_placed"
      v-model="store.businessDetails.be_placed"
      :wrapper-class="
        store.mandatoryFieldBoxDetails.be_placed ? 'mandatory-field' : ''
      "
      :name="'orderPlaced'"
      type="number"
      :min-length="2"
      :required="true"
      class="fw-bold"
      :disabled="$root.userInfo.is_admin">
    </k-input>
  </div> -->
</template>

<script>
import { mapWritableState } from "pinia";
import { useStoreStore } from "./../../../../stores/StoreStore.js";

export default {
  name: "Admin Store Trading Hours Table",
  setup() {
    const store = useStoreStore();
    return { store };
  },
  data() {
    return {
      type: ["Kerbside Pick Up", "Delivery", "Dine In", "Pick Up"],
      days: [
        {
          day: "Monday",
        },
        {
          day: "Tuesday",
        },
        {
          day: "Wednesday",
        },
        {
          day: "Thursday",
        },
        {
          day: "Friday",
        },
        {
          day: "Saturday",
        },
        {
          day: "Sunday",
        },
      ],
      openClosed: [
        "monday_open",
        "monday_close",
        "tuesday_open",
        "tuesday_close",
        "wednesday_open",
        "wednesday_close",
        "thursday_open",
        "thursday_close",
        "friday_open",
        "friday_close",
        "saturday_open",
        "saturday_close",
        "sunday_open",
        "sunday_close",
      ],
    };
  },
  computed: {
    ...mapWritableState(useStoreStore, ["tradingHoursValue"]),
  },
  mounted() {
    this.store.fetchTradingHours(this.$root.selectedTenantId);
  },
};
</script>
