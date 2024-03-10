const HomeView = () => import(/* webpackChunkName "default" */ '@/views/default/HomeView.vue')
const AboutView = () => import(/* webpackChunkName "default" */ '@/views/default/AboutView.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      requiresAuth: true
    }
  }
]

export default routes
