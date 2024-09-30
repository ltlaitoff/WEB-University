<script setup lang="ts">
import { reactive, ref } from 'vue'

import { useUserSettingsStore } from '@shared/store/userSettingsStore.ts'
import CategoryPanel from '@widgets/category-panel/ui/CategoryPanel.vue'
import SettingsPanel from '@widgets/settings-panel/ui/SettingsPanel.vue'
import StatisticPanel from '@widgets/statistic-panel/ui/StatisticPanel.vue'

import { LeftPanelStates } from '../entities/LeftPanelStates.ts'
import PanelButtons from './PanelButtons.vue'

const userSettingsStore = useUserSettingsStore()

interface LeftPanelSettingsType {
	isOpened: boolean
	mode: LeftPanelStates
}

const LeftPanelSettings = reactive<LeftPanelSettingsType>({
	isOpened: false,
	mode: 'statistic'
})

function onClick(mode: LeftPanelStates) {
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
				borderColor: `var(--color-${userSettingsStore.getSelectedModeColor}-300)`
			}"
		>
			<StatisticPanel v-if="LeftPanelSettings.mode === 'statistic'" />
			<SettingsPanel v-if="LeftPanelSettings.mode === 'settings'" />
			<CategoryPanel v-if="LeftPanelSettings.mode === 'category'" />
		</div>

		<PanelButtons
			:is-opened="LeftPanelSettings.isOpened"
			:mode="LeftPanelSettings.mode"
			:burger-opened="false"
			@click="onClick"
			@burger-toggle="() => {}"
		/>
	</div>

	<div class="max-md:flex hidden">
		<div
			v-if="LeftPanelSettings.isOpened"
			class="absolute w-full h-full bg-white border-r-[2px] z-20"
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
			:is-opened="LeftPanelSettings.isOpened"
			:mode="LeftPanelSettings.mode"
			:burger-opened="burgerMenuOpened"
			@click="onClick"
			@burger-toggle="toggleBurgerMenu"
		/>
	</div>
</template>
