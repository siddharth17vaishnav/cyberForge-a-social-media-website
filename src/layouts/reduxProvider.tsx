'use client'
import store from '@/store'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

interface Props {
  children: ReactNode
}
const ReduxProvider = ({ children }: Props) => {
  const persistor = persistStore(store)
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  )
}

export default ReduxProvider
