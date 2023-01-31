import Registration from "./../views/registration/Registration.vue";
import RegistrationBusinessDetails from "./../views/registration/RegistrationBusinessDetails.vue";
import RegistrationCreateAccount from "./../views/registration/RegistrationCreateAccount.vue";
import RegistrationSelectPackage from "./../views/registration/RegistrationSelectPackage.vue";

const routes = {
    path: "/reg",
    name: "Registration",
    component: Registration,
    redirect: {
      name: "RegistrationCreateAccount",
    },
    children: [
      {
        path: "/registrationSelectPackage",
        name: "RegistrationSelectPackage",
        component: RegistrationSelectPackage,
      },
      {
        path: "/registrationBusinessDetails",
        name: "RegistrationBusinessDetails",
        component: RegistrationBusinessDetails,
      },
      {
        path: "/registrationCreateAccount",
        name: "RegistrationCreateAccount",
        component: RegistrationCreateAccount,
      }
    ],
};

export default routes;