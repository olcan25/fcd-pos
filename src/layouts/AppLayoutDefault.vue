<template>
  <MainNavbar />
  <slot />
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
const MainNavbar = defineAsyncComponent(() => import('@/components/navbar/MainNavbar.vue'))
</script>
