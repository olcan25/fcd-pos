<template>
  <TableSaleView />
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
const TableSaleView = defineAsyncComponent(() => import('@/views/sale/TableSaleView.vue'))
</script>

<style lang="scss" scoped></style>
