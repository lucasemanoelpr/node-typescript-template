import * as yup from 'yup'

const companyCreateRequestSchema = yup.object().shape({
  name: yup.string().required(),
  size: yup.string().required(),
  cnpj: yup.string().required().length(18),
  city: yup.string().required(),
  state: yup.string().required(),
  // area: yup.string().required(),
})

export { companyCreateRequestSchema }
