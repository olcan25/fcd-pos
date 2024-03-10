const TablePartnerView = () =>
  import(/* webpackChunkName "partner" */ '@/views/partner/TablePartnerView.vue')
const CreatePartnerView = () =>
  import(/* webpackChunkName "partner" */ '@/views/partner/CreatePartnerView.vue')
const UpdatePartnerView = () =>
  import(/* webpackChunkName "partner" */ '@/views/partner/UpdatePartnerView.vue')

const routes = [
  {
    path: '/partners',
    name: 'table-partner',
    component: TablePartnerView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/partners/create',
    name: 'create-partner',
    component: CreatePartnerView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/partners/update/:id',
    name: 'update-partner',
    component: UpdatePartnerView,
    meta: {
      requiresAuth: true
    }
  }
]

export default routes
