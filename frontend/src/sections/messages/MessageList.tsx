import assets from '@/assets'
import { invalidImageValues } from '@/comp/Drawer'
import Loader from '@/comp/Loader'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/store'
import { setModals } from '@/store/Modals/modals.slice'
import { useLazyFetchConversationListQuery } from '@/store/conversationApi'
import { useStateSelector } from '@/store/root.reducer'
import { Tables } from '@/types/gen/supabase.table'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Props extends Tables<'conversation_users'> {
  user_profiles: Tables<'user_profiles'>
}
const MessageList = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { id } = useStateSelector(state => state.userSlice)
  const [data, setData] = useState<Props[]>()
  const [fetchConversations, { isLoading, isFetching }] = useLazyFetchConversationListQuery()
  useEffect(() => {
    if (id) {
      fetchConversations(id).then(conversations => setData(conversations.data as any))
    }
  }, [id])
  return (
    <>
      <div className="flex justify-between self-center mx-6 mt-2 ">
        <h2 className="text-2xl underline ">Messages</h2>
        <Button onClick={() => dispatch(setModals({ startConversation: true }))}>
          Start Conversation
        </Button>
      </div>
      {isLoading || isFetching ? (
        <div className="h-[40vh]">
          <Loader />
        </div>
      ) : (
        <div className="mt-4 mx-6">
          {data?.map(item => {
            return (
              <div
                key={item.id}
                className="w-full cursor-pointer hover:bg-gray-200"
                onClick={() => router.push(`/messages/${item.conversation_id}`)}>
                <div className="flex gap-2">
                  <Image
                    alt="profile-pic"
                    src={
                      item && !invalidImageValues.includes(item.user_profiles.profile!)
                        ? (item.user_profiles!.profile as string)
                        : assets.images.DUMMY_PROFILE
                    }
                    width={40}
                    height={40}
                    className="rounded-full  w-[40px] h-[40px]"
                  />
                  <p className="self-center">{item.user_profiles.user_name}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default MessageList
