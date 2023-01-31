<template>
  <div class="pt-5">
    <p v-if="!$root.userInfo.is_admin" class="fw-bold mb-5 fs-5">Add your logo</p>
    <!-- Company Logo-->
    <div class="row mb-4 border-bottom border-4 border-white d-flex align-items-center">
      <div class="col">
        <div class="fs-6 fw-bold woosh-text-primary">
          <p>Company logo</p>
          <div
            class="fs-6 border-0 py-5 w-75 mt-3 position-relative d-flex justify-content-center mb-5">
            <div class="position-absolute top-0 end-0">
              <button
                v-if="businessDetails.company_logo"
                @click="clearSelectedImage('companyLogo')"
                class="border-0 bg-transparent p-0">
                <svg
                    v-if="!$root.userInfo.is_admin"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#C96340"
                    class=""
                    viewBox="0 0 16 16">
                  <path
                      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                </svg>
              </button>
            </div>
            <svg
              v-if="!businessDetails.company_logo"
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              fill="white"
              height="70"
              class="bi bi-image"
              viewBox="0 0 16 16">
              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
              <path
                d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
            </svg>
            <img v-if="businessDetails.company_logo" :src="businessDetails.company_logo" class="w-100 h-100" />
          </div>
        </div>
      </div>
      <div class="col">
        <div class="d-flex justify-content-center mb-3">
          <p class="mb-2">Maximum size 1 MB (.jpg .jpeg .png)</p>
        </div>
        <div v-if="!$root.userInfo.is_admin">
          <div>
            <label
              class="w-100 btn btn-secondary rounded-0 border-0 text-center py-3 fw-bold text-white">
              <input
                type="file"
                id="companyLogo"
                name="Company Logo"
                accept="image/png, image/jpg, image/jpeg"
                class="k-display-none"
                @change="addCompanyLogo"
              />
              Upload from file
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- Invoice Logo -->
    <div class="row mb-4 mt-4 d-flex align-items-center">
      <div class="col">
        <div class="fs-6 fw-bold woosh-text-primary">
          <p>Invoice logo</p>
          <div
            class="fs-6 border-0 py-5 w-50 mt-3 position-relative d-flex justify-content-center">
            <div class="position-absolute top-0 end-0">
              <button
                  v-if="businessDetails.invoice_logo"
                  @click="clearSelectedImage('invoiceLogo')"
                  class="border-0 bg-transparent p-0">
                <svg
                    v-if="!$root.userInfo.is_admin"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#C96340"
                    class=""
                    viewBox="0 0 16 16">
                  <path
                      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                </svg>
              </button>
            </div>
            <svg
              v-if="!businessDetails.invoice_logo"
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              fill="white"
              height="50"
              class="bi bi-image"
              viewBox="0 0 16 16">
              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
              <path
                d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
            </svg>
            <img v-if="businessDetails.invoice_logo" :src="businessDetails.invoice_logo" class="w-100 h-100" />
          </div>
        </div>
      </div>
      <div class="col">
        <div class="d-flex justify-content-center align-items-center mb-3">
          <p class="mb-2">Maximum size 1 MB (.jpg .jpeg .png)</p>
        </div>
        <div v-if="!$root.userInfo.is_admin">
          <label
            class="w-100 btn btn-secondary rounded-0 border-0 text-center py-3 fw-bold text-white">
            <input
                type="file"
                id="invoiceLogo"
                name="Invoice Logo"
                accept="image/png, image/jpg, image/jpeg"
                class="k-display-none"
                @change="addInvoiceLogo"
            />
            Upload from file
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapWritableState } from "pinia";
import { useStoreStore } from "./../../../../stores/StoreStore.js";

export default {
  name: "Registration Business Logo Forms",
  data() {
    return {
      fileReaderCompany: new FileReader(),
      fileReaderInvoice: new FileReader()
    };
  },
  computed: {
    ...mapWritableState(useStoreStore, ["businessDetails"]),
  },
  methods: {
    showCompanyLogo(event) {
      if (event.type === 'load') {
        this.businessDetails.company_logo = this.fileReaderCompany.result;
      }
    },
    showInvoiceLogo(event) {
      if (event.type === 'load') {
        this.businessDetails.invoice_logo = this.fileReaderInvoice.result;
      }
    },
    checkSize(max, image) {
      if (image.size < max) {
        return true;
      } else {
        alert('image size exceeds the maximum size limit (1 mb)');
        return false;
      }
    },
    addCompanyLogo(event) {
      const selectedImage = event.target.files[0];
      const maximumFileSize = 1050625;
      if (this.checkSize(maximumFileSize, selectedImage)) {
        this.fileReaderCompany.readAsDataURL(selectedImage);
        this.fileReaderCompany.addEventListener('load', this.showCompanyLogo);
      }
    },
    addInvoiceLogo(event) {
      const selectedImage = event.target.files[0];
      const maximumFileSize = 1050625;
      if (this.checkSize(maximumFileSize, selectedImage)) {
        this.fileReaderInvoice.readAsDataURL(selectedImage);
        this.fileReaderInvoice.addEventListener('load', this.showInvoiceLogo);
      }
    },
    clearSelectedImage(id) {
      if (id === "companyLogo") {
        this.clearCompanyLogo(id);
      } else {
        this.clearInvoiceLogo(id);
      }
    },
    clearCompanyLogo(id) {
      this.businessDetails.company_logo = null;
      let selectedImage = document.getElementById(id);
      let newInput = document.createElement("input");
      newInput.type = "file";
      newInput.id = selectedImage.id;
      newInput.name="Company Logo";
      newInput.setAttribute('style','display:none');
      newInput.addEventListener('change', this.addCompanyLogo);
      selectedImage.parentNode.replaceChild(newInput, selectedImage);
    },
    clearInvoiceLogo(id) {
      this.businessDetails.invoice_logo = null;
      let selectedImage = document.getElementById(id);
      let newInput = document.createElement("input");
      newInput.type = "file";
      newInput.id = selectedImage.id;
      newInput.name="Invoice Logo";
      newInput.setAttribute('style','display:none');
      newInput.addEventListener('change', this.addInvoiceLogo);
      selectedImage.parentNode.replaceChild(newInput, selectedImage);
    }
  },
};
</script>
