import { createSlice } from '@reduxjs/toolkit'
import { TablesInsert } from '@/types/gen/supabase.table'

const initialState: TablesInsert<'user_profiles'> = {
  id: undefined,
  user_name: '',
  first_name: '',
  last_name: '',
  email: '',
  profile: '',
  created_at: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccount: (state, { payload }: { payload: TablesInsert<'user_profiles'> }) => {
      Object.keys(payload).forEach(key => {
        const reduxState = state as Record<string, string | number>
        const accountPayload = payload as unknown as Record<string, string | number>
        reduxState[key] = accountPayload[key]
      })
    }
  }
})
export const { setAccount } = userSlice.actions
export default userSlice.reducer
