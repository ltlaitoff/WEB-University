<script setup lang="ts">
import { computed, defineModel, withDefaults } from 'vue'

import { format, parse } from 'date-fns'

import MinusIcon from '@assets/icons/minus.svg'
import PlusIcon from '@assets/icons/plus.svg'

const props = withDefaults(
	defineProps<{
		/**
		 * Min value in **seconds**
		 */
		min?: number
		/**
		 * Min value in **minutes**
		 */
		max?: number
	}>(),
	{
		min: 0,
		max: 24 * 60
	}
)

/**
 * Value in milliseconds
 */
const time = defineModel<number>('time', { required: true })

/**
 * Format: HH:mm:ss for input time
 */
const inputValue = computed({
	get() {
		return format(time.value, 'HH:mm:ss')
	},
	set(value) {
		const valueAsDate = parse(value, 'HH:mm:ss', new Date().setTime(0))

		time.value = validateValue(valueAsDate.getTime())
	}
})

const increment = () => {
	time.value += 1 * 60 * 1000
}

const decrement = () => {
	time.value -= 1 * 60 * 1000
}

const validateValue = (value: number) => {
	if (props.min != undefined && value < props.min) return props.min
	if (props.max != undefined && value > props.max) return props.max

	return value
}

const minValueAsDate = computed(() => {
	const date = new Date(props.min * 1000)
	const dateForOut = new Date(
		date.valueOf() + date.getTimezoneOffset() * 60 * 1000
	)

	return format(dateForOut, 'HH:mm:ss')
})

console.log(new Date(props.min * 1000))

const maxValueAsDate = computed(() => {
	const date = new Date(props.max * 60 * 1000)
	const dateForOut = new Date(
		date.valueOf() + date.getTimezoneOffset() * 60 * 1000
	)

	return format(dateForOut, 'kk:mm:ss')
})
</script>

<template>
	<div class="flex gap-x-2">
		<button
			class="p-2 bg-slate-200 rounded-xl text-slate-700 hover:bg-slate-300"
			@click="decrement"
		>
			<MinusIcon class="w-4 h-4" />
		</button>

		<input
			class="border border-slate-400 px-2 py-1 rounded-xl"
			v-model="inputValue"
			:min="minValueAsDate"
			:max="maxValueAsDate"
			type="time"
			step="1"
		/>

		<button
			class="p-2 bg-slate-200 rounded-xl text-slate-700 hover:bg-slate-300"
			@click="increment"
		>
			<PlusIcon class="w-4 h-4" />
		</button>
	</div>
</template>
