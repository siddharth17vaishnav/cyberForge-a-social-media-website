import assets from '@/assets'
import Image from 'next/image'
import React from 'react'

interface Props {
  isSender: boolean
  message: string
}

const ChatMessage = ({ isSender, message }: Props) => {
  return (
    <div className="chat-message">
      <div className={`flex items-end `} style={{ justifyContent: isSender ? 'end' : 'start' }}>
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end">
          <div>
            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
              {message}
            </span>
          </div>
        </div>
        <Image
          width={24}
          height={24}
          alt="user-profile"
          src={assets.images.DUMMY_PROFILE}
          className={`rounded-full ${isSender ? 'order-2' : 'order-1'}`}
        />
      </div>
    </div>
  )
}
{
}
export default ChatMessage
