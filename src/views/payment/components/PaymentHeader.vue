<template>
	<div class="row m-0 p-0 h-100">
		<div class="col d-flex justify-content-center align-items-center">
			<div class="w-100">
				<div class="fw-bold fs-3 mb-2 d-flex justify-content-center pt-5">
					<h2>{{ paymentData.subscriptionPackage.name }}</h2>
				</div>
				<div class="fw-bold fs-1 mb-2 d-flex justify-content-center">
					<p>
						<span>AUD</span>
						{{ paymentData.subscriptionPackage.recurringFee }}.00
					</p>
				</div>
				<div class="fs-3 mb-2 d-flex justify-content-center px-5">
					<k-button class="rounded-0 text-white fs-10 px-2 py-2 fw-bold border-0 mt-3" @click.prevent="infoDetail=!infoDetail"><span v-if="!infoDetail">Show</span><span v-if="infoDetail">Hide</span> details</k-button>
				</div>
				<div ref="paymentInfo" class="d-flex justify-content-center">
					<Popup 
					:anchor="'paymentInfo'" 
					:anchor-align="anchorAlign"
					:popup-align="popupAlign" 
					:show="infoDetail" class="text-center py-1 fs-4 fw-bold">
						<table class="table table-borderless">
							<tbody>
								<tr>
									<td>{{ paymentData.subscriptionPackage.description }}</td>
								</tr>
								<tr>
									<td>{{ paymentData.subscriptionPackage.features }}</td>
								</tr>
							</tbody>
						</table>
					</Popup>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { Popup } from "@progress/kendo-vue-popup";

export default {
	name: "Woosh Payment Subscription Success",
	setup() {
	},
	components: {
		Popup
	},
	computed: {
		anchorAlign: function(){
            return {
                horizontal: 'center',
                vertical: 'bottom'
            };
        },
        popupAlign: function(){
            return {
                horizontal: 'center',
                vertical: 'top'
            };
        }
	},
	props: {
		paymentData: {
			subscriptionPackage: {
				name: "",
				description: "",
				recurringFee: 0,
				features: "",
			}
		},
		paymentCurrency: "AUD"
	},
	data() {
		return {
			infoDetail: false
		};
	}
};
</script>