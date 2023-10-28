import { combineReducers } from 'redux'
import { RESET_STORE, RootReduxState } from '@/store/redux.types'
import userSlice from './User/user.slice'
import modalsSlice from './Modals/modals.slice'

const appReducer = combineReducers<RootReduxState>({ userSlice, modalsSlice })

const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_STORE) {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
