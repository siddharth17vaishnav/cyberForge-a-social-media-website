import { useSendMessageMutation } from '@/store/conversationApi'
import { useStateSelector } from '@/store/root.reducer'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

const SendMessage = () => {
  const params = useParams()
  const [message, setMessaage] = useState('')
  const [sendMessage] = useSendMessageMutation()
  const { id: userId } = useStateSelector(state => state.userSlice)

  const handleSendMessage = () => {
    const data = {
      conversationId: params.id,
      message,
      userId
    }
    sendMessage(data).then(() => setMessaage(''))
  }
  return (
    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div className="relative flex">
        <input
          value={message}
          onChange={e => setMessaage(e.target.value)}
          type="text"
          placeholder="Write your message!"
          className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-3 pr-[7rem] bg-gray-200 rounded-md py-3"
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSendMessage()
            }
          }}
        />
        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
          <button
            onClick={handleSendMessage}
            type="button"
            className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
            <span className="font-bold">Send</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-6 w-6 ml-2 transform rotate-90">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SendMessage
