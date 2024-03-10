<template>
  <div class="grid grid-cols-2 items-center">
    <div>
      <!--  Company logo  -->
      <img class="h-auto max-w-32 rounded-lg" :src="imgUrl" alt="company-logo" />
    </div>

    <div class="text-right">
      <p>{{ companies[0]?.name }}</p>
      <p class="text-gray-500 text-xs"></p>
      <p class="text-gray-500 text-xs">
        {{ companies[0].address }}
      </p>
      <p class="text-gray-500 text-xs">{{ companies[0].country }}, {{ companies[0].city }}</p>
      <p class="text-gray-500 text-xs">{{ companies[0]?.uidNumber }}</p>
      <p class="text-gray-500 text-xs">{{ companies[0]?.vatNumber }}</p>
      <template v-for="(bank, i) in filteredBanks" :key="i">
        <p class="text-gray-500 text-xs">{{ bank.name }}: {{ bank.account }}</p>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCompanyStore } from '@/store/modules/company-store'

const imgUrl = new URL('../../assets/logo.jpg', import.meta.url).href

const companyStore = useCompanyStore()

const { companies } = storeToRefs(companyStore)

const filteredBanks = computed(() =>
  companies.value[0]?.banks
    ?.slice(0, 2)
    ?.map((bank) => ({ name: bank.name, account: bank.account }))
)
</script>

<style lang="scss" scoped></style>
