<template>
  <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
    <img :src="imgUrl" class="h-8" alt="FCD Logo" />
    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
      >Financial Consultant-D</span
    >
  </a>
</template>

<script setup>
const imgUrl = new URL('../../assets/logo.jpg', import.meta.url).href
</script>

<style lang="scss" scoped></style>
