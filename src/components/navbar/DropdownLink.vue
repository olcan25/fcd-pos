<template>
  <li>
    <RouterLink
      :to="linkTo"
      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      >{{ linkText }}</RouterLink
    >
  </li>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  linkTo: {
    type: String,
    required: true
  },
  linkText: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
