import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ResetPasswordForm from '@/forms/auth/resetPassword';
import { useRouter } from 'next/navigation';

export const ResetPasswordSeciton = () => {
    const router = useRouter();
    return (
        <div className="w-full h-screen flex px-3">
            <div className="m-auto">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle className="self-center text-3xl font-pacifico">CyberForge</CardTitle>
                        <CardDescription className="self-center !mt-5">
                            Reset your password
                        </CardDescription>
                    </CardHeader>
                    <ResetPasswordForm />
                </Card>
                <p className="flex my-4 justify-center">OR</p>
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardDescription className="self-center">
                            <span
                                className="text-black font-semibold cursor-pointer"
                                onClick={() => router.push('/auth')}>

                                Login  {' '}
                            </span>
                            into your account
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
};
