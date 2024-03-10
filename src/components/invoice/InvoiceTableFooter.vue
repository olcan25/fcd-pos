<template>
  <tr>
    <th
      scope="row"
      colspan="5"
      class="hidden pl-4 pr-3 pt-2 text-right text-xs font-normal text-gray-500 sm:table-cell sm:pl-0"
    >
      Shuma pa TVSH
    </th>
    <th scope="row" class="pl-6 pr-3 pt-2 text-left text-xs font-normal text-gray-500 sm:hidden">
      Shuma pa TVSH
    </th>
    <td class="pl-3 pr-6 pt-2 text-right text-xs text-gray-500 sm:pr-0">
      {{ round(saleTotalAmounts.totalAmount, 2) }}
    </td>
  </tr>
  <tr>
    <th
      scope="row"
      colspan="5"
      class="hidden pl-4 pr-3 pt-2 text-right text-xs font-normal text-gray-500 sm:table-cell sm:pl-0"
    >
      Shuma e TVSH
    </th>
    <th scope="row" class="pl-6 pr-3 pt-2 text-left text-xs font-normal text-gray-500 sm:hidden">
      Shuma e TVSH
    </th>
    <td class="pl-3 pr-6 pt-4 text-right text-xs text-gray-500 sm:pr-0">
      {{ round(saleTotalAmounts.totalVatAmount, 2) }}
    </td>
  </tr>
  <tr>
    <th
      scope="row"
      colspan="5"
      class="hidden pl-4 pr-3 pt-2 text-right text-xs font-semibold text-gray-900 sm:table-cell sm:pl-0"
    >
      Shuma me TVSH
    </th>
    <th scope="row" class="pl-6 pr-3 pt-2 text-left text-xs font-semibold text-gray-900 sm:hidden">
      Shuma me TVSH
    </th>
    <td class="pl-3 pr-4 pt-2 text-right text-xs font-semibold text-gray-900 sm:pr-0">
      {{ round(saleTotalAmounts.totalAmountWithVat, 2) }}
    </td>
  </tr>
  <tr class="">
    <td colspan="2" class="text-left pt-16 text-xs font-normal text-gray-500">
      <span>Derzoi: ____________________</span>
    </td>
    <td colspan="4" class="text-right pt-16 text-xs font-normal text-gray-500">
      <span>Pranoi: ____________________</span>
    </td>
  </tr>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { round } from 'mathjs'
import { useSaleStore } from '@/store/modules/sale-store'
const saleStore = useSaleStore()

const { saleTotalAmounts } = storeToRefs(saleStore)
</script>

<style lang="scss" scoped></style>
