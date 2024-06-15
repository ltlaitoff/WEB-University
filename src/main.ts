import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { vCloseModal } from '@directives'

import App from './App.vue'
import './style.css'

const app = createApp(App)
const pinia = createPinia()
const i18n = createI18n({
	// something vue-i18n options here ...
})

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(i18n)

app.directive('close-modal', vCloseModal)

app.mount('#app')
