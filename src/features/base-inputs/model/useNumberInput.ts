import { ModelRef, computed } from 'vue'

export const useNumberInput = (
	model: ModelRef<number>,
	min: number,
	max: number
) => {
	const inputValue = computed({
		get() {
			console.log('model get value', model.value)
			return model.value
		},
		set(value) {
			model.value = _validateValue(value)
		}
	})

	const increment = () => {
		inputValue.value += 1
	}

	const decrement = () => {
		inputValue.value -= 1
	}

	/**
	 * @private
	 */
	const _validateValue = (value: number) => {
		if (min != undefined && value < min) return min
		if (max != undefined && value > max) return max

		return value
	}

	return {
		inputValue,
		increment,
		decrement
	}
}
