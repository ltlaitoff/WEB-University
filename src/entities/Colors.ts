import type { DefaultColors } from 'tailwindcss/types/generated/colors'

import { IgnoredColors } from '@shared/constants/tailwindColorsIgnore.ts'

/**
 * List of all colors with values
 *
 * @author Ivan Shchedrovskyi
 */
export type ColorsWithValues = Omit<DefaultColors, IgnoredColors>

/**
 * List of all colors which we can use in app
 *
 * @author Ivan Shchedrovskyi
 */
export type Colors = keyof ColorsWithValues
