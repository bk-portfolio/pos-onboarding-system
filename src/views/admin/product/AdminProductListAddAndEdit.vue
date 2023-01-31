<template>
  <div class="container-fluid h-100">
    <!-- Sub Header Add / Edit Product -->
    <AdminProductSubHeader
      :pageName="pageName"
      :addOrEditPage="addOrEditPage"
      @save-data="saveData()"
      @cancel="cancel()" />
    <!-- content -->
    <div class="row h-90 woosh-bg-primary scroll--vertical">
      <div class="col h-100 p-5">
        <!-- Optional Product {Mandatory} -->
        <div class="row m-0 align-items-center">
          <div class="col ps-0">
            <p>Create as Optional Product</p>
          </div>
          <div class="col-auto pe-0">
            <div>
              {{ product.optional_product }}
              <k-switch
                :offLabel="''"
                :onLabel="''"
                :size="'small'"
                v-model="product.optional_product" />
            </div>
          </div>
        </div>

        <!-- Option Group -->
        <div v-if="product.optional_product" class="row m-0">
          <div class="col px-0">
            <k-dropdown-combobox
              class="fw-bold"
              label="Option Group"
              :allow-custom="true"
              :data-items="optionGroup"
              text-field="name"
              :value="name"
              :list-no-data-render="'createOptionGroupTemplate'"
              v-model="temporaryOptionGroup"
              @change="onChangeOptionGroup">
              <template v-slot:createOptionGroupTemplate>
                <p class="bg-secondary text-white p-2">
                  There is no data available.
                </p>
              </template>
            </k-dropdown-combobox>
          </div>
        </div>
        <div v-show="addOrEditPage == 'Add New'" class="row mx-0 pt-3">
          <div class="col ps-0">
            <p>is Recipe ?</p>
          </div>
          <div class="col-auto pe-0">
            <div>
              {{ product.is_recipe }}
              <k-switch
                @change="clearCostValue"
                :offLabel="''"
                :onLabel="''"
                :size="'small'"
                v-model="product.is_recipe" />
            </div>
          </div>

          <p class="fs-7 text-secondary px-2">
            &#8627; is Recipe is need to be checked to True if the product
            categorized as a recipe.
          </p>
        </div>
        <hr />

        <p>Product Details</p>
        <!-- product name {Mandatory} -->
        <div class="row m-0">
          <div class="col px-0">
            <k-input
              :name="'Product Name'"
              :label="'Product Name'"
              :min-length="2"
              :required="true"
              :wrapper-class="
                mandatoryFieldBox.product_name ? 'mandatory-field' : ''
              "
              v-model="product.name"
              class="fw-bold">
            </k-input>
          </div>
        </div>
        <!-- product type {Mandatory} / Internal Reference-->
        <div class="row m-0">
          <div class="col ps-0">
            <k-dropdown-combobox
              class="fw-bold"
              label="Product Type"
              :allow-custom="false"
              :data-items="productType"
              :list-no-data-render="'createProductTypeTemplate'"
              :class-name="
                mandatoryFieldBox.product_type ? 'mandatory-field' : ''
              "
              v-model="product.type">
              <template v-slot:createProductTypeTemplate>
                <p class="bg-secondary text-white p-2">
                  There is no data available.
                </p>
              </template>
            </k-dropdown-combobox>
          </div>
          <div class="col pe-0">
            <k-input
              :name="'Internal Referance'"
              :label="'Internal Referance'"
              :required="true"
              v-model="product.internal_referance"
              class="fw-bold">
            </k-input>
          </div>
        </div>
        <!-- sales price {Mandatory} / cost / unit-->
        <div class="row m-0">
          <div class="col ps-0">
            <k-input
              :name="'Sales Price'"
              :label="'Sales Price'"
              :min-length="2"
              :required="true"
              :wrapper-class="
                mandatoryFieldBox.sales_price ? 'mandatory-field' : ''
              "
              v-model="product.price"
              class="fw-bold">
            </k-input>
          </div>
          <div class="col">
            <k-input
              :name="'Cost'"
              :label="'Cost'"
              :min-length="2"
              :required="true"
              :disabled="!product.is_recipe"
              v-model="product.cost"
              class="fw-bold">
            </k-input>
          </div>
          <div class="col pe-0">
            <k-dropdown-combobox
              class="fw-bold"
              label="Unit"
              :allow-custom="false"
              :data-items="units"
              :text-field="'name'"
              :list-no-data-render="'createProductTypeTemplate'"
              :class-name="mandatoryFieldBox.unit ? 'mandatory-field' : ''"
              v-model="selectedUnit"
              @change="selectUnit">
              <template v-slot:createProductTypeTemplate>
                <p class="bg-secondary text-white p-2">
                  There is no data available.
                </p>
              </template>
            </k-dropdown-combobox>
          </div>
        </div>
        <!-- Can be Sold {Mandatory} / Can be Purchase {Mandatory} / Avail Pickup / Avail in POS {Mandatory} -->
        <span>
          <div class="row mx-0 mt-2 pt-3 border-top border-2">
            <div class="col ps-0">
              <p>Can be sold</p>
            </div>
            <div class="col-auto pe-0">
              <div>
                {{ product.can_sold }}
                <k-switch
                  :offLabel="''"
                  :onLabel="''"
                  :size="'small'"
                  v-model="product.can_sold" />
              </div>
            </div>
          </div>
          <div class="row m-0 pt-3">
            <div class="col ps-0">
              <p>Can be purchased</p>
            </div>
            <div class="col-auto pe-0">
              <div>
                {{ product.can_purchase }}
                <k-switch
                  :offLabel="''"
                  :onLabel="''"
                  :size="'small'"
                  v-model="product.can_purchase" />
              </div>
            </div>
          </div>
          <div class="row m-0 pt-3">
            <div class="col ps-0">
              <p>Available for pick up</p>
            </div>
            <div class="col-auto pe-0">
              <div>
                {{ product.is_pickup }}
                <k-switch
                  :offLabel="''"
                  :onLabel="''"
                  :size="'small'"
                  v-model="product.is_pickup" />
              </div>
            </div>
          </div>
        </span>
        <p class="pt-3">Product Category</p>
        <!-- Product Category {Mandatory} -->
        <div class="row m-0">
          <div class="col ps-0">
            <k-dropdown-combobox
              class="fw-bold"
              label="Product / POS Category"
              :allow-custom="false"
              :data-items="categories"
              :text-field="'name'"
              :list-no-data-render="'createProductCategoryTemplate'"
              :class-name="
                mandatoryFieldBox.product_category ? 'mandatory-field' : ''
              "
              v-model="product.product_category"
              @change="onChangeProductCategory">
              <template v-slot:createProductCategoryTemplate>
                <p class="bg-secondary text-white p-2">
                  Click
                  <i @click="goToAddNewCategory" class="underline text-info">
                    here
                  </i>
                  to create a new category
                </p>
              </template>
            </k-dropdown-combobox>
          </div>
        </div>
        <!-- Website Category -->
        <div class="row m-0">
          <div class="col ps-0">
            <k-multiselect
              class="fw-bold"
              label="Product Web Category"
              :allow-custom="false"
              :data-items="productWebCategoryList"
              :text-field="'name'"
              :list-no-data-render="'createProductWebCategoryTemplate'"
              v-model="product.webcategory_list">
              <template v-slot:createProductWebCategoryTemplate>
                <p class="bg-secondary text-white p-2">
                  Click
                  <i @click="goToAddNewWebCategory" class="underline text-info">
                    here
                  </i>
                  to create a new category
                </p>
              </template>
            </k-multiselect>
          </div>
        </div>
        <!-- Sales Description {Mandatory} -->
        <div class="row m-0">
          <div class="col ps-0">
            <k-input
              :name="'Sales Description'"
              :label="'Sales Description'"
              :required="true"
              v-model="product.description"
              class="fw-bold">
            </k-input>
          </div>
        </div>
        <!-- Alergen Info (check box) {Mandatory} -->
        <p class="py-3">Allergen Info</p>
        <div class="row m-0 pb-5">
          <div
            v-for="info in allergenFree"
            :key="info.key"
            class="col-auto ps-0 pe-3">
            <k-checkbox :label="info.name" v-model="info.select" />
          </div>
        </div>
      </div>

      <div class="col h-100 p-5">
        <p class="fw-bold mb-5 fs-5">Add your product image</p>
        <div
          class="row mb-4 border-bottom border-4 border-white d-flex align-items-center">
          <div class="col">
            <div class="fs-6 fw-bold woosh-text-primary">
              <!--              <p>Company logo</p>-->
              <div
                class="fs-6 border-0 py-5 w-75 mt-3 position-relative d-flex justify-content-center mb-5">
                <div class="position-absolute top-0 end-0">
                  <button
                    v-if="product.images"
                    @click="clearSelectedImage"
                    class="border-0 bg-transparent p-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="#C96340"
                      class=""
                      viewBox="0 0 16 16">
                      <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                    </svg>
                    <!--                    <img v-if="product.images" :src="product.images" class="w-100 h-100" />-->
                  </button>
                </div>
                <svg
                  v-if="!product.images"
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="70"
                  fill="#b8b8b8"
                  viewBox="0 0 16 16">
                  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                  <path
                    d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                </svg>
                <img
                  v-if="product.images"
                  :src="product.images"
                  class="w-100 h-100" />
              </div>
            </div>
          </div>
          <div class="col">
            <div class="mb-3 text-center">
              <p class="mb-2">Maximum size 1 MB (.jpg .jpeg .png)</p>
            </div>
            <div>
              <div>
                <label
                  class="w-100 btn btn-secondary rounded-0 border-0 text-center py-3 fw-bold text-white">
                  <input
                    type="file"
                    id="productImage"
                    name="ProductImage"
                    accept="image/png, image/jpg"
                    @change="addProductImage"
                    style="display: none" />
                  Upload from file
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <confirmation-dialog
      :dialog="confirmationDialog"
      @close-dialog="clearTemporaryOptionGroup()"
      @yes-action="postCreateOptionGroup" />

    <information-dialog
      :dialog="informationDialog"
      @close-dialog="closeInformationDialog" />
  </div>
