import { combineReducers } from 'redux'
import { RESET_STORE, RootReduxState } from '@/store/redux.types'
import userSlice from './User/user.slice'
import modalsSlice from './Modals/modals.slice'
import { postApi } from './postApi'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { searchApi } from './searchApi'
import { userApi } from './UserApi'

const appReducer = combineReducers({
  userSlice,
  modalsSlice,
  [postApi.reducerPath]: postApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
  [userApi.reducerPath]: userApi.reducer
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
