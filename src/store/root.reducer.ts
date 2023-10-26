import { combineReducers } from 'redux'
import { RESET_STORE, RootReduxState } from '@/store/redux.types'
import userSlice from './User/user.slice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const appReducer = combineReducers<RootReduxState>({ userSlice })
const persistConfig = {
  key: 'root',
  storage
}
const persistedReducer = persistReducer(persistConfig, appReducer)

const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_STORE) {
    state = undefined
  }
  return persistedReducer(state, action)
}

export default rootReducer
