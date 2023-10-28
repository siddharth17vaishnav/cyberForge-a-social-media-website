import * as yup from 'yup'

const completeProfileValidation = yup.object({
  userName: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required()
})

export default completeProfileValidation
