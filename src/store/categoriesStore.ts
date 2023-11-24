import { defineStore } from 'pinia'

import { Category } from '@types'

interface CategoryStore {
	categories: Category[]
}

export const useCategoryStore = defineStore('category', {
	state: (): CategoryStore => ({
		categories: [
			{
				_id: '0',
				color: 'red',
				mode: 'time',
				name: 'Pomodoro'
			}
		]
	}),

	actions: {
		add(categoriesItem: Category) {
			this.categories.push(categoriesItem)
		},

		delete(categoriesItem: Category) {
			this.categories = this.categories.filter(
				item => item._id !== categoriesItem._id
			)
		}
	},

	persist: true
})
