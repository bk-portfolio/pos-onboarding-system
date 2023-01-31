<template>
  <div class="col h-100 py-4">
    <k-grid
      :data-items="products"
      :columns="columns"
      :sortable="true"
      :sort="sort"
      :resizable="true"
      :scrollable="'scrollable'"
      :loader="productStore.loadTheData"
      @sortchange="sortChangeHandler"
      class="h-100">
      <!-- Header -->
      <template v-slot:nameHeaderTemplate="{ props }">
        <div class="text-left">{{ props.title }}</div>
      </template>
      <template v-slot:optionGroupHeaderTemplate="{ props }">
        <div class="text-left">{{ props.title }}</div>
      </template>
      <template v-slot:typeHeaderTemplate="{ props }">
        <div class="text-center">{{ props.title }}</div>
      </template>
      <template v-slot:internalReferenceHeaderTemplate="{ props }">
        <div class="text-center">{{ props.title }}</div>
      </template>
      <template v-slot:priceHeaderTemplate="{ props }">
        <div class="text-end">{{ props.title }}</div>
      </template>
      <template v-slot:costHeaderTemplate="{ props }">
        <div class="text-end">{{ props.title }}</div>
      </template>
      <template v-slot:isRecipeHeaderTemplate="{ props }">
        <div class="text-end">{{ props.title }}</div>
      </template>
      <template v-slot:canSoldHeaderTemplate="{ props }">
        <div class="text-center">{{ props.title }}</div>
      </template>
      <template v-slot:canPurchaseHeaderTemplate="{ props }">
        <div class="text-center">{{ props.title }}</div>
      </template>
      <template v-slot:categoryHeaderTemplate="{ props }">
        <div class="text-left">{{ props.title }}</div>
      </template>
      <template v-slot:webCategoryHeaderTemplate="{ props }">
        <div class="text-left">{{ props.title }}</div>
      </template>
      <template v-slot:availInPosHeaderTemplate="{ props }">
        <div class="text-center">{{ props.title }}</div>
      </template>
      <template v-slot:descriptionHeaderTemplate="{ props }">
        <div class="text-center">{{ props.title }}</div>
      </template>
      <template v-slot:companyHeaderTemplate="{ props }">
        <div class="text-center">{{ props.title }}</div>
      </template>
      <!-- Body -->
      <template v-slot:imagesTemplate="{ props }">
        <td class="text-center">
          <img
            v-if="props.dataItem.images"
            :src="props.dataItem.images"
            class="w-100 h-100" />
          <svg
            v-if="!props.dataItem.images"
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="#b8b8b8"
            viewBox="0 0 16 16">
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            <path
              d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
          </svg>
          <!--          <p class="fw-bold">{{ props.dataItem.images }}</p>-->
        </td>
      </template>
      <template v-slot:nameTemplate="{ props }">
        <td>
          <p class="fw-bold">{{ props.dataItem.name }}</p>
          <p v-if="props.dataItem.optional_product" class="fw-lighter">
            <i class="bg-warning rounded-end px-2">Opt Product</i>
          </p>
        </td>
      </template>
      <template v-slot:optionGroupTemplate="{ props }">
        <td class="text-left">
          {{
            showOptionGroupName(
              props.dataItem.optional_product,
              props.dataItem.option_group
            )
          }}
        </td>
      </template>
      <template v-slot:typeTemplate="{ props }">
        <td class="text-center">{{ props.dataItem.type }}</td>
      </template>
      <template v-slot:internalReferenceTemplate="{ props }">
        <td class="text-center">{{ props.dataItem.internal_referance }}</td>
      </template>
      <template v-slot:priceTemplate="{ props }">
        <td class="text-end">{{ props.dataItem.price }}</td>
      </template>
      <template v-slot:costTemplate="{ props }">
        <td class="text-end">{{ props.dataItem.cost }}</td>
      </template>
      <template v-slot:isRecipeTemplate="{ props }">
        <td class="text-end">{{ props.dataItem.is_recipe }}</td>
      </template>
      <template v-slot:canSoldTemplate="{ props }">
        <td class="text-center">{{ props.dataItem.can_sold }}</td>
      </template>
      <template v-slot:canPurchaseTemplate="{ props }">
        <td class="text-center">{{ props.dataItem.can_purchase }}</td>
      </template>
      <template v-slot:categoryTemplate="{ props }">
        <td class="text-left">
          <li>{{ props.dataItem.category_name }}</li>
        </td>
      </template>
      <template v-slot:webCategoryTemplate="{ props }">
        <td class="text-left">
          <li v-for="web in props.dataItem.webcategory_list" :key="web.key">
            {{ web.name }}
          </li>
        </td>
      </template>
      <template v-slot:descriptionTemplate="{ props }">
        <td class="text-center woosh-text-primary">
          <u
            class="pointer"
            @click="
              showDialog(
                'Sales Description',
                props.dataItem.name,
                props.dataItem.description,
                'string'
              )
            "
            >view</u
          >
        </td>
        <td class="text-center">{{ props.dataItem.description }}</td>
      </template>
      <template v-slot:companyTemplate="{ props }">
        <td class="text-center">{{ props.dataItem.business_name }}</td>
      </template>
      <!-- User Options -->
      <template
        v-if="!$root.userInfo.is_admin"
        v-slot:optionsTemplate="{ props }">
        <td class="text-center woosh-text-primary">
          <div data-bs-toggle="dropdown">
            <svg
              height="2rem"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <ul class="dropdown-menu fs-7 shadow">
              <div
                class="dropdown-item text-end py-2 pointer"
                @click="editProduct(props)">
                Edit
              </div>
              <div
                class="dropdown-item text-end py-2 pointer"
                v-show="!props.dataItem.is_recipe"
                @click="showRecipe(props)">
                Show Recipe
              </div>
              <li><hr class="dropdown-divider" /></li>
              <div
                class="text-end text-danger py-2 pe-3 pointer"
                @click="deleteProduct(props)">
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
                remove
              </div>
            </ul>
          </div>
        </td>
      </template>
      <!-- Admin Options -->
      <template
        v-if="$root.userInfo.is_admin"
        v-slot:optionsTemplate="{ props }">
        <td class="text-center woosh-text-primary px-2">
          <div data-bs-toggle="dropdown">
            <svg
              height="2rem"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <ul class="dropdown-menu fs-7 shadow">
              <div
                class="dropdown-item text-center py-2 pointer"
                @click="viewProductDetails(props)">
                Product Info
              </div>
              <li><hr class="dropdown-divider" /></li>
              <div
                class="dropdown-item text-center py-2 pointer"
                @click="showRecipe(props)">
                Show Recipe
              </div>
            </ul>
          </div>
        </td>
      </template>
    </k-grid>

    <admin-product-list-dialog :dialog="dialog" @close-dialog="closeDialog" />

    <confirmation-dialog
      :dialog="confirmationDialog"
      @close-dialog="closeConfirmationDialog()"
      @yes-action="postDeleteProduct" />
    <information-dialog
      :dialog="informationDialog"
      @close-dialog="closeInformationDialog" />

    <admin-product-recipe
      v-if="productRecipeDialog.appear"
      :recipesList="recipes"
      @show-information-dialog="popUpDialogStore.openInformationDialog"
      @close-product-recipe-dialog="closeProductRecipeDialog" />
  </div>
