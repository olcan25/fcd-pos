<template>
  <div class="p-4">
    <DataTable :value="tableSales">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">Satislar Tablosu</span>
          <router-link
            :to="{ name: 'create-sale' }"
            class="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Ekle
          </router-link>
        </div>
      </template>
      <Column field="date" header="Tarih" >
        <template #body="{ data }">{{ new Date(data.date).toLocaleString().slice(0,10) }}</template>
        </Column>
      <Column field="partner" header="Partner" />
      <Column field="invoiceNumber" header="Fatura No." />
      <Column field="productCount" header="Urun Adet" />
      <Column field="totalAmount" header="Toplam Tutar" />
      <Column field="totalVatAmount" header="Toplam KDV Tutar" />
      <Column field="totalAmountWithVat" header="Toplam KDV'li Tutar" />
      <Column header="Actions">
        <template #body="{ data }">
          <div class="inline-flex">
            <button
              @click="saleStore.deleteSale(data.id)"
              class="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Sil
            </button>
            <router-link
              :to="{ name: 'update-sale', params: { id: data.id } }"
              class="px-4 py-2 ml-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Guncelle
            </router-link>
            <router-link
              :to="{ name: 'sale-invoice', params: { id: data.id } }"
              class="px-4 py-2 ml-1 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
            Fatura
            </router-link>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
//Datatable
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useSaleStore } from '@/store/modules/sale-store'
import { usePartnerStore } from '@/store/modules/partner-store'

const saleStore = useSaleStore()
const partnerStore = usePartnerStore()
await partnerStore.getPartners()
await saleStore.getSales()
const { tableSales } = storeToRefs(saleStore)
</script>

<style lang="scss" scoped></style>
