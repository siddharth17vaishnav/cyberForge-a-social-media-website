import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { AppDispatch, RESET_STORE } from '@/store/redux.types'
import rootReducer from '@/store/root.reducer'
import { postApi } from './postApi'
import { searchApi } from './searchApi'
import { userApi } from './UserApi'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }).concat(
      postApi.middleware,
      searchApi.middleware,
      userApi.middleware
    )
})

export const resetStore = () => ({ type: RESET_STORE })
export const useAppDispatch = () => useDispatch<AppDispatch>()
export default store
