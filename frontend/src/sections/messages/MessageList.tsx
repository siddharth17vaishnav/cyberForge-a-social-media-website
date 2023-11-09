import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/store'
import { setModals } from '@/store/Modals/modals.slice'
import React from 'react'
const MessageList = () => {
  const dispatch = useAppDispatch()
  
  return (
    <>
      <div className="flex justify-between self-center mx-6 mt-2 ">
        <h2 className="text-2xl underline ">Messages</h2>
        <Button onClick={() => dispatch(setModals({ startConversation: true }))}>
          Start Conversation
        </Button>
      </div>
    </>
  )
}

export default MessageList
