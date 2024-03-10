<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script setup>
import { markRaw, ref, watch, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
const AppLayoutDefault = defineAsyncComponent(() => import('./AppLayoutDefault.vue'))

const layout = ref()
const route = useRoute()
watch(
  () => route.meta?.layout,
  async (value) => {
    try {
      console.log('try', value)
      const component = value && (await import(/* @vite-ignore */ `./${value}.vue`))
      layout.value = markRaw(component?.default || AppLayoutDefault)
    } catch (e) {
      console.log('catch', e,value)
      layout.value = markRaw(AppLayoutDefault)
    }
  },
  { immediate: true }
)
</script>
