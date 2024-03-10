<template>
  <tr>
    <button
      type="button"
      @click="
        lines.push({
          productId: '',
          description: null,
          vatRate: 0,
          quantity: 1,
          price: 0,
          vatPrice: 0,
          priceWithVat: 0,
          amount: 0,
          vatAmount: 0,
          amountWithVat: 0
        })
      "
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      Yeni Satir Ekle
    </button>
  </tr>
  <tr
    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
    v-for="(line, idx) in lines.fields"
    :key="line.key"
  >
    <th scope="row" class="py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      <!-- <auto-complete
        v-model="line.value.productId"
        :suggestions="searchedProducts"
        dropdown
        @complete="search"
        :field="(option) => option.name"
        @change="onChange($event, idx)"
        :virtual-scroller-options="{ itemSize: 70 }"
        :pt="{
          panel: { class: 'bg-white dark:bg-gray-800' }
        }"
      >
        <template #option="{ option }">
          <div class="p-2">
            <div class="text-md font-medium">{{ option.name }}</div>
            <div class="text-sm text-gray-500">{{ option.barcode }}</div>
          </div>
        </template>
      </auto-complete> -->
      <Multiselect
        :options="autoCompleteProducts"
        v-model="line.value.productId"
        :searchable="true"
        @change="onChange($event, idx)"
      />
    </th>

    <td class="px-1 py-2">
      <textarea v-model="line.value.description" class="input-secondary" rows="2"></textarea>
    </td>

    <td class="px-1 py-2">{{ unitOfMeasure }}</td>
    <td class="px-1 py-2">
      <select class="select-secondary" v-model="line.value.vatRate">
        <option v-for="vat in vats" :key="vat.value" :value="vat.value">
          {{ vat.text }}
        </option>
      </select>
    </td>

    <td class="px-1 py-2">
      <input type="number" step="any" v-model="line.value.quantity" class="input-secondary" />
    </td>

    <td class="px-1 py-2">
      <input
        type="number"
        step="any"
        v-model="line.value.price"
        class="input-secondary"
        @input="priceCalc($event.target.value, idx)"
      />
    </td>

    <td class="px-1 py-2">
      <input type="number" step="any" v-model="line.value.vatPrice" class="input-secondary" />
    </td>

    <td class="px-1 py-2">
      <input
        type="number"
        step="any"
        v-model="line.value.priceWithVat"
        class="input-secondary"
        @input="priceWithVatCalc($event.target.value, idx)"
      />
    </td>

    <td class="px-1 py-2">
      <input
        type="number"
        step="any"
        v-model="line.value.amount"
        class="input-secondary"
        @input="amountCalc($event.target.value, idx)"
      />
    </td>

    <td class="px-1 py-2">
      <input type="number" step="any" v-model="line.value.vatAmount" class="input-secondary" />
    </td>

    <td class="px-1 py-2">
      <input
        type="number"
        step="any"
        v-model="line.value.amountWithVat"
        class="input-secondary"
        @input="amountWithVatCalc($event.target.value, idx)"
      />
    </td>

    <td class="px-1 py-2">
      <button
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        @click="lines.remove(idx)"
      >
        Sil
      </button>
    </td>
  </tr>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useFieldArray } from 'vee-validate'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/store/modules/product-store'
import { useOtherStore } from '@/store/modules/other-store'
//import AutoComplete from 'primevue/autocomplete'
import Multiselect from '@vueform/multiselect'

const unitOfMeasure = ref('')

const lines = reactive(useFieldArray('lines'))

const otherStore = useOtherStore()
const productStore = useProductStore()
const { vats } = storeToRefs(otherStore)
const { products, autoCompleteProducts } = storeToRefs(productStore)

for (let i = 0; i < 50; i++) {
  // lines.value.push({
  //   productId: '',
  //   description: null,
  //   vatRate: 0,
  //   quantity: 1,
  //   price: 0,
  //   vatPrice: 0,
  //   priceWithVat: 0,
  //   amount: 0,
  //   vatAmount: 0,
  //   amountWithVat: 0
  // })
  lines.push({
    productId: '',
    description: null,
    vatRate: 0,
    quantity: 1,
    price: 0,
    vatPrice: 0,
    priceWithVat: 0,
    amount: 0,
    vatAmount: 0,
    amountWithVat: 0
  })
}

