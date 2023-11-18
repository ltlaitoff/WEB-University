<script setup lang="ts">
import BrainIcon from '../assets/icons/brain.svg'
import BedIcon from '../assets/icons/bed.svg'
import CupIcon from '../assets/icons/cup.svg'
import { ModeItem } from '../types/ModeItem'

import { computed, ref } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const selectedColor = computed({
	get() {
		const findedItem = colorsData.find(item => item.id === props.modelValue)
		return findedItem || colorsData[0]
	},
	set(value) {
		emit('update:modelValue', value.id)
	}
})

// const selectedColor = ref(colorsData[0])
const colorsData: ModeItem[] = [
	{
		id: 'pomodoro',
		title: 'Pomodoro',
		icon: BrainIcon,
		color: 'blue',
		additionalStyles:
			'border-blue-950 bg-blue-100  text-blue-950 hover:bg-blue-200',
		additionalStylesSelected: 'border-blue-950'
	},
	{
		id: 'short',
		title: 'Short break',
		icon: CupIcon,
		color: 'green',
		additionalStyles:
			'border-green-950 bg-green-100  text-green-950 hover:bg-green-200',
		additionalStylesSelected: 'border-green-950'
	},
	{
		id: 'long',
		title: 'Long break',
		icon: BedIcon,
		color: 'red',
		additionalStyles:
			'border-red-950 bg-red-100  text-red-950 hover:bg-red-200',
		additionalStylesSelected: 'border-red-950'
	}
]

function hideSelect() {
	selectOpen.value = false
}

function toggleSelect() {
	selectOpen.value = !selectOpen.value
}

const selectOpen = ref(false)

function changeSelectedColor(data: any) {
	selectedColor.value = data
	selectOpen.value = false
}
</script>

<template>
	<div
		class="relative whitespace-nowrap"
		v-click-out-side="hideSelect"
	>
		<button
			:class="`rounded-full border flex items-center gap-x-2 px-4 py-2 ${selectedColor.additionalStylesSelected} ${selectedColor.additionalStyles} cursor-pointer transition-all duration-100`"
			@click="toggleSelect"
		>
			<component
				:is="selectedColor.icon"
				class="w-6 h-6"
			/>
			{{ selectedColor.title }}
		</button>

		<div
			v-if="selectOpen"
			class="absolute top-10 mt-2 flex flex-col rounded-xl overflow-hidden border border-black"
		>
			<button
				v-for="item in colorsData"
				:key="item.title"
				:class="`flex items-center gap-x-2 px-4 py-2 ${item.additionalStyles} cursor-pointer transition-all duration-100`"
				@click="changeSelectedColor(item)"
			>
				<component
					:is="item.icon"
					class="w-6 h-6"
				></component>

				{{ item.title }}
			</button>
		</div>
	</div>
</template>
