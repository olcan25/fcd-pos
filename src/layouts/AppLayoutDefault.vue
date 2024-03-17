<template>
  <Suspense>
    <template #default>
      <div>
        <MainNavbar />
        <slot />
      </div>
    </template>
    <template #fallback>
      <div class="flex items-center justify-center h-screen">
        <div
          class="w-20 h-20 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"
        ></div>
        <span>Loading...</span>
      </div>
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
const MainNavbar = defineAsyncComponent(() => import('@/components/navbar/MainNavbar.vue'))
</script>
