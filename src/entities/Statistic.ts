import { Category } from './Category'
import { Mode } from './Mode'

/**
 * Statistic record
 *
 * @author Ivan Shchedrovskyi
 */
export interface Statistic {
	_id: string
	date: string // Date as ISO string
	mode: Mode
	count: number
	// comment: string
	category: Category
}

/**
 * Type for update statistic record
 *
 * @author Ivan Shchedrovskyi
 */
export type AddNewStatistic = Omit<Statistic, '_id' | 'date'>
