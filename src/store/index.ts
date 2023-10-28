import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { AppDispatch, RESET_STORE } from '@/store/redux.types'
import rootReducer from '@/store/root.reducer'

const store = configureStore({
  reducer: rootReducer
})

export const resetStore = () => ({ type: RESET_STORE })
export const useAppDispatch = () => useDispatch<AppDispatch>()
export default store
