import * as yup from 'yup'

const passwordChangeRequestSchema = yup.object().shape({
  password: yup.string().required(),
})

export { passwordChangeRequestSchema }
