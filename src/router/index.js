import { createWebHashHistory, createRouter } from "vue-router";
import MainPage from "./../views/MainPage.vue";
// Registration
import Registration from "./registration"
// Login
import Login from "./login"
// Admin
import Admin from "./admin"
// Payment
import Payment from "./payment"

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
    redirect: {
      name: "Login",
    },
    children: [
      Registration,
      Login,
      Admin,
      Payment
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
