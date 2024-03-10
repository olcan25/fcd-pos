import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useOtherStore = defineStore('other-store', () => {
  const vats = ref([
    {
      value: 0,
      text: '0%'
    },
    {
      value: 8,
      text: '8%'
    },
    {
      value: 18,
      text: '18%'
    }
  ])

  const unitOfMeasures = ref([
    {
      value: 'Cope',
      text: 'Cope'
    },
    {
      value: 'Kg',
      text: 'Kg'
    },
    {
      value: 'L',
      text: 'Litre'
    },
    {
      value: 'M',
      text: 'Metre'
    }
  ])

  return {
    vats,
    unitOfMeasures
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOtherStore, import.meta.hot))
}
