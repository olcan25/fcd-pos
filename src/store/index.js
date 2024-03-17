import { createPinia } from 'pinia'
import piniaRouter from './plugins/pinia-router'
import piniaLogger from './plugins/pinia-logger'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()

pinia.use(piniaLogger)
pinia.use(piniaRouter)
pinia.use(piniaPluginPersistedstate)

export default pinia
