import * as yup from 'yup'

const EditProfileFormValidation = yup.object({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  bio: yup.string().nullable()
})

export default EditProfileFormValidation
