<template>
  <div class="grid grid-cols-2 items-center mt-8">
    <div>
      <p class="font-bold text-gray-800">Bleresit:</p>
      <p class="text-gray-500">
        {{ partner.name }}
        <br />
        ,<span v-if="partner.address">{{ partner.address }} ,</span>
        <span v-if="partner.city">{{ partner.city }} ,</span>
        <span v-if="partner.country">{{ partner.country }}</span>
      </p>
      <p class="text-gray-500">{{ partner.uidNumber }}</p>
      <p class="text-gray-500">{{ partner.vatNumber }}</p>
    </div>

    <div class="text-right">
      <p class="">
        Invoice number:
        <span class="text-gray-500"
          >{{ sale.invoiceNumber }}/{{ moment(sale.date).format('YYYY') }}</span
        >
      </p>
      <p>
        Invoice date:
        <span class="text-gray-500">{{ moment(sale.date).format('DD.MM.YYYY') }}</span>
        <br />
        <span v-if="sale.dueDate">
          Due date:<span class="text-gray-500">{{
            moment(sale.dueDate).format('DD.MM.YYYY')
          }}</span></span
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import moment from 'moment'
import { usePartnerStore } from '@/store/modules/partner-store'
import { useSaleStore } from '@/store/modules/sale-store'

const partnerStore = usePartnerStore()
const saleStore = useSaleStore()
const { partner } = storeToRefs(partnerStore)
const { sale } = storeToRefs(saleStore)
</script>

<style lang="scss" scoped></style>
