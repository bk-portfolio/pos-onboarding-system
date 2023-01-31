import Payment from "../views/payment/Payment.vue"
import SubscriptionCheckout from "../views/payment/SubscriptionCheckout.vue"
import SubscriptionSuccess from "../views/payment/SubscriptionSuccess.vue"

const routes = {
	path: "/payment",
	name: "Payment",
	component: Payment,
	redirect: {
		name: "Subscription Checkout"
	},
	children: [
		{
			path: "/subscription/checkout",
			name: "Subscription Checkout",
			component: SubscriptionCheckout,
			meta: { requireAuth: true }
		},
		{
			path: "/subscription/success",
			name: "Subscription Success",
			component: SubscriptionSuccess
		}
	]
}

export default routes;