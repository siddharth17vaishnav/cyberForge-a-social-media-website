import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {}
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserType: (state, { payload }) => {
      state.user = payload
    }
  }
})
export const { setUserType } = userSlice.actions
export default userSlice.reducer
