<template>
  <div>
    <label
    v-if="fieldLabel"
    :for="fieldName" :class="hasErrorLabel">{{ fieldLabel }}</label>
    <input
      type="number"
      :class="hasErrorInput"
      v-model="value"
      :placeholder="fieldPlaceholder"
      :step="fieldStep"
      :disabled="isDisabled"

    />
    <p v-if="errorMessage" class="mt-2 text-sm text-red-600 dark:text-red-500">
      <span class="font-medium">Of, hata!</span> {{ errorMessage }}.
    </p>
  </div>
</template>
computed,
<script setup>
import { toRefs, computed } from 'vue'
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
  fieldStep: {
    type: [String, Number],
    default: 'any'
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
})

const { fieldName } = toRefs(props)

const { value, errorMessage } = useField(fieldName.value)

const hasErrorInput = computed(() => {
  return errorMessage.value ? 'input-error' : 'input-secondary'
})

const hasErrorLabel = computed(() => {
  return errorMessage.value ? 'label-error' : 'label-secondary'
})
</script>

<style lang="scss" scoped></style>
