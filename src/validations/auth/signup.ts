import * as yup from 'yup'

const SignUpFormValidation = yup.object({
  email: yup.string().email('Invalid Email').required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Required')
})

export default SignUpFormValidation
