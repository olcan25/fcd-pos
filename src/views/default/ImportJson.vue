<template>
  <div>
    <h1>Import JSON</h1>

    <button @click="test">Test</button>
    <pre>{{ data }}</pre>
  </div>
</template>

<script setup>
import { useProductStore } from '@/store/modules/product-store'
import { ref } from 'vue'

const data = ref(null)

const getData = async () => {
  const veri = await fetch('../../../test.json')
  const json = await veri.json()
  data.value = json
}

getData()

const productStore = useProductStore()

const test = () => {
  console.log(data.value)
  data.value.forEach((item) => {
    productStore.createProduct(item)
  })
}
</script>

<style lang="scss" scoped></style>
