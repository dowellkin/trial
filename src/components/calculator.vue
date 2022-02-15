<template>
	<v-card
		class="pa-4"
	>
		<v-card-title>
			Конвертер валют
		</v-card-title>
		<v-text-field
			label="BYN"
			type="number"
			v-model="byn"
			@change="input('byn')"
		></v-text-field>
		<v-text-field
			:label="code"
			type="number"
			v-model="another"
			@change="input('another')"
		>

		</v-text-field>
	</v-card>
</template>

<script>
export default {
	name: 'calculator',
	props: ['code', 'rate'],
	data: () => ({
		byn: "",
		another: ""
	}),
	methods: {
		input(target){
			console.log(target)
			switch (target){
				case 'byn':
					this.another = (this.byn * this.rate).toFixed(2)
					break
				case 'another':
					this.byn = (this.another / this.rate).toFixed(2)
					break
			}
		}
	}
}
</script>

<style>

</style>