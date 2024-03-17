<template>
  <component :is="layout"> <router-view /> </component>
</template>
`
<script setup>
import AppLayoutDefault from './AppLayoutDefault.vue'
import AppLayoutBlank from './AppLayoutBlank.vue'
import { markRaw, watch, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const layout = ref()

// watch with switch case
watch(
  () => route.meta?.layout,
  async (metaLayout) => {
    try {
      let component = AppLayoutDefault
      switch (metaLayout) {
        case 'AppLayoutBlank':
          component = AppLayoutBlank
          break
        default:
          break
      }
      layout.value = markRaw(component)
    } catch (e) {
      console.error(e)
      layout.value = markRaw(AppLayoutDefault)
    }
  },
  { immediate: true }
)

// watch(
//   () => route.meta?.layout,
//   async (metaLayout) => {
//     try {
//       const component = metaLayout && (await import(/* @vite-ignore */ `./${metaLayout}.vue`))
//       layout.value = markRaw(component?.default || AppLayoutDefault)
//     } catch (e) {
//       console.error(e)
//       layout.value = markRaw(AppLayoutDefault)
//     }
//   },
//   { immediate: true }
// )
</script>
`
