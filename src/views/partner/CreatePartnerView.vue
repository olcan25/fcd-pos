<template>
  <form @submit="onSubmit">
    <h1 class="text-5xl font-semibold">
      Partner Bilgileri

      <span class="text-4xl font-semibold">
        <button
          type="submit"
          class="px-4 py-2 mb-4 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Kaydet
        </button>
      </span>
    </h1>

    <div class="grid gap-6 mb-6 md:grid-cols-4">
      <TextField fieldName="name" fieldLabel="Ismi" />
      <TextField fieldName="tradeName" fieldLabel="Ticaret Ismi" />
      <TextField fieldName="uidNumber" fieldLabel="Uid No" />
      <TextField fieldName="vatNumber" fieldLabel="KDV No" />
    </div>
    <div class="grid gap-6 mb-6 md:grid-cols-3">
      <TextField fieldName="address" fieldLabel="Adres" />
      <TextField fieldName="city" fieldLabel="Sehir" />

      <TextField fieldName="country" fieldLabel="Ulke" />
    </div>

    <h1 class="text-2xl font-semibold">
      Banka Bilgileri
      <button
        type="button"
        @click="addBank"
        class="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Ekle
      </button>
    </h1>

    <div class="grid gap-6 mb-6 md:grid-cols-5">
      <template v-for="bank in banks" :key="bank.key">
        <TextField
          :fieldName="`banks.${bank.key}.name`"
          :fieldLabel="`Banka Adi ${bank.key + 1}`"
        />
        <TextField
          :fieldName="`banks.${bank.key}.account`"
          :fieldLabel="`Hesap No ${bank.key + 1}`"
        />
        <TextField :fieldName="`banks.${bank.key}.iban`" :fieldLabel="`Iban ${bank.key + 1}`" />
        <TextField :fieldName="`banks.${bank.key}.swift`" :fieldLabel="`Swift ${bank.key + 1}`" />
        <div>
          <button
            type="button"
            @click="removeBank(bank.key)"
            class="px-7 py-4 mt-3 ml-8 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Sil
          </button>
        </div>
      </template>
    </div>

    <h1 class="text-2xl font-semibold">
      Iletisim Bilgileri
      <button
        type="button"
        @click="addContact"
        class="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Ekle
      </button>
    </h1>

    <div class="grid gap-6 mb-6 md:grid-cols-4">
      <template v-for="contact in contacts" :key="contact.key">
        <TextField
          :fieldName="`contacts.${contact.key}.name`"
          :fieldLabel="`Iletisim ismi ${contact.key + 1}`"
        />
        <TextField
          :fieldName="`contacts.${contact.key}.email`"
          :fieldLabel="`Email ${contact.key + 1}`"
        />
        <TextField
          :fieldName="`contacts.${contact.key}.phone`"
          :fieldLabel="`Telefon ${contact.key + 1}`"
        />
        <div>
          <button
            type="button"
            @click="removeContact(contact.key)"
            class="px-7 py-4 mt-3 ml-8 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Sil
          </button>
        </div>
      </template>
    </div>
  </form>
</template>

<script setup>
import { useForm, useFieldArray } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import TextField from '@/components/forms/TextField.vue'
import { usePartnerStore } from '@/store/modules/partner-store'
import { removeEmptyProperties } from '@/utils/js/removeEmptyProperties'
import { partnerValidation } from '@/utils/yup-validation/partner-validation'

const partnerStore = usePartnerStore()

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(partnerValidation),
  initialValues: {
    name: '',
    tradeName: '',
    uidNumber: '',
    vatNumber: '',
    address: '',
    city: '',
    country: '',
    banks: [
      {
        name: '',
        account: '',
        iban: '',
        swift: ''
      }
    ],
    contacts: [
      {
        name: '',
        email: '',
        phone: ''
      }
    ]
  }
})

const { fields: banks, push: pushBank, remove: removeBank } = useFieldArray('banks')
const { fields: contacts, push: pushContact, remove: removeContact } = useFieldArray('contacts')

const addBank = () => {
  pushBank({
    name: '',
    account: '',
    iban: '',
    swift: ''
  })
}

const addContact = () => {
  pushContact({
    name: '',
    email: '',
    phone: ''
  })
}

const onSubmit = handleSubmit((values) => {
  values.banks = removeEmptyProperties(values.banks)
  values.contacts = removeEmptyProperties(values.contacts)

  partnerStore.createPartner(values)
})
</script>
