import supabase from '@/utils/supabase'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { toast } from 'sonner'

const conversationApi = createApi({
  reducerPath: '/conversation',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['conversation'],
  endpoints: builder => ({
    createConversation: builder.mutation({
      queryFn: async ({ id, userId }) => {
        const { data, error } = await supabase.from('conversation').insert({}).select()
        if (data) {
          ;[id, userId].forEach(async item => {
            await supabase.from('conversation_users').insert({
              user_id: item,
              conversation_id: data[0].id
            })
          })
        }
        if (error) toast.error(error.message)
        return { data }
      }
    }),
    fetchConversation: builder.query({
      queryFn: async id => {
        const { data, error } = await supabase
          .from('conversation_messages')
          .select('*,user_profiles(*)')
          .eq('conversation_id', id)
        if (error) toast(error.message)
        return { data }
      }
    }),
    sendMessage: builder.mutation({
      queryFn: async ({ message, conversationId, userId }) => {
        const { data, error } = await supabase
          .from('conversation_messages')
          .insert({ message, conversation_id: conversationId, user_id: userId })
          .select()
        if (error) toast(error.message)
        return { data }
      }
    }),
    fetchConversationList: builder.query({
      queryFn: async id => {
        const { data, error } = await supabase
          .from('conversation_users')
          .select('*')
          .eq('user_id', id)
        const response =
          data &&
          (await Promise.all(
            data?.map(async item => {
              const { data: userData } = await supabase
                .from('user_profiles')
                .select()
                .eq('id', Number(item?.user_id))

              return { ...item, user_profiles: userData![0] }
            })
          ))

        if (error) toast(error.message)
        return { data: response }
      }
    })
  })
})

export const {
  useCreateConversationMutation,
  useLazyFetchConversationQuery,
  useLazyFetchConversationListQuery,
  useSendMessageMutation
} = conversationApi
export { conversationApi }
