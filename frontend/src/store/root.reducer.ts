import { combineReducers } from 'redux'
import { RESET_STORE, RootReduxState } from '@/store/redux.types'
import userSlice from './User/user.slice'
import modalsSlice from './Modals/modals.slice'
import { postApi } from './postApi'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

const appReducer = combineReducers({
  userSlice,
  modalsSlice,
  [postApi.reducerPath]: postApi.reducer
})

const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_STORE) {
    state = undefined
  }
  return appReducer(state, action)
}

const useStateSelector: TypedUseSelectorHook<RootReduxState> = useSelector
export { useStateSelector }
export default rootReducer