</template>

<script>
import { useProductStore } from "./../../../stores/ProductStore.js";
import { useLoaderStore } from "./../../../stores/LoaderStore";
import { usePopUpDialogStore } from "./../../../stores/PopUpDialogStore";
import AdminProductListDialog from "./components/AdminProductListDialog.vue";
import AdminProductRecipe from "./components/AdminProductRecipe.vue";
export default {
  name: "Admin Products List",
  components: {
    AdminProductListDialog,
    AdminProductRecipe,
  },
  setup() {
    const loaderStore = useLoaderStore();
    const productStore = useProductStore();
    const popUpDialogStore = usePopUpDialogStore();
    return {
      loaderStore,
      productStore,
      popUpDialogStore,
    };
  },
  data() {
    return {
      optionGroup: [],
      selectedProductId: {},
      dialog: {
        appear: false,
        name: "",
        type: "",
        content: [],
        format: [],
      },
      columns: [
        {
          field: "images",
          cell: "imagesTemplate",
          headerCell: "imagesHeaderTemplate",
        },
        {
          field: "name",
          title: "Name",
          cell: "nameTemplate",
          headerCell: "nameHeaderTemplate",
        },
        {
          field: "option_group",
          title: "Option Group",
          cell: "optionGroupTemplate",
          headerCell: "optionGroupHeaderTemplate",
        },
        {
          field: "type",
          title: "Type",
          cell: "typeTemplate",
          headerCell: "typeHeaderTemplate",
        },
        {
          field: "internal_reference",
          title: "Internal Reference",
          cell: "internalReferenceTemplate",
          headerCell: "internalReferenceHeaderTemplate",
        },
        {
          field: "price",
          title: "Sales Price",
          cell: "priceTemplate",
          headerCell: "priceHeaderTemplate",
        },
        {
          field: "cost",
          title: "Cost",
          cell: "costTemplate",
          headerCell: "costHeaderTemplate",
        },
        {
          field: "is_recipe",
          title: "Recipe",
          cell: "isRecipeTemplate",
          headerCell: "isRecipeHeaderTemplate",
        },
        {
          field: "can_sold",
          title: "Can be sold?",
          cell: "canSoldTemplate",
          headerCell: "canSoldHeaderTemplate",
        },
        {
          field: "can_purchase",
          title: "Can be purchase",
          cell: "canPurchaseTemplate",
          headerCell: "canPurchaseHeaderTemplate",
        },
        {
          field: "category",
          title: "Category",
          cell: "categoryTemplate",
          headerCell: "categoryHeaderTemplate",
        },
        {
          field: "web_category",
          title: "Web Category",
          cell: "webCategoryTemplate",
          headerCell: "webCategoryHeaderTemplate",
        },
        {
          field: "description",
          title: "Sales Description",
          cell: "descriptionTemplate",
          headerCell: "descriptionHeaderTemplate",
        },
        {
          field: "business_id",
          title: "Company",
          cell: "companyTemplate",
          headerCell: "companyHeaderTemplate",
        },
        {
          cell: "optionsTemplate",
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
      informationDialog: {
        appear: false,
        message: "",
        callBack: false,
      },
      productRecipeDialog: {
        appear: false,
      },
    };
  },
  computed: {
    products() {
      return useProductStore().showProductList;
    },
    recipes() {
      return useProductStore().recipesList;
    },
  },
  methods: {
    showDialog(type, name, content, format) {
      (this.dialog.type = type),
        (this.dialog.name = name),
        (this.dialog.content = content),
        (this.dialog.format = format);
      if (this.dialog.format === "string") {
        this.dialog.content = [content];
      }
      this.dialog.appear = true;
    },
    closeDialog() {
      this.dialog = {
        appear: false,
        name: "",
        type: "",
        content: [],
      };
    },
    showInformationDialog(message) {
      this.informationDialog = {
        appear: true,
        message: message,
      };
    },
    closeInformationDialog() {
      this.informationDialog = {
        appear: false,
        message: "",
        callBack: false,
      };
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
    updateHeaderButton() {
      useProductStore().updatePageName("Product");
    },
    editProduct(props) {
      localStorage.setItem("selectedProduct", JSON.stringify(props.dataItem));
      localStorage.setItem("addOrEditPage", "Edit");
      useProductStore().goToAddOrEditPage();
    },
    showRecipe(props) {
      localStorage.setItem("selectedProduct", JSON.stringify(props.dataItem));
      this.productRecipeDialog.appear = true;
    },
    async closeProductRecipeDialog(success) {
      this.productRecipeDialog = {
        appear: false,
      };
      if (success) {
        let message = "Your data was successfully saved!";
        await this.fetchProducts();
        this.showInformationDialog(message);
      }
    },
    showOptionGroupName(available, id) {
      if (this.optionGroup.length !== 0 && available) {
        let data = this.optionGroup.find((opt) => opt.id === id);
        return data.name;
      }
    },
    async fetchProducts() {
      if (this.$root.userInfo.is_admin) {
        const id = this.$root.selectedTenantId;
        await useProductStore().fetchProducts(id);
        await this.fetchOptionGroupList(id);
      } else {
        await useProductStore().fetchProducts();
        await this.fetchOptionGroupList();
      }
    },
    deleteProduct(props) {
      this.selectedProductId = props.dataItem.id;
      this.showConfirmationDialog(props.dataItem.name);
    },
    async postDeleteProduct() {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        const id = this.selectedProductId;
        const response = await this.$http.post("/product/delete", { id: id });
        if (response.status == 200) {
          this.loaderStore.closeLoadingDialog();
          this.closeConfirmationDialog();
          this.fetchProducts();
        }
      } catch (error) {
        if (error.response.status === 400) {
          this.loaderStore.closeLoadingDialog();
          this.closeConfirmationDialog();
          this.showInformationDialog(error.response.data);
        }
      }
    },
    async fetchOptionGroupList(id) {
      const response = await this.$http.post("/option-group/list", { id: id });
      this.optionGroup = response.data;
    },
    viewProductDetails(props) {
      const data = props.dataItem;
      let allergenInfo = "Allergen Info : ";
      if (data.v) {
        allergenInfo += "V,";
      }
      if (data.df) {
        allergenInfo += "DF,";
      }
      if (data.veg) {
        allergenInfo += "VEG,";
      }
      if (data.gf) {
        allergenInfo += "GF,";
      }
      allergenInfo = allergenInfo.replace(/,$/, "");
      let available_pickup = data.is_pickup
        ? "Available for Pickup : Yes"
        : "Available for Pickup : No";
      let dialog = {
        appear: true,
        name: "Details",
        type: data.name,
        content: [allergenInfo, available_pickup],
      };
      this.dialog = dialog;
    },
  },
  mounted() {
    this.fetchProducts();
    this.updateHeaderButton();
    this.productStore.fetchRecipes();
  },
};
</script>
