import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/utils/firebase'

export const useCompanyStore = defineStore('company-store', () => {
  const router = useRouter()
  const toast = useToast()

  const companyRef = collection(db, 'companies')

  //States
  const companies = ref([])
  const company = ref({})

  //Getters

  //Actions

  const getCompanies = async () => {
    try {
      const querySnapshot = await getDocs(companyRef)
      companies.value = []
      querySnapshot.forEach((doc) => {
        companies.value.push({ id: doc.id, ...doc.data() })
      })
    } catch (error) {
      console.error('Belgeler edinirken hata oluştu: ', error)
    }
  }

  const getCompany = async (id) => {
    try {
      const docRef = doc(companyRef, id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        company.value = docSnap.data()
      } else {
        console.warn('Böyle bir belge yok!')
      }
    } catch (error) {
      console.error('Belge edinirken hata oluştu: ', error)
    }
  }

  const createCompany = async (company) => {
    try {
      await addDoc(companyRef, company)
      toast.success('Belge başarıyla eklendi!')
      router.push('/companies')
    } catch (error) {
      console.error('Belge eklenirken hata oluştu: ', error)
      toast.error('Belge eklenirken hata oluştu!')
    }
  }

  const deleteCompany = async (id) => {
    try {
      await deleteDoc(doc(companyRef, id))
      toast.success('Belge başarıyla silindi!')
      companies.value = companies.value.filter((company) => company.id !== id)
    } catch (error) {
      console.error('Belge silinirken hata oluştu: ', error)
      toast.error('Belge silinirken hata oluştu!')
    }
  }

  const updateCompany = async (id, company) => {
    try {
      await updateDoc(doc(companyRef, id), company)
      toast.success('Belge başarıyla düzenlendi!')
      router.push('/companies')
    } catch (error) {
      console.error('Belge düzenlenirken hata oluştu: ', error)
      toast.error('Belge düzenlenirken hata oluştu!')
    }
  }

  return {
    companies,
    company,
    getCompanies,
    getCompany,
    createCompany,
    deleteCompany,
    updateCompany
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCompanyStore, import.meta.hot))
}
