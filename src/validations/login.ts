import * as yup from 'yup'

const LoginFormValidation = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required()
})

export default LoginFormValidation
