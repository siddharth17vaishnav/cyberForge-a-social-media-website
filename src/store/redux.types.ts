import store from '@/store'
import { Action, ThunkAction } from '@reduxjs/toolkit'
export interface RootReduxState {
  // TODO REMOVE THIS
  userSlice: any
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
