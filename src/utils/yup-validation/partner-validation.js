import * as yup from 'yup'

export const partnerValidation = yup.object({
  name: yup.string().required().max(250),
  tradeName: yup.string(),
  uidNumber: yup
    .string()
    .required()
    .length(9)
    .test({
      name: 'startwith8or6',
      message: 'UID Numarasi 8 veya 6 ile baslamali',
      test: (value) => value?.startsWith('8') || value?.startsWith('6')
    }),
  vatNumber: yup
    .string()
    .test({
      name: 'lenthOrNullable',
      message: 'KDV numarasi 9 karakterli olmalidir.',
      test: (value) => value == '' || value?.length === 9
    })
    .test({
      name: 'startwith3',
      message: 'KDV numarasi 3 ile baslamalidir',
      test: (value) => value?.startsWith('3') || value == ''
    }),
  address: yup.string().required().max(250),
  city: yup.string().required().max(60),
  country: yup.string().required().max(60),
  banks: yup.array().of(
    yup.object({
      name: yup.string().optional().max(8),
      account: yup.string().optional().max(16),
      swift: yup.string().optional().max(10),
      iban: yup.string().optional().max(10)
    })
  ),
  contacts: yup.array().of(
    yup.object({
      name: yup.string().optional().max(25),
      email:yup.string().optional().email().max(25),
      phone:yup.string().optional().max(25)
    })
  )
})
