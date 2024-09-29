<script setup lang="ts">
import { computed } from 'vue'

import { Mode } from '@entities/Mode'
import { modeText } from '@entities/modes/modeText'

import { useUserSettingsStore } from '@store/userSettingsStore'

const props = defineProps<{
	mode: Mode
}>()

const userSettings = useUserSettingsStore()
const userColor = computed(() => userSettings.colors[props.mode])
</script>

<template>
	<div>
		<div
			class="inline-block px-4 py-1 rounded-2xl"
			:style="{
				background: `var(--color-${userColor}-100)`,
				color: `var(--color-${userColor}-950)`
			}"
		>
			{{ modeText[props.mode] }}
		</div>
	</div>
</template>
