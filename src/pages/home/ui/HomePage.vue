<script setup lang="ts">
import { useUserSettingsStore } from '@shared/store/userSettingsStore.ts'

import LeftPanel from './LeftPanel.vue'
import MainElements from './MainElements.vue'

const userSettingsStore = useUserSettingsStore()
</script>

<template>
	<main class="main font-['Roboto'] w-full h-full min-h-screen pb-[15vh]">
		<LeftPanel />

		<div class="min-h-full flex items-center justify-center">
			<MainElements />
		</div>
	</main>
</template>

<style scoped>
.main {
	background: v-bind(
		'`var(--color-${userSettingsStore.getSelectedModeColor}-50)`'
	);
}
</style>
