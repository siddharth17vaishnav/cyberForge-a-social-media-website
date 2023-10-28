import { createSlice } from '@reduxjs/toolkit'
import { UserType } from './user.types'

const initialState: UserType = {
  id: 0,
  userName: '',
  firstName: '',
  lastName: '',
  email: '',
  profile: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccount: (state, { payload }: { payload: UserType }) => {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  }
})
export const { setAccount } = userSlice.actions
export default userSlice.reducer
