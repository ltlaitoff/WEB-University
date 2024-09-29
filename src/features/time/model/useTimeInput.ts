import { ModelRef, computed } from 'vue'

import { format, parse } from 'date-fns'

import { ONE_MINUTE, ONE_SECOND } from '@shared/constants/time.ts'

export function useTimeInput(time: ModelRef<number>, min: number, max: number) {
	const inputValue = computed({
		get() {
			return format(time.value, 'HH:mm:ss')
		},
		set(value) {
			const valueAsDate = parse(value, 'HH:mm:ss', new Date().setTime(0))

			time.value = validateValue(valueAsDate.getTime())
		}
	})

	const increment = () => {
		time.value += ONE_MINUTE
	}

	const decrement = () => {
		time.value -= ONE_MINUTE
	}

	const validateValue = (value: number) => {
		if (min != undefined && value < min) return min
		if (max != undefined && value > max) return max

		return value
	}

	const minValueAsDate = computed(() => {
		const date = new Date(min * ONE_SECOND)
		const dateForOut = new Date(
			date.valueOf() + date.getTimezoneOffset() * ONE_MINUTE
		)

		return format(dateForOut, 'HH:mm:ss')
	})

	const maxValueAsDate = computed(() => {
		const date = new Date(max * ONE_SECOND)
		const dateForOut = new Date(
			date.valueOf() + date.getTimezoneOffset() * ONE_MINUTE
		)

		return format(dateForOut, 'kk:mm:ss')
	})

	return {
		inputValue,
		increment,
		decrement,
		minValueAsDate,
		maxValueAsDate
	}
}
