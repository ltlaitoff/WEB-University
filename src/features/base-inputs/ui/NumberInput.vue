<script setup lang="ts">
import { defineModel, withDefaults } from 'vue'

import { useNumberInput } from '@features/base-inputs/model/useNumberInput.ts'
import MinusIcon from '@shared/icons/minus.svg'
import PlusIcon from '@shared/icons/plus.svg'

interface NumberInputProps {
	min?: number
	max?: number
}

const props = withDefaults(defineProps<NumberInputProps>(), {
	min: 0,
	max: 1000
})

const model = defineModel<number>({ required: true })

const { inputValue, increment, decrement } = useNumberInput(
	model,
	props.min,
	props.max
)
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
			v-model="inputValue"
			class="border border-slate-400 px-2 py-1 rounded-xl"
			type="number"
			:min="props.min"
			:max="props.max"
		/>

		<button
			class="p-2 bg-slate-200 rounded-xl text-slate-700 hover:bg-slate-300"
			@click="increment"
		>
			<PlusIcon class="w-4 h-4" />
		</button>
	</div>
</template>
