import { Ref, computed } from 'vue'

import { format, parse } from 'date-fns'

import { ONE_MINUTE, ONE_SECOND } from '@shared/constants/time.ts'

export function useTimeInput(
	model: Ref<number>,

	/**
	 * Min value in **seconds**
	 */
	min: number,

	/**
	 * Max value in **seconds**
	 */
	max: number
) {
	const inputValue = computed({
		get() {
			const date = new Date(model.value)
			const dateWithoutTimezone = new Date(
				date.getTime() + date.getTimezoneOffset() * ONE_MINUTE
			)

			return format(dateWithoutTimezone, 'HH:mm:ss')
		},
		set(value) {
			const valueAsDate = parse(value, 'HH:mm:ss', 0)

			model.value = _validateValue(
				valueAsDate.getTime() - valueAsDate.getTimezoneOffset() * ONE_MINUTE
			)
		}
	})

	const increment = () => {
		const date = new Date(model.value)
		const dateWithoutTimezone = new Date(
			date.getTime() + date.getTimezoneOffset() * ONE_MINUTE + ONE_MINUTE
		)

		inputValue.value = format(dateWithoutTimezone, 'HH:mm:ss')
	}

	const decrement = () => {
		const date = new Date(model.value)
		const dateWithoutTimezone = new Date(
			date.getTime() + date.getTimezoneOffset() * ONE_MINUTE - ONE_MINUTE
		)

		inputValue.value = format(dateWithoutTimezone, 'HH:mm:ss')
	}

	/**
	 * @private
	 */
	const _validateValue = (value: number) => {
		console.log('validate', value, min, max)

		if (min != undefined && value < min * ONE_SECOND) return min
		if (max != undefined && value > max * ONE_SECOND) return max

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
		// TODO: Fix problems
		if (max === Infinity) {
			return undefined
		}

		const date = new Date(max * ONE_SECOND)
		const dateForOut = new Date(
			date.valueOf() + date.getTimezoneOffset() * ONE_MINUTE
		)

		console.log(max, date, dateForOut)

		// TODO: Fix problems
		if (!dateForOut) {
			return undefined
		}

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
