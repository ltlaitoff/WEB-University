import _ from 'lodash'
import tailwindColors from 'tailwindcss/colors'

import { ColorsWithValues } from '@entities/Colors.ts'
import { tailwindColorsIgnore } from '@shared/constants/tailwindColorsIgnore.ts'

export const getTailwindColorsWithoutIgnored = (
	ignoredColors = tailwindColorsIgnore
) => {
	return _.omit(tailwindColors, ignoredColors) as ColorsWithValues
}
