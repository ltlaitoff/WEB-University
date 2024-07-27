import type { DefaultColors } from 'tailwindcss/types/generated/colors'

/**
 * List of all colors which we can use in app
 *
 * @author Ivan Shchedrovskyi
 */
export type Colors = keyof Omit<
	DefaultColors,
	'inherit' | 'current' | 'transparent' | 'black' | 'white'
>
