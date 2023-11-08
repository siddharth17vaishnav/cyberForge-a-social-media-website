import supabase from '@/utils/supabase'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { toast } from 'sonner'

const userApi = createApi({
  reducerPath: '/users',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['user'],
  endpoints: builder => ({
    userById: builder.query({
      queryFn: async id => {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*,posts(*)')
          .eq('id', id)
        const { data: friendsData } = await supabase
          .from('friends')
          .select('*')
          .eq('from_user_id', id)
        const friends = Array.from(friendsData as any)?.filter(
          (data: any) => data.status === 'accepted'
        )
        const response = { ...data![0], friends: friends }
        if (error) toast.error(error?.message)
        return { data: response || [] }
      },
      providesTags: ['user']
    })
  })
})

export const { useLazyUserByIdQuery } = userApi
export { userApi }
