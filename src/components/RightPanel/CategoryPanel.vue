<script setup lang="ts">
import { ref } from 'vue'
import CategoryForm from './CategoryForm.vue'
import { clickOutSide as vClickOutSide } from '@mahdikhashan/vue3-click-outside'
import tailwindColors from 'tailwindcss/colors'
import TrashIcon from '@assets/icons/trash.svg'
import { useCategoryStore } from '@store/categoriesStore'

const modalOpened = ref(false)

const categoryStore = useCategoryStore()

function closeModal() {
	modalOpened.value = false
}
</script>

<template>
	<div class="pl-6 pr-6 py-6 w-[450px] h-full flex flex-col gap-y-2">
		<div class="text-center text-2xl">Categories</div>

		<div
			class="relative"
			v-click-out-side="closeModal"
		>
			<button
				class="border px-4 py-2 bg-white border-slate-400 rounded-xl text-slate-700 hover:bg-slate-100 transition-all duration-200"
				@click="modalOpened = !modalOpened"
			>
				Add category
			</button>

			<CategoryForm
				class="top-12 z-50 bg-white"
				@close="closeModal"
				v-if="modalOpened"
			/>
		</div>

		<div class="flex flex-col gap-y-2">
			<div
				class="flex justify-between transition-all duration-200"
				v-for="category of categoryStore.categories"
				:key="category._id"
			>
				<div class="flex gap-x-2 items-center">
					<div
						class="w-3 h-3 rounded-full bg-red-400 bg-[--category-panel-bg]"
						:style="{
							'--category-panel-bg': tailwindColors[category.color]['400']
						}"
					></div>
					<div class="text-lg">{{ category.name }}</div>
				</div>

				<button
					v-if="category._id !== '0'"
					class="group flex items-center justify-center px-2 py-2 rounded-xl hover:bg-slate-100 transition-all duration-200"
					@click="categoryStore.delete(category)"
				>
					<TrashIcon
						class="h-7 w-7 text-slate-100 group-hover:text-red-500 transition-all duration-200"
					/>
				</button>
			</div>
		</div>
	</div>
</template>
<style scoped></style>
