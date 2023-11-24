<script setup lang="ts">
import traiwindColors from 'tailwindcss/colors'

import { Colors } from '@types'

const props = defineProps<{
	value: Colors
	size?: 'sm' | 'md'
}>()

const emits = defineEmits<{
	(event: 'change', value: Colors): void
}>()

const ignore = [
	'inherit',
	'current',
	'transparent',
	'black',
	'white',
	'lightBlue',
	'warmGray',
	'trueGray',
	'coolGray',
	'blueGray'
]

const colorsForOutput = Object.entries(traiwindColors).filter(
	([key, value]) => {
		return !ignore.includes(key)
	}
) as [Colors, any][]

function onClick(value: Colors) {
	emits('change', value)
}
</script>

<template>
	<div class="flex flex-wrap gap-x-2 gap-y-2">
		<template
			v-for="item in colorsForOutput"
			:key="item.toString()"
		>
			<button
				type="button"
				class="rounded-full"
				:class="{
					'w-6 h-6': props.size !== 'sm',
					'w-5 h-5': props.size === 'sm'
				}"
				:style="{
					background: item[1]['400'],
					border: props.value === item[0] ? '2px solid black' : ''
				}"
				@click="onClick(item[0])"
			></button>
		</template>
	</div>
</template>

<style scoped></style>
