import axios from 'axios'

const ax = axios.create({
	baseURL: 'https://www.nbrb.by/api/exrates'
});

const api = {
	rates(cur_id, mode = 'chars'){
		const params = {};
		if(mode == 'code')
			params.parammode = 0
		else if (mode == 'iso')
			params.parammode = 1
		else if (mode == 'chars')
			params.parammode = 2
			
		return new Promise((resolve, reject) => {
			ax.get(`/rates${cur_id ? '/' + cur_id : ''}`, { params })
			.then(response => resolve(response.data))
			.catch(reject)
		})
	},

	currencies(cur_id){
		return new Promise((resolve, reject) => {
			ax.get(`/currencies${cur_id ? '/' + cur_id : ''}`)
			.then(response => resolve(response.data))
			.catch(reject)
		})
	},

	dynamics(cur_id, {startDate, endDate}){
		const apiDate = (d) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

		const params = {
			startdate: apiDate(startDate),
			enddate: apiDate(endDate)
		};

		return new Promise((resolve, reject) => {
			ax.get(`/rates/dynamics/${cur_id}`, { params })
			.then(response => resolve(response.data))
			.catch(reject)
		})
	}
}

export default api;