<script setup lang="ts">
import { defineModel, withDefaults } from 'vue'

import { ONE_DAY } from '@shared/constants/time.ts'
import MinusIcon from '@shared/icons/minus.svg'
import PlusIcon from '@shared/icons/plus.svg'

import { useTimeInput } from '../model/useTimeInput.ts'

interface TimeInputProps {
	/**
	 * Min value in **seconds**
	 */
	min?: number
	/**
	 * Max value in **seconds**
	 */
	max?: number
}

const props = withDefaults(defineProps<TimeInputProps>(), {
	min: 0,
	max: ONE_DAY
})

/**
 * Value in milliseconds
 */
const time = defineModel<number>('time', { required: true })

const { inputValue, increment, decrement, minValueAsDate, maxValueAsDate } =
	useTimeInput(time, props.min, props.max)
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
