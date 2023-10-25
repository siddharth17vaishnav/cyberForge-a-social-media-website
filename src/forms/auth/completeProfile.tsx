'use client'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import Error from '@/components/ui/error'
import { Input } from '@/components/ui/input'
import supabase from '@/utils/supabase'
import completeProfileValidation from '@/validations/auth/completeProfile'

import { ReloadIcon } from '@radix-ui/react-icons'
import { useFormik } from 'formik'
import { useRouter, useSearchParams } from 'next/navigation'

const CompleteProfileForm = () => {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const router = useRouter()
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
      await supabase
        .from('user_profiles')
        .insert({ email, first_name: values.firstName, last_name: values.lastName })
        .then(() => router.push('/'))
    }
  })
  return (
    <>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
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
