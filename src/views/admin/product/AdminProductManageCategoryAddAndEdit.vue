<template>
  <div class="container-fluid h-100">
    <!-- Sub Header Add / Edit Product -->
    <AdminProductSubHeader
      :pageName="pageName"
      :addOrEditPage="addOrEditPage"
      @save-data="saveData()"
      @cancel="cancel()" />

    <div class="row h-90 woosh-bg-primary">
      <div class="col col-md-6 h-100 p-5 scroll--vertical">
        <p class="fw-bold pb-3">Category Details</p>
        <!-- Type -->
        <div class="row m-0">
          <div class="col ps-0">
            <k-dropdown
              class="fw-bold"
              label="Category Type"
              :allow-custom="false"
              :data-items="categoryType"
              v-model="category.type"
              :disabled="addOrEditPage == 'Edit'"
              @change="updateCategoryType">
            </k-dropdown>
          </div>
          <div class="col"></div>
        </div>
        <!-- Category name {Mandatory}-->
        <div class="row m-0">
          <div class="col ps-0">
            <k-input
              :name="'Category Name'"
              :label="'Category Name'"
              :min-length="2"
              :required="true"
              :wrapper-class="
                mandatoryFieldBox.category_name ? 'mandatory-field' : ''
              "
              v-model="category.name"
              class="fw-bold">
            </k-input>
          </div>
          <!-- Parent Category -->
          <div class="col pe-0">
            <k-dropdown-combobox
              class="fw-bold"
              label="Parent Category"
              :allow-custom="false"
              :data-items="categories"
              :text-field="'complete_path'"
              :list-no-data-render="'createProductWebCategoryTemplate'"
              v-model="selectedParentCategory"
              @change="selectParentCategory">
              <template v-slot:createProductWebCategoryTemplate>
                <p class="bg-secondary text-white p-2">
                  There is no data available.
                </p>
              </template>
            </k-dropdown-combobox>
          </div>
        </div>
        <!-- Inventory Valuation -->
        <div v-if="category.type != 'Website Category'" class="row m-0">
          <div class="col ps-0">
            <k-dropdown-combobox
              class="fw-bold"
              label="Inventory Valuation"
              :allow-custom="false"
              :data-items="inv_valuation"
              v-model="category.inv_valuation">
            </k-dropdown-combobox>
          </div>
          <div class="col pe-0">
            <k-dropdown-combobox
              class="fw-bold"
              label="Costing Method"
              :allow-custom="false"
              :data-items="costingMethod"
              v-model="category.costing_method">
            </k-dropdown-combobox>
          </div>
        </div>
      </div>
    </div>
    <information-dialog
      :dialog="informationDialog"
      @close-dialog="closeInformationDialog" />
  </div>
</template>

