/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

	theme: {
		extend: {}
	},
	plugins: [
		/**
		 * Plugin for add all tailwind colors to :root as css variables
		 * Check https://gist.github.com/Merott/d2a19b32db07565e94f10d13d11a8574 for more details
		 *
		 * @author Ivan Shchedrovskyi
		 */
		function ({ addBase, theme }) {
			function extractColorVars(colorObj, colorGroup = '') {
				return Object.keys(colorObj).reduce((vars, colorKey) => {
					const value = colorObj[colorKey]
					const cssVariable =
						colorKey === 'DEFAULT'
							? `--color${colorGroup}`
							: `--color${colorGroup}-${colorKey}`

					const newVars =
						typeof value === 'string'
							? { [cssVariable]: value }
							: extractColorVars(value, `-${colorKey}`)

					return { ...vars, ...newVars }
				}, {})
			}

			addBase({
				':root': extractColorVars(theme('colors'))
			})
		}
	]
}
