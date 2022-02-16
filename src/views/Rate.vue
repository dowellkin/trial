<template>
	<v-card
		color="transparent"
		class="pa-4"
		elevation="0"
	>
		<v-card-title class="header text-h2">
			Курс&nbsp;<span style="color: #3f51b5">{{code}}: {{rate && rate.Cur_OfficialRate}}</span>
		</v-card-title>

		<v-container>
			<v-row>
				<v-col cols="3">
					<calculator
						:code="code"
						:rate="rate.Cur_OfficialRate"
					>
					</calculator>
				</v-col>
				<v-col cols="6">
					<chart
						v-if="!dynamicsLoading"
						:value="dynamics"
					></chart>
				</v-col>
			</v-row>

		</v-container>
	
	</v-card>
</template>

<script>
import calculator from '@/components/calculator.vue'
import chart from '@/components/chart.vue'

import { mapGetters } from "vuex"
export default {
	name: 'rate',
	components: {
		calculator,
		chart
	},
	computed: {
		...mapGetters('settings', ['interestedCurrencies', 'avaliableCurrencies']),
		...mapGetters('rates', {rates: 'all', dynamicsLoading: 'dynamicsLoading'}),
		code(){
			return this.$route.params.code
		},
		rate(){
			return this.rates.find(el => el.Cur_Abbreviation == this.code)
		},
		dynamics(){
			return this.$store.getters['rates/dynamics'][this.code]
		}
	},
	created(){
		
		if(!this.interestedCurrencies.includes(this.code)){
			this.$router.replace({ name: "Root" })
		} else {
			document.title = `Курс ${this.code} | ЕА`
			
			if (this.avaliableCurrencies.length == 0) {
				this.$store.dispatch('settings/fetch')
				.then(res => {
					const obj = res.reverse().find(el => el.Cur_Abbreviation == this.code);
					console.log(obj);
					this.$store.dispatch('rates/fetchDynamics', {code: obj.Cur_ID, name: this.code})
				})
			} else {
				const obj = this.avaliableCurrencies.reverse().find(el => el.Cur_Abbreviation == this.code);
				console.log(obj);
				this.$store.dispatch('rates/fetchDynamics', {code: obj.Cur_ID, name: this.code})
			}
		}
	}
}
</script>

<style>

</style>