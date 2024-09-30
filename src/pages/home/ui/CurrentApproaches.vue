<script setup lang="ts">
interface CurrentApproachesProps {
	currentApproach: number
	approachesCount: number
}

const props = defineProps<CurrentApproachesProps>()
</script>

<template>
	<div class="mt-3 text-lg flex justify-center text-">
		<span class="text-blue-800">
			{{ props.currentApproach }}
		</span>
		<span class="text-blue-950">/</span>
		<span class="text-blue-950">
			{{ props.approachesCount }}
		</span>
	</div>
</template>
