<template>
  <div class="p-4">
    <DataTable :value="products">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">Urunler Tablosu</span>
          <router-link
            :to="{ name: 'create-product' }"
            class="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Ekle
          </router-link>
        </div>
      </template>
      <Column field="name" header="Isim" sortable></Column>
      <Column field="description" header="Aciklama" sortable></Column>
      <Column field="unitOfMeasures" header="Birim" sortable></Column>
      <Column field="barcode" header="Barkod" sortable></Column>
      <Column field="purchasePrice" header="Alis Fiyati" sortable></Column>
      <Column field="salePrice" header="Satis Fiyati" sortable></Column>
      <Column field="vatRate" header="KDV Orani" sortable></Column>
      <Column field="customsDutyRate" header="Gumruk Vergisi Orani" sortable></Column>
      <Column header="Actions">
        <template #body="{ data }">
          <!-- Create a delete button with Tailwind -->
          <div class="inline-flex">
            <button
              @click="productStore.deleteProduct(data.id)"
              class="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Sil
            </button>
            <!-- Create a update component router -->
            <router-link
              :to="{ name: 'update-product', params: { id: data.id } }"
              class="px-4 py-2 ml-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Guncelle
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

import { useProductStore } from '@/store/modules/product-store'

const productStore = useProductStore()
await productStore.getProducts()
const { products } = storeToRefs(productStore)
</script>
