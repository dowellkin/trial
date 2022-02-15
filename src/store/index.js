import Vue from 'vue'
import Vuex from 'vuex'

import rates from './rates.js'
import settings from './settings.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
		rates,
		settings
  }
})
