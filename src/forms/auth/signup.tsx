'use client'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import Error from '@/components/ui/error'
import { Input } from '@/components/ui/input'
import { addCookie } from '@/utils/cokkies'
import supabase from '@/utils/supabase'
import SignUpFormValidation from '@/validations/auth/signup'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const SignUpForm = () => {
  const router = useRouter()

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
        .then(async res => {
          const errors = res.error
          if (errors) {
            toast.error(errors.message)
          } else {
            supabase.auth
              .signInWithPassword({
                email: values.email,
                password: values.password
              })
              .then(async res => {
                const errors = res.error
                if (errors) {
                  toast.error(errors.message)
                } else {
                  await supabase.auth.getSession().then(async ({ data }) => {
                    addCookie('token', data.session?.access_token!)
                    router.push(`/auth/signup/complete-profile?email=${values.email}`)
                  })
                }
              })
          }
        })
    }
  })
  return (
    <>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
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
