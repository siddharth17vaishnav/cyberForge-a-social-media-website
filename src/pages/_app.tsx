import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import ReduxProvider from '@/layouts/reduxProvider.tsx'
import MainLayout from '@/layouts/MainLayout.tsx'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ReduxProvider>
  )
}
