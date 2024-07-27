<script setup lang="ts">
import tailwindColors from 'tailwindcss/colors'

import { Mode } from '@entities/Mode'

import { modeText } from '@constants'
import { useUserSettingsStore } from '@store/userSettingsStore'

const props = defineProps<{
	mode: Mode
}>()

const userSettings = useUserSettingsStore()
</script>

<template>
	<div>
		<div
			class="inline-block px-4 py-1 rounded-2xl"
			:style="{
				background: tailwindColors[userSettings.colors[props.mode]]['100'],
				color: tailwindColors[userSettings.colors[props.mode]]['950']
			}"
		>
			{{ modeText[props.mode] }}
		</div>
	</div>
</template>
