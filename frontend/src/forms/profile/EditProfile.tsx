import assets from '@/assets'
import { invalidImageValues } from '@/comp/Drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ProfileDataProps } from '@/sections/profile'
import { dispatch } from '@/store'
import { setModals } from '@/store/Modals/modals.slice'
import { setAccount } from '@/store/User/user.slice'
import { useUpdateUserMutation, userApi } from '@/store/UserApi'
import EditProfileFormValidation from '@/validations/profile/editProfile'
import { useFormik } from 'formik'
import { useRef, useState } from 'react'
import { MdEdit } from 'react-icons/md'
import { toast } from 'sonner'

interface Props {
  data?: ProfileDataProps
}
const EditProfileForm = ({ data }: Props) => {
  const ref = useRef<HTMLInputElement>(null)

  const [[selectedImage, file], setSelectedImage] = useState<[string, File | null]>(['', null])
  const [updateUser] = useUpdateUserMutation()
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      first_name: data?.first_name || '',
      last_name: data?.last_name || '',
      bio: data?.bio || ''
    },
    validationSchema: EditProfileFormValidation,
    onSubmit: async values => {
      await updateUser({
        id: data?.id,
        data: values,
        file,
        profile: data?.profile
      }).then((res: any) => {
        const { data } = res
        dispatch(
          setAccount({
            id: data?.id,
            user_name: data?.user_name,
            first_name: data?.first_name,
            last_name: data?.last_name,
            email: data?.email,
            profile: data?.profile
          })
        )
        dispatch(setModals({ editProfile: false }))
        userApi.util.invalidateTags(['user'])
        toast.success('Profile Updated')
      })
    },
    enableReinitialize: true
  })
  const profile =
    data && data.profile && !invalidImageValues.includes(data.profile)
      ? data?.profile
      : assets.images.DUMMY_PROFILE.src
  const handleOnImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    if (fileList && fileList.length > 0) {
      const selectedFile = fileList[0]
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImage([reader.result as string, selectedFile])
      }
      reader.readAsDataURL(selectedFile)
    }
  }
  return (
    <div>
      <div
        className={'relative flex flex-col space-y-1.5  w-[80px] h-[80px] mx-auto rounded-full'}
        onClick={() => ref?.current?.click()}
        style={{
          backgroundImage: `url(${selectedImage || profile})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}>
        <input ref={ref} type="file" accept="image/*" onChange={handleOnImageChange} hidden />
        <div
          className="absolute right-[7px] bottom-[5px] bg-white rounded-full p-1 cursor-pointer"
          style={{
            boxShadow: '1px 1px 2px 0 rgba(0, 0, 0, 0.5)'
          }}>
          <MdEdit fontSize={12} />
        </div>
      </div>
      <form className="my-2">
        <div className="grid items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Input
              id="first_name"
              placeholder="First Name"
              value={values.first_name}
              onChange={handleChange('first_name')}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Input
              id="last_name"
              placeholder="Last Name"
              value={values.last_name}
              onChange={handleChange('last_name')}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Input id="email" placeholder="Email" value={String(data?.email)} disabled />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Textarea
              id="bio"
              placeholder="Bio"
              value={values.bio}
              onChange={handleChange('bio')}
            />
          </div>
          <Button
            onClick={e => {
              e.preventDefault()
              handleSubmit()
            }}>
            Update
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditProfileForm
