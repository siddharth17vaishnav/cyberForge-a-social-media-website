'use client'
import assets from '@/assets'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import Error from '@/components/ui/error'
import { Input } from '@/components/ui/input'
import supabase from '@/utils/supabase'
import completeProfileValidation from '@/validations/auth/completeProfile'

import { ReloadIcon } from '@radix-ui/react-icons'
import { useFormik } from 'formik'
import { useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'
import { MdEdit } from 'react-icons/md'

const CompleteProfileForm = () => {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const ref = useRef<HTMLInputElement>(null)
  const [[selectedImage, file], setSelectedImage] = useState<[string, File | null]>(['', null])
  const {
    values: { firstName, lastName },
    errors,
    handleChange,
    isValid,
    isSubmitting,
    handleSubmit,
    touched,
    setFieldTouched
  } = useFormik({
    initialValues: {
      firstName: '',
      lastName: ''
    },
    validationSchema: completeProfileValidation,
    onSubmit: async values => {
      await supabase.storage
        .from('profiles')
        .upload(`public/${email}/${file?.name}`, file as File, {
          cacheControl: '3600',
          upsert: false
        })
        .then(async res => {
          if (res.data)
            await supabase
              .from('user_profiles')
              .upsert({
                email,
                first_name: values.firstName,
                last_name: values.lastName,
                profile: `https://bsluzuktmnydpxshkbxl.supabase.co/storage/v1/object/public/profiles/${res.data.path}`
              })
              .select()
        })
    }
  })
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
    <>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div
              className={
                'relative flex flex-col space-y-1.5  w-[80px] h-[80px] mx-auto rounded-full'
              }
              onClick={() => ref?.current?.click()}
              style={{
                backgroundImage: `url(${selectedImage || assets.images.DUMMY_PROFILE.src})`,
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
            <div className="flex flex-col space-y-1.5">
              <Input id="email" type="email" placeholder="Email" value={email!} disabled />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                id="first-name"
                placeholder="First Name"
                value={firstName}
                onChange={handleChange('firstName')}
                onBlur={() => setFieldTouched('firstName', true)}
              />
              <Error error={touched.firstName && errors.firstName} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                id="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={handleChange('lastName')}
                onBlur={() => setFieldTouched('lastName', true)}
              />
              <Error error={touched.lastName && errors.lastName} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          className="w-full"
          disabled={!isValid || isSubmitting}
          onClick={() => handleSubmit()}>
          {isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Sign Up
        </Button>
      </CardFooter>
    </>
  )
}

export default CompleteProfileForm
