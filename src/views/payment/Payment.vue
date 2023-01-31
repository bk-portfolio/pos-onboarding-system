<template>
	<div class="layout__main--navbar">
		<RegistrationHeader />
	</div>
	<div class="layout__main--body">
		<router-view />
	</div>
</template>
<script>
import RegistrationHeader from "./../../components/RegistrationHeader.vue";
import { usePaymentStore } from "./../../stores/PaymentStore";

export default {
	name: "Woosh Payment Gateway",
	components: {
		RegistrationHeader
	},
	async beforeRouteEnter(to, from, next) {
		const userInfo = JSON.parse(localStorage.getItem("userInfo"));
		if (userInfo.is_admin) {
			next(from.path);
		} else {
			const paymentStore = usePaymentStore();
			if (!paymentStore.paymentData) {
				await paymentStore.postFetchSubscriptionPackage();
			}
			next();
		}
  	},
	setup() {
	},
	data() {
		return {
			paymentData: []
		};
	},
	methods : {

	}
};
</script>