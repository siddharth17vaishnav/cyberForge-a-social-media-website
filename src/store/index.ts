import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { AppDispatch, RESET_STORE } from '@/store/redux.types'
import rootReducer from '@/store/root.reducer'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const resetStore = () => ({ type: RESET_STORE })
export const useAppDispatch = () => useDispatch<AppDispatch>()
export default store
