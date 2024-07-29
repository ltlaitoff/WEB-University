import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from '@app/ui/App.vue'
import { vCloseModal } from '@shared/directives/vCloseModal'
import enTranslation from '@shared/i18n'

import './style.css'

const app = createApp(App)
const pinia = createPinia()
const i18n = createI18n({
	locale: 'en',
	messages: {
		en: enTranslation
	}
})

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(i18n)

app.directive('close-modal', vCloseModal)

app.mount('#app')
