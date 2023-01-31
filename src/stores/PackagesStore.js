import { defineStore } from "pinia";
import iconHome from "./../assets/img/home.svg";
import iconProducts from "./../assets/img/products.svg";
import iconLoyalty from "./../assets/img/loyalty.svg";
import iconMarketing from "./../assets/img/marketing.svg";
import iconStore from "./../assets/img/store.svg";

export const usePackagesStore = defineStore({
  id: "PackagesStore",
  state: () => ({
    packages: [],
    allSideMenuList: [
      {
        id: null,
        name: "Dashboard",
        icon: iconHome,
        link: "/adminDashboard",
      },
      {
        id: null,
        name: "Products",
        icon: iconProducts,
        link: "/adminProduct",
      },
      {
        id: 'loyalty',
        name: "Loyalty",
        icon: iconLoyalty,
        link: "/adminLoyalty",
      },
      {
        id: 'marketing',
        name: "Marketing",
        icon: iconMarketing,
        link: "/adminMarketing",
      },
      {
        id: null,
        name: "Store",
        icon: iconStore,
        link: "/adminStore",
      },
    ],
    allStoreMenuList: [
      { id: null,name: "Details", link: "/adminStoreDetails" },
      { id: 'trading',name: "Trading Hours", link: "/adminStoreTradingHours" },
      { id: 'pos',name: "POS", link: "/adminStorePos" },
      { id: 'delivery',name: "Delivery", link: "/adminStoreDelivery" },
      { id: 'booking',name: "Table Bookings", link: "/adminStoreTableBookings" },
      { id: 'employee',name: "Employees", link: "/adminStoreEmployees" },
      { id: 'vendor',name: "Vendors", link: "/adminStoreVendors" },
      { id: 'accounting',name: "Accounting", link: "/adminStoreAccounting" },
      { id: 'location',name: "Stock", link: "/adminStoreStock" },
    ],
    sideMenu: [],
    storeMenu: []
  }),
  actions: {
    alreadyLogin() {
      if (localStorage.getItem('userInfo')) {
        this.packages = JSON.parse(localStorage.getItem("userInfo")).packages[0].features;
        return true;
      } else {
        return false;
      }
    },
    compareMenu(pack, menu) {
      return pack.includes(menu);
    },
    updateSideMenu() {
      const alreadyLogin = this.alreadyLogin();
      this.sideMenu = [];
      this.allSideMenuList.forEach((menu) => {
        if (alreadyLogin && menu.id == null) {
          this.sideMenu.push(menu);
        } else if (alreadyLogin && this.compareMenu(this.packages, menu.id)) {
          this.sideMenu.push(menu);
        }
      })
    },
    updateStoreMenu() {
      const alreadyLogin = this.alreadyLogin();
      this.storeMenu = [];
      this.allStoreMenuList.forEach((menu) => {
        if (alreadyLogin && menu.id == null) {
          this.storeMenu.push(menu);
        } else if (alreadyLogin && this.compareMenu(this.packages, menu.id)) {
          this.storeMenu.push(menu);
        }
      })
    }
  },
});
