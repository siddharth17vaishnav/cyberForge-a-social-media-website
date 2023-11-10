import { useLazyFetchConversationQuery } from '@/store/conversationApi'
import ChatMessage from './ChatMessage'
import ChatHeader from './Header'
import SendMessage from './SendMessage'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import supabase from '@/utils/supabase'
import { Tables } from '@/types/gen/supabase.table'
import { useStateSelector } from '@/store/root.reducer'
import Loader from '@/comp/Loader'

interface MessageProps extends Tables<'conversation_messages'> {
  user_profiles: Tables<'user_profiles'>
}

const ConversationSection = () => {
  const params = useParams()
  const [messages, setMessages] = useState<MessageProps[]>([])
  const { id } = useStateSelector(state => state.userSlice)

  const [fetchConversation, { isLoading, isFetching }] = useLazyFetchConversationQuery()
  useEffect(() => {
    if (params?.id) {
      fetchConversation(params.id)
        .unwrap()
        .then(data => setMessages(data as any))
    }
    const channel = supabase
      .channel('conversation_messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'conversation_messages' },
        payload =>
          setMessages(prev => [...prev, { ...payload.new, user_profiles: { id: id } } as any])
      )
      .subscribe()

    return () => {
      void supabase.removeChannel(channel)
    }
  }, [params?.id])
  return (
    <div>
      <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
        <ChatHeader />
        <div>
          {isLoading || isFetching ? (
            <div className="h-[60vh]">
              <Loader />
            </div>
          ) : (
            <div
              id="messages"
              className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
              {messages?.map(chat => {
                return (
                  <ChatMessage
                    key={chat.id}
                    isSender={chat?.user_profiles?.id === id}
                    message={chat.message!}
                  />
                )
              })}
            </div>
          )}
          <SendMessage />
        </div>
      </div>
    </div>
  )
}

export default ConversationSection
