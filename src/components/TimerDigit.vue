<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
	digit: number
}>()

const leftDigit = computed(() =>
	props.digit >= 10 ? props.digit.toString()[0] : '0'
)
const rightDigit = computed(() =>
	props.digit >= 10 ? props.digit.toString()[1] : props.digit.toString()
)
</script>

<template>
	<span class="single-digit">
		{{ leftDigit }}
	</span>
	<span class="single-digit">
		{{ rightDigit }}
	</span>
</template>
