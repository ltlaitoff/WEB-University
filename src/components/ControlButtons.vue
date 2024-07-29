<script setup lang="ts">
import { Colors } from '@entities/Colors'
import { States } from '@entities/States.ts'
import FastForwardIcon from '@shared/icons/fastForward.svg'
import PauseIcon from '@shared/icons/pause.svg'
import PlayIcon from '@shared/icons/play.svg'
import StopIcon from '@shared/icons/stop.svg'

const props = defineProps<{
	state: States
	color: Colors
}>()

const emits = defineEmits<{
	(e: 'stop-click'): void
	(e: 'main-click'): void
	(e: 'fast-forward-click'): void
}>()
</script>

<template>
	<div class="flex justify-center items-center gap-x-2">
		<div class="">
			<button
				@click="emits('stop-click')"
				class="secondary-button inline text-lg px-4 py-4 rounded-2xl hover:shadow transition-all duration-200"
			>
				<StopIcon class="w-5 h-5" />
			</button>
		</div>

		<div class="">
			<button
				@click="emits('main-click')"
				class="primary-button inline text-lg px-6 py-4 rounded-2xl hover:shadow transition-all duration-200"
			>
				<PlayIcon
					v-if="props.state === States.timerPaused"
					class="w-7 h-7"
				/>
				<PauseIcon
					v-if="props.state === States.timerRunning"
					class="w-7 h-7"
				/>
			</button>
		</div>

		<div class="">
			<button
				@click="emits('fast-forward-click')"
				class="secondary-button inline text-lg px-4 py-4 rounded-2xl hover:shadow transition-all duration-200"
			>
				<FastForwardIcon class="w-5 h-5" />
			</button>
		</div>
	</div>
</template>

<style scoped>
.primary-button {
	/**
	 * TODO: Use something like --mode-color-{number}
	 */
	background: v-bind('`var(--color-${props.color}-400)`');
	color: v-bind('`var(--color-${props.color}-950)`');
}

.primary-button:hover {
	background: v-bind('`var(--color-${props.color}-500)`');
}

.secondary-button {
	background: v-bind('`var(--color-${props.color}-200)`');
	color: v-bind('`var(--color-${props.color}-900)`');
}

.secondary-button:hover {
	background: v-bind('`var(--color-${props.color}-300)`');
}
</style>
