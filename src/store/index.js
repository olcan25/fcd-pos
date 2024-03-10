import { createPinia } from 'pinia'
import piniaRouter from './plugins/pinia-router'
import piniaLogger from './plugins/pinia-logger'

const pinia = createPinia()

pinia.use(piniaLogger)
pinia.use(piniaRouter)

export default pinia
