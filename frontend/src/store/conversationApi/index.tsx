import supabase from '@/utils/supabase'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { toast } from 'sonner'

const conversationApi = createApi({
  reducerPath: '/conversation',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['conversation', 'conversation_messages'],
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
          .select('*,user_profiles(*)')
          .eq('user_id', id)

        if (error) toast(error.message)
        const conversationId = data?.map(item => item.conversation_id) || []
        const { data: conversationData, error: conversationError } = await supabase
          .from('conversation_users')
          .select('*,user_profiles(*)')
          .in('conversation_id', conversationId)
        if (error) toast(conversationError?.message)
        return { data: conversationData }
      },
      providesTags: ['conversation_messages']
    }),
    getConversationUser: builder.query({
      queryFn: async id => {
        const { data, error } = await supabase
          .from('conversation_users')
          .select('*,user_profiles(*)')
          .eq('conversation_id', id)
        if (error) toast(error.message)
        return { data }
      }
    }),
    deleteConversation: builder.mutation({
      queryFn: async id => {
        await supabase.from('conversation_messages').delete().eq('conversation_id', id)
        await supabase.from('conversation_users').delete().eq('conversation_id', id)
        await supabase.from('conversation').delete().eq('id', id)
        return { data: {} }
      }
    })
  })
})

export const {
  useCreateConversationMutation,
  useLazyFetchConversationQuery,
  useLazyFetchConversationListQuery,
  useSendMessageMutation,
  useLazyGetConversationUserQuery,
  useDeleteConversationMutation
} = conversationApi
export { conversationApi }
