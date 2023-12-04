import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import ReduxProvider from '@/layouts/reduxProvider.tsx'
import MainLayout from '@/layouts/MainLayout.tsx'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loader from '@/comp/Loader'
import { Toaster } from 'sonner'
import useHandleLoggedInStatus from '@/hooks/useHandleLoggedInStatus'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const handleChangeLoaderFalse = () => {
      setLoading(false)
    }
    const handleChangeStart = () => {
      setLoading(true)
    }
    router.events.on('routeChangeStart', handleChangeStart)
    router.events.on('routeChangeComplete', handleChangeLoaderFalse)
    router.events.on('routeChangeError', handleChangeLoaderFalse)
    return () => {
      router.events.off('routeChangeStart', handleChangeLoaderFalse)
      router.events.off('routeChangeComplete', handleChangeLoaderFalse)
      router.events.off('routeChangeError', handleChangeLoaderFalse)
    }
  }, [router])
  useHandleLoggedInStatus()
  return (
    <ReduxProvider>
      <Toaster />
      <MainLayout>
        {loading ? (
          <div className="w-full h-screen">
            <Loader />
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </MainLayout>
    </ReduxProvider>
  )
}
