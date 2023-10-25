'use client'
import assets from '@/assets'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import Error from '@/components/ui/error'
import { Input } from '@/components/ui/input'
import supabase from '@/utils/supabase'
import SignUpFormValidation from '@/validations/auth/signup'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { MdEdit } from 'react-icons/md'
const SignUpForm = () => {
  const router = useRouter()
  const ref = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState('')
  const {
    values: { email, password, confirmPassword },
    errors,
    handleChange,
    isValid,
    isSubmitting,
    handleSubmit,
    touched,
    setFieldTouched
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: SignUpFormValidation,
    onSubmit: async values => {
      await supabase.auth
        .signUp({
          email: values.email,
          password: values.password
        })
        .then(() => router.push(`/auth/signup/complete-profile?email=${values.email}`))
    }
  })
  const handleOnImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    if (fileList && fileList.length > 0) {
      const selectedFile = fileList[0]
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImage(reader.result as string)
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
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleChange('email')}
                onBlur={() => setFieldTouched('email', true)}
              />
              <Error error={touched.email && errors.email} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handleChange('password')}
                onBlur={() => setFieldTouched('password', true)}
              />
              <Error error={touched.password && errors.password} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleChange('confirmPassword')}
                onBlur={() => setFieldTouched('confirmPassword', true)}
              />
              <Error error={touched.confirmPassword && errors.confirmPassword} />
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

export default SignUpForm
