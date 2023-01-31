<template>
	<div class="row m-0 p-0 h-100">
		<div class="col-xl-6 p-0">
			<PaymentHeader :paymentData="paymentStore.paymentData" :paymentCurrency="AUD"/>
		</div>
		<div class="col-xl-6 p-0 h-100 col-12 px-5 pt-5">
			<template v-if="paymentStore.isPaid">
				<SubscriptionSuccess />
			</template>
			<template v-else>
				<div class="row">
					<div class="col-xl-8"></div>
					<div class="col-xl-4 fw-bold fs-5 mb-3 justify-content-center">
						<a @click.prevent="paymentStore.changeCard" style="text-decoration: underline; cursor: pointer;" :class="{ 'disabled-click' : loadingCardFrame}">
							Change to
							<span v-if="paymentStore.isCreditCard">Debit Card</span>
							<span v-else>Credit Card</span>
							>
						</a>
					</div>
				</div>
				<div class="row m-0 h-90 p-5 scroll--vertical">
					<div class="col d-flex justify-content-center align-items-center">
						<div class="w-100">
							<div class="fw-bold fs-5 mb-5 d-flex d-flex justify-content-center">
								<h2>
									Pay with
									<span v-if="paymentStore.isCreditCard">Credit Card</span>
									<span v-else>Debit Card</span>
								</h2>
							</div>
							<div class="d-flex justify-content-center">
								<div :id="cardType" ref="cardFrame"></div>
							</div>
							<div class="d-flex justify-content-center">
								<Popup :anchor="'cardFrame'" :show="cardInformationDialog.appear" class="text-center py-1 fs-4 fw-bold">{{cardInformationDialog.message}}</Popup>
							</div>
							<div class="d-flex justify-content-center">
								<k-button class="mx-2 rounded-0 text-white fs-6 px-5 py-3 fw-bold border-0 mt-5" @click.prevent="proceedPayment">Subscribe per {{ periodSubscription }}</k-button>
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
		</div>
		<loading-dialog :dialog="loadingDialog" />
		<information-dialog :dialog="informationDialog" @close-dialog="closeInformationDialog" />
	</div>
</template>
<style scoped>
.disabled-click {
	pointer-events: none;
}
</style>
<script>
import PaymentHeader from "./components/PaymentHeader.vue";
import SubscriptionSuccess from "./SubscriptionSuccess.vue";

import { usePaymentStore } from "../../stores/PaymentStore";
import { useLoaderStore } from "../../stores/LoaderStore";

import { Popup } from "@progress/kendo-vue-popup";

export default {
	name: "Woosh Payment Subcription Checkout",
	setup() {
		const loaderStore = useLoaderStore();
		const paymentStore = usePaymentStore();
		return {
			loaderStore,
			paymentStore
		};
	},
	components: {
		PaymentHeader,
		SubscriptionSuccess,
		Popup
	},
	mounted() {
		const paywayScript = document.createElement("script");
		paywayScript.setAttribute("src", "https://api.payway.com.au/rest/v1/payway.js");
		document.head.appendChild(paywayScript);

		paywayScript.onload = () => {
			this.createCardFrame();
		};
	},
	watch: {
		cardType(value) {
			this.loadingCardFrame = true;
			this.waitForCardFrame(value).then((ele) => {
				this.destroyCardFrame();
				this.createCardFrame();
			});
		}
	},
	data() {
		return {
			informationDialog: {
				appear: false,
				message: ""
			},
			cardInformationDialog: {
				appear: false,
				message: ""
			},
			loadingDialog: {
				appear: false,
				message: ""
			},
			cardFrame: null,
			loadingCardFrame: false,
			show: false,
			publishKey: null,
		};
	},
	computed: {
		cardType: function () {
			return this.paymentStore.isCreditCard ? "payway-credit-card" : "payway-bank-account";
		},
		periodSubscription: function () {
			switch (this.paymentStore.paymentFrequency) {
				case "weeks":
					return "Weeks";
				case "six-monthly":
					return "6 Months";
				case "yearly":
					return "Years";
				default:
					return "Months";
			}
		}
	},
	methods: {
		async loadPublishKey() {
			if (!this.publishKey) {
				const response = await this.$http.get("/subscription/key/public");
				this.publishKey = response.data;
			}
		},
		waitForCardFrame(elementId) {
			return new Promise((resolve) => {
				let cardFrameElement = document.getElementById(elementId);
				if (cardFrameElement) {
					return resolve(cardFrameElement);
				}

				const observer = new MutationObserver(() => {
					let cardFrameElement = document.getElementById(elementId);
					if (cardFrameElement) {
						resolve(cardFrameElement);
						observer.disconnect();
					}
				});

				observer.observe(this.$refs.cardFrame, {
					attributes: true
				});
			});
		},
		createCardFrameTokenCallback(err, data) {
			if (err) {
				console.error("Error getting token: " + err.message);
				this.showCardInformationDialog(err.message);
			} else {
				// TODO: send token to server with ajax
				console.log("singleUseTokenId: " + data.singleUseTokenId);
				this.startSubscription(data.singleUseTokenId);
			}
		},
		createCardFrameCallback(err, frame) {
			if (err) {
				console.error("Error creating frame: " + err);
			} else {
				// Save the created frame for when we get the token
				this.cardFrame = frame;
				this.loadingCardFrame = false;
			}
		},
		destroyCardFrame() {
			if (this.cardFrame != null) {
				this.cardFrame.destroy();
				this.cardFrame = null;
			}
		},
		async createCardFrame() {
			await this.loadPublishKey();
			
			const options = {
				publishableApiKey: this.publishKey,
				tokenMode: "callback",
				onValid: function () {
					// Disable button payment
				},
				onInvalid: function () {
					// Disable button payment
				}
			};

			// Create card iFrame
			if (this.paymentStore.isCreditCard) {
				window.payway.createCreditCardFrame(options, this.createCardFrameCallback);
			} else {
				window.payway.createBankAccountFrame(options, this.createCardFrameCallback);
			}
		},
		proceedPayment() {
			// Disable button payment
			this.cardFrame.getToken(this.createCardFrameTokenCallback);
		},
		showCardInformationDialog(message) {
			this.cardInformationDialog = {
				appear: true,
				message: message
			};

			// Wait 5 seconds to close
			setTimeout(this.closeCardInformationDialog, 5000);
		},
		closeCardInformationDialog() {
			this.cardInformationDialog = {
				appear: false,
				message: ""
			};
		},
		showInformationDialog(message) {
			this.informationDialog = {
				appear: true,
				message: message
			};
		},
		closeInformationDialog() {
			this.informationDialog = {
				appear: false,
				message: ""
			};
		},
		showLoadingDialog(message) {
			this.loadingDialog = {
				appear: true,
				message: message
			};
		},
		closeLoadingDialog() {
			this.loadingDialog = {
				appear: false,
				message: ""
			};
		},
		async startSubscription(generatedToken) {
			this.showLoadingDialog("Waiting payment to complete ...");
			const response = await this.$http.post("/subscription/start", {
				singleUseTokenId: generatedToken
			});
			if (response.status === 200) {
				this.paymentStore.isPaid = true;
				this.closeLoadingDialog();
			} else {
				this.showInformationDialog(response.data.error);
				this.closeLoadingDialog();
			}
		},
	}
};
</script>