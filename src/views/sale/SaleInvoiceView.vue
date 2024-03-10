<template>
  <div class="print:hidden mt-2">
    <RouterLink
      :to="{ name: 'table-sale' }"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      Satislar
    </RouterLink>
  </div>
  <div class="max-w-3xl mx-auto p-4 bg-white rounded shadow-sm my-3 text-xs" id="invoice">
    <InvoiceHeaderCompany />

    <!-- Client info -->
    <InvoiceHeaderPartner />

    <!-- Invoice Items -->
    <div class="-mx-4 mt-8 flow-root sm:mx-0">
      <table class="min-w-full">
        <colgroup>
          <col class="w-full sm:w-1/2" />
        </colgroup>
        <thead class="border-b border-gray-300 text-gray-900">
          <InvoiceTableHeader />
        </thead>
        <tbody>
          <InvoiceTableBody />
        </tbody>
        <tfoot>
          <InvoiceTableFooter />
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import InvoiceHeaderCompany from '@/components/invoice/InvoiceHeaderCompany.vue'
import InvoiceHeaderPartner from '@/components/invoice/InvoiceHeaderPartner.vue'
import InvoiceTableHeader from '@/components/invoice/InvoiceTableHeader.vue'
import InvoiceTableBody from '@/components/invoice/InvoiceTableBody.vue'
import InvoiceTableFooter from '@/components/invoice/InvoiceTableFooter.vue'

import { useCompanyStore } from '@/store/modules/company-store'
import { useProductStore } from '@/store/modules/product-store'
import { usePartnerStore } from '@/store/modules/partner-store'
import { useSaleStore } from '@/store/modules/sale-store'

const route = useRoute()

const companyStore = useCompanyStore()
const productStore = useProductStore()
const partnerStore = usePartnerStore()
const saleStore = useSaleStore()

const { sale } = storeToRefs(saleStore)
await saleStore.getSale(route.params.id)
await companyStore.getCompanies()
await productStore.getProducts()
await partnerStore.getPartner(sale.value.partnerId)
</script>
<style scoped>
@media print {
  table tfoot {
    display: table-row-group;
  }
  /*  display: none; */

  @page {
    size: auto;
    margin: 0;
  }
}
</style>
