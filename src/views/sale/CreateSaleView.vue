<template>
  <form>
    <div class="flex flex-col space-y-6">
      <h2 class="text-2xl font-semibold">
        Yeni Satis
        <button
          type="button"
          @click="onSubmit"
          class="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Kaydet
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
import { useSaleStore } from '@/store/modules/sale-store'
import { usePartnerStore } from '@/store/modules/partner-store'
import { useProductStore } from '@/store/modules/product-store'
import { saleValidation } from '@/utils/yup-validation/sale-validation'

import SaleHeader from '@/components/sale/SaleHeader.vue'
import SaleLine from '@/components/sale/SaleLine.vue'

const productStore = useProductStore()
const partnerStore = usePartnerStore()
const saleStore = useSaleStore()
await partnerStore.getPartners()
await productStore.getProducts()

const { handleSubmit } = useForm({
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
        desription: null,
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

const onSubmit = handleSubmit((values) => {
  values.lines = values.lines.filter((line) => line.productId && line.quantity && line.price)

  //lines if description is null remove it how to write this code one line
  values.lines = values.lines.map((line) => {
    if (!line.description) {
      delete line.description
    }
    return line
  })

  console.log(values)
  saleStore.createSale(values)
})
</script>
