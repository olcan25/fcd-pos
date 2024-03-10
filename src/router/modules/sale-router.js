const CreateSaleView = () => import('@/views/sale/CreateSaleView.vue')
const UpdateSaleView = () => import('@/views/sale/UpdateSaleView.vue')
const TableSaleView = () => import('@/views/sale/TableSaleView.vue')
const SaleInvoiceView = () => import('@/views/sale/SaleInvoiceView.vue')

const routes = [
  {
    path: '/sales',
    name: 'table-sale',
    component: TableSaleView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/sales/create',
    name: 'create-sale',
    component: CreateSaleView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/sales/update/:id',
    name: 'update-sale',
    component: UpdateSaleView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/sales/invoice/:id',
    name: 'sale-invoice',
    component: SaleInvoiceView,
    meta: {
      requiresAuth: true,
      layout: 'AppLayoutBlank'
    }
  }
]

export default routes
