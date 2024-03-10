<template>
  <div>
    <input
      type="checkbox"
      :id="fieldName"
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      v-model="checked"
    />
    <label :for="fieldName" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{
      fieldLabel
    }}</label>
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
  }
})

const { fieldName } = toRefs(props)

const { value: checked } = useField(fieldName.value)
</script>
