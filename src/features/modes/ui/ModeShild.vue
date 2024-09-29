<script setup lang="ts">
import { Colors } from '@entities/Colors.ts'
import { Mode } from '@entities/Mode'
import { modeText } from '@entities/modes/modeText'

interface ModeShieldProps {
	mode: Mode
	color: Colors
}

const props = defineProps<ModeShieldProps>()
</script>

<template>
	<div>
		<div
			class="inline-block px-4 py-1 rounded-2xl"
			:style="{
				background: `var(--color-${props.color}-100)`,
				color: `var(--color-${props.color}-950)`
			}"
		>
			{{ modeText[props.mode] }}
		</div>
	</div>
</template>
