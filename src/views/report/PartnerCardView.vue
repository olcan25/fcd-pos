<template>
  <div
    class="flex justify-between w-1/2 mt-12 mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white"
  >
    <div class="w-1/2">Musteriler Raporu:</div>
    <div class="w-11/12">
      <Multiselect :options="autoCompletePartners" v-model="selectedPartner" :searchable="true" />
    </div>
  </div>

  <DataTable :value="salesByPartner" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 20]">
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
    <Column field="quantity" header="Miktar" sortable></Column>
    <Column field="price" header="Fiyat" sortable></Column>
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
import { usePartnerStore } from '@/store/modules/partner-store'
import { useSaleStore } from '@/store/modules/sale-store'
import Multiselect from '@vueform/multiselect'

const selectedPartner = ref(null)

const partnerStore = usePartnerStore()
const saleStore = useSaleStore()

await partnerStore.getPartners()

const { autoCompletePartners } = storeToRefs(partnerStore)
const { salesByPartner } = storeToRefs(saleStore)

watch(selectedPartner, async (newVal) => {
  await saleStore.getSalesByPartnerId(newVal)
})
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
