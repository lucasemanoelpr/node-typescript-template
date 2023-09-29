import * as yup from 'yup'

const companyUpdateRequestSchema = yup.object().shape({
  name: yup.string().optional(),
  size: yup.string().optional(),
  cnpj: yup.string().optional().length(18),
  city: yup.string().optional(),
  state: yup.string().optional(),
  area: yup.string().optional(),
})

export { companyUpdateRequestSchema }
