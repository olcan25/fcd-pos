<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img class="w-8 h-8 mr-2" :src="imgUrl" alt="logo" />
        FCD Accounting LLC
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Yeni Hesap Oluştur
          </h1>
          <form class="space-y-4 md:space-y-6" @submit="onSubmit">
            <TextField fieldName="name" fieldLabel="Ad" fieldPlaceholder="Olcan Pinduk" />
            <EmailField fieldName="email" fieldLabel="Email" fieldPlaceholder="olcan29@gmail.com" />
            <PasswordField fieldName="password" fieldLabel="Password" />
            <PasswordField fieldName="passwordConfirmation" fieldLabel="Password Dogrulama" />
            <!-- <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required=""
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="font-light text-gray-500 dark:text-gray-300"
                  >I accept the
                  <a
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href="#"
                    >Terms and Conditions</a
                  ></label
                >
              </div>
            </div> -->
            <button
              type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Kayıt Ol
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Zaten hesabınız var mı?
              <RouterLink
                to="/login"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Giris Yap</RouterLink
              >
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
import TextField from '@/components/forms/TextField.vue'
import EmailField from '@/components/forms/EmailField.vue'
import PasswordField from '@/components/forms/PasswordField.vue'

const userStore = useUserStore()

const imgUrl = new URL('../../assets/logo.jpg', import.meta.url).href

const { handleSubmit } = useForm({
  initialValues: { name: '', email: '', password: '', passwordConfirmation: '' }
})

const onSubmit = handleSubmit((values) => {
  if (values.password !== values.passwordConfirmation) return
  delete values.passwordConfirmation
  userStore.registerUser(values)
})
</script>

<style lang="scss" scoped></style>
