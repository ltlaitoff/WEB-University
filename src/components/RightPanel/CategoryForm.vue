<script setup lang="ts">
import { ref } from 'vue'

import ColorPicker from '@components/ColorPicker.vue'
import { useCategoryStore } from '@store/categoriesStore'
import { Colors } from '@types'

const categoriesStore = useCategoryStore()
const name = ref('')
const color = ref<Colors>('fuchsia')

const emits = defineEmits<{
	(event: 'close'): void
}>()

const touched = ref(false)

function submit(e: Event) {
	e.preventDefault()

	if (name.value.length === 0) {
		touched.value = true
		return
	}

	categoriesStore.add({
		_id: String(Date.now()),
		name: name.value,
		mode: 'time',
		color: color.value
	})

	emits('close')
}
</script>

<template>
	<form
		@submit="submit"
		class="absolute max-w-[300px] shadow rounded-lg px-4 py-4 flex flex-col gap-y-6 border border-black"
	>
		<label class="flex gap-x-2 items-center">
			<div class="text-slate-800">Name:</div>
			<input
				class="w-full border border-slate-400 px-2 py-1 rounded-md"
				:class="{
					'border-red-400': touched && name.length === 0
				}"
				type="text"
				v-model="name"
				@input="() => (touched = true)"
			/>
		</label>

		<label class="flex flex-col gap-y-2">
			<ColorPicker
				size="sm"
				:value="color"
				@change="value => (color = value)"
			/>
		</label>

		<div
			v-if="touched && name.length === 0"
			class="text-red-600 text-center"
		>
			Not valid name!
		</div>

		<button
			class="w-full bg-green-400 py-2 rounded-md text-white hover:bg-green-500"
		>
			Add
		</button>
	</form>
</template>

<style scoped></style>
