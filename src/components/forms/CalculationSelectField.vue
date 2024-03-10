<template>
  <div>
    <label v-if="fieldLabel" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
      fieldLabel
    }}</label>
    <select
      v-model="value"
      @change="$emit('onChange', idx)"
      placeholder="Bir deger seciniz..."
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option v-for="option in options" :key="option" :value="option.value">
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

defineEmits(['onChange'])

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
  },
  idx: {
    type: Number,
    required: true
  }
})

const { fieldName } = toRefs(props)

const { value, errorMessage } = useField(fieldName.value)
</script>

<style lang="scss" scoped></style>
