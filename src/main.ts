import { createApp } from 'vue'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { vCloseModal } from '@directives'

import App from './App.vue'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)

app.directive('close-modal', vCloseModal)

app.mount('#app')
