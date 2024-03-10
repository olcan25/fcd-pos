<template>
  <div>
    <DataTable
      v-model:expandedRows="expandedRows"
      :value="companies"
      @rowExpand="onRowExpand"
      @rowCollapse="onRowCollapse"
    >
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">Sirket Tablosu</span>
          <button
            @click="createCompany"
            :disabled="isDisabled"
            :class="
              isDisabled
                ? 'px-4 py-2 text-white bg-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 cursor-not-allowed'
                : 'px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
            "
          >
            Ekle
          </button>
        </div>
      </template>
      <Column expander style="width: 5rem" />
      <Column field="name" header="Name" sortable></Column>
      <Column field="tradeName" header="Ticari Ismi" sortable></Column>
      <Column field="uidNumber" header="Uid No" sortable></Column>
      <Column field="vatNumber" header="KDV No" sortable></Column>
      <Column field="address" header="Address" sortable></Column>
      <Column field="city" header="City" sortable></Column>
      <Column field="country" header="Country" sortable></Column>
      <Column header="Actions">
        <template #body="{ data }">
          <!-- Create a delete button with Tailwind -->
          <div class="inline-flex">
            <button
              @click="companyStore.deleteCompany(data.id)"
              class="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Sil
            </button>
            <!-- Create a update component router -->
            <router-link
              :to="{ name: 'update-company', params: { id: data.id } }"
              class="px-4 py-2 ml-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Guncelle
            </router-link>
          </div>
        </template>
      </Column>
      <template #expansion="{ data }">
        <h1 class="text-2xl font-semibold">Banka Bilgileri</h1>

        <DataTable :value="data.banks">
          <Column field="name" header="Banka Ismi" sortable></Column>
          <Column field="iban" header="IBAN" sortable></Column>
          <Column field="swift" header="SWIFT" sortable></Column>
          <Column field="account" header="Hesap No" sortable> </Column>
        </DataTable>

        <h1 class="text-2xl font-semibold">Iletisim Bilgileri</h1>

        <DataTable :value="data.contacts">
          <Column field="name" header="Isim" sortable></Column>
          <Column field="email" header="Email" sortable></Column>
          <Column field="phone" header="Telefon" sortable></Column>
        </DataTable>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const expandedRows = ref([])

const router = useRouter()
import { useCompanyStore } from '@/store/modules/company-store'

const companyStore = useCompanyStore()

const { companies } = storeToRefs(companyStore)
await companyStore.getCompanies()

const isDisabled = computed(() => companies.value.length > 0)

const createCompany = () => {
  router.push({ name: 'create-company' })
}

const onRowExpand = () => {}
const onRowCollapse = () => {}
</script>

<style lang="scss" scoped></style>
