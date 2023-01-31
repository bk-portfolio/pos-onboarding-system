import TheLogin from "../views/login/TheLogin.vue";
import MainLogin from "../views/login/MainLogin.vue";
import LoginResetPassword from "../views/login/LoginResetPassword.vue";
//woosh food admin portal
import wooshAdmin from "./woosh-admin.js";

const routes = {
    path: "/login",
    name: "Login",
    component: TheLogin,
    redirect: {
        name: "LoginDashboard",
    },
    children: [
        wooshAdmin,
        {
        path: "/loginDashboard",
        name: "LoginDashboard",
        component: MainLogin,
        },
        {
        path: "/resetPassword",
        name: "ResetPassword",
        component: LoginResetPassword,
        },
    ],
};

export default routes;