<script setup lang="ts">
import HomePage from '@pages/home/ui/HomePage.vue'

import LeftPanel from '@components/LeftPanel/LeftPanel.vue'
import { useUserSettingsStore } from '@store/userSettingsStore.ts'

const userSettingsStore = useUserSettingsStore()
</script>

<template>
	<main class="main font-['Roboto'] w-full h-full min-h-screen pb-[15vh]">
		<LeftPanel />

		<div class="min-h-full flex items-center justify-center">
			<HomePage />
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
