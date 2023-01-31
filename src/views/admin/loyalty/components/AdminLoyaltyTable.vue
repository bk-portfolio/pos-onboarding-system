<template>
  <div class="col h-100 py-4 px-4">
    <k-grid
      :data-items="store.loyaltyList"
      :columns="columns"
      :sortable="true"
      :sort="sort"
      :resizable="true"
      :scrollable="'scrollable'"
      :loader="store.loadTheData"
      class="h-100"
    >
      <!-- Header -->
      <template v-slot:nameHeaderTemplate="{ props }">
        <div class="text-left">{{ props.title }}</div>
      </template>
      <template v-slot:descriptionHeaderTemplate="{ props }">
        <div class="text-left">{{ props.title }}</div>
      </template>
      <template v-slot:pointAwardedHeaderTemplate="{ props }">
        <div class="text-left">{{ props.title }}</div>
      </template>
      <template v-slot:pointStartHeaderTemplate="{ props }">
        <div class="text-left">{{ props.title }}</div>
      </template>
      <template v-slot:ruleNameHeaderTemplate="{ props }">
        <div class="text-left">{{ props.title }}</div>
      </template>

      <!-- Body -->
      <template v-slot:nameTemplate="{ props }">
        <td>{{ props.dataItem.name }}</td>
      </template>
      <template v-slot:descriptionTemplate="{ props }">
        <td>{{ props.dataItem.description }}</td>
      </template>
      <template v-slot:pointAwardedtTemplate="{ props }">
        <td>{{ props.dataItem.point_awarded }}</td>
      </template>
      <template v-slot:whenToAwardPointTemplate="{ props }">
        <td>{{ props.dataItem.when_award }}</td>
      </template>
      <template v-slot:departmentTemplate="{ props }">
        <td>{{ props.dataItem.department }}</td>
      </template>
      <!-- User Options -->
      <template
        v-if="!$root.userInfo.is_admin"
        v-slot:optionsTemplate="{ props }"
      >
        <td class="text-end woosh-text-primary">
          <button
            @click="deleteLoyalty(props)"
            class="py-2 px-1 me-4 border-0 bg-transparent woosh-text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash3-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"
              />
            </svg>
          </button>
          <button
            @click="goToAddorEditLoyalty(props.dataItem)"
            class="py-2 px-4 border-0 text-secondary"
          >
            Edit
          </button>
        </td>
      </template>
      <!-- Woosh Food Admin Options -->
      <template
        v-if="$root.userInfo.is_admin"
        v-slot:optionsTemplate="{ props }"
      >
        <td class="text-end woosh-text-primary">
          <k-button
            @click="goToAddorEditLoyalty(props.dataItem)"
            class="py-2 px-4 border-0 text-white"
          >
            Show Details
          </k-button>
        </td>
      </template>
    </k-grid>
    <confirmation-dialog
      :dialog="confirmationDialog"
      @close-dialog="closeConfirmationDialog()"
      @yes-action="this.postDeleteLoyalty(this.loyaltyId)"
    />
  </div>
</template>

<script>
import { useLoyaltyStore } from "./../../../../stores/LoyaltyStore.js";

export default {
  name: "Admin Loyalty Table",
  setup() {
    const store = useLoyaltyStore();
    return { store };
  },
  data() {
    return {
      columns: [
        {
          field: "name",
          title: "Name",
          headerCell: "nameHeaderTemplate",
          cell: "nameTemplate",
        },
        {
          field: "description",
          title: "Description",
          headerCell: "descriptionHeaderTemplate",
          cell: "descriptionTemplate",
        },
        {
          field: "pointsAwarded",
          title: "Point Awarded",
          headerCell: "pointAwardedHeaderTemplate",
          cell: "pointAwardedtTemplate",
        },
        {
          field: "whenToAwardPoint",
          title: "When to award points",
          headerCell: "ruleNameHeaderTemplate",
          cell: "whenToAwardPointTemplate",
        },
        {
          cell: "optionsTemplate",
          headerCell: "optionsHeaderTemplate",
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
      loyaltyId: null,
    };
  },
  methods: {
    goToAddorEditLoyalty(props) {
      this.store.setLoyaltyDetails(props);
      localStorage.setItem("addOrEditPage", "Edit");
      this.$router.push("/adminLoyaltyAddAndEdit");
    },
    fetchLoyaltyList() {
      const id = this.$root.selectedTenantId;
      this.store.getLoyaltyList(id);
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
    deleteLoyalty(props) {
      this.loyaltyId = props.dataItem.id;
      this.showConfirmationDialog(props.dataItem.name);
    },
    postDeleteLoyalty(id) {
      this.store.postDeleteLoyalty(id);
      this.closeConfirmationDialog();
    },
  },
  // created() {
  //   this.store.getLoyaltyList();
  // },
  mounted() {
    this.fetchLoyaltyList();
  },
};
</script>
