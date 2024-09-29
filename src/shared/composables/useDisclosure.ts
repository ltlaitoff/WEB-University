import { ref } from 'vue'

export function useDisclosure(defaultValue = false) {
	const value = ref(defaultValue)

	const toggle = () => {
		value.value = !value.value
	}

	const close = () => {
		value.value = false
	}

	const open = () => {
		value.value = true
	}

	return {
		value,
		open,
		toggle,
		close
	}
}
