<template>
  <div class="grid gap-6 mb-6 md:grid-cols-4">
    <DateField fieldName="date" fieldLabel="Date" />
    <DateField fieldName="dueDate" fieldLabel="Odeme Tarihi" />
    <VSelectField fieldName="partnerId" fieldLabel="Müşteri" :data="autoCompletePartners" />
    <TextField fieldName="invoiceNumber" fieldLabel="Fatura No." />
  </div>
  <div class="grid gap-6 mb-6 md:grid-cols-4">
    <TextareaField fieldName="note" fieldLabel="Note" />
    <CheckboxField fieldName="isPaid" fieldLabel="Odendi Mi?" />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { usePartnerStore } from '@/store/modules/partner-store'
import TextField from '@/components/forms/TextField.vue'
import DateField from '@/components/forms/DateField.vue'
import TextareaField from '@/components/forms/TextareaField.vue'
import CheckboxField from '@/components/forms/CheckboxField.vue'
import VSelectField from '@/components/forms/VSelectField.vue'
// import Multiselect from '@vueform/multiselect'

const partnerStore = usePartnerStore()
const { autoCompletePartners } = storeToRefs(partnerStore)

</script>

