<script setup lang="ts">
import { defineModel } from 'vue'

import { Colors } from '@entities/Colors.ts'
import { Mode } from '@entities/Mode.ts'
import { modeIcons } from '@entities/modes/modeIcons'
import { modeText } from '@entities/modes/modeText'
import { useDisclosure } from '@shared/composables/useDisclosure.ts'

import { selectModeComputeCssVariables } from '../utils/selectModeComputeCssVariables.ts'

const mode = defineModel<Mode>('mode', { required: true })

// TODO: Refactor
const props = defineProps<{
	colors: Record<Mode, Colors>
}>()

const { value: opened, toggle, close } = useDisclosure(false)

function changeSelectedMode(newMode: Mode) {
	mode.value = newMode
	close()
}
</script>

<template>
	<div
		v-close-modal="close"
		class="relative whitespace-nowrap"
	>
		<button
			class="item-colors rounded-full border flex items-center gap-x-2 px-4 py-2 item-colors-selected cursor-pointer transition-all duration-100"
			:style="selectModeComputeCssVariables(props.colors[mode])"
			@click="toggle"
		>
			<component
				:is="modeIcons[mode]"
				class="w-6 h-6"
			/>
			{{ modeText[mode] }}
		</button>

		<div
			v-if="opened"
			class="absolute top-10 mt-2 flex flex-col rounded-xl overflow-hidden border border-black z-10"
		>
			<button
				v-for="mode in Object.values(Mode)"
				:key="mode"
				class="item-colors flex items-center gap-x-2 px-4 py-2 cursor-pointer transition-all duration-100"
				:style="selectModeComputeCssVariables(props.colors[mode])"
				@click="changeSelectedMode(mode)"
			>
				<component
					:is="modeIcons[mode]"
					class="w-6 h-6"
				/>
				{{ modeText[mode] }}
			</button>
		</div>
	</div>
</template>

<style scoped>
.item-colors {
	background: var(--select-mode-bg);
	border-color: var(--select-mode-border-color);
	color: var(--select-mode-color);
}

.item-colors:hover {
	background: var(--select-mode-bg-hover);
}

.item-colors-selected {
	border-color: var(--select-mode-selected-border-color);
}
</style>
