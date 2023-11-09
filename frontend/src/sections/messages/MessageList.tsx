import { Button } from '@/components/ui/button'
import React from 'react'

const MessageList = () => {
  return (
    <>
      <div className="flex justify-between self-center mx-6 mt-2 ">
        <h2 className="text-2xl underline ">Messages</h2>
        <Button>Start Conversation</Button>
      </div>
    </>
  )
}

export default MessageList
