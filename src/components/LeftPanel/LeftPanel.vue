<script setup lang="ts">
import { reactive } from 'vue'

import tailwindColors from 'tailwindcss/colors'

import { useUserSettingsStore } from '@store/userSettingsStore'
import { LeftPanelModes } from '@types'

import CategoryPanel from './CategoryPanel.vue'
import PanelButtons from './PanelButtons.vue'
import SettingsPanel from './SettingsPanel.vue'
import StatisticPanel from './StatisticPanel.vue'

const userSettings = useUserSettingsStore()

const LeftPanelSettings = reactive<{
	isOpened: boolean
	mode: LeftPanelModes
}>({
	isOpened: false,
	mode: 'statistic'
})

function onClick(mode: LeftPanelModes) {
	if (LeftPanelSettings.mode === mode) {
		LeftPanelSettings.isOpened = !LeftPanelSettings.isOpened
		return
	}

	LeftPanelSettings.mode = mode
	LeftPanelSettings.isOpened = true
}
</script>

<template>
	<div
		class="element absolute h-full transition-all duration-700 -translate-x-[450px] ease-in-out flex"
		:class="LeftPanelSettings.isOpened ? 'translate-x-0' : ''"
		:style="{
			'--right-panel-color-200':
				tailwindColors[userSettings.colors[userSettings.settings.selectedMode]][
					'200'
				],
			'--right-panel-color-300':
				tailwindColors[userSettings.colors[userSettings.settings.selectedMode]][
					'300'
				],
			'--right-panel-color-950':
				tailwindColors[userSettings.colors[userSettings.settings.selectedMode]][
					'950'
				]
		}"
	>
		<div
			class="w-[450px] z-10 bg-white border-r-[2px] border-[--right-panel-color-300] shadow"
		>
			<StatisticPanel v-if="LeftPanelSettings.mode === 'statistic'" />
			<SettingsPanel v-if="LeftPanelSettings.mode === 'settings'" />
			<CategoryPanel v-if="LeftPanelSettings.mode === 'category'" />
		</div>

		<PanelButtons
			:isOpened="LeftPanelSettings.isOpened"
			:mode="LeftPanelSettings.mode"
			@click="onClick"
		/>
	</div>
</template>
