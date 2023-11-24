import { defineStore } from 'pinia'

import { AddNewCategory, Category } from '@types'

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
		add(payload: AddNewCategory) {
			this.categories.push({
				_id: String(new Date(Date.now()).getTime()),
				mode: 'time',
				...payload
			})
		},

		delete(categoriesItem: Category) {
			this.categories = this.categories.filter(
				item => item._id !== categoriesItem._id
			)
		}
	},

	persist: true
})
