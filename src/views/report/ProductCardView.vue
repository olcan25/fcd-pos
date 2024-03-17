<template>
  <div
    class="flex justify-between w-1/2 mt-12 mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white"
  >
    <div class="w-1/2">Urun Raporu:</div>
    <div class="w-11/12">
      <Multiselect :options="autoCompleteProducts" v-model="selectedProduct" :searchable="true" />
    </div>
  </div>

  <DataTable :value="salesByProduct" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 20]">
    <Column header="#" sortable>
      <template #body="{ index }">
        {{ index + 1 }}
      </template>
    </Column>
    <Column header="Tarih" sortable>
      <template #body="{ data }">
        {{ new Date(data.date).toLocaleDateString() }}
      </template>
    </Column>
    <Column header="Miktar" sortable>
      <template #body="{ data }">
        {{ data.lines.reduce((acc, line) => acc + line.quantity, 0) }}
      </template>
    </Column>
    <Column header="Fiyat" sortable>
      <template #body="{ data }">
        {{ data.lines.reduce((acc, line) => acc + line.price, 0) }}
      </template>
    </Column>
    <Column header="Toplam Kdv'siz Tutar" sortable>
      <template #body="{ data }">
        {{ data.lines.reduce((acc, line) => acc + line.amount, 0) }}
      </template>
    </Column>
    <Column header="Toplam KDV Tutar" sortable>
      <template #body="{ data }">
        {{ data.lines.reduce((acc, line) => acc + line.vatAmount, 0) }}
      </template>
    </Column>

    <Column header="Toplam Kdv'li Tutar" sortable>
      <template #body="{ data }">
        {{ data.lines.reduce((acc, line) => acc + line.amountWithVat, 0) }}
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useProductStore } from '@/store/modules/product-store'
import { useSaleStore } from '@/store/modules/sale-store'
import Multiselect from '@vueform/multiselect'

const selectedProduct = ref(null)
const salesByProduct = ref([])

const productStore = useProductStore()
const saleStore = useSaleStore()

await productStore.getProducts()
await saleStore.getSales()

const { autoCompleteProducts } = storeToRefs(productStore)
const { sales } = storeToRefs(saleStore)

watch(selectedProduct, (newValue) => {
  if (newValue) {
    salesByProduct.value = sales.value.filter((sale) =>
      sale.lines.some((line) => line.productId === newValue)
    )
  }
})
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
