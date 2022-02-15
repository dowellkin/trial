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
		],
		selected: [],
	}),
	computed: {
		...mapGetters('settings', ['interestedCurrencies']),
		rates(){
			return this.$store.getters['rates/all'];
		}
	},
	methods: {
	}
}
</script>

<style>

</style>