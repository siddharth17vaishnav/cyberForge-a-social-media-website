import Loader from '@/comp/Loader'
import { useAppDispatch } from '@/store'
import { setModals } from '@/store/Modals/modals.slice'
import { useGetPostByUseridQuery } from '@/store/postApi'
import { useStateSelector } from '@/store/root.reducer'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { AiFillMessage } from 'react-icons/ai'
import { BsFillHeartFill } from 'react-icons/bs'

const ProfilePosts = () => {
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const { id: userId } = useStateSelector(state => state.userSlice)
  const [zIndex, setZIndex] = useState(0)

  const { data, isLoading: postLoading, isFetching } = useGetPostByUseridQuery(id || userId)
  const isLoading = postLoading || isFetching
  return (
    <div className="mt-2 max-w-[90%] md:max-w-[80%] mx-auto">
      {isLoading ? (
        <Loader className="mt-12" />
      ) : (
        <div>
          {data && data.length > 0 ? (
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 pb-[110px]">
              {data.map(post => {
                return (
                  <div
                    key={post.id}
                    className="relative cursor-pointer"
                    onMouseEnter={() => setZIndex(post.id)}
                    onMouseLeave={() => setZIndex(0)}
                    onClick={() => dispatch(setModals({ viewPost: { id: post.id, value: true } }))}>
                    <div
                      className="absolute w-full h-full backdrop-brightness-50 flex justify-center items-center text-white gap-4"
                      style={{ zIndex: zIndex === post.id ? 10 : -10 }}>
                      <div>
                        <BsFillHeartFill style={{ color: 'white' }} />
                        <p className="text-sm">{post?.likes?.length || 0}</p>
                      </div>
                      <div>
                        <AiFillMessage style={{ color: 'white' }} />
                        <p className="text-sm">{post?.comments?.length || 0}</p>
                      </div>
                    </div>
                    <img
                      className="h-[200px] max-w-full rounded-lg object-cover"
                      alt={`${post.description}`}
                      src={post.image!}
                    />
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex justify-center mt-4 font-medium">No Posts Founds</div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProfilePosts
