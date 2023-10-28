import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAppDispatch } from '@/store'
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
  const dispatch = useAppDispatch()
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
                .select('*')
                .eq('email', email)
                .then(
                  ({ data: userData }) =>
                    userData &&
                    dispatch(
                      setAccount({
                        firstName: userData[0].first_name,
                        lastName: userData[0].last_name,
                        email: userData[0].email,
                        profile: userData[0].profile
                      })
                    )
                )
              addCookie('auth_token', data.session?.access_token!)
              router.push('/')
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
