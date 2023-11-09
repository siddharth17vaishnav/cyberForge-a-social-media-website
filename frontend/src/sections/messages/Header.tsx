import assets from '@/assets'
import Image from 'next/image'
import React from 'react'

const ChatHeader = () => {
  return (
    <div>
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            <span className="absolute text-green-500 right-0 bottom-0">
              <svg width="20" height="20">
                <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
              </svg>
            </span>
            <Image
              width={100}
              height={100}
              src={assets.images.DUMMY_PROFILE}
              alt=""
              className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-gray-700 mr-3">Siddharth Vaishnav</span>
            </div>
            <span className="text-lg text-gray-600">code.siddharth</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader
