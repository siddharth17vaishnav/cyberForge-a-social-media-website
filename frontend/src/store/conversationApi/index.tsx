import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

const conversationApi = createApi({
  reducerPath: '/conversation',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['conversation'],
  endpoints: builder => ({
    createConversation: builder.query({
      queryFn: () => {
        return { data: {} }
      }
    })
  })
})

export const { useCreateConversationQuery } = conversationApi
export { conversationApi }
