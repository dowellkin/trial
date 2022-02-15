<template>
	<v-card>
		<v-card-title>
			График изменений за последний месяц {{value.length == 0 ? "не доступен" : ""}}
		</v-card-title>
		<v-sparkline
			:value="value"
			:gradient="['#3f51b5']"
			color="rgba(255, 255, 255, .7)"
			height="80"
			padding="25"
			stroke-linecap="round"
			smooth
		>
		</v-sparkline>
	</v-card>
</template>

<script>
export default {
	name: "chart",
	props: ['value']
}
</script>

<style>

</style>