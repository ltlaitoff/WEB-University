<script setup lang="ts">
import { computed } from 'vue'

import ModeShield from '@features/modes/ui/ModeShield.vue'
import TrashIcon from '@shared/icons/trash.svg'
import { useStatistic } from '@shared/store/statisticStore.ts'
import { useUserSettingsStore } from '@shared/store/userSettingsStore.ts'

const statisticStore = useStatistic()

const statisticForOutput = computed(() => {
	// Move to helpers
	return statisticStore.statistic.toSorted((a, b) => {
		return Number(b.date) - Number(a.date)
	})
})

// TODO: Move it to props
const userSettings = useUserSettingsStore()
</script>

<template>
	<div
		class="pl-6 pr-6 py-6 w-full h-full flex flex-col gap-y-4 overflow-y-scroll"
	>
		<div class="text-center text-2xl">{{ $t('statistic.title') }}</div>

		<div
			v-for="item in statisticForOutput"
			:key="item._id"
			class="flex w-full gap-x-2"
		>
			<div class="w-full flex flex-col gap-y-1">
				<div class="flex justify-between gap-x-5 items-center">
					<span class="ml-2 font-bold text-lg">
						{{ new Date(item.count).toISOString().substring(14, 19) }}
					</span>

					<span class="">
						{{ new Date(item.date).toLocaleString('en-GB') }}
					</span>
				</div>

				<div class="flex justify-between gap-x-4">
					<ModeShield
						:mode="item.mode"
						:color="userSettings.colors()[item.mode]"
					/>

					<div
						class="flex gap-x-2 items-center hover:bg-blue-100 hover:cursor-pointer transition-all duration-200"
					>
						<div
							class="w-3 h-3 rounded-full"
							:style="{
								backgroundColor: `var(--color-${item.category.color}-400)`
							}"
						></div>
						<div class="">{{ item.category.name }}</div>
					</div>
				</div>
			</div>

			<div class="flex justify-center items-center">
				<button
					class="group flex items-center justify-center px-2 py-2 rounded-xl hover:bg-slate-100 transition-all duration-200"
					@click="statisticStore.delete(item)"
				>
					<TrashIcon
						class="h-7 w-7 text-slate-100 group-hover:text-red-500 transition-all duration-200"
					/>
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
