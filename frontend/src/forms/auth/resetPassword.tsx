import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import supabase from '@/utils/supabase'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import * as Yup from 'yup'

const ResetPasswordForm = () => {
    const router = useRouter()

    const {
        values: { email },
        handleChange,
        isValid,
        isSubmitting,
        handleSubmit
    } = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Invalid email')
                .required('Email is required'),
        }),
        onSubmit: async values => {
            await supabase.auth.resetPasswordForEmail(values.email).then((res) => {
                if (res.data) {
                    router.push('/auth/change-password')
                }
                else {
                    toast.error(res.error?.message ?? "something went wrong ")
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
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    className="w-full"
                    disabled={!isValid || isSubmitting}
                    onClick={() => handleSubmit()}>
                    {isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                    Reset Password
                </Button>
            </CardFooter>
        </>
    )
}

export default ResetPasswordForm
