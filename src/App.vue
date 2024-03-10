<template>
  <AppLayout>
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <Suspense>
          <component :is="Component"></component>
          <template #fallback>
            <!-- Create Loading Component with Tailwind CSS -->
            <div class="flex items-center justify-center h-screen">
              <div
                class="w-20 h-20 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"
              ></div>
            </div>
          </template>
        </Suspense>
      </template>
    </router-view>
  </AppLayout>
</template>

<script setup>
</script>

<style lang="scss" scoped></style>