<script>
import { useProductStore } from "./../../../stores/ProductStore.js";
import { useLoaderStore } from "./../../../stores/LoaderStore.js";
import AdminProductSubHeader from "./components/AdminProductSubHeader.vue";
export default {
  name: "Category Add & Edit",
  components: {
    AdminProductSubHeader,
  },
  setup() {
    const loaderStore = useLoaderStore();
    return {
      loaderStore,
    };
  },
  data() {
    return {
      pageName: "Category",
      addOrEditPage: localStorage.getItem("addOrEditPage"),
      categories: [
        // {
        //   id: 11,
        //   name: 'All',
        //   complete_path: "All",
        //   parent_category: null,
        //   parent_category_path: null,
        // },
        // {
        //   id: 22,
        //   name: 'Burger',
        //   complete_path: "All / Burger",
        //   parent_category: "All",
        //   parent_category_path: "All",
        // },
        // {
        //   id: 33,
        //   name: 'Burger Cheese',
        //   complete_path: "All / Burger / Burger Cheese",
        //   parent_category: "Burger",
        //   parent_category_path: "All / Burger",
        // }
      ],
      selectedParentCategory: null,
      inv_valuation: ["Manual", "Automated"],
      costingMethod: [
        "Standard Price",
        "First In First Out (FIFO)",
        "Average Cost (AVCO)",
      ],
      mandatoryFieldBox: {
        category_name: false,
      },
      category: {
        id: null,
        business_id: null,
        name: "",
        parent_category: null,
        inv_valuation: null,
        costing_method: null,
        type: "Product / POS Category",
      },
      informationDialog: {
        appear: false,
        message: "",
        callBack: false,
      },
      categoryType: ["Product / POS Category", "Website Category"],
    };
  },
  methods: {
    selectParentCategory(event) {
      if (event.value) {
        this.category.parent_category = event.value.name;
      } else {
        this.category.parent_category = null;
      }
    },
    updateCategoryType(event) {
      if (event.value == "Website Category") {
        this.categories = [];
        this.fetchWebsiteCategories();
      } else {
        this.fetchProductCategories();
      }
    },
    getCategoryFromLocalStorage() {
      const category = JSON.parse(localStorage.getItem("selectedCategory"));
      if (category) {
        this.category = category;
        this.selectedParentCategory = {
          name: category.name,
          complete_path: category.complete_path,
        };
        if (category.type == undefined) {
          this.category.type = "Product / POS Category";
        }
      }
    },
    updateProductStore() {
      useProductStore().updatePageName(this.pageName);
      useProductStore().updateAddOrEditPage(this.addOrEditPage);
    },
    closeInformationDialog(callBack) {
      if (callBack) {
        this.$router.back();
      }
      this.informationDialog = {
        appear: false,
        message: "",
        callBack: false,
      };
    },
    async fetchProductCategories() {
      const response = await this.$http.post("/category/list");
      this.categories = response.data;
    },
    async fetchWebsiteCategories() {
      const response = await this.$http.post("/web-category/list");
      this.categories = response.data;
    },
    saveData() {
      this.checkMandatoryFields();
    },
    checkMandatoryFields() {
      if (this.category.name !== "" && this.category.name !== null) {
        this.mandatoryFieldBox.category_name = false;
        if (this.addOrEditPage == "Edit") {
          this.postEditCategory();
        } else {
          this.postCreateCategory();
        }
      } else {
        this.mandatoryFieldBox.category_name = true;
        this.informationDialog.message = "Please fill all mandatory fields.";
        this.informationDialog.appear = true;
      }
    },
    postCreateCategory() {
      this.loaderStore.openLoadingDialog("Loading...");
      if (this.category.type == "Product / POS Category") {
        this.loaderStore.closeLoadingDialog();
        this.postCreateProductCategory();
      } else {
        this.loaderStore.closeLoadingDialog();
        this.postCreateWebsiteCategory();
      }
    },
    postEditCategory() {
      if (this.category.type == "Product / POS Category") {
        this.postEditProductCategory();
      } else {
        this.postEditWebsiteCategory();
      }
    },
    async postCreateProductCategory() {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        const data = this.category;
        const response = await this.$http.post("/category/create", data);
        if (response.status == 200) {
          this.informationDialog.message = "Your data was successfully saved!";
          this.informationDialog.appear = true;
          this.informationDialog.callBack = true;
          this.loaderStore.closeLoadingDialog();
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status == 406) {
          this.informationDialog.message =
            "This category is already exists! Please choose different categories name.";
          this.informationDialog.appear = true;
          this.informationDialog.callBack = false;
        }
      }
    },
    async postEditProductCategory() {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        const data = this.category;
        const response = await this.$http.post("/category/update", data);
        if (response.status == 200) {
          localStorage.removeItem("selectedCategory");
          this.informationDialog.message = "Your data was successfully saved!";
          this.informationDialog.appear = true;
          this.informationDialog.callBack = true;
          this.loaderStore.closeLoadingDialog();
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status == 406) {
          this.informationDialog.message =
            "This category is already exists! Please choose different categories name.";
          this.informationDialog.appear = true;
          this.informationDialog.callBack = false;
        }
      }
    },

    async postCreateWebsiteCategory() {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        const data = {
          name: this.category.name,
          parent_category: this.category.parent_category,
        };
        const response = await this.$http.post("/web-category/create", data);
        if (response.status == 200) {
          this.informationDialog.message = "Your data was successfully saved!";
          this.informationDialog.appear = true;
          this.informationDialog.callBack = true;
          this.loaderStore.closeLoadingDialog();
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status == 406) {
          this.informationDialog.message =
            "This category is already exists! Please choose different categories name.";
          this.informationDialog.appear = true;
          this.informationDialog.callBack = false;
        }
      }
    },
    async postEditWebsiteCategory() {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        const data = this.category;
        const response = await this.$http.post("/web-category/update", data);
        if (response.status == 200) {
          localStorage.removeItem("selectedCategory");
          this.informationDialog.message = "Your data was successfully saved!";
          this.informationDialog.appear = true;
          this.informationDialog.callBack = true;
          this.loaderStore.closeLoadingDialog();
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status == 406) {
          this.informationDialog.message =
            "This category is already exists! Please choose different categories name.";
          this.informationDialog.appear = true;
          this.informationDialog.callBack = false;
        }
      }
    },
    cancel() {
      localStorage.removeItem("selectedCategory");
    },
    fetchCategories() {
      if (this.category.type == "Website Category") {
        this.fetchWebsiteCategories();
      } else {
        this.fetchProductCategories();
      }
    },
    checkCategoryType() {
      const type = this.$route.query.type;
      if (type) {
        this.category.type = type;
      } else {
        this.getCategoryFromLocalStorage();
      }
    }
  },
  mounted() {
    this.updateProductStore();
    this.checkCategoryType();
    this.fetchCategories();
  },
};
</script>
