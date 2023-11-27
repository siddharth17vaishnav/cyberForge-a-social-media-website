import supabase from '@/utils/supabase'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { toast } from 'sonner'

const searchApi = createApi({
  reducerPath: '/search',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['search'],
  endpoints: builder => ({
    search: builder.query({
      queryFn: async key => {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .or(`first_name.ilike.${key}%,last_name.ilike.${key}%,user_name.ilike.${key}%`)
        if (error) toast.error(error.message)
        return { data: !key ? [] : data || [] }
      }
    })
  })
})

export const { useLazySearchQuery } = searchApi
export { searchApi }
