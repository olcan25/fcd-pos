import { useUserStore } from '@/store/modules/user-store'

export const authMiddleware = async (to, from, next) => {
  const userStore = useUserStore()
  await userStore.currentUser()

  if (to.meta.requiresAuth && !userStore.userData) {
    next({ name: 'login' })
  } else {
    // next();
    if (to.name === 'login' && userStore.userData) {
      next({ name: 'home' })
    } else if (to.name === 'register' && userStore.userData) {
      next({ name: 'home' })
    } else {
      next()
    }
  }
}
