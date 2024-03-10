import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './main'
import { authMiddleware } from './middleware/auth-middleware'

const history = createWebHistory(import.meta.env.BASE_URL)

const router = createRouter({
  history,
  routes
})

router.beforeEach(authMiddleware)

export { router }
