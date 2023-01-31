<template>
  <div class="col h-100 py-4">
    <k-grid
      :data-items="categories"
      :columns="columns"
      :sortable="true"
      :sort="sort"
      :resizable="true"
      :scrollable="'scrollable'"
      :loader="loadTheData"
      @sortchange="sortChangeHandler"
      class="h-100">
      <!-- Header -->
      <template v-slot:categoryNameHeaderTemplate="{ props }">
        <td class="px-0 text-left">{{ props.title }}</td>
      </template>
      <template v-slot:parentCategoriesHeaderTemplate="{ props }">
        <td class="px-0 text-left">{{ props.title }}</td>
      </template>
      <template v-slot:inventoryValuationHeaderTemplate="{ props }">
        <td class="px-0 text-left">{{ props.title }}</td>
      </template>
      <template v-slot:costingMethodHeaderTemplate="{ props }">
        <td class="px-0 text-left">{{ props.title }}</td>
      </template>
      <template
        v-if="!$root.userInfo.is_admin"
        v-slot:optionsHeaderHeaderTemplate="{ props }">
        <td class="px-0 text-end">{{ props.title }}</td>
      </template>
      <!-- Body -->
      <template v-slot:categoryNameTemplate="{ props }">
        <td class="fw-bold">
          <p>{{ props.dataItem.name }}</p>
          <p
            v-if="props.dataItem.type == 'Website Category'"
            class="fw-lighter">
            <i class="bg-warning rounded-end px-2">Website Category</i>
          </p>
        </td>
      </template>
      <template v-slot:parentCategoriesTemplate="{ props }">
        <td class="text-left">{{ props.dataItem.parent_category_path }}</td>
      </template>
      <template v-slot:inventoryValuationTemplate="{ props }">
        <td class="text-left">{{ props.dataItem.inv_valuation }}</td>
      </template>
      <template v-slot:costingMethodTemplate="{ props }">
        <td class="text-left">{{ props.dataItem.costing_method }}</td>
      </template>
      <template
        v-if="!$root.userInfo.is_admin"
        v-slot:optionsTemplate="{ props }">
        <td class="text-end woosh-text-primary">
          <button
            @click="deleteCategory(props)"
            class="py-2 px-1 me-4 border-0 bg-transparent woosh-text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash3-fill"
              viewBox="0 0 16 16">
              <path
                d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
            </svg>
          </button>
          <button
            @click="editCategory(props)"
            class="py-2 px-4 border-0 text-secondary">
            Edit
          </button>
        </td>
      </template>
    </k-grid>

    <confirmation-dialog
      :dialog="confirmationDialog"
      @close-dialog="closeConfirmationDialog()"
      @yes-action="postDeleteCategory" />
  </div>
</template>

<script>
import { usePopUpDialogStore } from "./../../../stores/PopUpDialogStore";
import { useProductStore } from "./../../../stores/ProductStore.js";
import { useLoaderStore } from "./../../../stores/LoaderStore.js";
import { Loader } from "@progress/kendo-vue-indicators";

export default {
  name: "Admin Products manage category",
  components: {Loader},
  setup() {
    const popUpDialogStore = usePopUpDialogStore();
    const loaderStore = useLoaderStore();
    return { popUpDialogStore, loaderStore };
  },
  data() {
    return {
      loadTheData: false,
      categories: [],
      selectedCategoryId: null,
      selectedCategoryType: null,
      columns: [
        {
          field: "name",
          title: "Category Name",
          cell: "categoryNameTemplate",
          headerCell: "categoryNameHeaderTemplate",
        },
        {
          field: "parent_category",
          title: "Parent Categories",
          cell: "parentCategoriesTemplate",
          headerCell: "parentCategoriesHeaderTemplate",
        },
        {
          field: "inv_valuation",
          title: "Inventory Valuation",
          cell: "inventoryValuationTemplate",
          headerCell: "inventoryValuationHeaderTemplate",
        },
        {
          field: "costing_method",
          title: "Costing Method",
          cell: "costingMethodTemplate",
          headerCell: "costingMethodHeaderTemplate",
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
    };
  },
  methods: {
    async fetchCategories() {
      this.loadTheData = true;
      try {
        const id = this.$root.selectedTenantId;
        const response = await this.$http.post("/category/list", { id: id });
        this.categories = response.data;
        await this.fetchWebsiteCategories();
        this.loadTheData = false;
      } catch (error) {
        this.loadTheData = false;
      }
    },
    async fetchWebsiteCategories() {
      const id = this.$root.selectedTenantId;
      const response = await this.$http.post("/web-category/list", { id: id });
      response.data.forEach((cat) => {
        cat.type = "Website Category";
        this.categories.push(cat);
      });
    },
    updateHeaderButton() {
      useProductStore().updatePageName("Category");
    },
    editCategory(props) {
      localStorage.setItem("selectedCategory", JSON.stringify(props.dataItem));
      localStorage.setItem("addOrEditPage", "Edit");
      useProductStore().goToAddOrEditPage();
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
    deleteCategory(props) {
      this.selectedCategoryId = props.dataItem.id;
      this.selectedCategoryType = props.dataItem.type;
      this.showConfirmationDialog(props.dataItem.name);
    },
    async postDeleteCategory() {
      this.loaderStore.openLoadingDialog("Loading...");
      const id = this.selectedCategoryId;
      const type = this.selectedCategoryType;
      if (type == "Website Category") {
        await this.postDeleteWebsiteCategory(id);
      } else {
        await this.postDeleteProductCategory(id);
      }
    },
    async postDeleteWebsiteCategory(id) {
      try {
        const response = await this.$http.post("/web-category/delete", { id });
        if (response.status == 200) {
          this.closeConfirmationDialog();
          this.fetchCategories();
          this.loaderStore.closeLoadingDialog();
        }
      } catch (error) {
        this.closeConfirmationDialog();
        this.loaderStore.closeLoadingDialog();
        this.popUpDialogStore.openInformationDialog(error.response.data);
      }
    },
    async postDeleteProductCategory(id) {
      try {
        const response = await this.$http.post("/category/delete", { id });
        if (response.status == 200) {
          this.closeConfirmationDialog();
          this.fetchCategories();
          this.loaderStore.closeLoadingDialog();
        }
      } catch (error) {
        this.closeConfirmationDialog();
        this.loaderStore.closeLoadingDialog();
        this.popUpDialogStore.openInformationDialog(error.response.data);
      }
    },
  },
  mounted() {
    this.updateHeaderButton();
    this.fetchCategories();
  },
};
</script>
