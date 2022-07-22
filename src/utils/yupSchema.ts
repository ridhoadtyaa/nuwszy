import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  email: yup.string().required().email('Invalid email address'),
  password: yup.string().required()
})
