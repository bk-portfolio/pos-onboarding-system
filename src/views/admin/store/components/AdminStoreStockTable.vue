<template>
  <div class="col h-100 py-4 px-4">
    <k-grid
      :data-items="store.stockLocationList"
      :columns="columns"
      :sortable="true"
      :sort="sort"
      :resizable="true"
      :loader="store.loadTheData"
      :scrollable="'scrollable'"
      class="h-100"
    >
      <!-- Header -->
      <template v-slot:locationNameHeaderTemplate="{ props }">
        <div class="text-left">{{ props.title }}</div>
      </template>
      <template v-slot:locationTypeHeaderTemplate="{ props }">
        <div class="text-left">{{ props.title }}</div>
      </template>
      <template v-slot:inReturnLocationHeaderTemplate="{ props }">
        <div class="text-left">{{ props.title }}</div>
      </template>
      <template v-slot:inAScrapLocationHeaderTemplate="{ props }">
        <div class="text-left">{{ props.title }}</div>
      </template>
      <template v-slot:parentLocationHeaderTemplate="{ props }">
        <div class="text-left">{{ props.title }}</div>
      </template>
      <template v-slot:removalStrategyHeaderTemplate="{ props }">
        <div class="text-left">{{ props.title }}</div>
      </template>

      <!-- Body -->
      <template v-slot:locationNameTemplate="{ props }">
        <td>{{ props.dataItem.name }}</td>
      </template>
      <template v-slot:locationTypeTemplate="{ props }">
        <td>{{ props.dataItem.type }}</td>
      </template>
      <template v-slot:inReturnLocationTemplate="{ props }">
        <td>{{ props.dataItem.is_return }}</td>
      </template>
      <template v-slot:inAScrapLocationTemplate="{ props }">
        <td>{{ props.dataItem.is_scrap }}</td>
      </template>
      <template v-slot:parentLocationTemplate="{ props }">
        <td>{{ props.dataItem.parent_location }}</td>
      </template>
      <template v-slot:removalStrategyTemplate="{ props }">
        <td>{{ props.dataItem.removal_strategy }}</td>
      </template>
      <!-- User Options -->
      <template
        v-if="!$root.userInfo.is_admin"
        v-slot:optionsTemplate="{ props }"
      >
        <td class="text-end woosh-text-primary">
          <button
            @click="deleteStockLocation(props)"
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
            @click="goToAddorEditStock(props.dataItem)"
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
            @click="goToAddorEditStock(props.dataItem)"
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
      @yes-action="this.postDeleteStockLocation(this.stockLocationId)"
    />
  </div>
</template>

<script>
import { useStoreStore } from "./../../../../stores/StoreStore.js";

export default {
  name: "Admin Store Stock Table",
  setup() {
    const store = useStoreStore();
    return { store };
  },
  data() {
    return {
      columns: [
        {
          field: "locationName",
          title: "Location Name",
          headerCell: "locationNameHeaderTemplate",
          cell: "locationNameTemplate",
        },
        {
          field: "locationType",
          title: "Location Type",
          headerCell: "locationTypeHeaderTemplate",
          cell: "locationTypeTemplate",
        },
        {
          field: "inReturnLocation",
          title: "In return location",
          headerCell: "inReturnLocationHeaderTemplate",
          cell: "inReturnLocationTemplate",
        },
        {
          field: "inAScrapLocation",
          title: "In a scrap location",
          headerCell: "inAScrapLocationHeaderTemplate",
          cell: "inAScrapLocationTemplate",
        },
        {
          field: "parentLocation",
          title: "Parent Location",
          headerCell: "parentLocationHeaderTemplate",
          cell: "parentLocationTemplate",
        },
        {
          field: "removalStrategy",
          title: "Removal Strategy",
          headerCell: "removalStrategyHeaderTemplate",
          cell: "removalStrategyTemplate",
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
      stockLocationId: null,
    };
  },
  methods: {
    goToAddorEditStock(props) {
      this.store.setStockLocationDetails(props);
      localStorage.setItem("addOrEditPage", "Edit");
      this.$router.push("/adminStoreStockAddAndEdit");
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
    deleteStockLocation(props) {
      this.stockLocationId = props.dataItem.id;
      this.showConfirmationDialog(props.dataItem.name);
    },
    postDeleteStockLocation() {
      this.store.postDeleteStockLocation(this.stockLocationId);
      this.closeConfirmationDialog();
    },
  },
  mounted() {
    this.store.getFetchStockLocation(this.$root.selectedTenantId);
  },
};
</script>
