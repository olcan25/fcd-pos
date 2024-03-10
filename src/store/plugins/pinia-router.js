import { markRaw } from 'vue'
import { router } from '@/router'

const piniaRouter = ({ store }) => {
  store.router = markRaw(router)
}

export default piniaRouter
