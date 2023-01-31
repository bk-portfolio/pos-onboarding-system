<template>
	<div class="row m-0 h-90 p-5 scroll--vertical">
		<div class="col d-flex justify-content-center align-items-center">
			<div class="w-100">
				<div class="fw-bold fs-5 mb-5 d-flex d-flex justify-content-center">
					<h2>Thank you for subscribing to our pack</h2>
				</div>
				<div class="justify-content-center border border-1 border-secondary px-5 pt-2 pb-2" style="text-align:center;line-height: 1.8">
					<p class="fw-bold fs-6">Your subscription has been confirmed.</p>
					<p class="fs-7">
						If at any time you wish to stop subscribing our pack, you can send an "Unsubscribe" email to
						<a :href="mailLink" style="text-decoration: underline; cursor: pointer;">support@wooshfood.com</a>
					</p>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="d-flex justify-content-center">
			<h4>Powered by Westpac PayWay</h4>
		</div>
	</div>
</template>
<script>
import { usePaymentStore } from "../../stores/PaymentStore";

export default {
	name: "Woosh Payment Subscription Success",
	setup() {
		const paymentStore = usePaymentStore();
		return {
			paymentStore
		};
	},
	computed: {
		mailLink: function () {
			const subject = "Unsubscribe " + this.paymentStore.paymentData.subscriptionPackage.name
			const body = "";
			return "mailto:support@wooshfood.com?subject=" + subject + "&body=" + body;
		}
	}
};
</script>