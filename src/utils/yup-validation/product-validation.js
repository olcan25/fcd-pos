import * as yup from 'yup';

export const productValidation = yup.object({
    barcode: yup.string().required().max(25),
    name: yup.string().required().max(250),
    description: yup.string(),
    unitOfMeasures:yup.string().required(),
    vatRate: yup.number().required(),
    salePrice:yup.number().moreThan(0),
})