<script setup lang="ts">
import ColorPicker from '@components/ColorPicker.vue'
import NumberInput from '@components/NumberInput.vue'
import { useUserSettingsStore } from '@store/userSettingsStore'
import ModeShild from '@components/ModeShild.vue'
import { Mode } from '@types'

const userSettings = useUserSettingsStore()

const modes: Mode[] = ['pomodoro', 'short', 'long']
</script>

<template>
	<div class="pl-6 pr-6 py-6 w-[450px] h-full flex flex-col gap-y-2">
		<div class="text-center text-2xl">Settings</div>

		<div class="flex flex-col gap-y-10">
			<div class="flex flex-col gap-y-10">
				<div
					class="flex flex-col gap-y-4"
					v-for="mode of modes"
					:key="mode"
				>
					<ModeShild :mode="mode" />

					<NumberInput
						class="ml-1"
						v-model="userSettings.settings.times[mode]"
						:max="1439"
						:min="1"
					/>

					<ColorPicker
						class="ml-1"
						:value="userSettings.colors[mode]"
						@change="value => userSettings.setColor(mode, value)"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
