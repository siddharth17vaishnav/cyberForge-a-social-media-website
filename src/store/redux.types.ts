import store from '@/store'
import { Action, ThunkAction } from '@reduxjs/toolkit'
import { UserType } from './User/user.types'
export interface RootReduxState {
  userSlice: UserType
}

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<T = Promise<void> | void> = ThunkAction<
  T,
  RootReduxState,
  unknown,
  Action<string>
>

export const RESET_STORE = 'RESET_STORE'
