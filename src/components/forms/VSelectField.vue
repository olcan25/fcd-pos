<template>
  <!-- bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500; -->
  <div>
    <label v-if="fieldLabel" :for="fieldName" class="label-secondary">{{ fieldLabel }}</label>
    <Multiselect :options="data" v-model="value" :searchable="true" />
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
import { useField } from 'vee-validate'
import Multiselect from '@vueform/multiselect'

const props = defineProps({
  fieldLabel: {
    type: String,
    required: true
  },
  fieldName: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
})

const { fieldName } = toRefs(props)

const { value } = useField(fieldName.value)
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
