'use client'
import ModalProvider from '@/modals'
import store from '@/store'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'

interface Props {
  children: ReactNode
}
const ReduxProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <ModalProvider />
      {children}
    </Provider>
  )
}

export default ReduxProvider
