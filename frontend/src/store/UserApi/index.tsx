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
        const { data, error } = await supabase.from('user_profiles').select('*').eq('id', id)
        const userData = data![0]
        const { data: postData, error: postError } = await supabase
          .from('posts')
          .select('*')
          .eq('user_id', id)
        const response = { ...userData, posts: postData }
        if (error || postError) toast.error(error?.message)
        return { data: response || [] }
      }
    })
  })
})

export const { useLazyUserByIdQuery } = userApi
export { userApi }
