<template>
	<v-card
		color="transparent"
		class="pa-4"
		elevation="0"
	>
		<v-row>
			<v-col>
				<v-data-table
					:headers="headers"
					:items="rates"
					item-key="Cur_ID"
					class="elevation-1"
					v-model="selected"
				>

					<template v-slot:[`item.Cur_Abbreviation`]="{ item }">
						<router-link :to="{ name: 'Rate', params: { code: item.Cur_Abbreviation } }">
							{{item.Cur_Abbreviation}}
						</router-link>
					</template>

					<template v-slot:[`item.actions`]="{ item }">
						<v-btn @click="copy(item)">
							<v-icon>
								{{ copyed == item.Cur_Abbreviation ? 'mdi-check' : 'mdi-clipboard'}}
							</v-icon>
						</v-btn>
					</template>

				</v-data-table>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	name: 'rates-view',
	data: () => ({
		headers: [
			{ text: 'id', value: 'Cur_ID' },
			{ text: 'Аббревиатура', value: 'Cur_Abbreviation' },
			{ text: 'Курс', value: 'Cur_OfficialRate' },
			{ text: 'Скопировать', value: 'actions' },
		],
		selected: [],
		copyed: null
	}),
	computed: {
		...mapGetters('settings', ['interestedCurrencies']),
		rates(){
			return this.$store.getters['rates/all'];
		}
	},
	methods: {
		copy(data){
			console.log(data);
			const date = new Date(data.Date);
			const day = date.getDate();
			const month = date.getMonth() +1;
			const year = date.getFullYear();
			const str = `${data.Cur_Name} ${data.Cur_OfficialRate.toFixed(2)}р на ${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year}`;
			navigator.clipboard.writeText(str)
			.then(() => {
				this.copyed = data.Cur_Abbreviation
			})
		}
	}
}
</script>

<style>

</style>