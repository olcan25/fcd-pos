import './assets/main.css'
import 'vue-toastification/dist/index.css'
import Lara from './assets/Lara'

import { createApp } from 'vue'
import App from './App.vue'
import Toast from 'vue-toastification'
import PrimeVue from 'primevue/config'
import { router } from '@/router'
import pinia from './store'
import { tr } from 'yup-locales'
import { setLocale } from 'yup'
setLocale(tr)

import AppLayout from './layouts/AppLayout.vue'

const app = createApp(App)

app.component('AppLayout', AppLayout)

app.use(Toast, { timeout: 1250 })

app.use(PrimeVue, { unstyled: true, pt: Lara })
app.use(router)
app.use(pinia)

app.mount('#app')
