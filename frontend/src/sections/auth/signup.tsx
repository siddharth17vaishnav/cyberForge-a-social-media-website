'use client'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { useRouter } from 'next/navigation'
import SignUpForm from '@/forms/auth/signup'

const SignUpSection = () => {
  const router = useRouter()
  return (
    <div className="w-full h-screen flex px-3">
      <div className="m-auto">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="self-center text-3xl font-pacifico">CyberForge</CardTitle>
            <CardDescription className="self-center !mt-5">Create a new account</CardDescription>
          </CardHeader>
          <SignUpForm />
        </Card>
        <p className="flex my-4 justify-center">OR</p>
        <Card className="w-[350px]">
          <CardHeader>
            <CardDescription className="self-center">
              Already have an account?{' '}
              <span
                className="text-black font-semibold cursor-pointer"
                onClick={() => router.push('/auth')}>
                {' '}
                Login
              </span>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

export default SignUpSection
