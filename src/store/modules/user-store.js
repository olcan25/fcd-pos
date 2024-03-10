import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { stateChangedPromise } from '@/utils/firebase/check-user'
import { auth } from '@/utils/firebase/index'

export const useUserStore = defineStore('user-store', () => {
  const router = useRouter()
  const toast = useToast()

  //States
  const userData = ref(null)
  const loadingUser = ref(false)
  const loadingSession = ref(false)

  //Getters

  //Actions
  async function registerUser({ email, password, name }) {
    loadingUser.value = true
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(user, { displayName: name })

      userData.value = {
        email: user.email,
        uid: user.uid,
        name: user.displayName
      }
      toast.success('Hesap olusturuldu.')
      router.push('/')
    } catch (error) {
      console.error(error)
      toast.error('Hesap olusturulamadi.')
    } finally {
      loadingUser.value = false
    }
  }

  async function loginUser({ email, password }) {
    loadingUser.value = true
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      userData.value = {
        email: user.email,
        uid: user.uid,
        name: user.displayName
      }
      toast.success('Giris yapildi.')
      router.push('/')
    } catch (error) {
      toast.error('Giris yapilamadi.')
      console.error(error)
    } finally {
      loadingUser.value = false
    }
  }
  async function logoutUser() {
    try {
      await signOut(auth)
      userData.value = null
      toast.success('Cikis yapildi.')
      router.push('/login')
    } catch (error) {
      toast.error('Cikis yapilamadi.')
      console.error(error)
    }
  }

  async function currentUser() {
    loadingSession.value = true
    try {
      const user = await stateChangedPromise()
      if (user) {
        userData.value = {
          email: user.email,
          uid: user.uid,
          name: user.displayName
        }
      } else {
        userData.value = null
      }
    } catch (error) {
      console.error(error)
    } finally {
      loadingSession.value = false
    }
  }

  return {
    userData,
    loadingUser,
    loadingSession,
    registerUser,
    loginUser,
    logoutUser,
    currentUser
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
