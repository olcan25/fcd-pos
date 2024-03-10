<template>
  <tr v-for="(line, i) in sale.lines" :key="i" class="border-b border-gray-200">
    <td class="max-w-0 py-2 pl-2 pr-1 text-xs sm:pl-0">
      <div class="font-medium text-gray-900">
        {{ i + 1 }}. {{ products.find((product) => product.id === line.productId)?.barcode }}
        {{ getProductById(line.productId).name }}
      </div>
      <div class="mt-1 overflow-hidden text-gray-500">
        <div class="whitespace-normal break-words">
          {{ line.description }}
        </div>
      </div>
    </td>
    <td class="hidden px-3 py-5 text-right text-xs text-gray-500 sm:table-cell">
      {{ getProductById(line.productId).unitOfMeasures }}
    </td>
    <td class="hidden px-3 py-5 text-right text-xs text-gray-500 sm:table-cell">
      {{ line.vatRate }}
    </td>
    <td class="hidden px-3 py-5 text-right text-xs text-gray-500 sm:table-cell">
      {{ line.quantity }}
    </td>
    <td class="hidden px-3 py-5 text-right text-xs text-gray-500 sm:table-cell">
      {{ round(line.price, 2) }}
    </td>
    <td class="hidden px-3 py-5 text-right text-xs text-gray-500 sm:table-cell">
      {{ round(line.priceWithVat, 2) }}
    </td>
    <td class="py-5 pl-3 pr-4 text-right text-xs text-gray-500 sm:pr-0">
      {{ round(line.amountWithVat, 2) }}
    </td>
  </tr>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { round } from 'mathjs'
import { useSaleStore } from '@/store/modules/sale-store'
import { useProductStore } from '@/store/modules/product-store'

const productStore = useProductStore()
const saleStore = useSaleStore()

const { products } = storeToRefs(productStore)
const { sale } = storeToRefs(saleStore)

const getProductById = (productId) => {
  return products.value.find((product) => product.id === productId)
}
</script>

<style lang="scss" scoped></style>
