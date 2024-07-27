import { Colors } from './Colors'

/**
 * Category interface
 *
 * @author Ivan Shchedrovskyi
 */
export interface Category {
	_id: string
	name: string
	mode: 'time' // Тільки time, number для помідорок не потрібен
	color: Colors

	// TODO
	// comment: string
	// order: number
	// dimension?: string
	// group: string[]
	// archived: boolean
	// trash: boolean
	// trash_expires: number
}

/**
 * Type for update category
 *
 * @author Ivan Shchedrovskyi
 */
export type AddNewCategory = Omit<Category, '_id' | 'mode'>
