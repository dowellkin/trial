<template>
	<v-card
		color="transparent"
		class="pa-4"
		elevation="0"
	>
		<v-row>
			<v-col>
				<v-btn class="mr-2" @click="openAddModal">
					Добавить
				</v-btn>
				<v-btn class="mr-2" @click="removeInterestedCurrencies">
					Удалить
				</v-btn>
				<v-btn :loading="updating" @click="update">
					Обновить
				</v-btn>
			</v-col>
		</v-row>

		<v-row>
			<v-col>
				<v-data-table
					:headers="headers"
					:items="rates"
					item-key="Cur_ID"
					class="elevation-1"
					show-select
					v-model="selected"
				>

				</v-data-table>
			</v-col>
		</v-row>

		<v-dialog
				v-model="modalAdd"
				max-width="500px"
			>
				<v-card>
					<v-card-title>
						<span>Добавить валюту</span>
					</v-card-title>
					<v-card-text>
						<v-autocomplete
							v-model="addCurrency.currencies"
							:items="autocompleteItems"
							dense
							chips
							small-chips
							filled
							:counter="max"
							:counter-value="() => fullCount"
							:menu-props="{disabled: fullCount >= max}"
							multiple
							deletable-chips
							label="Возможные валюты"
						></v-autocomplete>

						всего можно отслеживать не более {{max}} валют (ограничение API)
					</v-card-text>
					<v-card-actions>
						<v-btn
							color="red darken-4"
							text
							@click="modalAdd = false"
						>
							Закрыть
						</v-btn>
						<v-btn
							color="green darken-1"
							text
							:disabled="addCurrency.currencies.length == 0"
							@click="addCurrencyHandler"
						>
							Добавить
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
	</v-card>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	name: 'settings-view',
	data: () => ({
		headers: [
			{ text: 'id', value: 'Cur_ID' },
			{ text: 'Название', value: 'Cur_Name' },
			{ text: 'Аббревиатура', value: 'Cur_Abbreviation' },
		],
		selected: [],
		modalAdd: false,
		addCurrency: {
			currencies: []
		},
		max: 5,
		updating: false
	}),
	computed: {
		...mapGetters('settings', ['interestedCurrencies', 'avaliableCurrencies']),
		rates(){
			return this.$store.getters['rates/all'];
		},
		autocompleteItems(){
			return this.avaliableCurrencies.map(el => ({text: el.Cur_Abbreviation, value: el.Cur_Abbreviation, disabled: this.interestedCurrencies.includes(el.Cur_Abbreviation)}))
		},
		fullCount(){
			return this.addCurrency.currencies.length + this.interestedCurrencies.length
		}
	},
	methods: {
		openAddModal(){
			this.modalAdd = true
			if (this.avaliableCurrencies.length == 0) {
				this.$store.dispatch('settings/fetch')
			}
		},
		addCurrencyHandler(){
			this.modalAdd = false
			this.addCurrency.currencies.forEach(cur => {
				this.$store.commit('settings/addInterestedCurrency', cur)
			});
			this.addCurrency.currencies = [];
			this.$store.dispatch("rates/fetch");
		},
		removeInterestedCurrencies(){
			this.selected.forEach(cur => {
				this.$store.commit('settings/removeInterestedCurrency', cur)
			});
			this.selected = [];
			this.$store.dispatch("rates/fetch");
		},
		update(){
			this.updating = true
			this.$store.dispatch("rates/fetch")
			.finally(() => {
				this.updating = false
			})
		}
	}
}
</script>

<style>

</style>