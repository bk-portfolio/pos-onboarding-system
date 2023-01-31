import { defineStore } from "pinia";
import axios from "axios";
import { useLoaderStore } from "./LoaderStore";

export const useStoreStore = defineStore({
  id: "storeStore",

  state: () => ({
    loadTheData: false,
    loaderStore: useLoaderStore(),
    businessDetails: {},
    tradingHoursValue: {
      be_placed: null,
      trading: [
        {
          name: "Kerbside Pick Up",
          id: 0,
          business_id: 0,
          creator_id: 0,
          editor_id: 0,
          type: "kerbside",
          monday_open: "00:00:00",
          monday_close: "00:00:00",
          tuesday_open: "00:00:00",
          tuesday_close: "00:00:00",
          wednesday_open: "00:00:00",
          wednesday_close: "00:00:00",
          thursday_open: "00:00:00",
          thursday_close: "00:00:00",
          friday_open: "00:00:00",
          friday_close: "00:00:00",
          saturday_open: "00:00:00",
          saturday_close: "00:00:00",
          sunday_open: "00:00:00",
          sunday_close: "00:00:00",
        },
        {
          name: "Delivery",
          type: "delivery",
          id: 0,
          business_id: 0,
          editor_id: 0,
          creator_id: 0,
          monday_open: "00:00:00",
          monday_close: "00:00:00",
          tuesday_open: "00:00:00",
          tuesday_close: "00:00:00",
          wednesday_open: "00:00:00",
          wednesday_close: "00:00:00",
          thursday_open: "00:00:00",
          thursday_close: "00:00:00",
          friday_open: "00:00:00",
          friday_close: "00:00:00",
          saturday_open: "00:00:00",
          saturday_close: "00:00:00",
          sunday_open: "00:00:00",
          sunday_close: "00:00:00",
        },
        {
          name: "Dine In",
          type: "dinein",
          id: 0,
          business_id: 0,
          editor_id: 0,
          creator_id: 0,
          monday_open: "00:00:00",
          monday_close: "00:00:00",
          tuesday_open: "00:00:00",
          tuesday_close: "00:00:00",
          wednesday_open: "00:00:00",
          wednesday_close: "00:00:00",
          thursday_open: "00:00:00",
          thursday_close: "00:00:00",
          friday_open: "00:00:00",
          friday_close: "00:00:00",
          saturday_open: "00:00:00",
          saturday_close: "00:00:00",
          sunday_open: "00:00:00",
          sunday_close: "00:00:00",
        },
        {
          name: "Pick Up",
          type: "pickup",
          id: 0,
          business_id: 0,
          editor_id: 0,
          creator_id: 0,
          monday_open: "00:00:00",
          monday_close: "00:00:00",
          tuesday_open: "00:00:00",
          tuesday_close: "00:00:00",
          wednesday_open: "00:00:00",
          wednesday_close: "00:00:00",
          thursday_open: "00:00:00",
          thursday_close: "00:00:00",
          friday_open: "00:00:00",
          friday_close: "00:00:00",
          saturday_open: "00:00:00",
          saturday_close: "00:00:00",
          sunday_open: "00:00:00",
          sunday_close: "00:00:00",
        },
      ],
    },
    tradingHoursLength: 1,
    posSessionsFetch: [],
    posSessionsAdd: [],
    posSessionDefault: [],
    posSessionsFetchLength: 0,
    tableBookingsList: [],
    tableBookingsAdd: [],
    TableBookingDefault: [],
    employeeList: [],
    employeeDetails: JSON.parse(localStorage.getItem("employeeDetails")),
    addEmployee: {
      name: "",
      email: "",
      phone: "",
      mobile: "",
      department: "",
      gender: "",
      notes: "",
      marital_status: "",
      dob: "",
      country: "",
      id_number: "",
      passport_number: "",
      visa_number: "",
      workpermit_number: "",
      visa_expiredate: "",
    },
    vendorList: [],
    vendorDetails: JSON.parse(localStorage.getItem("vendorDetails")),
    addVendor: {
      name: "",
      is_company: false,
      related_company: "",
      address_type: "",
      street: "",
      zip: "",
      city: "",
      state: "",
      country: "",
      email: "",
      phone: "",
      mobile: "",
      supplier_rank: "",
      is_merchant: false,
    },
    accountingList: {
      id: null,
      business_id: null,
      salestax: null,
      salestax_code: "",
      purchasetax: null,
      purchasetax_code: "",
      currency: "",
    },
    stockLocationList: [],
    stockLocationDetails: JSON.parse(
      localStorage.getItem("stockLocationDetails")
    ),
    addStockLocation: {
      name: "",
      type: "",
      barcode: "",
      corridor: "",
      is_return: false,
      is_scrap: false,
      parent_location: "",
      removal_strategy: "",
      incoming_valuation: null,
      outgoing_valuation: null,
    },
    deliveryDetails: {
      id: null,
      is_provider: null,
      promised_time: "",
      actual_time: "",
      is_owndriver: null,
      is_outsource: null,
      third_party: "",
      distance: "",
      credentials: [
        {
          username: "",
          password: "",
          description: "",
        },
      ],
    },
    informationDialog: {
      appear: false,
      message: "",
      callBack: false,
    },
    mandatoryFieldBoxDetails: {
      restaurant_name: false,
      company_name: false,
      address: false,
      phone_number: false,
      email: false,
      abn: false,
    },
    mandatoryFieldBoxTradingHours: {
      be_placed: false,
    },
    mandatoryFieldBoxPos: [],
    mandatoryFieldBoxPosAdd: [],
    mandatoryFieldBoxDelivery: {
      is_provider: false,
      promised_time: false,
      actual_time: false,
      is_owndriver: false,
      is_outsource: false,
      third_party: false,
      distance: false,
    },
    mandatoryFieldBoxTableBooking: [],
    mandatoryFieldBoxTableBookingAdd: [],
    mandatoryFieldBoxEmployee: {
      name: false,
      email: false,
      phone: false,
      mobile: false,
      department: false,
      gender: false,
      notes: false,
      dob: false,
      country: false,
    },
    mandatoryFieldBoxVendor: {
      name: false,
      related_company: false,
      address_type: false,
      street: false,
      zip: false,
      city: false,
      state: false,
      country: false,
      email: false,
      phone: false,
      mobile: false,
      supplier_rank: false,
    },
    mandatoryFieldBoxAccounting: {
      salestax_code: false,
      salestax: false,
      purchasetax_code: false,
      purchasetax: false,
      currency: false,
    },
    mandatoryFieldBoxStockLocation: {
      name: false,
      type: false,
      parent_location: false,
      removal_strategy: false,
    },
    companyName: localStorage.getItem("companyName"),
  }),
  actions: {
    async fetchBusinessDetails(id) {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        const response = await axios.post("/business/find", { id });
        if (response.status === 200) {
          this.businessDetails = response.data;
          this.companyName = response.data.company_name;
          localStorage.setItem("companyName", response.data.company_name);
          this.loaderStore.closeLoadingDialog();
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status === 400) {
          this.openInformationDialog(error.response.data);
        } else if (error.response.status === 406) {
          this.openInformationDialog(error.response.data);
        }
      }
    },

    async postBusinessCreate() {
      const data = this.businessDetails;
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        const response = await axios.post("/business/create", data);
        if (response.status == 200) {
          this.fetchBusinessDetails();
          this.loaderStore.closeLoadingDialog();
          this.updateUserInfo(response.data);
          this.openInformationDialog("Your data was successfully saved!");
          this.$router.push("/adm");
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status === 400) {
          this.openInformationDialog(error.response.data);
        } else if (error.response.status === 406) {
          this.openInformationDialog(error.response.data);
        }
      }
    },

    updateUserInfo(business) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      userInfo.business_id = business.id;
      userInfo.company_name = business.company_name;
      userInfo.packages = [business.choosen_package];
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    },

    async postEditBusinessDetails() {
      try {
        const data = this.businessDetails;
        this.loaderStore.openLoadingDialog("Loading...");
        const response = await axios.post("/business/update", data);
        if (response.status === 200) {
          this.fetchBusinessDetails();
          this.loaderStore.closeLoadingDialog();
          this.openInformationDialog("Your data was successfully saved!");
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status === 404) {
          this.openInformationDialog(error.response.data);
        } else if (error.response.status === 403) {
          this.openInformationDialog(error.response.data);
        } else if (error.response.status === 406) {
          this.openInformationDialog(error.response.data);
        }
      }
    },

    async postCreateTradingHours() {
      try {
        let data = {
          be_placed: this.tradingHoursValue.be_placed,
          trading: [
            {
              type: "kerbside",
              monday_open: this.tradingHoursValue.trading[0].monday_open,
              monday_close: this.tradingHoursValue.trading[0].monday_close,
              tuesday_open: this.tradingHoursValue.trading[0].tuesday_open,
              tuesday_close: this.tradingHoursValue.trading[0].tuesday_close,
              wednesday_open: this.tradingHoursValue.trading[0].wednesday_open,
              wednesday_close:
                this.tradingHoursValue.trading[0].wednesday_close,
              thursday_open: this.tradingHoursValue.trading[0].thursday_open,
              thursday_close: this.tradingHoursValue.trading[0].thursday_close,
              friday_open: this.tradingHoursValue.trading[0].friday_open,
              friday_close: this.tradingHoursValue.trading[0].friday_close,
              saturday_open: this.tradingHoursValue.trading[0].saturday_open,
              saturday_close: this.tradingHoursValue.trading[0].saturday_close,
              sunday_open: this.tradingHoursValue.trading[0].sunday_open,
              sunday_close: this.tradingHoursValue.trading[0].sunday_close,
            },
            {
              type: "delivery",
              monday_open: this.tradingHoursValue.trading[1].monday_open,
              monday_close: this.tradingHoursValue.trading[1].monday_close,
              tuesday_open: this.tradingHoursValue.trading[1].tuesday_open,
              tuesday_close: this.tradingHoursValue.trading[1].tuesday_close,
              wednesday_open: this.tradingHoursValue.trading[1].wednesday_open,
              wednesday_close:
                this.tradingHoursValue.trading[1].wednesday_close,
              thursday_open: this.tradingHoursValue.trading[1].thursday_open,
              thursday_close: this.tradingHoursValue.trading[1].thursday_close,
              friday_open: this.tradingHoursValue.trading[1].friday_open,
              friday_close: this.tradingHoursValue.trading[1].friday_close,
              saturday_open: this.tradingHoursValue.trading[1].saturday_open,
              saturday_close: this.tradingHoursValue.trading[1].saturday_close,
              sunday_open: this.tradingHoursValue.trading[1].sunday_open,
              sunday_close: this.tradingHoursValue.trading[1].sunday_close,
            },
            {
              type: "dinein",
              monday_open: this.tradingHoursValue.trading[2].monday_open,
              monday_close: this.tradingHoursValue.trading[2].monday_close,
              tuesday_open: this.tradingHoursValue.trading[2].tuesday_open,
              tuesday_close: this.tradingHoursValue.trading[2].tuesday_close,
              wednesday_open: this.tradingHoursValue.trading[2].wednesday_open,
              wednesday_close:
                this.tradingHoursValue.trading[2].wednesday_close,
              thursday_open: this.tradingHoursValue.trading[2].thursday_open,
              thursday_close: this.tradingHoursValue.trading[2].thursday_close,
              friday_open: this.tradingHoursValue.trading[2].friday_open,
              friday_close: this.tradingHoursValue.trading[2].friday_close,
              saturday_open: this.tradingHoursValue.trading[2].saturday_open,
              saturday_close: this.tradingHoursValue.trading[2].saturday_close,
              sunday_open: this.tradingHoursValue.trading[2].sunday_open,
              sunday_close: this.tradingHoursValue.trading[2].sunday_close,
            },
            {
              type: "pickup",
              monday_open: this.tradingHoursValue.trading[3].monday_open,
              monday_close: this.tradingHoursValue.trading[3].monday_close,
              tuesday_open: this.tradingHoursValue.trading[3].tuesday_open,
              tuesday_close: this.tradingHoursValue.trading[3].tuesday_close,
              wednesday_open: this.tradingHoursValue.trading[3].wednesday_open,
              wednesday_close:
                this.tradingHoursValue.trading[3].wednesday_close,
              thursday_open: this.tradingHoursValue.trading[3].thursday_open,
              thursday_close: this.tradingHoursValue.trading[3].thursday_close,
              friday_open: this.tradingHoursValue.trading[3].friday_open,
              friday_close: this.tradingHoursValue.trading[3].friday_close,
              saturday_open: this.tradingHoursValue.trading[3].saturday_open,
              saturday_close: this.tradingHoursValue.trading[3].saturday_close,
              sunday_open: this.tradingHoursValue.trading[3].sunday_open,
              sunday_close: this.tradingHoursValue.trading[3].sunday_close,
            },
          ],
        };
        this.loaderStore.openLoadingDialog("Loading...");
        const response = await axios.post("/tradinghour/create", data);
        if (response.status === 200) {
          this.loaderStore.closeLoadingDialog();
          this.openInformationDialog("Your data was successfully saved!");
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        console.log(error);
      }
    },

    async fetchTradingHours(id) {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        const response = await axios.post("/tradinghour/listByBusiness", {
          id: id,
        });
        if (response.data.trading.length !== 0) {
          this.tradingHoursValue.be_placed = response.data.be_placed;
          this.tradingHoursValue.trading[0].id = response.data.trading[0].id;
          this.tradingHoursValue.trading[0].business_id =
            response.data.trading[0].business_id;
          this.tradingHoursValue.trading[0].creator_id =
            response.data.trading[0].creator_id;
          this.tradingHoursValue.trading[0].editor_id =
            response.data.trading[0].editor_id;
          this.tradingHoursValue.trading[0].monday_open =
            response.data.trading[0].monday_open;
          this.tradingHoursValue.trading[0].monday_close =
            response.data.trading[0].monday_close;
          this.tradingHoursValue.trading[0].tuesday_open =
            response.data.trading[0].tuesday_open;
          this.tradingHoursValue.trading[0].tuesday_close =
            response.data.trading[0].tuesday_close;
          this.tradingHoursValue.trading[0].wednesday_open =
            response.data.trading[0].wednesday_open;
          this.tradingHoursValue.trading[0].wednesday_close =
            response.data.trading[0].wednesday_close;
          this.tradingHoursValue.trading[0].thursday_open =
            response.data.trading[0].thursday_open;
          this.tradingHoursValue.trading[0].thursday_close =
            response.data.trading[0].thursday_close;
          this.tradingHoursValue.trading[0].friday_open =
            response.data.trading[0].friday_open;
          this.tradingHoursValue.trading[0].friday_close =
            response.data.trading[0].friday_close;
          this.tradingHoursValue.trading[0].saturday_open =
            response.data.trading[0].saturday_open;
          this.tradingHoursValue.trading[0].saturday_close =
            response.data.trading[0].saturday_close;
          this.tradingHoursValue.trading[0].sunday_open =
            response.data.trading[0].sunday_open;
          this.tradingHoursValue.trading[0].sunday_close =
            response.data.trading[0].sunday_close;
          this.tradingHoursValue.trading[1].id = response.data.trading[1].id;
          this.tradingHoursValue.trading[1].business_id =
            response.data.trading[1].business_id;
          this.tradingHoursValue.trading[1].creator_id =
            response.data.trading[1].creator_id;
          this.tradingHoursValue.trading[1].editor_id =
            response.data.trading[1].editor_id;
          this.tradingHoursValue.trading[1].monday_open =
            response.data.trading[1].monday_open;
          this.tradingHoursValue.trading[1].monday_close =
            response.data.trading[1].monday_close;
          this.tradingHoursValue.trading[1].tuesday_open =
            response.data.trading[1].tuesday_open;
          this.tradingHoursValue.trading[1].tuesday_close =
            response.data.trading[1].tuesday_close;
          this.tradingHoursValue.trading[1].wednesday_open =
            response.data.trading[1].wednesday_open;
          this.tradingHoursValue.trading[1].wednesday_close =
            response.data.trading[1].wednesday_close;
          this.tradingHoursValue.trading[1].thursday_open =
            response.data.trading[1].thursday_open;
          this.tradingHoursValue.trading[1].thursday_close =
            response.data.trading[1].thursday_close;
          this.tradingHoursValue.trading[1].friday_open =
            response.data.trading[1].friday_open;
          this.tradingHoursValue.trading[1].friday_close =
            response.data.trading[1].friday_close;
          this.tradingHoursValue.trading[1].saturday_open =
            response.data.trading[1].saturday_open;
          this.tradingHoursValue.trading[1].saturday_close =
            response.data.trading[1].saturday_close;
          this.tradingHoursValue.trading[1].sunday_open =
            response.data.trading[1].sunday_open;
          this.tradingHoursValue.trading[1].sunday_close =
            response.data.trading[1].sunday_close;
          this.tradingHoursValue.trading[2].id = response.data.trading[2].id;
          this.tradingHoursValue.trading[2].business_id =
            response.data.trading[2].business_id;
          this.tradingHoursValue.trading[2].creator_id =
            response.data.trading[2].creator_id;
          this.tradingHoursValue.trading[2].editor_id =
            response.data.trading[2].editor_id;
          this.tradingHoursValue.trading[2].monday_open =
            response.data.trading[2].monday_open;
          this.tradingHoursValue.trading[2].monday_close =
            response.data.trading[2].monday_close;
          this.tradingHoursValue.trading[2].tuesday_open =
            response.data.trading[2].tuesday_open;
          this.tradingHoursValue.trading[2].tuesday_close =
            response.data.trading[2].tuesday_close;
          this.tradingHoursValue.trading[2].wednesday_open =
            response.data.trading[2].wednesday_open;
          this.tradingHoursValue.trading[2].wednesday_close =
            response.data.trading[2].wednesday_close;
          this.tradingHoursValue.trading[2].thursday_open =
            response.data.trading[2].thursday_open;
          this.tradingHoursValue.trading[2].thursday_close =
            response.data.trading[2].thursday_close;
          this.tradingHoursValue.trading[2].friday_open =
            response.data.trading[2].friday_open;
          this.tradingHoursValue.trading[2].friday_close =
            response.data.trading[2].friday_close;
          this.tradingHoursValue.trading[2].saturday_open =
            response.data.trading[2].saturday_open;
          this.tradingHoursValue.trading[2].saturday_close =
            response.data.trading[2].saturday_close;
          this.tradingHoursValue.trading[2].sunday_open =
            response.data.trading[2].sunday_open;
          this.tradingHoursValue.trading[2].sunday_close =
            response.data.trading[2].sunday_close;
          this.tradingHoursValue.trading[3].id = response.data.trading[3].id;
          this.tradingHoursValue.trading[3].business_id =
            response.data.trading[3].business_id;
          this.tradingHoursValue.trading[3].creator_id =
            response.data.trading[3].creator_id;
          this.tradingHoursValue.trading[3].editor_id =
            response.data.trading[3].editor_id;
          this.tradingHoursValue.trading[3].monday_open =
            response.data.trading[3].monday_open;
          this.tradingHoursValue.trading[3].monday_close =
            response.data.trading[3].monday_close;
          this.tradingHoursValue.trading[3].tuesday_open =
            response.data.trading[3].tuesday_open;
          this.tradingHoursValue.trading[3].tuesday_close =
            response.data.trading[3].tuesday_close;
          this.tradingHoursValue.trading[3].wednesday_open =
            response.data.trading[3].wednesday_open;
          this.tradingHoursValue.trading[3].wednesday_close =
            response.data.trading[3].wednesday_close;
          this.tradingHoursValue.trading[3].thursday_open =
            response.data.trading[3].thursday_open;
          this.tradingHoursValue.trading[3].thursday_close =
            response.data.trading[3].thursday_close;
          this.tradingHoursValue.trading[3].friday_open =
            response.data.trading[3].friday_open;
          this.tradingHoursValue.trading[3].friday_close =
            response.data.trading[3].friday_close;
          this.tradingHoursValue.trading[3].saturday_open =
            response.data.trading[3].saturday_open;
          this.tradingHoursValue.trading[3].saturday_close =
            response.data.trading[3].saturday_close;
          this.tradingHoursValue.trading[3].sunday_open =
            response.data.trading[3].sunday_open;
          this.tradingHoursValue.trading[3].sunday_close =
            response.data.trading[3].sunday_close;
          this.loaderStore.closeLoadingDialog();
        } else {
          this.loaderStore.closeLoadingDialog();
          this.tradingHoursLength = 0;
        }
      } catch (error) {
        // console.log(error);
        this.loaderStore.closeLoadingDialog();
        if (error.response === 400) {
          this.openInformationDialog(error.response.data);
        }
      }
    },

    async postEditTradingHours() {
      try {
        let data = {
          be_placed: this.tradingHoursValue.be_placed,
          trading: [
            {
              type: "kerbside",
              id: this.tradingHoursValue.trading[0].id,
              business_id: this.tradingHoursValue.trading[0].business_id,
              creator_id: this.tradingHoursValue.trading[0].creator_id,
              editor_id: this.tradingHoursValue.trading[0].editor_id,
              monday_open: this.tradingHoursValue.trading[0].monday_open,
              monday_close: this.tradingHoursValue.trading[0].monday_close,
              tuesday_open: this.tradingHoursValue.trading[0].tuesday_open,
              tuesday_close: this.tradingHoursValue.trading[0].tuesday_close,
              wednesday_open: this.tradingHoursValue.trading[0].wednesday_open,
              wednesday_close:
                this.tradingHoursValue.trading[0].wednesday_close,
              thursday_open: this.tradingHoursValue.trading[0].thursday_open,
              thursday_close: this.tradingHoursValue.trading[0].thursday_close,
              friday_open: this.tradingHoursValue.trading[0].friday_open,
              friday_close: this.tradingHoursValue.trading[0].friday_close,
              saturday_open: this.tradingHoursValue.trading[0].saturday_open,
              saturday_close: this.tradingHoursValue.trading[0].saturday_close,
              sunday_open: this.tradingHoursValue.trading[0].sunday_open,
              sunday_close: this.tradingHoursValue.trading[0].sunday_close,
            },
            {
              type: "delivery",
              id: this.tradingHoursValue.trading[1].id,
              business_id: this.tradingHoursValue.trading[1].business_id,
              creator_id: this.tradingHoursValue.trading[1].creator_id,
              editor_id: this.tradingHoursValue.trading[1].editor_id,
              monday_open: this.tradingHoursValue.trading[1].monday_open,
              monday_close: this.tradingHoursValue.trading[1].monday_close,
              tuesday_open: this.tradingHoursValue.trading[1].tuesday_open,
              tuesday_close: this.tradingHoursValue.trading[1].tuesday_close,
              wednesday_open: this.tradingHoursValue.trading[1].wednesday_open,
              wednesday_close:
                this.tradingHoursValue.trading[1].wednesday_close,
              thursday_open: this.tradingHoursValue.trading[1].thursday_open,
              thursday_close: this.tradingHoursValue.trading[1].thursday_close,
              friday_open: this.tradingHoursValue.trading[1].friday_open,
              friday_close: this.tradingHoursValue.trading[1].friday_close,
              saturday_open: this.tradingHoursValue.trading[1].saturday_open,
              saturday_close: this.tradingHoursValue.trading[1].saturday_close,
              sunday_open: this.tradingHoursValue.trading[1].sunday_open,
              sunday_close: this.tradingHoursValue.trading[1].sunday_close,
            },
            {
              type: "dinein",
              id: this.tradingHoursValue.trading[2].id,
              business_id: this.tradingHoursValue.trading[2].business_id,
              creator_id: this.tradingHoursValue.trading[2].creator_id,
              editor_id: this.tradingHoursValue.trading[2].editor_id,
              monday_open: this.tradingHoursValue.trading[2].monday_open,
              monday_close: this.tradingHoursValue.trading[2].monday_close,
              tuesday_open: this.tradingHoursValue.trading[2].tuesday_open,
              tuesday_close: this.tradingHoursValue.trading[2].tuesday_close,
              wednesday_open: this.tradingHoursValue.trading[2].wednesday_open,
              wednesday_close:
                this.tradingHoursValue.trading[2].wednesday_close,
              thursday_open: this.tradingHoursValue.trading[2].thursday_open,
              thursday_close: this.tradingHoursValue.trading[2].thursday_close,
              friday_open: this.tradingHoursValue.trading[2].friday_open,
              friday_close: this.tradingHoursValue.trading[2].friday_close,
              saturday_open: this.tradingHoursValue.trading[2].saturday_open,
              saturday_close: this.tradingHoursValue.trading[2].saturday_close,
              sunday_open: this.tradingHoursValue.trading[2].sunday_open,
              sunday_close: this.tradingHoursValue.trading[2].sunday_close,
            },
            {
              type: "pickup",
              id: this.tradingHoursValue.trading[3].id,
              business_id: this.tradingHoursValue.trading[3].business_id,
              creator_id: this.tradingHoursValue.trading[3].creator_id,
              editor_id: this.tradingHoursValue.trading[3].editor_id,
              monday_open: this.tradingHoursValue.trading[3].monday_open,
              monday_close: this.tradingHoursValue.trading[3].monday_close,
              tuesday_open: this.tradingHoursValue.trading[3].tuesday_open,
              tuesday_close: this.tradingHoursValue.trading[3].tuesday_close,
              wednesday_open: this.tradingHoursValue.trading[3].wednesday_open,
              wednesday_close:
                this.tradingHoursValue.trading[3].wednesday_close,
              thursday_open: this.tradingHoursValue.trading[3].thursday_open,
              thursday_close: this.tradingHoursValue.trading[3].thursday_close,
              friday_open: this.tradingHoursValue.trading[3].friday_open,
              friday_close: this.tradingHoursValue.trading[3].friday_close,
              saturday_open: this.tradingHoursValue.trading[3].saturday_open,
              saturday_close: this.tradingHoursValue.trading[3].saturday_close,
              sunday_open: this.tradingHoursValue.trading[3].sunday_open,
              sunday_close: this.tradingHoursValue.trading[3].sunday_close,
            },
          ],
        };
        this.loaderStore.openLoadingDialog("Loading...");
        const response = await axios.post("tradinghour/update", data);
        if (response.status === 200) {
          this.loaderStore.closeLoadingDialog();
          this.openInformationDialog("Your data was successfully saved!");
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        // if (error.response.status === 400) {
        //   this.openInformationDialog(error.response.data);
        // } else if (error.response.status === 406) {
        //   console.log(error.response.data);
        // }
        console.log(error);
      }
    },

    async fetchPosSessions(id) {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        const response1 = await axios.post("/pos/listByBusinessId", { id: id });
        if (response1.status === 200) {
          this.loaderStore.closeLoadingDialog();
        }
        this.posSessionsFetch = response1.data;
        for (let i = 0; i < this.posSessionsFetch.length; i++) {
          this.mandatoryFieldBoxPos.push({
            name: false,
            users: false,
            function: false,
            hardware_type: false,
            printer_type: false,
            ip_address: false,
            payment_methods: false,
            session_color: false,
            isUserMandatoryMin1: false,
            showFillNotification: false,
            showMin1Notification: false,
          });
        }
        const response2 = await axios.post("/pos/listByBusinessId");
        this.posSessionDefault = response2.data;
        this.posSessionsFetchLength = response1.data.length;
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status === 400) {
          this.openInformationDialog(error.response.data);
        }
      }
    },

    async postCreatePos() {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        let data = this.posSessionsAdd;
        for (let i = 0; i < data.length; i++) {
          if (data[i].printer_type === "") {
            data[i].printer_type = "N/A";
          }
          if (data[i].ip_address === "") {
            data[i].ip_address = "N/A";
          }
        }
        const response = await axios.post("/pos/create", data);
        if (response.status === 200) {
          this.loaderStore.closeLoadingDialog();
          useStoreStore().$reset();
          this.fetchPosSessions();
          this.openInformationDialog("Your data was successfully saved!");
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status === 406) {
          this.openInformationDialog(error.response.data);
        }
      }
    },

    async postUpdatePos() {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        let data = this.posSessionsFetch;
        for (let i = 0; i < data.length; i++) {
          if (data[i].printer_type === "") {
            data[i].printer_type = "N/A";
          }
          if (data[i].ip_address === "") {
            data[i].ip_address = "N/A";
          }
        }

        const response = await axios.post("/pos/update", data);
        if (response.status === 200) {
          this.loaderStore.closeLoadingDialog();
          this.fetchPosSessions();
          this.openInformationDialog("Your data was successfully saved!");
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status === 400) {
          this.openInformationDialog(error.response.data);
        } else if (error.response.status === 406) {
          this.openInformationDialog(error.response.data);
        }
      }
    },

    async postDeletePos(id) {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        const response = await axios.post("/pos/delete", { id });
        if (response.status === 200) {
          this.loaderStore.closeLoadingDialog();
          this.fetchPosSessions();
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status === 404) {
          this.openInformationDialog(error.response.data);
        } else if (error.response.status === 406) {
          this.openInformationDialog(error.response.data);
        }
      }
    },

    async fetchDelivery(id) {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        const response = await axios.post("/delivery/find", { id: id });
        if (response.status === 200) {
          this.deliveryDetails = response.data;
          this.loaderStore.closeLoadingDialog();
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        console.log(error.response.data);
      }
    },

    async postCreateDelivery() {
      try {
        let data = this.deliveryDetails;
        this.loaderStore.openLoadingDialog("Loading...");
        const response = await axios.post("/delivery/create", data);
        if (response.status === 200) {
          this.loaderStore.closeLoadingDialog();
          this.openInformationDialog("Your data was successfully saved!");
          this.fetchDeliverySessions();
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status === 406) {
          this.openInformationDialog(error.response.data);
        }
      }
    },

    async postUpdateDelivery() {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        let data = this.deliveryDetails;
        const response = await axios.post("/delivery/update", data);
        if (response.status === 200) {
          this.loaderStore.closeLoadingDialog();
          this.openInformationDialog("Your data was successfully saved!");
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status === 404) {
          this.openInformationDialog(error.response.data);
        }
      }
    },

    async fetchTableBookings(id) {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        const response1 = await axios.post("/booking/list", { id: id });
        if (response1.status === 200) {
          this.tableBookingsList = response1.data;
          this.loaderStore.closeLoadingDialog();
        }
        for (let i = 0; i < this.tableBookingsList.length; i++) {
          this.mandatoryFieldBoxTableBooking.push({
            tables_name: false,
            seat: false,
          });
        }
        const response2 = await axios.post("/booking/list", { id: id });
        this.tableBookingsDefault = response2.data;
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status === 400) {
          this.openInformationDialog(error.response.data);
        }
      }
    },

    async postCreateTableBookings() {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        let data = this.tableBookingsAdd;
        const response = await axios.post("/booking/create", data);
        if (response.status === 200) {
          this.loaderStore.closeLoadingDialog();
          this.tableBookingsAdd = [];
          this.openInformationDialog("Your data was successfully saved!");
          this.fetchTableBookings();
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status === 400) {
          this.openInformationDialog(error.response.data);
        } else if (error.response.status === 406) {
          this.openInformationDialog(error.response.data);
        }
      }
    },

    async postUpdateTableBookings() {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        let data = this.tableBookingsList;
        const response = await axios.post("/booking/update", data);
        if (response.status === 200) {
          this.loaderStore.closeLoadingDialog();
          this.openInformationDialog("Your data was successfully saved!");
          this.fetchTableBookings();
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status === 400) {
          this.openInformationDialog(error.response.data);
        } else if (error.response.status === 403) {
          this.openInformationDialog(error.response.data);
        } else if (error.response.status === 404) {
          this.openInformationDialog(error.response.data);
        } else if (error.response.status === 406) {
          this.openInformationDialog(error.response.data);
        }
      }
    },

    async postDeleteTableBookings(id) {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        const response = await axios.post("/booking/delete", { id });
        if (response.status === 200) {
          this.fetchTableBookings();
          this.loaderStore.closeLoadingDialog();
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status === 400) {
          this.openInformationDialog(error.response.data);
        } else if (error.response.status === 403) {
          this.openInformationDialog(error.response.data);
        } else if (error.response.status === 404) {
          this.openInformationDialog(error.response.data);
        }
      }
    },

    async fetchEmployees(id) {
      try {
        this.loadTheData = true;
        const response = await axios.post("/employee/list", { id: id });
        if (response.status === 200) {
          this.employeeList = response.data;
          this.loadTheData = false;
        }
      } catch (error) {
        this.loadTheData = false;
        console.log(error.response.data);
      }
    },

    async setEmployeeDetails(props) {
      localStorage.setItem("employeeDetails", JSON.stringify(props));
      this.employeeDetails = JSON.parse(
        localStorage.getItem("employeeDetails")
      );
    },

    async postCreateEmployee() {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        let data = this.employeeDetails;
        const response = await axios.post("/employee/create", data);
        if (response.status === 200) {
          this.loaderStore.closeLoadingDialog();
          useStoreStore().$reset();
          this.openInformationDialog("Your data was successfully saved!");
          localStorage.removeItem("employeeDetails");
          this.$router.push("/adminStoreEmployees");
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status === 406) {
          this.openInformationDialog(error.response.data);
        } else if (error.response.status === 400) {
          this.openInformationDialog(error.response.data);
        }
      }
    },

    async postEditEmployee() {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        let data = this.employeeDetails;
        const response = await axios.post("/employee/update", data);
        if (response.status === 200) {
          this.loaderStore.closeLoadingDialog();
          this.openInformationDialog("Your data was successfully saved!");
          localStorage.removeItem("employeeDetails");
          this.$router.push("/adminStoreEmployees");
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status === 400) {
          this.openInformationDialog(error.response.data);
        } else if (error.response.status === 403) {
          this.openInformationDialog(error.response.data);
        }
      }
    },

    async postDeleteEmployee(id) {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        const response = await axios.post("/employee/delete", { id });
        if (response.status === 200) {
          this.loaderStore.closeLoadingDialog();
          this.fetchEmployees();
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status === 406) {
          this.openInformationDialog(error.response.data);
        }
      }
    },

    async postFetchVendors(id) {
      try {
        this.loadTheData = true;
        const response = await axios.post("/vendor/list", { id: id });
        if (response.status === 200) {
          this.loadTheData = false;
          this.vendorList = response.data;
        }
      } catch (error) {
        this.loadTheData = false;
        console.log(error.response.data);
      }
    },

    async setVendorDetails(props) {
      localStorage.setItem("vendorDetails", JSON.stringify(props));
      this.vendorDetails = JSON.parse(localStorage.getItem("vendorDetails"));
    },

    async postCreateVendor() {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        let data = this.vendorDetails;
        const response = await axios.post("/vendor/create", data);
        if (response.status === 200) {
          useStoreStore().$reset();
          localStorage.removeItem("vendorDetails");
          this.$router.push("/adminStoreVendors");
          this.loaderStore.closeLoadingDialog();
          this.openInformationDialog("Your data was successfully saved!");
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status === 406) {
          this.openInformationDialog(
            "This vendor is already exists! Please input another vendor's name."
          );
        }
      }
    },

    async postEditVendor() {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        let data = this.vendorDetails;
        const response = await axios.post("/vendor/update", data);
        if (response.status === 200) {
          this.openInformationDialog("Your data was successfully saved!");
          this.loaderStore.closeLoadingDialog();
          localStorage.removeItem("vendorDetails");
          this.$router.push("/adminStoreVendors");
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status === 400) {
          this.openInformationDialog(error.response.data);
        } else if (error.response.status === 404) {
          this.openInformationDialog(
            "This vendor is already exists! Please input another vendor's name."
          );
        } else if (error.response.status === 406) {
          this.openInformationDialog(error.response.data);
        }
      }
    },

    async postDeleteVendor(id) {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        const response = await axios.post("/vendor/delete", { id });
        if (response.status === 200) {
          this.postFetchVendors();
          this.loaderStore.closeLoadingDialog();
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status === 404) {
          this.openInformationDialog(error.response.data);
        }
      }
    },

    async postFetchAccounting(id) {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        const response = await axios.post("/accounting/find", { id: id });
        if (response.status == 200 && response.data.id) {
          this.accountingList = response.data;
        }
        this.loaderStore.closeLoadingDialog();
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
      }
    },

    checkTaxValue() {
      let isValidTaxValue = false;
      let valueSalesTax = this.accountingList.salestax;
      let valuePurchaseTax = this.accountingList.purchasetax;
      if (valueSalesTax < 0 || valuePurchaseTax < 0) {
        isValidTaxValue = true;
        return isValidTaxValue;
      } else {
        isValidTaxValue = false;
        return isValidTaxValue;
      }
    },

    async postCreateAccounting() {
      if (this.checkTaxValue()) {
        this.openInformationDialog(
          "Please enter a number greater than or equal to 0"
        );
      } else {
        try {
          this.loaderStore.openLoadingDialog("Loading...");
          let data = this.accountingList;
          data.salestax = +data.salestax;
          data.purchasetax = +data.purchasetax;
          const response = await axios.post("/accounting/create", data);
          if (response.status === 200) {
            this.loaderStore.closeLoadingDialog();
            this.postFetchAccounting();
            this.openInformationDialog("Your data was successfully saved!");
            this.$router.push("/adminStoreAccounting");
          }
        } catch (error) {
          this.loaderStore.closeLoadingDialog();
          if (error.response.status === 406) {
            this.openInformationDialog(error.response.data);
          }
        }
      }
    },

    async postEditAccounting() {
      if (this.checkTaxValue()) {
        this.openInformationDialog(
          "Please enter a number greater than or equal to 0"
        );
      } else {
        try {
          this.loaderStore.openLoadingDialog("Loading...");
          let data = this.accountingList;
          data.salestax = +data.salestax;
          data.purchasetax = +data.purchasetax;
          const response = await axios.post("/accounting/update", data);
          if (response.status === 200) {
            this.loaderStore.closeLoadingDialog();
            this.postFetchAccounting();
            this.openInformationDialog("Your data was successfully saved!");
          }
        } catch (error) {
          this.loaderStore.closeLoadingDialog();
          if (error.response.status === 400) {
            this.openInformationDialog(error.response.data);
          } else if (error.response.status === 404) {
            this.openInformationDialog(error.response.data);
          }
        }
      }
    },

    async getFetchStockLocation(id) {
      try {
        this.loadTheData = true;
        const response = await axios.post("/location/list", { id: id });
        if (response.status === 200) {
          for (let i = 0; i < response.data.length; i++) {
            const e = response.data[i];
            if (e.is_return === true) {
              e.is_return = "Yes";
            } else {
              e.is_return = "No";
            }

            if (e.is_scrap === true) {
              e.is_scrap = "Yes";
            } else {
              e.is_scrap = "No";
            }
          }
          this.stockLocationList = response.data;
          this.loadTheData = false;
        }
      } catch (error) {
        this.loadTheData = false;
        console.log(error.response.data);
      }
    },

    async setStockLocationDetails(props) {
      if (props.is_return === "Yes") {
        props.is_return = true;
      } else {
        props.is_return = false;
      }

      if (props.is_scrap === "Yes") {
        props.is_scrap = true;
      } else {
        props.is_scrap = false;
      }
      localStorage.setItem("stockLocationDetails", JSON.stringify(props));
      this.stockLocationDetails = JSON.parse(
        localStorage.getItem("stockLocationDetails")
      );
    },

    async postCreateStockLocation() {
      try {
        this.loaderStore.openLoadingDialog();
        let data = this.stockLocationDetails;
        const response = await axios.post("/location/create", [data]);
        if (response.status === 200) {
          this.loaderStore.closeLoadingDialog();
          useStoreStore().$reset();
          this.openInformationDialog("Your data was successfully saved!");
          localStorage.removeItem("stockLocationDetails");
          this.$router.push("/adminStoreStock");
        }
      } catch (error) {
        if (error.response.status === 406) {
          this.loaderStore.closeLoadingDialog();
          this.openInformationDialog(
            "This stock is already exists! Please choose different stock name."
          );
        }
      }
    },

    async postEditStockLocation() {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        let data = this.stockLocationDetails;
        const response = await axios.post("/location/update", [data]);
        if (response.status === 200) {
          this.loaderStore.closeLoadingDialog();
          localStorage.removeItem("stockLocationDetails");
          this.$router.push("/adminStoreStock");
          this.openInformationDialog("Your data was successfully saved!");
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status === 400) {
          this.openInformationDialog(error.response.data);
        } else if (error.response.status === 406) {
          this.openInformationDialog(
            "This stock is already exists! Please choose different stock name."
          );
        }
      }
    },

    async postDeleteStockLocation(id) {
      try {
        this.loaderStore.openLoadingDialog("Loading...");
        const response = await axios.post("/location/delete", { id });
        if (response.status === 200) {
          this.loaderStore.closeLoadingDialog();
          this.getFetchStockLocation();
        }
      } catch (error) {
        this.loaderStore.closeLoadingDialog();
        if (error.response.status === 400) {
          this.openInformationDialog(error.response.data);
        }
      }
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

    checkMandatoryFieldsDetails() {
      if (this.businessDetails.restaurant_name === "") {
        this.mandatoryFieldBoxDetails.restaurant_name = true;
      } else {
        this.mandatoryFieldBoxDetails.restaurant_name = false;
      }

      if (this.businessDetails.company_name === "") {
        this.mandatoryFieldBoxDetails.company_name = true;
      } else {
        this.mandatoryFieldBoxDetails.company_name = false;
      }
      if (this.businessDetails.address === "") {
        this.mandatoryFieldBoxDetails.address = true;
      } else {
        this.mandatoryFieldBoxDetails.address = false;
      }
      if (this.businessDetails.phone_number === "") {
        this.mandatoryFieldBoxDetails.phone_number = true;
      } else {
        this.mandatoryFieldBoxDetails.phone_number = false;
      }
      if (this.businessDetails.email === "") {
        this.mandatoryFieldBoxDetails.email = true;
      } else {
        this.mandatoryFieldBoxDetails.email = false;
      }
      if (this.businessDetails.abn === "") {
        this.mandatoryFieldBoxDetails.abn = true;
      } else {
        this.mandatoryFieldBoxDetails.abn = false;
      }
    },

    checkMandatoryFieldsTradingHours() {
      if (
        this.tradingHoursValue.be_placed === "" ||
        this.tradingHoursValue.be_placed === null
      ) {
        this.mandatoryFieldBoxTradingHours.be_placed = true;
      } else {
        this.mandatoryFieldBoxTradingHours.be_placed = false;
      }
    },

    checkMandatoryFieldsPos() {
      this.posSessionsFetch.forEach((e, i) => {
        if (e.users.length !== 0) {
          for (let x = 0; x < e.users.length; x++) {
            if (
              e.users[x].name === "" ||
              e.users[x].email === "" ||
              e.users[x].password === ""
            ) {
              this.mandatoryFieldBoxPos[i].users = true;
              this.mandatoryFieldBoxPos[i].showFillNotification = true;
              this.mandatoryFieldBoxPos[i].showMin1Notification = false;
              break;
            } else {
              this.mandatoryFieldBoxPos[i].users = false;
              this.mandatoryFieldBoxPos[i].showFillNotification = false;
            }
          }
        } else {
          this.mandatoryFieldBoxPos[i].isUserMandatoryMin1 = true;
          this.mandatoryFieldBoxPos[i].showMin1Notification = true;
          this.mandatoryFieldBoxPos[i].showFillNotification = false;
        }

        if (e.name === "") {
          this.mandatoryFieldBoxPos[i].name = true;
        } else {
          this.mandatoryFieldBoxPos[i].name = false;
        }
        if (e.function === "" || e.function === null) {
          this.mandatoryFieldBoxPos[i].function = true;
        } else {
          this.mandatoryFieldBoxPos[i].function = false;
        }
        if (e.hardware_type === "" || e.hardware_type === null) {
          this.mandatoryFieldBoxPos[i].hardware_type = true;
        } else {
          this.mandatoryFieldBoxPos[i].hardware_type = false;
        }
        if (e.printer_type === "") {
          this.mandatoryFieldBoxPos[i].printer_type = true;
        } else {
          this.mandatoryFieldBoxPos[i].printer_type = false;
        }
        if (e.ip_address === "") {
          this.mandatoryFieldBoxPos[i].ip_address = true;
        } else {
          this.mandatoryFieldBoxPos[i].ip_address = false;
        }
        if (e.payment_methods === "" || e.payment_methods === null) {
          this.mandatoryFieldBoxPos[i].payment_methods = true;
        } else {
          this.mandatoryFieldBoxPos[i].payment_methods = false;
        }
        if (e.session_color === "") {
          this.mandatoryFieldBoxPos[i].session_color = true;
        } else {
          this.mandatoryFieldBoxPos[i].session_color = false;
        }
      });
    },

    checkMandatoryFieldsPosAdd() {
      this.posSessionsAdd.forEach((e, i) => {
        if (e.users.length !== 0) {
          for (let x = 0; x < e.users.length; x++) {
            if (
              e.users[x].name === "" ||
              e.users[x].email === "" ||
              e.users[x].password === ""
            ) {
              this.mandatoryFieldBoxPosAdd[i].users = true;
              this.mandatoryFieldBoxPosAdd[i].showFillNotification = true;
              this.mandatoryFieldBoxPosAdd[i].showMin1Notification = false;
              break;
            } else {
              this.mandatoryFieldBoxPosAdd[i].users = false;
              this.mandatoryFieldBoxPosAdd[i].showFillNotification = false;
            }
          }
        } else {
          this.mandatoryFieldBoxPosAdd[i].isUserMandatoryMin1 = true;
          this.mandatoryFieldBoxPosAdd[i].showMin1Notification = true;
          this.mandatoryFieldBoxPosAdd[i].showFillNotification = false;
        }

        if (e.name === "") {
          this.mandatoryFieldBoxPosAdd[i].name = true;
        } else {
          this.mandatoryFieldBoxPosAdd[i].name = false;
        }
        if (e.function === "" || e.function === null) {
          this.mandatoryFieldBoxPosAdd[i].function = true;
        } else {
          this.mandatoryFieldBoxPosAdd[i].function = false;
        }
        if (e.hardware_type === "" || e.hardware_type === null) {
          this.mandatoryFieldBoxPosAdd[i].hardware_type = true;
        } else {
          this.mandatoryFieldBoxPosAdd[i].hardware_type = false;
        }
        if (e.printer_type === "") {
          this.mandatoryFieldBoxPosAdd[i].printer_type = true;
        } else {
          this.mandatoryFieldBoxPosAdd[i].printer_type = false;
        }
        if (e.ip_address === "") {
          this.mandatoryFieldBoxPosAdd[i].ip_address = true;
        } else {
          this.mandatoryFieldBoxPosAdd[i].ip_address = false;
        }
        if (e.payment_methods === "" || e.payment_methods === null) {
          this.mandatoryFieldBoxPosAdd[i].payment_methods = true;
        } else {
          this.mandatoryFieldBoxPosAdd[i].payment_methods = false;
        }
        if (e.session_color === "") {
          this.mandatoryFieldBoxPosAdd[i].session_color = true;
        } else {
          this.mandatoryFieldBoxPosAdd[i].session_color = false;
        }
      });
    },

    checkMandatoryFieldsDelivery() {
      if (this.deliveryDetails.is_provider === null) {
        this.mandatoryFieldBoxDelivery.is_provider = true;
      } else {
        this.mandatoryFieldBoxDelivery.is_provider = false;
      }
      if (this.deliveryDetails.promised_time === "") {
        this.mandatoryFieldBoxDelivery.promised_time = true;
      } else {
        this.mandatoryFieldBoxDelivery.promised_time = false;
      }
      if (this.deliveryDetails.actual_time === "") {
        this.mandatoryFieldBoxDelivery.actual_time = true;
      } else {
        this.mandatoryFieldBoxDelivery.actual_time = false;
      }
      if (this.deliveryDetails.is_owndriver === null) {
        this.mandatoryFieldBoxDelivery.is_owndriver = true;
      } else {
        this.mandatoryFieldBoxDelivery.is_owndriver = false;
      }
      if (this.deliveryDetails.is_outsource === null) {
        this.mandatoryFieldBoxDelivery.is_outsource = true;
      } else {
        this.mandatoryFieldBoxDelivery.is_outsource = false;
      }
      if (this.deliveryDetails.third_party === "") {
        this.mandatoryFieldBoxDelivery.third_party = true;
      } else {
        this.mandatoryFieldBoxDelivery.third_party = false;
      }
      if (this.deliveryDetails.distance === "") {
        this.mandatoryFieldBoxDelivery.distance = true;
      } else {
        this.mandatoryFieldBoxDelivery.distance = false;
      }
    },

    checkMandatoryFieldsTableBooking() {
      this.tableBookingsList.forEach((e, i) => {
        if (e.tables_name === "") {
          this.mandatoryFieldBoxTableBooking[i].tables_name = true;
        } else {
          this.mandatoryFieldBoxTableBooking[i].tables_name = false;
        }
        if (e.seat === null || e.seat === "") {
          this.mandatoryFieldBoxTableBooking[i].seat = true;
        } else {
          this.mandatoryFieldBoxTableBooking[i].seat = false;
        }
      });
    },

    checkMandatoryFieldsTableBookingAdd() {
      this.tableBookingsAdd.forEach((e, i) => {
        if (e.tables_name === "") {
          this.mandatoryFieldBoxTableBookingAdd[i].tables_name = true;
        } else {
          this.mandatoryFieldBoxTableBookingAdd[i].tables_name = false;
        }
        if (e.seat === null || e.seat === "") {
          this.mandatoryFieldBoxTableBookingAdd[i].seat = true;
        } else {
          this.mandatoryFieldBoxTableBookingAdd[i].seat = false;
        }
      });
    },

    checkMandatoryFieldsEmployee() {
      if (this.employeeDetails.name === "") {
        this.mandatoryFieldBoxEmployee.name = true;
      } else {
        this.mandatoryFieldBoxEmployee.name = false;
      }
      if (this.employeeDetails.email === "") {
        this.mandatoryFieldBoxEmployee.email = true;
      } else {
        this.mandatoryFieldBoxEmployee.email = false;
      }
      if (this.employeeDetails.phone === "") {
        this.mandatoryFieldBoxEmployee.phone = true;
      } else {
        this.mandatoryFieldBoxEmployee.phone = false;
      }
      if (this.employeeDetails.mobile === "") {
        this.mandatoryFieldBoxEmployee.mobile = true;
      } else {
        this.mandatoryFieldBoxEmployee.mobile = false;
      }
      if (this.employeeDetails.department === "") {
        this.mandatoryFieldBoxEmployee.department = true;
      } else {
        this.mandatoryFieldBoxEmployee.department = false;
      }
      if (
        this.employeeDetails.gender === "" ||
        this.employeeDetails.gender === null
      ) {
        this.mandatoryFieldBoxEmployee.gender = true;
      } else {
        this.mandatoryFieldBoxEmployee.gender = false;
      }
      if (this.employeeDetails.dob === "") {
        this.mandatoryFieldBoxEmployee.dob = true;
      } else {
        this.mandatoryFieldBoxEmployee.dob = false;
      }
      if (
        this.employeeDetails.country === "" ||
        this.employeeDetails.country === null
      ) {
        this.mandatoryFieldBoxEmployee.country = true;
      } else {
        this.mandatoryFieldBoxEmployee.country = false;
      }
    },

    checkMandatoryFieldsVendor() {
      if (this.vendorDetails.name === "") {
        this.mandatoryFieldBoxVendor.name = true;
      } else {
        this.mandatoryFieldBoxVendor.name = false;
      }
      if (this.vendorDetails.email === "") {
        this.mandatoryFieldBoxVendor.email = true;
      } else {
        this.mandatoryFieldBoxVendor.email = false;
      }
      if (this.vendorDetails.phone === "") {
        this.mandatoryFieldBoxVendor.phone = true;
      } else {
        this.mandatoryFieldBoxVendor.phone = false;
      }
      if (this.vendorDetails.mobile === "") {
        this.mandatoryFieldBoxVendor.mobile = true;
      } else {
        this.mandatoryFieldBoxVendor.mobile = false;
      }
      if (this.vendorDetails.street === "") {
        this.mandatoryFieldBoxVendor.street = true;
      } else {
        this.mandatoryFieldBoxVendor.street = false;
      }
      if (this.vendorDetails.zip === "") {
        this.mandatoryFieldBoxVendor.zip = true;
      } else {
        this.mandatoryFieldBoxVendor.zip = false;
      }
      if (this.vendorDetails.city === "") {
        this.mandatoryFieldBoxVendor.city = true;
      } else {
        this.mandatoryFieldBoxVendor.city = false;
      }
      if (this.vendorDetails.state === "") {
        this.mandatoryFieldBoxVendor.state = true;
      } else {
        this.mandatoryFieldBoxVendor.state = false;
      }
      if (
        this.vendorDetails.country === "" ||
        this.vendorDetails.country === null
      ) {
        this.mandatoryFieldBoxVendor.country = true;
      } else {
        this.mandatoryFieldBoxVendor.country = false;
      }
    },

    checkMandatoryFieldsAccounting() {
      if (this.accountingList.salestax_code === "") {
        this.mandatoryFieldBoxAccounting.salestax_code = true;
      } else {
        this.mandatoryFieldBoxAccounting.salestax_code = false;
      }
      if (
        this.accountingList.salestax === null ||
        this.accountingList.salestax === ""
      ) {
        this.mandatoryFieldBoxAccounting.salestax = true;
      } else {
        this.mandatoryFieldBoxAccounting.salestax = false;
      }
      if (this.accountingList.purchasetax_code === "") {
        this.mandatoryFieldBoxAccounting.purchasetax_code = true;
      } else {
        this.mandatoryFieldBoxAccounting.purchasetax_code = false;
      }
      if (
        this.accountingList.purchasetax === null ||
        this.accountingList.purchasetax === ""
      ) {
        this.mandatoryFieldBoxAccounting.purchasetax = true;
      } else {
        this.mandatoryFieldBoxAccounting.purchasetax = false;
      }
      if (
        this.accountingList.currency === "" ||
        this.accountingList.currency === null
      ) {
        this.mandatoryFieldBoxAccounting.currency = true;
      } else {
        this.mandatoryFieldBoxAccounting.currency = false;
      }
    },

    checkMandatoryFieldsStockLocation() {
      if (this.stockLocationDetails.name === "") {
        this.mandatoryFieldBoxStockLocation.name = true;
      } else {
        this.mandatoryFieldBoxStockLocation.name = false;
      }
      if (
        this.stockLocationDetails.type === "" ||
        this.stockLocationDetails.type === null
      ) {
        this.mandatoryFieldBoxStockLocation.type = true;
      } else {
        this.mandatoryFieldBoxStockLocation.type = false;
      }
      if (
        this.stockLocationDetails.parent_location === "" ||
        this.stockLocationDetails.parent_location === null
      ) {
        this.mandatoryFieldBoxStockLocation.parent_location = true;
      } else {
        this.mandatoryFieldBoxStockLocation.parent_location = false;
      }
      if (
        this.stockLocationDetails.removal_strategy === "" ||
        this.stockLocationDetails.removal_strategy === null
      ) {
        this.mandatoryFieldBoxStockLocation.removal_strategy = true;
      } else {
        this.mandatoryFieldBoxStockLocation.removal_strategy = false;
      }
    },
  },
});
