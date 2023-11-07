import supabase from '@/utils/supabase'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { toast } from 'sonner'

const friendsApi = createApi({
  reducerPath: '/friends',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['friends'],
  endpoints: builder => ({
    addFriend: builder.mutation({
      queryFn: async data => {
        const { data: friendsData, error } = await supabase.from('friends').insert(data)

        if (error) toast.error(error.message)
        return { data: friendsData || [] }
      }
    })
  })
})

export const { useAddFriendMutation } = friendsApi
export { friendsApi }
