import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { AppDispatch, RESET_STORE } from '@/store/redux.types'
import rootReducer from '@/store/root.reducer'
import { postApi } from './postApi'
import { searchApi } from './searchApi'
import { userApi } from './UserApi'
import { friendsApi } from './friendsApi'
import { conversationApi } from './conversationApi'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }).concat(
      postApi.middleware,
      searchApi.middleware,
      userApi.middleware,
      friendsApi.middleware,
      conversationApi.middleware
    )
})

export const resetStore = () => ({ type: RESET_STORE })
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const { dispatch } = store
export default store
