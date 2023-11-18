<script setup lang="ts">
import PlayIcon from '../assets/icons/play.svg'
import StopIcon from '../assets/icons/stop.svg'
import FastForwardIcon from '../assets/icons/fastForward.svg'
import PauseIcon from '../assets/icons/pause.svg'

const props = defineProps<{
	isRunning: boolean
	color: 'blue' | 'green' | 'red'
}>()
const emits = defineEmits<{
	(e: 'stop'): void
	(e: 'fastForward'): void
	(e: 'playOrPause'): void
}>()

const COLORS_DATA = {
	blue: {
		primary: 'bg-blue-400 text-blue-950 hover:bg-blue-500',
		secondary: 'bg-blue-200 text-blue-900 hover:bg-blue-300'
	},
	green: {
		primary: 'bg-green-400 text-green-950 hover:bg-green-500',
		secondary: 'bg-green-200 text-green-900 hover:bg-green-300'
	},
	red: {
		primary: 'bg-red-400 text-red-950 hover:bg-red-500',
		secondary: 'bg-red-200 text-red-900 hover:bg-red-300'
	}
}

console.log(props.color)
</script>

<template>
	<div class="flex justify-center items-center gap-x-2">
		<div class="">
			<button
				@click="emits('stop')"
				:class="
					COLORS_DATA[props.color].secondary +
					` inline text-lg px-4 py-4 rounded-2xl hover:shadow transition-all duration-200`
				"
			>
				<StopIcon class="w-5 h-5" />
			</button>
		</div>

		<div class="">
			<button
				@click="emits('playOrPause')"
				:class="
					COLORS_DATA[props.color].primary +
					` inline text-lg px-6 py-4 rounded-2xl hover:shadow transition-all duration-200`
				"
			>
				<PlayIcon
					v-if="!props.isRunning"
					class="w-7 h-7"
				/>
				<PauseIcon
					v-else
					class="w-7 h-7"
				/>
			</button>
		</div>

		<div class="">
			<button
				@click="emits('fastForward')"
				:class="
					COLORS_DATA[props.color].secondary +
					` inline text-lg px-4 py-4 rounded-2xl hover:shadow transition-all duration-200`
				"
			>
				<FastForwardIcon class="w-5 h-5" />
			</button>
		</div>
	</div>
</template>

<style scoped></style>
