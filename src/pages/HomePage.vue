<script setup lang="ts">
import TimerDigit from '../components/TimerDigit.vue'
import SelectMode from '../components/SelectMode.vue'
import ControlButtons from '../components/ControlButtons.vue'

import { clickOutSide as vClickOutSide } from '@mahdikhashan/vue3-click-outside'

import { watchEffect, onMounted, ref, computed } from 'vue'
import { useTimer } from 'vue-timer-hook'
import { ModeItem } from '../types/ModeItem'

const currentApproach = ref(1)

const TIMER_POMODORO_MODE = 0.1 * 60 * 1000
const TIMER_SHORT_BREAK_MODE = 0.2 * 60 * 1000
const TIMER_LONG_BREAK_MODE = 0.3 * 60 * 1000

const timer = useTimer(Date.now() + TIMER_POMODORO_MODE, false)

function onPlayOrPauseClick() {
	console.log(timer.isRunning.value)

	if (timer.isRunning.value) {
		timer.pause()
		return
	}

	timer.start()
}

function onStopClick() {
	timer.restart(Date.now() + TIMER_POMODORO_MODE, false)
}

const selectedModeId = ref('pomodoro')

function onFastForwardClick() {
	const currentTimer =
		selectedModeId.value === 'pomodoro'
			? TIMER_POMODORO_MODE
			: selectedModeId.value === 'short'
			? TIMER_SHORT_BREAK_MODE
			: TIMER_LONG_BREAK_MODE

	timer.restart(Date.now() + currentTimer, false)

	currentApproach.value++

	if (currentApproach.value > 4) {
		currentApproach.value = 1
	}
}

onMounted(() => {
	watchEffect(async () => {
		if (timer.isExpired.value) {
			if (selectedModeId.value !== 'pomodoro') {
				currentApproach.value++

				if (selectedModeId.value === 'long') {
					currentApproach.value = 1
				}

				onSelectedModeChange('pomodoro')
				return
			}

			if (currentApproach.value >= 4) {
				onSelectedModeChange('long')
			} else {
				onSelectedModeChange('short')
			}
		}
	})
})

function onSelectedModeChange(id: ModeItem['id']) {
	selectedModeId.value = id

	if (id === 'pomodoro') {
		timer.restart(Date.now() + TIMER_POMODORO_MODE, false)
	}

	if (id === 'short') {
		timer.restart(Date.now() + TIMER_SHORT_BREAK_MODE, false)
	}

	if (id === 'long') {
		timer.restart(Date.now() + TIMER_LONG_BREAK_MODE, false)
	}
}

const className = computed(() =>
	selectedModeId.value === 'pomodoro'
		? 'bg-blue-50'
		: selectedModeId.value === 'short'
		? 'bg-green-50'
		: 'bg-red-50'
)
</script>

<template>
	<div
		:class="
			className +
			` font-['Roboto']  w-full h-full min-h-screen flex items-center justify-center pb-[15vh]`
		"
	>
		<div class="w-[450px] flex flex-col items-center">
			<SelectMode
				:model-value="selectedModeId"
				@update:model-value="onSelectedModeChange"
			/>

			<div class="py-16 flex flex-col justify-center">
				<div class="flex justify-center">
					<div
						class="rounded-full inline-flex gap-x-2 justify-center items-center px-4 py-2 hover:bg-blue-100 hover:cursor-pointer transition-all duration-200"
					>
						<div class="w-3 h-3 rounded-full bg-red-400"></div>
						<div class="">Pomodoro</div>
					</div>
				</div>

				<div
					class="text-center mt-6 text-[8rem] leading-[0.8] flex items-center"
				>
					<TimerDigit :digit="timer.minutes" />
					<span>:</span>
					<TimerDigit :digit="timer.seconds" />
				</div>

				<div class=""></div>

				<div class="mt-3 text-lg flex justify-center">
					<span class="text-blue-800">{{ currentApproach }}</span>
					<span class="text-blue-950">/4</span>
				</div>
			</div>

			<ControlButtons
				@stop="onStopClick"
				@play-or-pause="onPlayOrPauseClick"
				@fast-forward="onFastForwardClick"
				:is-running="timer.isRunning.value"
				:color="
					selectedModeId === 'pomodoro'
						? 'blue'
						: selectedModeId === 'short'
						? 'green'
						: 'red'
				"
			/>
		</div>
	</div>
</template>
