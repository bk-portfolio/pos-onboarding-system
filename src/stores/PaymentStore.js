import { defineStore } from "pinia";
import axios from "axios";

export const usePaymentStore = defineStore({
	id: "paymentStore",
	state: () => ({
		isCreditCard : true,
		paymentData: null,
		paymentFrequency: "monthly",
		isPaid: false,
	}),
	actions: {
		changeCard() {
			this.isCreditCard = !this.isCreditCard;
		},
		async postFetchSubscriptionPackage() {
			try {
				const response = await axios.post("/subscription/status")
				if (response.status === 200 && response.data) {
					this.paymentData = response.data.subscription
					this.isPaid = this.paymentData.user.is_paid;
				} else {
					this.paymentData == null;
					this.isPaid = false;
				}
			} catch (error) {
				this.paymentData = null;
				this.isPaid = false;
			}
		}
	}
});