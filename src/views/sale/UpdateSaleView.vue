<template>
  <form>
    <div class="flex flex-col space-y-6">
      <h2 class="text-2xl font-semibold">
        Satis
        <button
          type="button"
          class="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          @click="onSubmit"
        >
          Duzenle
        </button>
      </h2>
    </div>
    <SaleHeader />
    <SaleLine title="Satis Detaylari" />
  </form>
</template>

<script setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { saleValidation } from '@/utils/yup-validation/sale-validation'
import { useSaleStore } from '@/store/modules/sale-store'
import { usePartnerStore } from '@/store/modules/partner-store'
import { useProductStore } from '@/store/modules/product-store'

import SaleHeader from '@/components/sale/SaleHeader.vue'
import SaleLine from '@/components/sale/SaleLine.vue'

const route = useRoute()

const productStore = useProductStore()
const partnerStore = usePartnerStore()
const saleStore = useSaleStore()
await partnerStore.getPartners()
await productStore.getProducts()
await saleStore.getSale(route.params.id)

const { sale } = storeToRefs(saleStore)

const { handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(saleValidation),
  initialValues: {
    date: new Date().toISOString().slice(0, 10),
    partnerId: null,
    dueDate: null,
    isPaid: false,
    note: '',
    invoiceNumber: '',
    lines: [
      {
        productId: '',
        vatRate: 0,
        quantity: 1,
        price: 0,
        vatPrice: 0,
        priceWithVat: 0,
        amount: 0,
        vatAmount: 0,
        amountWithVat: 0
      }
    ]
  }
})

setValues(sale.value)

const onSubmit = handleSubmit((values) => {
  values.lines = values.lines.filter((line) => line.productId && line.quantity && line.price)
  //lines if description is null remove it how to write this code one line
  values.lines = values.lines.map((line) => {
    if (!line.description) {
      delete line.description
    }
    return line
  })
  saleStore.updateSale(route.params.id, values)
})
</script>
