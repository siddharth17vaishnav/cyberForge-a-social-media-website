import assets from '@/assets'
import { invalidImageValues } from '@/comp/Drawer'
import Loader from '@/comp/Loader'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/store'
import { setModals } from '@/store/Modals/modals.slice'
import {
  useDeleteConversationMutation,
  useLazyFetchConversationListQuery
} from '@/store/conversationApi'
import { useStateSelector } from '@/store/root.reducer'
import { Tables } from '@/types/gen/supabase.table'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'

interface Props extends Tables<'conversation_users'> {
  user_profiles: Tables<'user_profiles'>
}
const MessageList = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { id } = useStateSelector(state => state.userSlice)
  const [data, setData] = useState<Props[]>()
  const [deleteConversation] = useDeleteConversationMutation()
  const [fetchConversations, { isLoading, isFetching }] = useLazyFetchConversationListQuery()
  const usefetchConversations = (id: number) => {
    fetchConversations(id).then(conversations => {
      const result = conversations?.data?.filter(i => i.user_id !== id)
      setData(result as any)
    })
  }
  useEffect(() => {
    if (id) {
      usefetchConversations(id)
    }
  }, [id])
  const handleDeleteConversation = async (conversationId: string) => {
    await deleteConversation(conversationId).then(() => {
      usefetchConversations(id)
    })
  }
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
        <div className="mt-4 mx-6 h-full ">
          {data && data.length > 0 ? (
            data?.map(item => {
              return (
                <div key={item.id} className="w-full my-2  flex justify-between items-center p-2">
                  <div
                    className="flex gap-2"
                    onClick={() => router.push(`/messages/${item.conversation_id}`)}>
                    <Image
                      alt="profile-pic"
                      src={
                        item?.user_profiles?.profile &&
                        !invalidImageValues.includes(item?.user_profiles?.profile as string)
                          ? (item.user_profiles?.profile as string)
                          : assets.images.DUMMY_PROFILE
                      }
                      width={40}
                      height={40}
                      className="rounded-full  w-[40px] h-[40px]"
                    />
                    <p className="self-center">{item.user_profiles?.user_name}</p>
                  </div>
                  <MdDelete
                    color="red"
                    className="cursor-pointer"
                    onClick={() => handleDeleteConversation(item.conversation_id as string)}
                  />
                </div>
              )
            })
          ) : (
            <p className="w-full h-full">No Messages Found</p>
          )}
        </div>
      )}
    </>
  )
}

export default MessageList
