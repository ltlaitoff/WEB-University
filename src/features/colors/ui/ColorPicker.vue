<script setup lang="ts">
import { Colors } from '@entities/Colors'
import { getTailwindColorsWithoutIgnored } from '@shared/utils/colors/getTailwindColorsWithoutIgnored.ts'

// TODO: Refactor to use v-model

interface ColorPickerProps {
	value: Colors
	size?: 'sm' | 'md'
}

interface ColorPickerEmits {
	(event: 'change', value: Colors): void
}

const props = withDefaults(defineProps<ColorPickerProps>(), {
	size: 'md'
})

const emits = defineEmits<ColorPickerEmits>()

const colorsForOutput = getTailwindColorsWithoutIgnored()

function onClick(value: Colors) {
	emits('change', value)
}
</script>

<template>
	<div class="flex flex-wrap gap-x-2 gap-y-2">
		<button
			v-for="(colorValue, color) in colorsForOutput"
			:key="color.toString()"
			type="button"
			class="rounded-full"
			:class="{
				'w-6 h-6': props.size !== 'sm',
				'w-5 h-5': props.size === 'sm'
			}"
			:style="{
				background: colorValue['400'],
				border: props.value === color ? '2px solid black' : ''
			}"
			@click="onClick(color)"
		></button>
	</div>
</template>

<style scoped></style>
