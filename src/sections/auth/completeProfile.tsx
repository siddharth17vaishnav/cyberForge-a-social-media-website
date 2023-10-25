'use client'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import CompleteProfileForm from '@/forms/auth/completeProfile'

const CompleteProfileSection = () => {
  return (
    <div className="w-full h-screen flex px-3">
      <div className="m-auto">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="self-center text-3xl font-pacifico">CyberForge</CardTitle>
            <CardDescription className="self-center !mt-5">Complete your profile</CardDescription>
          </CardHeader>
          <CompleteProfileForm />
        </Card>
      </div>
    </div>
  )
}

export default CompleteProfileSection
