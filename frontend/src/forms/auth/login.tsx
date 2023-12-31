import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { dispatch } from '@/store'
import { setAccount } from '@/store/User/user.slice'
import { addCookie } from '@/utils/cokkies'
import supabase from '@/utils/supabase'
import LoginFormValidation from '@/validations/auth/login'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
const LoginForm = () => {
  const router = useRouter()

  const {
    values: { email, password },
    handleChange,
    isValid,
    isSubmitting,
    handleSubmit
  } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginFormValidation,
    onSubmit: async values => {
      await supabase.auth
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
              const email = data.session?.user.email
              await supabase
                .from('user_profiles')
                .update({ is_logged_in: true })
                .eq('email', String(email))
                .select('*')
                .then(({ data: userData }) => {
                  if (userData) {
                    addCookie('id', String(userData[0].id))
                    dispatch(
                      setAccount({
                        id: userData[0].id,
                        user_name: userData[0].user_name,
                        first_name: userData[0].first_name,
                        last_name: userData[0].last_name,
                        email: userData[0].email,
                        profile: userData[0].profile
                      })
                    )
                  }
                  addCookie('auth_token', String(data.session?.access_token))

                  router.push('/')
                })
            })
          }
        })
    },
    validateOnMount: true
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
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handleChange('password')}
              />
            </div>
          </div>
        </form>
        <div
          className="text-sm [text-align-last:right] mt-2 cursor-pointer"
          onClick={() => router.push('/auth/reset-password')}>
          Forgot Password!
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          className="w-full"
          disabled={!isValid || isSubmitting}
          onClick={() => handleSubmit()}>
          {isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
      </CardFooter>
    </>
  )
}

export default LoginForm
