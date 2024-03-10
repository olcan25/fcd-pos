const TableCompanyView = () =>
  import(/* webpackChunkName "company" */ '@/views/company/TableCompanyView.vue')
const CreateCompamyView = () =>
  import(/* webpackChunkName "company" */ '@/views/company/CreateCompanyView.vue')
  const UpdateCompamyView = () =>
  import(/* webpackChunkName "company" */ '@/views/company/UpdateCompanyView.vue')


const routes = [
  {
    path: '/companies',
    name: 'table-company',
    component: TableCompanyView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/companies/create',
    name: 'create-company',
    component: CreateCompamyView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/companies/update/:id',
    name: 'update-company',
    component: UpdateCompamyView,
    meta: {
      requiresAuth: true
    }
  }
]

export default routes
