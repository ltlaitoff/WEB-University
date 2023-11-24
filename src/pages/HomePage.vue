<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useTimer } from 'vue-timer-hook'

import CategorySelect from '@components/CategorySelect.vue'
import ControlButtons from '@components/ControlButtons.vue'
import SelectMode from '@components/SelectMode.vue'
import TimerTime from '@components/TimerTime.vue'
import { useStatistic } from '@store/statisticStore'
import { useUserSettingsStore } from '@store/userSettingsStore'
import { Mode, ModeItem } from '@types'

const userSettings = useUserSettingsStore()
const statisticStore = useStatistic()

const currentApproach = ref(1)

const selectedMode = computed(() => userSettings.selectedMode)

const TIMER_POMODORO_MODE = computed(
	() => userSettings.times[Mode.pomodoro] * 60 * 1000
)
const TIMER_SHORT_BREAK_MODE = computed(
	() => userSettings.times[Mode.short] * 60 * 1000
)
const TIMER_LONG_BREAK_MODE = computed(
	() => userSettings.times[Mode.long] * 60 * 1000
)

const timer = useTimer(Date.now() + TIMER_POMODORO_MODE.value, false)
resetTimer()

userSettings.$subscribe(() => resetTimer())

function onPlayOrPauseClick() {
	console.log(timer.isRunning.value)

	if (timer.isRunning.value) {
		timer.pause()
		return
	}

	timer.start()
}

function onFastForwardClick() {
	const currentTimer =
		selectedMode.value === Mode.pomodoro
			? TIMER_POMODORO_MODE
			: selectedMode.value === Mode.short
			? TIMER_SHORT_BREAK_MODE
			: TIMER_LONG_BREAK_MODE

	timer.restart(Date.now() + currentTimer.value, false)

	currentApproach.value++

	if (currentApproach.value > 4) {
		currentApproach.value = 1
	}
}

onMounted(() => {
	watchEffect(async () => {
		if (timer.isExpired.value) {
			if (selectedMode.value !== Mode.pomodoro) {
				currentApproach.value++

				if (selectedMode.value === Mode.short) {
					currentApproach.value = 1

					statisticStore.add({
						_id: String(Date.now()),
						date: String(Date.now() - TIMER_LONG_BREAK_MODE.value),
						mode: selectedMode.value,
						count: TIMER_LONG_BREAK_MODE.value,
						category: userSettings.settings.selectedCategory
					})
				} else {
					statisticStore.add({
						_id: String(Date.now()),
						date: String(Date.now() - TIMER_SHORT_BREAK_MODE.value),
						mode: selectedMode.value,
						count: TIMER_SHORT_BREAK_MODE.value,
						category: userSettings.settings.selectedCategory
					})
				}

				onSelectedModeChange(Mode.pomodoro)
				return
			}

			statisticStore.add({
				_id: String(Date.now()),
				date: String(Date.now() - TIMER_POMODORO_MODE.value),
				mode: selectedMode.value,
				count: TIMER_POMODORO_MODE.value,
				category: userSettings.settings.selectedCategory
			})

			if (currentApproach.value >= 4) {
				onSelectedModeChange(Mode.long)
			} else {
				onSelectedModeChange(Mode.short)
			}
		}
	})
})

function onSelectedModeChange(id: ModeItem['id']) {
	userSettings.setSelectedMode(id)
	resetTimer(id)
}

function resetTimer(mode: Mode = selectedMode.value) {
	if (mode === Mode.pomodoro) {
		timer.restart(Date.now() + TIMER_POMODORO_MODE.value, false)
	}

	if (mode === Mode.short) {
		timer.restart(Date.now() + TIMER_SHORT_BREAK_MODE.value, false)
	}

	if (mode === Mode.long) {
		timer.restart(Date.now() + TIMER_LONG_BREAK_MODE.value, false)
	}
}
</script>

<template>
	<div class="w-[450px] flex flex-col items-center">
		<SelectMode
			:model-value="userSettings.selectedMode"
			@update:model-value="onSelectedModeChange"
			:colors="userSettings.colors"
		/>

		<div class="py-16 flex flex-col justify-center">
			<CategorySelect v-model="userSettings.settings.selectedCategory" />

			<TimerTime
				:hours="timer.hours.value"
				:minutes="timer.minutes.value"
				:seconds="timer.seconds.value"
			/>

			<div class="mt-3 text-lg flex justify-center text-">
				<span class="text-blue-800">{{ currentApproach }}</span>
				<span class="text-blue-950">/4</span>
			</div>
		</div>

		<ControlButtons
			@stop="resetTimer"
			@play-or-pause="onPlayOrPauseClick"
			@fast-forward="onFastForwardClick"
			:is-running="timer.isRunning.value"
			:color="userSettings.colors[userSettings.settings.selectedMode]"
		/>
	</div>
</template>
