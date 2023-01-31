<template>
  <k-dialog>
    <div class="row mx-0 mb-4">
      <div class="col px-0">
        <k-button
          @click="closeModalRecipe(false)"
          class="k-button--secondary rounded-0"
          :theme-color="'primary'">
          <p v-if="!$root.userInfo.is_admin">Cancel</p>
          <p v-if="$root.userInfo.is_admin">Close</p>
        </k-button>
      </div>
      <div class="col text-center align-self-center fw-bold">
        {{ selectedProduct.name }}
        <span class="woosh-text-primary">Recipe:</span>
      </div>
      <div class="col text-end px-0">
        <k-button
          v-if="!$root.userInfo.is_admin"
          @click="saveRecipe"
          class="text-white rounded-0">
          Save
        </k-button>
      </div>
    </div>
    <table class="table table-striped">
      <thead class="fw-bold">
        <tr>
          <th class="align-middle" scope="col">Ingredient Name</th>
          <th class="text-center align-middle" scope="col">Quantity</th>
          <th class="align-middle" scope="col">Unit</th>
          <th class="text-end align-middle" scope="col">Unit Cost</th>
          <th class="text-end align-middle" scope="col">Recipe Cost</th>
          <th class="align-middle" scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(recipe, index) in recipes" :key="recipe.key">
          <td>
            <k-dropdown-combobox
              class="fw-bold border"
              :allow-custom="false"
              :data-items="recipesList"
              :text-field="'name'"
              :disabled="$root.userInfo.is_admin"
              v-model="recipe.product" />
          </td>
          <td>
            <k-input
              :name="'Cost'"
              :min-length="1"
              :required="true"
              :disabled="$root.userInfo.is_admin"
              v-model="recipe.qty"
              type="number"
              class="fw-bold border"
              input-class="text-center" />
          </td>
          <td>
            <p class="text-start">{{ recipe.product.unit_name || "-" }}</p>
          </td>
          <td>
            <p class="text-end">{{ recipe.product.cost || "-" }}</p>
          </td>
          <td>
            <p class="text-end">
              {{ recipe.qty * recipe.product.cost || "-" }}
            </p>
          </td>
          <th v-if="!$root.userInfo.is_admin">
            <button
              @click="showConfirmationDialog(recipe, index)"
              class="py-2 px-1 me-2 border-0 bg-transparent woosh-text-primary">
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
          </th>
        </tr>
      </tbody>
    </table>
    <div v-if="!$root.userInfo.is_admin" class="row mx-0">
      <div class="col-auto px-0 text-center">
        <button
          @click="addNewIngredient"
          class="btn btn-secondary rounded-0 fs-6 px-2 py-1 border-0">
          Add More Ingredient
        </button>
      </div>
    </div>
  </k-dialog>

  <confirmation-dialog
    :dialog="confirmationDialog"
    @close-dialog="closeConfirmationDialog()"
    @yes-action="removeIngredient" />
</template>

<script>
export default {
  name: "Admin Produk Recipe Dialog",
  props: {
    recipesList: Array,
    units: Array,
  },
  data() {
    return {
      selectedProduct: JSON.parse(localStorage.getItem("selectedProduct")),
      blankRecipe: { product: { id: null, name: "" }, qty: null },
      recipes: [
        {
          product: { id: null, name: "" },
          qty: null,
        },
      ],
      ingredientSelectedIndex: null,
      confirmationDialog: {
        appear: false,
        name: "",
        message: "",
        button: {
          yes: "Remove",
          no: "Cancel",
        },
      },
    };
  },
  methods: {
    showConfirmationDialog(message, index) {
      this.ingredientSelectedIndex = index;
      this.confirmationDialog = {
        appear: true,
        name: "",
        message:
          "Are you sure you want to delete '" +
          message.product.name +
          "' item type?",
        button: {
          yes: "Remove",
          no: "Cancel",
        },
      };
    },
    closeConfirmationDialog() {
      this.confirmationDialog = {
        appear: false,
        name: "",
        message: "",
        button: {
          yes: "Remove",
          no: "Cancel",
        },
      };
      this.ingredientSelectedIndex = null;
    },
    addNewIngredient() {
      this.recipes.push({ ...this.blankRecipe });
    },
    removeIngredient() {
      this.recipes.splice(this.ingredientSelectedIndex, 1);
      this.closeConfirmationDialog();
    },
    async saveRecipe() {
      let recipes = this.recipes.map((recipe) => {
        if (recipe.product.id && recipe.qty) {
          return {
            product_id: recipe.product.id,
            qty: recipe.qty,
          };
        }
      });
      await this.checkRecipe(recipes);
    },
    async checkRecipe(recipes) {
      let product = this.selectedProduct;
      if (recipes.length == 0) {
        product.recipes = null;
        await this.postRecipe(product);
      } else if (recipes[0]) {
        product.recipes = this.filterRecipe(recipes);
        await this.postRecipe(product);
      } else {
        alert("Please fill all field");
      }
    },
    async postRecipe(product) {
      try {
        const response = await this.$http.post("/product/update", product);
        if (response.status === 200) {
          this.closeModalRecipe(true);
        }
      } catch (error) {
        const message = error.response.data;
        this.$emit("showInformationDialog", message);
      }
    },
    filterRecipe(recipe) {
      return recipe.filter((recipe) => recipe !== undefined);
    },
    closeModalRecipe(success) {
      this.$emit("closeProductRecipeDialog", success);
      localStorage.removeItem("selectedProduct");
    },
    checkAvailableRecipe() {
      if (this.selectedProduct.recipes != null) {
        this.getRecipeFromProduct();
      }
    },
    getRecipeFromProduct() {
      const recipes = this.selectedProduct.recipes;
      this.recipes = recipes.map((recipe) => {
        return {
          product: {
            id: recipe.product_id,
            name: recipe.product_name,
            unit_name: recipe.uom.name,
            cost: recipe.unit_cost,
          },
          qty: recipe.qty,
        };
      });
    },
  },
  mounted() {
    this.checkAvailableRecipe();
  },
};
</script>
