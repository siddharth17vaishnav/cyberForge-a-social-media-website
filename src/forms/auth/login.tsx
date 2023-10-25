import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { addCookie } from '@/utils/cokkies'
import supabase from '@/utils/supabase'
import LoginFormValidation from '@/validations/login'
import { useFormik } from 'formik'
const LoginForm = () => {
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
        .then(async () => {
          await supabase.auth.getSession().then(({ data }) => {
            addCookie('auth_token', data.session?.access_token!)
          })
        })
    },
    isInitialValid: false
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
          Login
        </Button>
      </CardFooter>
    </>
  )
}

export default LoginForm
