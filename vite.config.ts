import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
	resolve: {
		alias: {
			'@assets': path.resolve(__dirname, './src/assets'),
			'@components': path.resolve(__dirname, './src/components'),
			'@store': path.resolve(__dirname, './src/store'),
			'@types': path.resolve(__dirname, './src/types'),
			'@pages': path.resolve(__dirname, './src/pages'),
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
