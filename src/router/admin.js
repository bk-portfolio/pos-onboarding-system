import Admin from "./../views/admin/Admin.vue";
// Admin Dashboard
import AdminDashboard from "../views/admin/dashboard/AdminDashboard.vue";
// Admin Product
import AdminProduct from "../views/admin/product/AdminProduct.vue";
import AdminProductList from "../views/admin/product/AdminProductList.vue";
import AdminProductListAddAndEdit from "../views/admin/product/AdminProductListAddAndEdit.vue";
import AdminProductManageCategory from "../views/admin/product/AdminProductManageCategory.vue";
import AdminProductManageCategoryAddAndEdit from "../views/admin/product/AdminProductManageCategoryAddAndEdit.vue";
// Admin Loyalty
import AdminLoyalty from "./../views/admin/loyalty/AdminLoyalty.vue";
import AdminLoyaltyAddAndEdit from  "./../views/admin/loyalty/AdminLoyaltyAddAndEdit.vue";
// Admin Marketing
import AdminMarketing from "./../views/admin/marketing/AdminMarketing.vue";
// Admin Store
import AdminStore from "./../views/admin/store/AdminStore.vue";
import AdminStoreDetails from "./../views/admin/store/AdminStoreDetails.vue";
import AdminStoreTradingHours from "./../views/admin/store/AdminStoreTradingHours.vue";
import AdminStorePos from "./../views/admin/store/AdminStorePos.vue";
import AdminStoreDelivery from "./../views/admin/store/AdminStoreDelivery.vue";
import AdminStoreTableBookings from "./../views/admin/store/AdminStoreTableBookings.vue";
import AdminStoreEmployees from "./../views/admin/store/AdminStoreEmployees.vue";
import AdminStoreAccounting from "./../views/admin/store/AdminStoreAccounting.vue";
import AdminStoreVendors from "./../views/admin/store/AdminStoreVendors.vue";
import AdminStoreStock from "./../views/admin/store/AdminStoreStock.vue";
import AdminStoreEmployeesAddAndEdit from "./../views/admin/store/AdminStoreEmployeesAddAndEdit.vue";
import AdminStoreVendorsAddAndEdit from "./../views/admin/store/AdminStoreVendorsAddAndEdit.vue";
import AdminStoreStockAddAndEdit from "./../views/admin/store/AdminStoreStockAddAndEdit.vue";

const routes = {
    path: "/adm",
    name: "Admin",
    component: Admin,
    redirect: {
    name: "AdminDashboard",
    },
    children: [
    {
        path: "/adminDashboard",
        name: "AdminDashboard",
        component: AdminDashboard,
    },
    {
        path: "/adminProduct",
        name: "AdminProduct",
        component: AdminProduct,
        redirect: {
        name: "AdminProductList"
        },
        children: [
        {
            path: "/adminProductList",
            name: "AdminProductList",
            component: AdminProductList,
        },
        {
            path: "/adminProductManageCategory",
            name: "AdminProductManageCategory",
            component: AdminProductManageCategory,
        },
        ]
    },
    {
        path: "/adminProductListAddAndEdit",
        name: "AdminProductListAddAndEdit",
        component: AdminProductListAddAndEdit,
    },
    {
        path: "/adminProductManageCategoryAddAndEdit",
        name: "AdminProductManageCategoryAddAndEdit",
        component: AdminProductManageCategoryAddAndEdit,
        props: route => ({ type: route.query.type })
    },
    {
        path: "/adminLoyalty",
        name: "AdminLoyalty",
        component: AdminLoyalty
    },
    {
        path: "/adminLoyaltyAddAndEdit",
        name: "AdminLoyaltyAddAndEdit",
        component: AdminLoyaltyAddAndEdit
    },
    {
        path: "/adminMarketing",
        name: "AdminMarketing",
        component: AdminMarketing
    },
    {
        path: "/adminStore",
        name: "AdminStore",
        component: AdminStore,
        redirect:{
        name: "AdminStoreDetails"
        },
        children: [
            {
                path: "/adminStoreDetails",
                name: "AdminStoreDetails",
                component: AdminStoreDetails,
            },
            {
                path: "/adminStoreTradingHours",
                name: "AdminStoreTradingHours",
                component: AdminStoreTradingHours,
            },
            {
                path: "/adminStorePos",
                name: "AdminStorePos",
                component: AdminStorePos,
            },
            {
                path: "/adminStoreDelivery",
                name: "AdminStoreDelivery",
                component: AdminStoreDelivery,
             },
            {
                path: "/adminStoreTableBookings",
                name: "AdminStoreTableBookings",
                component: AdminStoreTableBookings,
             },
            {
                path: "/adminStoreEmployees",
                name: "AdminStoreEmployees",
                component: AdminStoreEmployees,
             },
            {
                path: "/adminStoreAccounting",
                name: "AdminStoreAccounting",
                component: AdminStoreAccounting,
             },
            {
                path: "/adminStoreVendors",
                name: "AdminStoreVendors",
                component: AdminStoreVendors,
             },
            {
                path: "/adminStoreStock",
                name: "AdminStoreStock",
                component: AdminStoreStock
             },
            ]
    },
    {
        path: "/adminStoreEmployeesAddAndEdit",
        name: "AdminStoreEmployeesAddAndEdit",
        component: AdminStoreEmployeesAddAndEdit
     },
    {
        path: "/adminStoreVendorsAddAndEdit",
        name: "AdminStoreVendorsAddAndEdit",
        component: AdminStoreVendorsAddAndEdit
     },
    {
        path: "/adminStoreStockAddAndEdit",
        name: "AdminStoreStockAddAndEdit",
        component: AdminStoreStockAddAndEdit
     },
    ],
};

export default routes;