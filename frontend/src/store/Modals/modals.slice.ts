import { createSlice } from '@reduxjs/toolkit'
import { ModalsType } from './modals.types'

interface PayloadProps {
  [key: string]: boolean | { id: number; value: boolean }
}
const initialState: ModalsType = {
  createPost: false,
  logout: false,
  editProfile: false,
  postOptions: { id: 0, value: false },
  commentSection: { id: 0, value: false },
  viewPost: { id: 0, value: false },
  startConversation: false
}

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModals: (state, { payload }: { payload: PayloadProps }) => {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  }
})
export const { setModals } = modalsSlice.actions
export default modalsSlice.reducer
