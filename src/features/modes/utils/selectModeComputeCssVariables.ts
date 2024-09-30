import { Colors } from '@entities/Colors.ts'

/**
 * Computes CSS variables for the SelectMode component based on the color
 *
 * @author Ivan Shchedrovskyi
 */
export function selectModeComputeCssVariables(color: Colors) {
	return {
		'--select-mode-bg': `var(--color-${color}-100)`,
		'--select-mode-border-color': `var(--color-${color}-950)`,
		'--select-mode-color': `var(--color-${color}-950)`,
		'--select-mode-bg-hover': `var(--color-${color}-200)`,
		'--select-mode-selected-border-color': `var(--color-${color}-950)`
	}
}
