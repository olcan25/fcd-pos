const LoginView = () => import('@/views/user/LoginView.vue')
const RegisterView = () => import('@/views/user/RegisterView.vue')

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      layout: 'AppLayoutBlank',
      requireAuth: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      layout: 'AppLayoutBlank',
      requireAuth: false
    }
  }
]

export default routes
