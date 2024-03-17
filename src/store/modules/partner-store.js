import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/utils/firebase'

export const usePartnerStore = defineStore(
  'partner-store',
  () => {
    const router = useRouter()
    const toast = useToast()

    const partnerRef = collection(db, 'partners')

    //States
    const partners = ref([])
    const partner = ref({})

    //Getters

    const selectPartners = computed(() => {
      return partners.value.map((partner) => {
        return {
          value: partner.id,
          text: `${partner.name} - ${partner.uidNumber}`
        }
      })
    })

    const autoCompletePartners = computed(() => {
      return partners.value.map((partner) => {
        // Eğer partner.tradeName değeri varsa görüntüle, değilse sadece partner.name'i görüntüle
        const partnerLabel = partner.tradeName
          ? `${partner.name} - ${partner.tradeName} - ${partner.uidNumber}`
          : `${partner.name} - ${partner.uidNumber}`

        return {
          label: partnerLabel,
          value: partner.id
        }
      })
    })

    //Actions

    const getPartners = async () => {
      try {
        partners.value = []
        const querySnapshot = await getDocs(partnerRef)
        querySnapshot.forEach((doc) => {
          partners.value.push({ id: doc.id, ...doc.data() })
        })
      } catch (error) {
        console.error('Belgeler edinirken hata oluştu: ', error)
      }
    }

    const getPartner = async (id) => {
      try {
        const docRef = doc(partnerRef, id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          partner.value = docSnap.data()
        } else {
          console.warn('Böyle bir belge yok!')
        }
      } catch (error) {
        console.error('Belge edinirken hata oluştu: ', error)
      }
    }

    const createPartner = async (partner) => {
      try {
        const doc = await addDoc(partnerRef, partner)
        partners.value.push({ id: doc.id, ...partner })
        toast.success('Belge başarıyla eklendi!')
        router.push('/partners')
      } catch (error) {
        console.error('Belge eklenirken hata oluştu: ', error)
        toast.error('Belge eklenirken hata oluştu!')
      }
    }

    const deletePartner = async (id) => {
      try {
        await deleteDoc(doc(partnerRef, id))
        partners.value = partners.value.filter((partner) => partner.id !== id)
        toast.success('Belge başarıyla silindi!')
      } catch (error) {
        console.error('Belge silinirken hata oluştu: ', error)
        toast.error('Belge silinirken hata oluştu!')
      }
    }

    const updatePartner = async (id, partner) => {
      console.log('partner', partner)
      try {
        const docRef = doc(partnerRef, id)
        await updateDoc(docRef, partner)
        partners.value = partners.value.map((p) => (p.id === id ? partner : p))
        toast.success('Belge başarıyla güncellendi!')
        router.push('/partners')
      } catch (error) {
        console.error('Belge güncellenirken hata oluştu: ', error)
        toast.error('Belge güncellenirken hata oluştu!')
      }
    }

    return {
      partners,
      partner,
      selectPartners,
      autoCompletePartners,
      getPartners,
      getPartner,
      createPartner,
      deletePartner,
      updatePartner
    }
  },
  {
    persist: true
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePartnerStore, import.meta.hot))
}
