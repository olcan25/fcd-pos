const PartnerCardView = () =>
  import(/* webpackChunkName "report" */ '@/views/report/PartnerCardView.vue')
  const ProductCardView = () =>
  import(/* webpackChunkName "report" */ '@/views/report/ProductCardView.vue')

const routes = [
  {
    path: '/reports/partners',
    name: 'partner-card',
    component: PartnerCardView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/reports/products',
    name: 'product-card',
    component: ProductCardView,
    meta: {
      requiresAuth: true
    }
  }
]

export default routes