const onChange = ($event, idx) => {
  const value = $event
  lines.fields.at(idx).value.vatRate = products.value.find(
    (product) => product.id === value
  )?.vatRate
  lines.fields.at(idx).value.description = products.value.find(
    (product) => product.id === value
  )?.description
  unitOfMeasure.value = products.value.find((product) => product.id === value)?.unitOfMeasures

  lines.fields.at(idx).value.priceWithVat = products.value.find(
    (product) => product.id === value
  )?.salePrice
}

const priceCalc = (price, idx) => {
  const vatRate = Number(lines.fields.at(idx).value.vatRate) ?? 0
  price = Number(price)
  const quantity = Number(lines.fields.at(idx).value.quantity)
  const vatPrice = price * (vatRate / 100)
  lines.fields.at(idx).value.vatPrice = Number(vatPrice.toFixed(4))
  lines.fields.at(idx).value.priceWithVat = Number((price + vatPrice).toFixed(4))
  lines.fields.at(idx).value.amount = Number((price * quantity).toFixed(4))
  lines.fields.at(idx).value.vatAmount = Number((vatPrice * quantity).toFixed(4))
  lines.fields.at(idx).value.amountWithVat = Number(
    (lines.fields.at(idx).value.priceWithVat * quantity).toFixed(4)
  )
}

const priceWithVatCalc = (priceWithVat, idx) => {
  const vatRate = Number(lines.fields.at(idx).value.vatRate) ?? 0
  priceWithVat = Number(priceWithVat)
  const quantity = Number(lines.fields.at(idx).value.quantity)
  lines.fields.at(idx).value.price = Number((priceWithVat / (1 + vatRate / 100)).toFixed(4))
  lines.fields.at(idx).value.vatPrice = Number(
    (priceWithVat - lines.fields.at(idx).value.price).toFixed(4)
  )
  lines.fields.at(idx).value.amount = Number(
    (lines.fields.at(idx).value.price * quantity).toFixed(4)
  )
  lines.fields.at(idx).value.vatAmount = Number(
    (lines.fields.at(idx).value.vatPrice * quantity).toFixed(4)
  )
  lines.fields.at(idx).value.amountWithVat = Number((priceWithVat * quantity).toFixed(4))
}

const amountCalc = (amount, idx) => {
  const vatRate = Number(lines.fields.at(idx).value.vatRate) ?? 0
  const quantity = Number(lines.fields.at(idx).value.quantity)
  amount = Number(amount)
  lines.fields.at(idx).value.price = Number((amount / quantity).toFixed(4))
  lines.fields.at(idx).value.vatPrice = Number(
    (lines.fields.at(idx).value.price * (vatRate / 100)).toFixed(4)
  )
  lines.fields.at(idx).value.priceWithVat = Number(
    (
      Number(lines.fields.at(idx).value.price) + Number(lines.fields.at(idx).value.vatPrice)
    ).toFixed(4)
  )
  lines.fields.at(idx).value.vatAmount = Number(
    (lines.fields.at(idx).value.vatPrice * quantity).toFixed(4)
  )
  lines.fields.at(idx).value.amountWithVat = Number(
    (amount + Number(lines.fields.at(idx).value.vatAmount)).toFixed(4)
  )
}

const amountWithVatCalc = (amountWithVat, idx) => {
  const vatRate = Number(lines.fields.at(idx).value.vatRate) ?? 0
  amountWithVat = Number(amountWithVat)
  const quantity = Number(lines.fields.at(idx).value.quantity)
  lines.fields.at(idx).value.amount = Number((amountWithVat / (1 + vatRate / 100)).toFixed(4))
  lines.fields.at(idx).value.vatAmount = Number(
    (amountWithVat - Number(lines.fields.at(idx).value.amount)).toFixed(4)
  )

  lines.fields.at(idx).value.priceWithVat = Number((amountWithVat / quantity).toFixed(4))
  lines.fields.at(idx).value.price = Number(
    (Number(lines.fields.at(idx).value.priceWithVat) / (1 + vatRate / 100)).toFixed(4)
  )
  lines.fields.at(idx).value.vatPrice = Number(
    (
      Number(lines.fields.at(idx).value.priceWithVat) - Number(lines.fields.at(idx).value.price)
    ).toFixed(4)
  )
}
</script>
