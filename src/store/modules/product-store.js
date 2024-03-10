import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/utils/firebase'

export const useProductStore = defineStore('product-store', () => {
  const router = useRouter()
  const toast = useToast()

  const productRef = collection(db, 'products')

  //States
  const products = ref([])
  const product = ref({})

  //Getters
  const selectProducts = computed(() => {
    return products.value.map((product) => {
      return {
        value: product.id,
        text: `${product.name}`
      }
    })
  })

  const autoCompleteProducts = computed(() => {
    return products.value.map((product) => {
      return {
        label: `${product.barcode} - ${product.name}`,
        value: product.id
      }
    })
  })

  //Actions

  const getProducts = async () => {
    try {
      const querySnapshot = await getDocs(productRef)
      products.value = []
      querySnapshot.forEach((doc) => {
        products.value.push({ id: doc.id, ...doc.data() })
      })
    } catch (error) {
      console.error('Belgeler edinirken hata oluştu: ', error)
    }
  }

  const getProduct = async (id) => {
    try {
      const docRef = doc(productRef, id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        product.value = docSnap.data()
      } else {
        console.warn('Böyle bir belge yok!')
      }
    } catch (error) {
      console.error('Belge edinirken hata oluştu: ', error)
    }
  }

  const createProduct = async (product) => {
    try {
      await addDoc(productRef, product)
      toast.success('Belge başarıyla eklendi!')
      router.push('/products')
    } catch (error) {
      console.error('Belge eklenirken hata oluştu: ', error)
      toast.error('Belge eklenirken hata oluştu!')
    }
  }

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(productRef, id))
      products.value = products.value.filter((product) => product.id !== id)
      toast.success('Belge başarıyla silindi!')
    } catch (error) {
      console.error('Belge silinirken hata oluştu: ', error)
      toast.error('Belge silinirken hata oluştu!')
    }
  }

  const updateProduct = async (id, product) => {
    try {
      const docRef = doc(productRef, id)
      await updateDoc(docRef, product)
      //products.value = products.value.map((p) => (p.id === id ? product : p))
      toast.success('Belge başarıyla güncellendi!')
      router.push('/products')
    } catch (error) {
      console.error('Belge güncellenirken hata oluştu: ', error)
      toast.error('Belge güncellenirken hata oluştu!')
    }
  }

  return {
    products,
    product,
    selectProducts,
    autoCompleteProducts,
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}
