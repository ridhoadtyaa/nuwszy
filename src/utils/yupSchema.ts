import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  email: yup.string().required().email('Invalid email address'),
  password: yup.string().required()
})

export const registerSchema = yup.object().shape({
  name: yup.string().required().min(5),
  email: yup.string().required().email('Invalid email address'),
  password: yup.string().required().min(6)
})

export const postSchema = yup.object().shape({
  title: yup.string().required().min(10).max(100),
  description: yup.string().required().max(140).min(75),
  category: yup.string().required()
})
