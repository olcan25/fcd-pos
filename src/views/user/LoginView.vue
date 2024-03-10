<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          class="w-8 h-8 mr-2"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        FCD Accounting
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Hesabınıza giriş yapın
          </h1>
          <form class="space-y-4 md:space-y-6" @submit="onSubmit">
            <EmailField fieldName="email" fieldLabel="Email" fieldPlaceholder="olcan29@gmail.com" />
            <PasswordField fieldName="password" fieldLabel="Password" />
            <div class="flex items-center justify-between">
              <!-- Remmeber Me
                 <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                </div>
              </div> -->
              <!-- Sifremi unuttum -->
              <!-- <RouterLink
                href="#"
                class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Sifremi unuttum?
              </RouterLink> -->
            </div>
            <button
              type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Giris
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              <!-- Don’t have an account yet? -->
              Zeten hesabınız yok mu?
              <router-link
                to="/register"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Kayıt olun
              </router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useForm } from 'vee-validate'
import { useUserStore } from '@/store/modules/user-store'
import EmailField from '@/components/forms/EmailField.vue'
import PasswordField from '@/components/forms/PasswordField.vue'

const userStore = useUserStore()

const { handleSubmit } = useForm({ initialValues: { email: '', password: '' } })

const onSubmit = handleSubmit((values) => {
  userStore.loginUser(values)
})
</script>

<style lang="scss" scoped></style>
