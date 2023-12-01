import { StorageRotues } from '@/contants/routes'
import { Tables } from '@/types/gen/supabase.table'
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
          .select('*,posts(*,post_likes(*),post_comments(*))')
          .eq('id', id)
        const { data: friendsData } = await supabase
          .from('friends')
          .select('*')
          .eq('from_user_id', id)
        const friends = Array.from(friendsData as Tables<'friends'>[])?.filter(
          data => data.status === 'accepted'
        )
        const response = { ...data![0], friends: friends }
        if (error) toast.error(error?.message)
        return { data: response || [] }
      },
      providesTags: ['user']
    }),
    updateUser: builder.mutation({
      queryFn: async ({ id, data, file, profile, email }) => {
        let path
        const fileName = profile?.split('profiles/')[1]

        if (file && fileName) {
          await supabase.storage
            .from('profiles')
            .update(fileName, file, {
              cacheControl: '3600',
              upsert: true
            })
            .then(res => (path = res.data?.path))
        } else {
          await supabase.storage
            .from('profiles')
            .upload(`public/${email}/${file?.name}`, file, {
              cacheControl: '3600',
              upsert: false
            })
            .then(res => (path = res.data?.path))
        }
        const { data: userData, error } = await supabase
          .from('user_profiles')
          .update({ ...data, profile: path ? StorageRotues.PROFILE(path) : data.profile })
          .eq('id', id)
          .select()
        if (error) toast.error(error?.message)
        return { data: userData![0] || {} }
      },
      invalidatesTags: ['user']
    }),
    getAllUsers: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase.from('user_profiles').select('*')
        if (error) toast.error(error?.message)
        return { data: data || [] }
      }
    })
  })
})

export const {
  useLazyUserByIdQuery,
  useUserByIdQuery,
  useUpdateUserMutation,
  useGetAllUsersQuery
} = userApi
export { userApi }
