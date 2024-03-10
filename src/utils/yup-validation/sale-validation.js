import * as yup from 'yup'

export const saleValidation = yup.object({
 // partnerId: yup.string().required(),
  invoiceNumber: yup.string().required()
})
