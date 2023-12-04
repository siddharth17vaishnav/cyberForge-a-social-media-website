import assets from '@/assets'
import { invalidImageValues } from '@/comp/Drawer'
import { useLazyGetConversationUserQuery } from '@/store/conversationApi'
import { useStateSelector } from '@/store/root.reducer'
import { Tables } from '@/types/gen/supabase.table'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ChatHeader = () => {
  const params = useParams()
  const [getUser] = useLazyGetConversationUserQuery()
  const [data, setData] = useState<Tables<'user_profiles'>>()
  const { id } = useStateSelector(state => state.userSlice)
  useEffect(() => {
    if (params?.id && id) {
      getUser(params.id).then(({ data }) => {
        const result = data?.filter(i => i.user_id !== id)[0]?.user_profiles
        setData(result as Tables<'user_profiles'>)
      })
    }
  }, [params?.id, id])
  return (
    <div>
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            {data && (
              <span
                className={`absolute ${
                  data?.is_logged_in ? 'text-green-500' : ' text-red-600'
                } right-0 bottom-0`}>
                <svg width="20" height="20">
                  <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                </svg>
              </span>
            )}
            <Image
              width={100}
              height={100}
              src={
                !!data?.profile && !invalidImageValues.includes(data?.profile!)
                  ? data?.profile!
                  : assets.images.DUMMY_PROFILE
              }
              alt=""
              className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-gray-700 mr-3">
                {data?.first_name} {data?.last_name}
              </span>
            </div>
            <span className="text-lg text-gray-600">{data?.user_name}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader
