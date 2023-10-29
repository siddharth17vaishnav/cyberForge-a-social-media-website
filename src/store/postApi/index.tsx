import supabase from '@/utils/supabase'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { toast } from 'sonner'

const postApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['posts'],
  endpoints: builder => ({
    getPosts: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase.from('posts').select('*, user_profiles(*)')
        if (error) {
          throw toast.error(error.message)
        }
        return { data: data || [] }
      },
      providesTags: ['posts']
    })
  })
})

export const { useGetPostsQuery } = postApi
export { postApi }
