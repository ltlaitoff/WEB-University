import { defineStore } from 'pinia'

import { Statistic } from '@types'

interface StatisticStore {
	statistic: Statistic[]
}

export const useStatistic = defineStore('statistic', {
	state: (): StatisticStore => ({
		statistic: []
	}),

	actions: {
		add(statisticItem: Statistic) {
			this.statistic.push(statisticItem)
		},
		delete(statisticItem: Statistic) {
			this.statistic = this.statistic.filter(
				item => item._id !== statisticItem._id
			)
		}
	},

	persist: true
})
