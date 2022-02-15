<template>
	<v-app>
		<v-app-bar
			v-if="!navBar"
			app
			color="background"
		>
			<v-btn
				tile
				icon
				@click="navBar = !navBar"
			>
				<v-icon>
					mdi-menu
				</v-icon>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer
			v-model="navBar"
			app
			color="background"
		>
			<v-list-item>
				<v-list-item-content>
					<v-list-item-title class="text-h6">
						Korolev Alexandr
					</v-list-item-title>
					<v-list-item-subtitle>
						Trial
					</v-list-item-subtitle>
					
				</v-list-item-content>
			</v-list-item>

			<v-divider></v-divider>

			<v-list
				dense
				nav
			>
				<v-list-item
					:to="{ name: 'Rates' }"
				>
					<v-list-item-icon>
						<v-icon>mdi-chart-bell-curve-cumulative</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>Курсы валют</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-list-item
					:to="{ name: 'Settings' }"
				>
					<v-list-item-icon>
						<v-icon>mdi-cog</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>Настройки</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main>
			<router-view/>
		</v-main>
	</v-app>
</template>

<script>

export default {
	name: 'App',
	data: () => ({
		navBar: true
	}),
	created(){
		this.$router.onReady(() => {
			document.title = `${this.$route.meta.title} | EA`
		})
		this.$router.afterEach(to => {
			document.title = `${to.meta.title} | EA`
		})

		
		this.$store.dispatch("rates/fetch");
	}
};
</script>