</template>

<script>
import { useProductStore } from "./../../../stores/ProductStore.js";
import { useLoaderStore } from "./../../../stores/LoaderStore";
import AdminProductSubHeader from "./components/AdminProductSubHeader.vue";
export default {
  name: "Admin Products Add & Edit",
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
      pageName: "Product",
      addOrEditPage: localStorage.getItem("addOrEditPage"),
      companyLogo: "",
      temporaryOptionGroup: { name: "" },
      categories: [],
      optionGroup: [],
      productType: ["Consumable", "Service", "Storable"],
      productWebCategoryList: [],
      allergenFree: [
        {
          name: "V",
          select: false,
        },
        {
          name: "GF",
          select: false,
        },
        {
          name: "VEG",
          select: false,
        },
        {
          name: "DF",
          select: false,
        },
      ],
      allergenFreeSelected: [],
      product: {
        optional_product: false,
        option_group: 0,
        name: "",
        type: "",
        internal_referance: "",
        price: "",
        cost: null,
        is_recipe: true,
        can_sold: true,
        can_purchase: true,
        is_pickup: true,
        category: null,
        category_name: "",
        product_category: null,
        webcategory_list: null,
        description: "",
        images: null,
        v: true,
        gf: true,
        veg: true,
        df: true,
        unit_id: null,
      },
      mandatoryFieldBox: {
        product_name: false,
        product_type: false,
        sales_price: false,
        unit: false,
        product_category: false,
        sales_descriptions: false,
        pos_category: false, //need to confirm with ba and be
        photo: false,
      },
      confirmationDialog: {
        appear: false,
        name: "Add New Optional Group ?",
        message: "",
        button: {
          yes: "Add",
          no: "Cancel",
        },
      },
      informationDialog: {
        appear: false,
        message: "",
        callBack: false,
      },
      mandatoryRedBoxShow: false,
      units: [],
      selectedUnit: null,
      selectedImage: "",
      reader: new FileReader(),
      productImage: null,
    };
  },
  methods: {
    clearCostValue() {
      if (this.product.is_recipe === false) {
        this.product.cost = null;
      }
    },
    goToAddNewCategory() {
      const param = "?type";
      const value = "Product / POS Category";
      this.$router.push(
        "/adminProductManageCategoryAddAndEdit" + param + "=" + value
      );
    },
    goToAddNewWebCategory() {
      const param = "?type";
      const value = "Website Category";
      this.$router.push(
        "/adminProductManageCategoryAddAndEdit" + param + "=" + value
      );
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
    cancel() {
      localStorage.removeItem("selectedProduct");
    },
    openInformationDialog(message) {
      this.informationDialog.message = message;
      this.informationDialog.appear = true;
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
    openConfirmationDialog() {
      this.confirmationDialog.appear = true;
    },
    closeConfirmationDialog() {
      this.confirmationDialog = {
        appear: false,
        name: "Add New Optional Group ?",
        message: "",
        button: {
          yes: "Add",
          no: "Cancel",
        },
      };
    },

    updateProductStore() {
      useProductStore().updatePageName(this.pageName);
      useProductStore().updateAddOrEditPage(this.addOrEditPage);
    },

    async checkMandatoryFields() {
      const product = this.product;
      this.mandatoryFieldBox = {
        product_name: !(product.name !== "" && product.name !== null),
        product_type: !(product.type !== "" && product.type !== null),
        sales_price: !(product.price !== "" && product.price !== null),
        product_category: !(
          product.category !== "" && product.category !== null
        ),
        unit: !(product.unit_id !== "" && product.unit_id !== null),
        pos_category: false, //need to confirm with ba and be
        photo: false,
      };
      const mandatory = this.mandatoryFieldBox;
      this.mandatoryRedBoxShow = false;
      if (mandatory.product_name) {
        this.mandatoryRedBoxShow = true;
        this.informationDialog.message = "Please fill all mandatory fields.";
        this.informationDialog.appear = true;
      } else if (mandatory.product_type) {
        this.mandatoryRedBoxShow = true;
        this.informationDialog.message = "Please fill all mandatory fields.";
        this.informationDialog.appear = true;
      } else if (mandatory.sales_price) {
        this.mandatoryRedBoxShow = true;
        this.informationDialog.message = "Please fill all mandatory fields.";
        this.informationDialog.appear = true;
      } else if (mandatory.product_category) {
        this.mandatoryRedBoxShow = true;
        this.informationDialog.message = "Please fill all mandatory fields.";
        this.informationDialog.appear = true;
      } else if (mandatory.unit) {
        this.mandatoryRedBoxShow = true;
        this.informationDialog.message = "Please fill all mandatory fields.";
        this.informationDialog.appear = true;
      }
    },

    async getData() {
      await this.fetchOptionGroupList();
      await this.fetchUnits();
      this.fetchCategories();
      this.fetchWebsiteCategories();
      this.getProductFromLocalStorage();
    },

    getProductFromLocalStorage() {
      const product = JSON.parse(localStorage.getItem("selectedProduct"));
      if (product) {
        this.product = product;
        this.checkOptionGroup(product.option_group);
        this.checkUnit(product.unit_id);
        this.checkAllergenInfo();
        this.checkProductCategory(product.category, product.category_name);
      }
    },

    // Option Group
    checkOptionGroup(id) {
      this.temporaryOptionGroup = this.optionGroup.find(
        (data) => data.id === id
      );
    },
    clearTemporaryOptionGroup() {
      this.temporaryOptionGroup = { name: "" };
      this.closeConfirmationDialog();
    },
    onChangeOptionGroup(event) {
      if (event.value.id) {
        this.product.option_group = event.value.id;
      } else {
        this.confirmationDialog.message = this.temporaryOptionGroup.name;
        this.openConfirmationDialog();
      }
    },
    async fetchOptionGroupList() {
      const response = await this.$http.post("/option-group/list");
      this.optionGroup = response.data;
    },
    async postCreateOptionGroup() {
      const data = { name: this.confirmationDialog.message };
      const response = await this.$http.post("/option-group/create", data);
      if (response.status === 200) {
        this.product.option_group = response.data.id;
        this.temporaryOptionGroup.name = response.data.name;
        this.closeConfirmationDialog();
        await this.fetchOptionGroupList();
        await this.openInformationDialog("Success add new Option Group");
      }
    },

    // Units
    checkUnit(id) {
      this.selectedUnit = this.units.find((data) => data.id === id);
    },
    selectUnit(event) {
      this.product.unit_id = event.value.id;
    },
    async fetchUnits() {
      const response = await this.$http.post("/unit/list");
      this.units = response.data;
    },

    // Allergen Info
    checkAllergenInfo() {
      this.allergenFree.forEach((data) => {
        this.selectAllergenValue(data);
      });
    },
    selectAllergenValue(data) {
      if (data.name === "V") {
        data.select = this.product.v;
      } else if (data.name === "GF") {
        data.select = this.product.gf;
      } else if (data.name === "VEG") {
        data.select = this.product.veg;
      } else if (data.name === "DF") {
        data.select = this.product.df;
      }
    },
    setAllergenValue(name, value) {
      if (name === "V") {
        this.product.v = value;
      } else if (name === "GF") {
        this.product.gf = value;
      } else if (name === "VEG") {
        this.product.veg = value;
      } else if (name === "DF") {
        this.product.df = value;
      }
    },

    // Product Category
    checkProductCategory(id, name) {
      this.product.category = id;
      this.product.product_category = { id: id, name: name };
    },
    onChangeProductCategory(event) {
      this.product.category = event.value.id;
    },
    async fetchCategories() {
      const response = await this.$http.post("/category/list");
      this.categories = response.data;
      this.categories.forEach((category) => {
        if (category.parent_category) {
          category.name = category.parent_category + "/" + category.name;
        }
      });
      this.categories.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    },

    // Website Category
    async fetchWebsiteCategories() {
      const response = await this.$http.post("/web-category/list");
      this.productWebCategoryList = response.data;
      this.productWebCategoryList.forEach((category) => {
        if (category.parent_category) {
          category.name = category.parent_category + " / " + category.name;
        }
      });
      this.productWebCategoryList.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    },

    saveData() {
      this.checkMandatoryFields();
      if (!this.mandatoryRedBoxShow) {
        if (this.addOrEditPage === "Edit") {
          this.postEditProduct();
        } else {
          this.postCreateProduct();
        }
      }
    },
    async postCreateProduct() {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        this.allergenFree.forEach((data) => {
          this.setAllergenValue(data.name, data.select);
        });
        const data = this.product;
        const response = await this.$http.post("/product/create", data);
        if (response.status === 200) {
          this.informationDialog.message = "Your data was successfully saved!";
          this.informationDialog.appear = true;
          this.informationDialog.callBack = true;
          this.loaderStore.closeLoadingDialog();
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status == 406) {
          this.informationDialog.message =
            "This Product is already exists! Please choose different product name.";
          this.informationDialog.appear = true;
          this.informationDialog.callBack = false;
        }
      }
    },
    async postEditProduct() {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        this.allergenFree.forEach((data) => {
          this.setAllergenValue(data.name, data.select);
        });
        const data = this.product;
        const response = await this.$http.post("/product/update", data);
        if (response.status === 200) {
          this.loaderStore.closeLoadingDialog();
          localStorage.removeItem("selectedProduct");
          this.informationDialog.message = "Your data was successfully saved!";
          this.informationDialog.appear = true;
          this.informationDialog.callBack = true;
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status == 406) {
          this.informationDialog.message =
            "This Product is already exists! Please choose different product name.";
          this.informationDialog.appear = true;
          this.informationDialog.callBack = false;
        }
      }
    },

    //  function for Image Uploader
    showImage(event) {
      if (event.type === "load") {
        this.product.images = this.reader.result;
      }
    },
    checkSize(max, image) {
      if (image.size < max) {
        return true;
      } else {
        alert("image size exceeds the maximum size limit (1 mb)");
        return false;
      }
    },
    async addProductImage(event) {
      const selectedImage = event.target.files[0];
      const maximumFileSize = 1050625;
      if (this.checkSize(maximumFileSize, selectedImage)) {
        this.reader.readAsDataURL(selectedImage);
        this.reader.addEventListener("load", this.showImage);
      }
    },
    clearSelectedImage() {
      this.product.images = null;
      let selectedImage = document.getElementById("productImage");
      let newInput = document.createElement("input");
      newInput.type = "file";
      newInput.id = selectedImage.id;
      newInput.name = "ProductImage";
      newInput.setAttribute("style", "display:none");
      newInput.addEventListener("change", this.addProductImage);
      selectedImage.parentNode.replaceChild(newInput, selectedImage);
    },
  },
  mounted() {
    this.updateProductStore();
    this.getData();
  },
};
</script>
