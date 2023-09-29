import * as yup from 'yup'

const newUserRequestSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
})

export { newUserRequestSchema }
