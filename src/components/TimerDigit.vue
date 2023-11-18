<script setup>
import { computed } from 'vue'

const props = defineProps({
	digit: {
		type: Number,
		require: true
	},
	title: {
		type: String,
		require: false
	}
})

const leftDigit = computed(() =>
	props.digit.value >= 10 ? props.digit.value.toString()[0] : '0'
)
const rightDigit = computed(() =>
	props.digit.value >= 10
		? props.digit.value.toString()[1]
		: props.digit.value.toString()
)
</script>

<template>
	<div class="container">
		<span class="title">{{ title }}</span>
		<div class="digital-container">
			<span class="single-digit">
				{{ leftDigit }}
			</span>
			<span class="single-digit">
				{{ rightDigit }}
			</span>
		</div>
	</div>
</template>
