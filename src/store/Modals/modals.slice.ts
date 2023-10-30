import { createSlice } from '@reduxjs/toolkit'
import { ModalsType } from './modals.types'

const initialState: ModalsType = {
  createPost: false,
  logout: false,
  postOptions: false
}

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModals: (state, { payload }: { payload: Record<string, boolean> }) => {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  }
})
export const { setModals } = modalsSlice.actions
export default modalsSlice.reducer
