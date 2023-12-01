import { Tables } from '@/types/gen/supabase.table'
import supabase from '@/utils/supabase'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { toast } from 'sonner'

type UserProps = Tables<'user_profiles'>
interface FetchFriendRequestsProps extends Tables<'friends'> {
  user: Partial<UserProps>
}

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
    }),
    rejectFriendRequest: builder.mutation({
      queryFn: async id => {
        const { data, error } = await supabase.from('friends').delete().eq('id', id)

        if (error) toast.error(error.message)
        return { data: data || [] }
      }
    }),
    acceptFriendRequest: builder.mutation({
      queryFn: async id => {
        const { data, error } = await supabase
          .from('friends')
          .update({ status: 'accepted' })
          .eq('id', id)

        if (error) toast.error(error.message)
        return { data: data || [] }
      }
    }),
    fetchFriendRequests: builder.query({
      queryFn: async id => {
        let result: FetchFriendRequestsProps[] = []
        const { data: friendsData, error: friendsError } = await supabase
          .from('friends')
          .select('*')
          .eq('to_user_id', id)

        if (friendsError) {
        } else {
          const fromUserIds = friendsData.map(friend => friend.from_user_id)

          const { data: userData, error: userError } = await supabase
            .from('user_profiles')
            .select('*')
            .in('id', fromUserIds)

          if (userError) {
          } else {
            result = friendsData.map(friend => {
              const user = userData.find(u => u.id === friend.from_user_id)
              return {
                ...friend,
                user: user || {}
              }
            })
          }
        }
        return { data: result || [] }
      }
    })
  })
})

export const {
  useAddFriendMutation,
  useFetchFriendRequestsQuery,
  useRejectFriendRequestMutation,
  useAcceptFriendRequestMutation
} = friendsApi
export { friendsApi }
