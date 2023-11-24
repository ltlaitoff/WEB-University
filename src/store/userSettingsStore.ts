import { defineStore } from 'pinia'

import { Category, Colors, Mode } from '@types'

interface UserSettingsStore {
	settings: {
		colors: Record<Mode, Colors>
		times: Record<Mode, number>
		selectedMode: Mode
		selectedCategory: Category
	}
}

export const useUserSettingsStore = defineStore('settings', {
	state(): UserSettingsStore {
		return {
			settings: {
				colors: {
					[Mode.pomodoro]: 'blue',
					[Mode.short]: 'purple',
					[Mode.long]: 'red'
				},
				times: {
					[Mode.pomodoro]: 3 / 60,
					[Mode.short]: 4 / 60,
					[Mode.long]: 5 / 60
				},
				selectedMode: Mode.pomodoro,
				selectedCategory: {
					_id: '0',
					color: 'red',
					mode: 'time',
					name: 'Pomodoro'
				}
			}
		}
	},
	getters: {
		colors: state => state.settings.colors,
		times: state => state.settings.times,
		selectedMode: state => state.settings.selectedMode
	},
	actions: {
		setColor(mode: Mode, color: Colors) {
			this.settings.colors[mode] = color
		},
		setSelectedMode(mode: Mode) {
			this.settings.selectedMode = mode
		}
	},
	persist: true
})
