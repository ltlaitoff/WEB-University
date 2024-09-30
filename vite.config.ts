import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
	resolve: {
		alias: {
			'@app': path.resolve(__dirname, './src/app'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@widgets': path.resolve(__dirname, './src/widgets'),
			'@features': path.resolve(__dirname, './src/features'),
			'@entities': path.resolve(__dirname, './src/entities'),
			'@shared': path.resolve(__dirname, './src/shared'),

			'@assets': path.resolve(__dirname, './src/assets'),
			'@components': path.resolve(__dirname, './src/components'),
			'@constants': path.resolve(__dirname, './src/constants'),
			'@store': path.resolve(__dirname, './src/store'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@': path.resolve(__dirname, './src')
		}
	},
	plugins: [
		vue(),
		svgLoader({
			defaultImport: 'component'
		})
	]
})
