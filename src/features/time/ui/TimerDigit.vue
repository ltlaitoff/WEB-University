<script setup lang="ts">
import { formatDigit } from '@features/time/utils/formatDigit.ts'

interface TimerDigitProps {
	digit: number
}

const props = defineProps<TimerDigitProps>()
</script>

<template>
	<span>
		{{ formatDigit(props.digit) }}
	</span>
</template>
