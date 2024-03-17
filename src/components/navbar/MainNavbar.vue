<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <LogoNavbar />
      <MobileNavbar>
        <LinkNavbar linkTo="/companies" linkText="Sirketler" />
        <LinkNavbar linkTo="/products" linkText="Urunler" />
        <LinkNavbar linkTo="/partners" linkText="Partnerler" />
        <LinkNavbar linkTo="/sales" linkText="Satislar" />
        <DropdownNavbar dropdownName="Raporlar">
          <template #list>
            <!-- <DropdownLink linkTo="/sales" linkText="Satis Raporlari" /> -->
            <DropdownLink linkTo="/reports/products" linkText="Urun Raporlari" />
            <DropdownLink linkTo="/reports/partners" linkText="Partner Raporlari" />
          </template>
        </DropdownNavbar>
        <button
          @click="userStore.logoutUser"
          class="block py-2 px-3 text-red-900 rounded hover:bg-red-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-red-700 dark:hover:text-white md:dark:hover:bg-transparent"
        >
          Cikiş
        </button>
        <!-- Merhaba userData -->
        <span v-if="userData" class="text-gray-600 dark:text-gray-300"
          >Merhaba <span class="font-bold">{{ userData.name }}</span
          >!
        </span>
      </MobileNavbar>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { initFlowbite } from 'flowbite'
import { useUserStore } from '@/store/modules/user-store'

const LogoNavbar = defineAsyncComponent(() => import('./LogoNavbar.vue'))
const MobileNavbar = defineAsyncComponent(() => import('./MobileNavbar.vue'))
const LinkNavbar = defineAsyncComponent(() => import('./LinkNavbar.vue'))
const DropdownNavbar = defineAsyncComponent(() => import('./DropdownNavbar.vue'))
const DropdownLink = defineAsyncComponent(() => import('./DropdownLink.vue'))

const userStore = useUserStore()
const { userData } = storeToRefs(userStore)

onMounted(() => {
  initFlowbite()
})
</script>
