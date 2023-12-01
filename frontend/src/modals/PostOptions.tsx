import Loader from '@/comp/Loader'
import Modal from '@/comp/Modal'
import { Separator } from '@/components/ui/separator'
import { dispatch } from '@/store'
import { setModals } from '@/store/Modals/modals.slice'
import {
  postApi,
  useDeletePostMutation,
  useGetPostByIdQuery,
  useGetPostByUseridQuery
} from '@/store/postApi'
import { useStateSelector } from '@/store/root.reducer'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

const PostOptions = () => {
  const router = useRouter()
  const [deletePost] = useDeletePostMutation()
  const { id } = useStateSelector(state => state.userSlice)
  const { postOptions } = useStateSelector(state => state.modalsSlice)
  const onClose = () => dispatch(setModals({ postOptions: { id: 0, value: false } }))
  const { data: postData, isLoading } = useGetPostByUseridQuery(id)
  const { data: post } = useGetPostByIdQuery(postOptions.id)

  const postIds = postData?.map(i => i.id) ?? []

  const handleDeletePost = () => {
    const image = postData?.find(i => i.id === postOptions.id)?.image
    deletePost({ id: postOptions.id, image: image?.split('posts/public/')[1] }).then(() => {
      dispatch(postApi.util.invalidateTags(['posts']))
      dispatch(
        setModals({ postOptions: { id: 0, value: false }, viewPost: { id: 0, value: false } })
      )
    })
  }

  const options = useMemo(
    () => [
      {
        id: 0,
        label: 'Delete post',
        onclick: handleDeletePost,
        color: 'red',
        isVisible: postIds.includes(postOptions.id)
      },
      {
        id: 1,
        label: 'UnFriend',
        onclick: () => null,
        color: 'red',
        isVisible: true
      },
      {
        id: 2,
        label: 'Go to post',
        onclick: () => null,
        color: 'black',
        isVisible: true
      },
      {
        id: 3,
        label: 'Share',
        onclick: () => null,
        color: 'black',
        isVisible: true
      },
      {
        id: 4,
        label: 'Copy link',
        onclick: () => null,
        color: 'black',
        isVisible: true
      },
      {
        id: 5,
        label: 'Go to profile',
        onclick: () => {
          router.push(`/profile?id=${post![0].user_id}`)
          onClose()
        },
        color: 'black',
        isVisible: true
      },
      {
        id: 6,
        label: 'Cancel',
        onclick: () => onClose(),
        color: 'black',
        isVisible: true
      }
    ],
    [postData, postIds]
  )
  return (
    <Modal hideclose removepadding isOpen={postOptions.value} onClose={onClose}>
      <div className="w-full flex flex-col  ">
        {isLoading ? (
          <Loader />
        ) : (
          options.map((option, index) => {
            return (
              <div key={option.id}>
                {option.isVisible && (
                  <>
                    <div
                      style={{ color: option.color }}
                      className="w-full [text-align-last:center] text-md  cursor-pointer hover:bg-stone-200 py-4"
                      onClick={option.onclick}>
                      {option.label}
                    </div>
                    {index !== options.length - 1 && <Separator />}
                  </>
                )}
              </div>
            )
          })
        )}
      </div>
    </Modal>
  )
}

export default PostOptions
