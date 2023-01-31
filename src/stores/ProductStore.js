import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore({
  id: "productStore",
  state: () => ({
    loadTheData: false,
    pageName: "",
    addOrEditPage: "", //Add New or Edit
    allProductList: [],
    showProductList: [],
    recipesList: [],
  }),
  actions: {
    async fetchProducts(id) {
      this.loadTheData = true;
      try {
        const response = await axios.post("/product/list", { id: id });
        if (response.status === 200) {
          this.showProductList = response.data;
          this.allProductList = JSON.parse(JSON.stringify(response.data));
          this.loadTheData = false;
        } else {
          this.loadTheData = false;
        }
      } catch (error) {
        this.loadTheData = false;
      }
    },

    async fetchRecipes() {
      try {
        const response = await axios.post("/product/recipe/list");
        if (response.status === 200) {
          this.recipesList = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    searchProduct(name) {
      if (name == "" || !name) {
        this.showProductList = JSON.parse(JSON.stringify(this.allProductList));
      } else {
        this.showProductList = this.allProductList.filter((product) => {
          let data = product.name.toLowerCase();
          return data.includes(name.toLowerCase());
        });
      }
    },
    updatePageName(name) {
      this.pageName = name;
    },
    updateAddOrEditPage(addOrEdit) {
      this.addOrEditPage = addOrEdit;
    },
    goToAddOrEditPage() {
      this.addOrEditPage = localStorage.getItem("addOrEditPage");
      if (this.pageName == "Product") {
        this.$router.push("/adminProductListAddAndEdit");
      } else if (this.pageName == "Category") {
        this.$router.push("/adminProductManageCategoryAddAndEdit");
      } else if (this.pageName == "Option") {
        this.$router.push("/adminProductOptionalAddAndEdit");
      } else if (this.pageName == "Recipe") {
        this.$router.push("/adminProductRecipesAddAndEdit");
      }
    },
    backToMainProductPage() {
      if (this.pageName == "Product") {
        this.$router.push("/adminProductList");
      } else if (this.pageName == "Category") {
        this.$router.push("/adminProductManageCategory");
      } else if (this.pageName == "Option") {
        this.$router.push("/adminProductOptional");
      } else if (this.pageName == "Recipe") {
        this.$router.push("/adminProductRecipes");
      }
    },
  },
});
