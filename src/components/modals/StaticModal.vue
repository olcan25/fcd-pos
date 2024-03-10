<template>
  <div
    id="modalEl"
    tabindex="-1"
    aria-hidden="true"
    class="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
  >
    <div class="relative max-h-full w-full max-w-2xl">
      <!-- Modal content -->
      <div class="relative rounded-lg bg-white shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white lg:text-2xl">
            <slot name="title" />
          </h3>
          <button
            type="button"
            id="modalCloseButton"
            class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              class="h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="space-y-6 p-6">
          <slot name="body" />
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center space-x-2 rtl:space-x-reverse rounded-b border-t border-gray-200 p-6 dark:border-gray-600"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Modal } from 'flowbite'

onMounted(() => {
  const $modalElement = document.querySelector('#modalEl')
  const $modalCloseButton = document.querySelector('#modalCloseButton')
  const $modalAcceptButton = document.querySelector('#modalAcceptButton')

  const modalOptions = {
    backdrop: 'static',
    backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true
  }

  // instance options object
  const instanceOptions = {
    id: 'modalEl',
    override: true
  }

  const modal = new Modal($modalElement, modalOptions, instanceOptions)
  modal.show()

  $modalCloseButton.addEventListener('click', () => {
    modal.hide()
  })

  $modalAcceptButton.addEventListener('click', () => {
    modal.hide()
  })
})
</script>

<style lang="scss" scoped></style>
