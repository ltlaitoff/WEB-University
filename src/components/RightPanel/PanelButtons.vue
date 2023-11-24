<script setup lang="ts">
import { RightPanelModes } from '@types'

const props = defineProps<{
	isOpened: boolean
	mode: RightPanelModes
}>()

const emits = defineEmits<{
	(event: 'click', value: RightPanelModes): void
}>()

const data: {
	title: string
	key: RightPanelModes
}[] = [
	{
		title: 'Settings',
		key: 'settings'
	},
	{
		title: 'Categories',
		key: 'category'
	},
	{
		title: 'Statistic',
		key: 'statistic'
	}
]
</script>

<template>
	<div class="pt-10 h-full flex flex-col justify-start gap-y-2">
		<button
			v-for="item of data"
			:key="item.key"
			class="py-3 px-4 rounded-r-xl shadow clip-your-needful-style text-[--right-panel-color-950]"
			:class="
				props.isOpened === false
					? 'bg-[--right-panel-color-200]'
					: props.mode === item.key
					? 'bg-[--right-panel-color-300] z-20'
					: 'bg-[--right-panel-color-200]'
			"
			@click="emits('click', item.key)"
		>
			{{ item.title }}
		</button>
	</div>
</template>
