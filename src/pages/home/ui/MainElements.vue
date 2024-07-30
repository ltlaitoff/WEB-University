<script setup lang="ts">
import { computed, onMounted, watchEffect } from 'vue'
import { useTimer } from 'vue-timer-hook'

import { Mode } from '@entities/Mode.ts'
import { States } from '@entities/States.ts'
import CurrentApproaches from '@pages/home/ui/CurrentApproaches.vue'

import CategorySelect from '@components/CategorySelect.vue'
import ControlButtons from '@components/ControlButtons.vue'
import SelectMode from '@components/SelectMode.vue'
import TimerTime from '@components/TimerTime.vue'
import { useStatistic } from '@store/statisticStore.ts'
import { useUserSettingsStore } from '@store/userSettingsStore.ts'

import { getNextMode } from '../model/getNextMode.ts'

const userSettings = useUserSettingsStore()
const statisticStore = useStatistic()

const selectedMode = computed(() => userSettings.selectedMode)

const timer = useTimer(Date.now() + userSettings.times[Mode.pomodoro], false)
// TODO: Remove / move to mounted
resetTimer()

function onPlayOrPauseClick() {
	if (timer.isRunning.value) {
		timer.pause()
		return
	}

	timer.start()
}

function onFastForwardClick() {
	const currentTimer = userSettings.times[selectedMode.value]

	timer.restart(Date.now() + currentTimer, false)

	incrementAndResetApproach()
}

function incrementAndResetApproach() {
	userSettings.currentApproach++

	if (userSettings.currentApproach > userSettings.settings.approachesCount) {
		userSettings.currentApproach = 1
	}
}

onMounted(() => {
	watchEffect(async () => {
		if (timer.isExpired.value) {
			const nextMode = getNextMode(
				selectedMode.value,
				userSettings.currentApproach
			)

			statisticStore.add({
				mode: selectedMode.value,
				count: userSettings.times[selectedMode.value],
				category: userSettings.settings.selectedCategory
			})

			onSelectedModeChange(nextMode)

			if (nextMode === Mode.pomodoro) {
				incrementAndResetApproach()
			}
		}
	})
})

function onSelectedModeChange(mode: Mode) {
	userSettings.setSelectedMode(mode)
	resetTimer(mode)
}

function resetTimer(mode: Mode = selectedMode.value) {
	timer.restart(Date.now() + userSettings.times[mode], false)
}

const state = computed(() => {
	return timer.isRunning.value ? States.timerRunning : States.timerPaused
})
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

			<CurrentApproaches
				:approaches-count="userSettings.settings.approachesCount"
				:current-approach="userSettings.currentApproach"
			/>
		</div>

		<ControlButtons
			@stop-click="resetTimer"
			@main-click="onPlayOrPauseClick"
			@fast-forward-click="onFastForwardClick"
			:state="state"
			:color="userSettings.getSelectedModeColor"
		/>
	</div>
</template>
