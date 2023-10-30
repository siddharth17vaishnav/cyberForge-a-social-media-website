'use client'
import React, { useEffect } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import LoginForm from '@/forms/auth/login'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store'

const LoginSection = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch({ type: 'reset' })
  }, [])
  return (
    <div className="w-full h-screen flex px-3">
      <div className="m-auto">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="self-center text-3xl font-pacifico">CyberForge</CardTitle>
            <CardDescription className="self-center !mt-5">
              Login using your registered credentials
            </CardDescription>
          </CardHeader>
          <LoginForm />
        </Card>
        <p className="flex my-4 justify-center">OR</p>
        <Card className="w-[350px]">
          <CardHeader>
            <CardDescription className="self-center">
              Don&apos;t have account?{' '}
              <span
                className="text-black font-semibold cursor-pointer"
                onClick={() => router.push('/auth/signup')}>
                {' '}
                Sign up
              </span>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

export default LoginSection
