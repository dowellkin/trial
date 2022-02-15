import api from "@/api.js"

const LS_NAME = 'currencies'

export default {
	namespaced: true,
	state: {
		interestedCurrencies: tryParse(localStorage.getItem(LS_NAME)) ?? ['USD', 'RUB'],
		currencies: []
	},
	mutations: {
		setInterestedCurrency(state, currencies){
			state.rates = currencies;
			localStorage.setItem(LS_NAME, JSON.stringify(state.interestedCurrencies))
		},
		addInterestedCurrency(state, currency){
			if(state.interestedCurrencies.indexOf(currency) == -1){
				state.interestedCurrencies = [...state.interestedCurrencies, currency]
			}
			localStorage.setItem(LS_NAME, JSON.stringify(state.interestedCurrencies))
		},
		removeInterestedCurrency(state, currency){
			const index = state.interestedCurrencies.indexOf(currency.Cur_Abbreviation)
			console.log(currency, index);
			if(index != -1){
				state.interestedCurrencies.splice(index, 1)
			}
		},
		setAvaliable(state, avaliable){
			state.currencies = avaliable
		}
	},
	actions: {
		fetch({ commit }){
			return new Promise((resolve) => {
				api.currencies()
				.then(res => {
					commit('setAvaliable', res)
					resolve(res)
				})
			})
		}
	},
	getters: {
		interestedCurrencies(state){
			return state.interestedCurrencies
		},
		avaliableCurrencies(state){
			return state.currencies
		}
	}
}

function tryParse(string) {
	try {
		const result = JSON.parse(string)
		return result;
	} catch (error) {
		return undefined
	}
}