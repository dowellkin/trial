import Vue from 'vue'
import VueRouter from 'vue-router'
import Rates from '../views/Rates.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Root',
		redirect: { name: 'Rates' }
  },
  {
    path: '/rates',
    name: 'Rates',
		meta: {
			title: "Курс"
		},
    component: Rates
  },
  {
    path: '/rates/:code',
    name: 'Rate',
		meta: {
			title: "Валюта"
		},
    component: () => import('@/views/Rate.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
		meta: {
			title: "Настройки"
		},
    component: () => import('@/views/Settings.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
