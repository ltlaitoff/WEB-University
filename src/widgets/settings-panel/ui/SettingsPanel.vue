<i18n>
{
  "en": {
    "Approaches count:": "Approaches count:"
  }
}
</i18n>

<script setup lang="ts">
import { Mode } from '@entities/Mode'
import NumberInput from '@features/base-inputs/ui/NumberInput.vue'
import ColorPicker from '@features/colors/ui/ColorPicker.vue'
import ModeShield from '@features/modes/ui/ModeShield.vue'
import TimeInput from '@features/time/ui/TimeInput.vue'
import { useUserSettingsStore } from '@shared/store/userSettingsStore.ts'

const userSettings = useUserSettingsStore()

const modes: Mode[] = Object.values(Mode) as Mode[]
</script>

<template>
	<div
		class="pl-6 pr-6 py-6 w-[450px] max-md:pb-6 max-md:w-full h-full flex flex-col gap-y-2 overflow-y-scroll"
	>
		<div class="text-center text-2xl">{{ $t('settings.title') }}</div>

		<div class="flex flex-col gap-y-10">
			<div class="flex flex-col gap-y-10">
				<div
					v-for="mode of modes"
					:key="mode"
					class="flex flex-col gap-y-4"
				>
					<ModeShield
						:mode="mode"
						:color="userSettings.colors[mode]"
					/>

					<TimeInput
						v-model="userSettings.settings.times[mode]"
						class="ml-1"
						:min="1"
					/>

					<ColorPicker
						class="ml-1"
						:value="userSettings.colors[mode]"
						@change="value => userSettings.setColor(mode, value)"
					/>
				</div>
				<div class="">
					<div class="px-4 text-lg">{{ $t('Approaches count:') }}</div>
					<NumberInput
						v-model="userSettings.settings.approachesCount"
						class="ml-1 mt-1"
						:max="100"
						:min="1"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
