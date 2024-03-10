<template>
  <div>
    <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-200">
      {{ title }}
    </h1>

    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <SaleLineHeader />
        </thead>
        <tbody>
          <SaleLineBody />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import SaleLineBody from './SaleLineBody.vue'
import SaleLineHeader from './SaleLineHeader.vue'

defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
