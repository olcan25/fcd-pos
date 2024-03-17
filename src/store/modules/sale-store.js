import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  where,
  query
} from 'firebase/firestore'
import { db } from '@/utils/firebase'
import { usePartnerStore } from './partner-store'

export const useSaleStore = defineStore('sale-store', () => {
  const router = useRouter()
  const toast = useToast()
  const partnerStore = usePartnerStore()

  const saleRef = collection(db, 'sales')

  //States
  const sales = ref([])
  const sale = ref({})
  const salesByPartner = ref([])

  //Getters

  const tableSales = computed(() => {
    return sales.value.map((sale) => {
      return {
        id: sale.id,
        partner: partnerStore.partners.find((partner) => partner.id === sale.partnerId)?.name,
        date: sale.date,
        invoiceNumber: sale.invoiceNumber,
        note: sale.note,
        productCount: sale.lines.length,
        totalAmount: sale.lines.reduce((acc, line) => acc + line.amount, 0),
        totalVatAmount: sale.lines.reduce((acc, line) => acc + line.vatAmount, 0),
        totalAmountWithVat: sale.lines.reduce((acc, line) => acc + line.amountWithVat, 0)
      }
    })
  })

  const saleTotalAmounts = computed(() => {
    return sale.value.lines.reduce(
      (acc, line) => {
        acc.totalAmount += line.amount
        acc.totalVatAmount += line.vatAmount
        acc.totalAmountWithVat += line.amountWithVat
        return acc
      },
      { totalAmount: 0, totalVatAmount: 0, totalAmountWithVat: 0 }
    )
  })



  //Actions
  const getSales = async () => {
    try {
      const querySnapshot = await getDocs(saleRef)
      sales.value = []
      querySnapshot.forEach((doc) => {
        sales.value.push({ id: doc.id, ...doc.data() })
      })
    } catch (error) {
      console.error('Belgeler edinirken hata oluştu: ', error)
    }
  }

  const getSalesByPartnerId = async (partnerId) => {
    salesByPartner.value = []
    try {
      const querySnapshot = await query(saleRef, where('partnerId', '==', partnerId))
      const data = await getDocs(querySnapshot)
      data.forEach((doc) => {
        salesByPartner.value.push({ id: doc.id, ...doc.data() })
      })
    } catch (error) {
      console.error('Belgeler edinirken hata oluştu: ', error)
    }
  }

  const getSale = async (id) => {
    try {
      const docRef = doc(saleRef, id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        sale.value = docSnap.data()
      } else {
        console.warn('Böyle bir belge yok!')
      }
    } catch (error) {
      console.error('Belge edinirken hata oluştu: ', error)
    }
  }

  const createSale = async (sale) => {
    try {
      await addDoc(saleRef, sale)
      toast.success('Belge başarıyla eklendi!')
      router.push('/sales')
    } catch (error) {
      console.error('Belge eklenirken hata oluştu: ', error)
    }
  }

  const deleteSale = async (id) => {
    try {
      await deleteDoc(doc(saleRef, id))
      sales.value = sales.value.filter((sale) => sale.id !== id)
      toast.success('Belge başarıyla silindi!')
    } catch (error) {
      console.error('Belge silinirken hata oluştu: ', error)
      toast.error('Belge silinirken hata oluştu!')
    }
  }

  const updateSale = async (id, sale) => {
    try {
      const docRef = doc(saleRef, id)
      await updateDoc(docRef, sale)
      toast.success('Belge başarıyla güncellendi!')
      router.push('/sales')
    } catch (error) {
      console.error('Belge güncellenirken hata oluştu: ', error)
      toast.error('Belge güncellenirken hata oluştu!')
    }
  }

  return {
    sales,
    salesByPartner,
    sale,
    tableSales,
    saleTotalAmounts,
    getSales,
    getSalesByPartnerId,
    getSale,
    createSale,
    deleteSale,
    updateSale
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSaleStore, import.meta.hot))
}
