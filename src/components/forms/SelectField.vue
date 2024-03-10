<template>
  <div>
    <label v-if="fieldLabel" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
      fieldLabel
    }}</label>
    <select
      v-model="value"
      placeholder="Bir deger seciniz..."
     class="select-secondary"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>
    <p v-if="errorMessage" class="mt-2 text-sm text-red-600 dark:text-red-500">
      <span class="font-medium">Of, hata!</span> {{ errorMessage }}.
    </p>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
import { useField } from 'vee-validate'
const props = defineProps({
  fieldName: {
    type: String,
    required: true
  },
  fieldLabel: {
    type: String,
    default: ''
  },
  fieldPlaceholder: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    required: true
  }
})

const { fieldName } = toRefs(props)

const { value, errorMessage } = useField(fieldName.value)
</script>

<style lang="scss" scoped></style>
