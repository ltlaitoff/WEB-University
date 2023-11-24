<script setup lang="ts">
import RightPanel from './components/RightPanel/RightPanel.vue'
import tailwindColors from 'tailwindcss/colors'
import HomePage from './pages/HomePage.vue'
import { useUserSettingsStore } from '@store/userSettingsStore'

const userSettings = useUserSettingsStore()
console.log(
	tailwindColors[userSettings.colors[userSettings.settings.selectedMode]]
)
</script>

<template>
	<main class="main font-['Roboto'] w-full h-full min-h-screen pb-[15vh]">
		<RightPanel />

		<div class="min-h-full flex items-center justify-center">
			<HomePage />
		</div>
	</main>
</template>

<style scoped>
.main {
	background: v-bind(
		'tailwindColors[userSettings.colors[userSettings.settings.selectedMode]]["50"]'
	);
}
</style>
