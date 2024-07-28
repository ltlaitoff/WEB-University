<script setup lang="ts">
import { reactive, ref } from 'vue'

import { LeftPanelModes } from '@components/LeftPanelModes.ts'
import { useUserSettingsStore } from '@store/userSettingsStore'

import CategoryPanel from './CategoryPanel.vue'
import PanelButtons from './PanelButtons.vue'
import SettingsPanel from './SettingsPanel.vue'
import StatisticPanel from './StatisticPanel.vue'

const { getSelectedModeColor } = useUserSettingsStore()

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

const burgerMenuOpened = ref(false)

function toggleBurgerMenu() {
	burgerMenuOpened.value = !burgerMenuOpened.value
}
</script>

<template>
	<div
		class="element absolute h-full transition-all duration-700 -translate-x-[450px] ease-in-out flex z-10 max-md:hidden"
		:class="LeftPanelSettings.isOpened ? 'translate-x-0' : ''"
	>
		<div
			:class="`w-[450px] z-10 bg-white border-r-[2px] shadow`"
			:style="{
				borderColor: `var(--color-${getSelectedModeColor}-300)`
			}"
		>
			<StatisticPanel v-if="LeftPanelSettings.mode === 'statistic'" />
			<SettingsPanel v-if="LeftPanelSettings.mode === 'settings'" />
			<CategoryPanel v-if="LeftPanelSettings.mode === 'category'" />
		</div>

		<PanelButtons
			:isOpened="LeftPanelSettings.isOpened"
			:mode="LeftPanelSettings.mode"
			@click="onClick"
			:burgerOpened="false"
			@burgerToggle="() => {}"
		/>
	</div>

	<div class="max-md:flex hidden">
		<div
			class="absolute w-full h-full bg-white border-r-[2px] z-20"
			v-if="LeftPanelSettings.isOpened"
		>
			<StatisticPanel v-if="LeftPanelSettings.mode === 'statistic'" />
			<SettingsPanel v-if="LeftPanelSettings.mode === 'settings'" />
			<CategoryPanel v-if="LeftPanelSettings.mode === 'category'" />
		</div>

		<button
			v-if="LeftPanelSettings.isOpened"
			class="absolute top-5 right-5 w-8 h-8 bg-slate-200 rounded-lg z-50 flex items-center justify-center"
			:class="burgerMenuOpened ? 'gap-y-[0px]' : 'gap-y-[5px]'"
			@click="() => (LeftPanelSettings.isOpened = false)"
		>
			<div class="flex flex-col gap-y-[3px]">
				<div class="bg-black w-[15px] h-[2px] rounded-full rotate-45"></div>
				<div
					class="bg-black w-[15px] h-[2px] rounded-full -mt-[5px] -rotate-45"
				></div>
			</div>
		</button>

		<PanelButtons
			:isOpened="LeftPanelSettings.isOpened"
			:mode="LeftPanelSettings.mode"
			@click="onClick"
			:burgerOpened="burgerMenuOpened"
			@burgerToggle="toggleBurgerMenu"
		/>
	</div>
</template>
