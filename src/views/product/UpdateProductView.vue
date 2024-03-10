<template>
  <form @submit="onSubmit">
    <h1 class="text-5xl font-semibold">
      Urun Bilgileri

      <span class="text-4xl font-semibold">
        <button
          type="submit"
          class="px-4 py-2 mb-4 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Duzenle
        </button>
      </span>
    </h1>

    <div class="grid gap-6 mb-6 md:grid-cols-4">
      <TextField fieldName="name" fieldLabel="Ismi" />
      <TextField fieldName="description" fieldLabel="Aciklama" />
      <SelectField fieldName="unitOfMeasures" fieldLabel="Olculer" :options="unitOfMeasures" />
      <TextField fieldName="barcode" fieldLabel="Barkod" />
    </div>
    <div class="grid gap-6 mb-6 md:grid-cols-4">
      <NumberField fieldName="purchasePrice" fieldLabel="Alis Fiyati" />
      <NumberField fieldName="salePrice" fieldLabel="Satis Fiyati" />
      <SelectField fieldName="vatRate" fieldLabel="KDV Orani" :options="vats" />
      <NumberField fieldName="customsDutyRate" fieldLabel="Gumruk Vergisi Orani" />
    </div>
  </form>
</template>

<script setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useOtherStore } from '@/store/modules/other-store'
import { useProductStore } from '@/store/modules/product-store'
import SelectField from '@/components/forms/SelectField.vue'
import TextField from '@/components/forms/TextField.vue'
import NumberField from '@/components/forms/NumberField.vue'
import { productValidation } from '@/utils/yup-validation/product-validation'

const route = useRoute()

const productStore = useProductStore()
const otherStore = useOtherStore()
const { product } = storeToRefs(productStore)
const { vats, unitOfMeasures } = storeToRefs(otherStore)
await productStore.getProduct(route.params.id)

const { handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(productValidation),
  initialValues: {
    name: '',
    description: '',
    unitOfMeasures: '',
    barcode: '',
    purchasePrice: 0,
    salePrice: 0,
    vatRate: 0,
    customsDutyRate: 0
  }
})

setValues(product.value)

const onSubmit = handleSubmit((values) => {
  productStore.updateProduct(route.params.id, values)
})
</script>

<style lang="scss" scoped></style>
