import store from '@/store'
import { Action, ThunkAction } from '@reduxjs/toolkit'
import { UserType } from './User/user.types'
import { ModalsType } from './Modals/modals.types'
export interface RootReduxState {
  userSlice: UserType
  modalsSlice: ModalsType
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
