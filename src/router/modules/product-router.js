const CreateProductView = () => import('@/views/product/CreateProductView.vue')
const TableProductView = () => import('@/views/product/TableProductView.vue')
const UpdateProductView = () => import('@/views/product/UpdateProductView.vue')

const routes = [
  {
    path: '/products/create',
    name: 'create-product',
    component: CreateProductView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/products',
    name: 'table-product',
    component: TableProductView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/products/update/:id',
    name: 'update-product',
    component: UpdateProductView,
    meta: {
      requiresAuth: true
    }
  }
]

export default routes
