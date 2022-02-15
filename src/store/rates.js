import api from "@/api.js"

export default {
	namespaced: true,
	state: {
		rates: [],
		ratesDynamics: {},
		dynamicsLoading: true
	},
	mutations: {
		setRates(state, data){
			state.rates = data;
		},
		setDynamics(state, {name, data}){
			state.ratesDynamics[name] = data;
		},
		setDynamicsLoading(state, data){
			state.dynamicsLoading = data;
		},
	},
	actions: {
		fetch({ commit, rootGetters }){
			return new Promise((resolve) => {
				const names = rootGetters['settings/interestedCurrencies'];
				const promices = names.map(name => (new Promise((resolve, reject) => {
					api.rates(name)
					.then(resolve)
					.catch(reject)
				})))
				Promise.all(promices)
				.then(response => {
					const results = response.map(res => res);
					commit('setRates', results);
					resolve(results);
				})
			})
		},
		fetchDynamics({ commit }, {code, dates, name}){
			const endDate = dates?.startDate ?? new Date();
			let startDate;
			if(!dates?.startDate){
				const monthAgo = new Date();
				monthAgo.setMonth(monthAgo.getMonth() - 1);
				startDate = monthAgo;
			} else {
				startDate = dates.startDate;
			}
			commit('setDynamicsLoading', true)
			return new Promise((resolve) => {
				api.dynamics(code, {startDate, endDate})
				.then(res => {
					commit('setDynamics', {name, data: res})
					resolve(res)
				})
				.finally(() => {
					commit('setDynamicsLoading', false)
				})
			})
		}
	},
	getters: {
		all(state){
			return state.rates
		},
		dynamics: state => state.ratesDynamics,
		dynamicsLoading: state => state.dynamicsLoading
	}
}