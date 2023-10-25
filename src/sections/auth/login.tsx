'use client'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FcGoogle } from 'react-icons/fc'
import { GrGithub } from 'react-icons/gr'

import React from 'react'
import LoginForm from '@/forms/auth/login'

const Login = () => {
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

          <p className="flex mb-4 justify-center">OR</p>
          <div className="flex gap-4 justify-center mb-4">
            <FcGoogle fontSize={24} className="cursor-pointer" />
            <GrGithub fontSize={24} className="cursor-pointer" />
          </div>
        </Card>
        <p className="flex my-4 justify-center">OR</p>
        <Card className="w-[350px]">
          <CardHeader>
            <CardDescription className="self-center">
              Don&apos;t have account?{' '}
              <span className="text-black font-semibold cursor-pointer"> Sign up</span>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

export default Login
