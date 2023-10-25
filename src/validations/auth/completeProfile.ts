import * as yup from 'yup'

const completeProfileValidation = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required()
})

export default completeProfileValidation
