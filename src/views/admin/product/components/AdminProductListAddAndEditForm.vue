<template>
  <div class="col h-100 p-5 scroll--vertical">
    <p>Product Details</p>
    <!-- product name -->
    <div class="row m-0">
      <div class="col px-0">
        <k-input
          :name="'Product Name'"
          :label="'Product Name'"
          :min-length="2"
          :required="true"
          class="fw-bold">
        </k-input>
      </div>
    </div>
    <!-- product type / barcode -->
    <div class="row m-0">
      <div class="col ps-0">
        <k-input
          :name="'Product Name'"
          :label="'Product Name'"
          :min-length="2"
          :required="true"
          class="fw-bold">
        </k-input>
      </div>
      <div class="col pe-0">
        <k-input
          :name="'Product Name'"
          :label="'Product Name'"
          :min-length="2"
          :required="true"
          class="fw-bold">
        </k-input>
      </div>
    </div>
    <!-- internal reference -->
    <div class="row m-0">
      <div class="col px-0">
        <k-input
          :name="'Product Name'"
          :label="'Product Name'"
          :required="true"
          class="fw-bold">
        </k-input>
      </div>
    </div>
    <!-- sales price / cost / weight -->
    <div class="row m-0">
      <div class="col ps-0">
        <k-input
          :name="'Product Name'"
          :label="'Product Name'"
          :min-length="2"
          :required="true"
          class="fw-bold">
        </k-input>
      </div>
      <div class="col">
        <k-input
          :name="'Product Name'"
          :label="'Product Name'"
          :min-length="2"
          :required="true"
          class="fw-bold">
        </k-input>
      </div>
      <div class="col pe-0">
        <k-input
          :name="'Product Name'"
          :label="'Product Name'"
          :min-length="2"
          :required="true"
          class="fw-bold">
        </k-input>
      </div>
    </div>
    <!-- True or False Options -->
    <span>
      <div class="row mx-0 mt-2 pt-3 border-top border-2">
        <div class="col ps-0">
          <p>Can be sold</p>
        </div>
        <div class="col-auto pe-0">
          <div>False[toggle]</div>
        </div>
      </div>
      <div class="row m-0 pt-3">
        <div class="col ps-0">
          <p>Can be purchased</p>
        </div>
        <div class="col-auto pe-0">
          <div>False[toggle]</div>
        </div>
      </div>
      <div class="row m-0 pt-3">
        <div class="col ps-0">
          <p>Available for pick up</p>
        </div>
        <div class="col-auto pe-0">
          <div>False[toggle]</div>
        </div>
      </div>
      <div class="row m-0 pt-3 pb-3 border-bottom border-2">
        <div class="col ps-0">
          <p>Available in POS</p>
        </div>
        <div class="col-auto pe-0">
          <div>False[toggle]</div>
        </div>
      </div>    
    </span>
    <p class="pt-3">Product Category</p>
    <!-- Product Category / sub / sub -->
    <div class="row m-0">
      <div class="col ps-0">
        <k-input
          :name="'Product Name'"
          :label="'Product Name'"
          :min-length="2"
          :required="true"
          class="fw-bold">
        </k-input>
      </div>
      <div class="col">
        <k-input
          :name="'Product Name'"
          :label="'Product Name'"
          :min-length="2"
          :required="true"
          class="fw-bold">
        </k-input>
      </div>
      <div class="col pe-0">
        <k-input
          :name="'Product Name'"
          :label="'Product Name'"
          :min-length="2"
          :required="true"
          class="fw-bold">
        </k-input>
      </div>
    </div>
    <p class="pt-3">Website Product Category</p>
    <!-- Website Category / sub / sub -->
    <div class="row m-0">
      <div class="col ps-0">
        <k-input
          :name="'Product Name'"
          :label="'Product Name'"
          :min-length="2"
          :required="true"
          class="fw-bold">
        </k-input>
      </div>
      <div class="col">
        <k-input
          :name="'Product Name'"
          :label="'Product Name'"
          :min-length="2"
          :required="true"
          class="fw-bold">
        </k-input>
      </div>
      <div class="col pe-0">
        <k-input
          :name="'Product Name'"
          :label="'Product Name'"
          :min-length="2"
          :required="true"
          class="fw-bold">
        </k-input>
      </div>
    </div>
    <!-- Sales Description -->
    <div class="row m-0">
      <div class="col px-0">
        <k-input
          :name="'Product Name'"
          :label="'Product Name'"
          :required="true"
          class="fw-bold">
        </k-input>
      </div>
    </div>
    <!-- Company -->
    <div class="row m-0">
      <div class="col px-0">
        <k-input
          :name="'Product Name'"
          :label="'Product Name'"
          :required="true"
          class="fw-bold">
        </k-input>
      </div>
    </div>
    <!-- Optional Products -->
    <div class="row m-0">
      <div class="col px-0">
        <k-input
          :name="'Product Name'"
          :label="'Product Name'"
          :required="true"
          class="fw-bold">
        </k-input>
      </div>
    </div>
    <div class="row m-0 gx-2">
      <div class="col-auto bg-warning py-3 px-4 fw-bold m-1">
        Small
      </div>
      <div class="col-auto bg-warning py-3 px-4 fw-bold m-1">
        Medium
      </div>
      <div class="col-auto bg-warning py-3 px-4 fw-bold m-1">
        Large
      </div>
      <div class="col-auto bg-warning py-3 px-4 fw-bold m-1">
        Add Bacon
      </div>
    </div>
    <!-- Alergen Info -->
    <div class="row m-0">
      <div class="col px-0">
        <k-input
          :name="'Product Name'"
          :label="'Product Name'"
          :required="true"
          class="fw-bold">
        </k-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Admin Products Add & Edit Form",
  components: {
  },
  data() {
    return {
      
    };
  },
  methods: {
  },
};
</script>
