<template>
	<v-card
		class="pa-4"
	>
		<v-card-title>
			График изменений за последний месяц {{value.length == 0 ? "не доступен" : ""}}
		</v-card-title>
		<v-sparkline
			:value="dynamicsValues"
			:labels="dynamicsLabels"
			:gradient="['#3f51b5']"
			color="rgba(255, 255, 255, .7)"
			height="80"
			padding="25"
			:smooth="2"
			stroke-linecap="round"
			auto-draw
		>
		</v-sparkline>
	</v-card>
</template>

<script>
export default {
	name: "chart",
	props: ['value'],
	computed: {
		dynamicsValues(){
			return this.value?.map(el => el?.Cur_OfficialRate)
		},
		dynamicsLabels(){
			return this.value?.map((el, index) => {
				console.log(index, new Date(el.Date).getDate())
				if(index % 2 == 1)
					return " "
				else 
					return new Date(el.Date).getDate()
			})
		}
	}
}
</script>

<style>

</style>