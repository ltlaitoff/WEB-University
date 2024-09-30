<script setup lang="ts">
import { ref } from 'vue'

import { Category } from '@entities/Category'
import { useCategoryStore } from '@shared/store/categoriesStore.ts'

// TODO: Refactor
const props = defineProps<{
	modelValue: Category
}>()

// TODO: Refactor
const emit = defineEmits<{
	(e: 'update:modelValue', category: Category): void
}>()

// TODO: Remove store connect and use props instead
const categoryStore = useCategoryStore()

const opened = ref(false)

function onChange(category: Category) {
	emit('update:modelValue', category)
	// TODO: Add close on escape
	opened.value = false
}

function toggleOpened() {
	opened.value = !opened.value
}

function hideSelect() {
	opened.value = false
}
</script>

<template>
	<div
		v-close-modal="hideSelect"
		class="flex justify-center relative"
	>
		<button
			class="item rounded-full inline-flex gap-x-2 justify-center items-center px-4 py-2 hover:bg-blue-100 hover:cursor-pointer transition-all duration-200"
			:style="{
				'--category-select-cicle-bg': `var(--color-${props.modelValue.color}-400)`,
				'--category-select-bg-hover': `var(--color-${props.modelValue.color}-100)`
			}"
			@click="toggleOpened"
		>
			<div class="circle w-3 h-3 rounded-full item-colors"></div>
			<div class="">{{ props.modelValue.name }}</div>
		</button>

		<div
			v-if="opened"
			class="absolute max-h-[200px] overflow-scroll top-10 mt-2 flex flex-col rounded-xl overflow-hidden border border-black z-10"
		>
			<button
				v-for="item in categoryStore.categories"
				:key="item._id"
				class="item flex items-center gap-x-2 px-4 py-2 cursor-pointer transition-all duration-100"
				:style="{
					'--category-select-cicle-bg': `var(--color-${item.color}-400)`,
					'--category-select-color': `var(--color-${item.color}-100)`,
					'--category-select-bg-hover': `var(--color-${item.color}-200)`
				}"
				@click="() => onChange(item)"
			>
				{{ item.name }}
			</button>
		</div>
	</div>
</template>

<style scoped>
.circle {
	background: var(--category-select-cicle-bg);
}

.item {
	background: var(--category-select-color);
}

.item:hover {
	background: var(--category-select-bg-hover);
}
</style>
